import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { collection, getDocs, query, where } from 'firebase/firestore';

// Extend dayjs with weekOfYear plugin
dayjs.extend(weekOfYear);

/**
 * Calculate weekly spending summary
 * @param {Object} db - Firestore database instance
 * @param {string} userId - User ID
 * @param {string} date - Reference date (defaults to current date)
 * @returns {Promise<Object>} Weekly spending summary data
 */
export const calculateWeeklySpendingSummary = async (db, userId, date = new Date()) => {
  try {
    const referenceDate = dayjs(date);
    
    // Get the start and end of the current week (Monday to Sunday)
    const startOfWeek = referenceDate.startOf('week').add(1, 'day'); // Monday
    const endOfWeek = startOfWeek.endOf('week').add(1, 'day'); // Sunday
    
    // Get the start and end of last week
    const startOfLastWeek = startOfWeek.subtract(1, 'week');
    const endOfLastWeek = endOfWeek.subtract(1, 'week');

    console.log('Debug - Week boundaries:');
    console.log('Current week start:', startOfWeek.format('YYYY-MM-DD'));
    console.log('Current week end:', endOfWeek.format('YYYY-MM-DD'));
    console.log('Last week start:', startOfLastWeek.format('YYYY-MM-DD'));
    console.log('Last week end:', endOfLastWeek.format('YYYY-MM-DD'));

    // Try the date range query first
    let currentWeekExpenses = [];
    let lastWeekExpenses = [];
    
    try {
      // Get current week expenses
      const currentWeekQuery = query(
        collection(db, "users", userId, "expenses"),
        where("date", ">=", startOfWeek.format("YYYY-MM-DD")),
        where("date", "<=", endOfWeek.format("YYYY-MM-DD"))
      );

      // Get last week expenses
      const lastWeekQuery = query(
        collection(db, "users", userId, "expenses"),
        where("date", ">=", startOfLastWeek.format("YYYY-MM-DD")),
        where("date", "<=", endOfLastWeek.format("YYYY-MM-DD"))
      );

      const [currentWeekSnapshot, lastWeekSnapshot] = await Promise.all([
        getDocs(currentWeekQuery),
        getDocs(lastWeekQuery)
      ]);

      currentWeekExpenses = currentWeekSnapshot.docs;
      lastWeekExpenses = lastWeekSnapshot.docs;
      
      console.log('Debug - Query results:');
      console.log('Current week expenses found:', currentWeekExpenses.length);
      console.log('Last week expenses found:', lastWeekExpenses.length);
      
    } catch (queryError) {
      console.log('Date range query failed, trying fallback method:', queryError);
      
      // Fallback: Get all expenses and filter locally
      const allExpensesQuery = query(collection(db, "users", userId, "expenses"));
      const allExpensesSnapshot = await getDocs(allExpensesQuery);
      const allExpenses = allExpensesSnapshot.docs;
      
      console.log('Debug - Fallback: Total expenses found:', allExpenses.length);
      
      // Filter expenses by week locally
      currentWeekExpenses = allExpenses.filter(doc => {
        const expenseDate = doc.data().date;
        if (!expenseDate) return false;
        
        const expenseDayjs = dayjs(expenseDate);
        return expenseDayjs.isAfter(startOfWeek.subtract(1, 'day')) && 
               expenseDayjs.isBefore(endOfWeek.add(1, 'day'));
      });
      
      lastWeekExpenses = allExpenses.filter(doc => {
        const expenseDate = doc.data().date;
        if (!expenseDate) return false;
        
        const expenseDayjs = dayjs(expenseDate);
        return expenseDayjs.isAfter(startOfLastWeek.subtract(1, 'day')) && 
               expenseDayjs.isBefore(endOfLastWeek.add(1, 'day'));
      });
      
      console.log('Debug - Fallback filtering results:');
      console.log('Current week expenses (filtered):', currentWeekExpenses.length);
      console.log('Last week expenses (filtered):', lastWeekExpenses.length);
    }

    // Log some sample expense data for debugging
    if (currentWeekExpenses.length > 0) {
      console.log('Sample current week expense:', currentWeekExpenses[0].data());
    }

    // Calculate current week total
    const currentWeekTotal = currentWeekExpenses.reduce((total, doc) => {
      const data = doc.data();
      const amount = Number(data.amount) || 0;
      console.log(`Expense amount: ${data.amount}, parsed: ${amount}`);
      return total + amount;
    }, 0);

    // Calculate last week total
    const lastWeekTotal = lastWeekExpenses.reduce((total, doc) => {
      const data = doc.data();
      return total + (Number(data.amount) || 0);
    }, 0);

    console.log('Debug - Totals calculated:');
    console.log('Current week total:', currentWeekTotal);
    console.log('Last week total:', lastWeekTotal);

    // Calculate percentage change
    let percentageChange = 0;
    let changeType = 'same';
    
    if (lastWeekTotal > 0) {
      percentageChange = ((currentWeekTotal - lastWeekTotal) / lastWeekTotal) * 100;
      if (percentageChange > 0) {
        changeType = 'more';
      } else if (percentageChange < 0) {
        changeType = 'less';
        percentageChange = Math.abs(percentageChange);
      }
    }

    return {
      currentWeekTotal: Number(currentWeekTotal.toFixed(2)),
      lastWeekTotal: Number(lastWeekTotal.toFixed(2)),
      percentageChange: Number(percentageChange.toFixed(1)),
      changeType,
      startDate: startOfWeek.format("YYYY-MM-DD"),
      endDate: endOfWeek.format("YYYY-MM-DD"),
      expenseCount: currentWeekExpenses.length,
    };
  } catch (error) {
    console.error("Error calculating weekly spending summary:", error);
    throw error;
  }
};

/**
 * Generate notification message for weekly spending summary
 * @param {Object} summary - Weekly spending summary data
 * @returns {string} Formatted notification message
 */
export const generateWeeklySummaryMessage = (summary) => {
  const { currentWeekTotal, percentageChange, changeType, expenseCount } = summary;
  
  let message = `This week you spent $${currentWeekTotal}`;
  
  if (changeType === 'same') {
    message += " - same as last week";
  } else if (changeType === 'more') {
    message += ` - ${percentageChange}% more than last week`;
  } else if (changeType === 'less') {
    message += ` - ${percentageChange}% less than last week`;
  }
  
  if (expenseCount > 0) {
    message += ` (${expenseCount} expenses)`;
  }
  
  return message;
};

/**
 * Get formatted date range for display
 * @param {string} startDate - Start date in YYYY-MM-DD format
 * @param {string} endDate - End date in YYYY-MM-DD format
 * @returns {string} Formatted date range
 */
export const getFormattedDateRange = (startDate, endDate) => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  
  if (start.month() === end.month()) {
    return `${start.format('MMM D')} - ${end.format('D, YYYY')}`;
  } else if (start.year() === end.year()) {
    return `${start.format('MMM D')} - ${end.format('MMM D, YYYY')}`;
  } else {
    return `${start.format('MMM D, YYYY')} - ${end.format('MMM D, YYYY')}`;
  }
};
