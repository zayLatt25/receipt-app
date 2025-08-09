import React from "react";
import { View, Text, SectionList } from "react-native";
import { styles, navyBlue, lightCream } from "../styles/styles";

const ExpenseList = ({ expenses }) => {
  // Group expenses by category and calculate totals
  const grouped = expenses.reduce((acc, expense) => {
    const category = expense.category || "Uncategorized";
    let section = acc.find((s) => s.title === category);
    if (section) {
      section.data.push(expense);
      section.total += expense.amount;
    } else {
      acc.push({ title: category, data: [expense], total: expense.amount });
    }
    return acc;
  }, []);

  const renderSectionHeader = ({ section: { title, total } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>
        {title} (${total.toFixed(2)})
      </Text>
    </View>
  );

  const renderItem = ({ item, index, section }) => (
    <View
      style={[
        styles.expenseItem,
        index === section.data.length - 1 ? null : styles.expenseItemBorder,
      ]}
    >
      <Text style={[styles.expenseText, styles.expenseDescription]}>
        {item.description}
      </Text>
      <Text style={[styles.expenseText, styles.expenseAmount]}>
        ${item.amount.toFixed(2)}
      </Text>
    </View>
  );

  return (
    <SectionList
      sections={grouped}
      keyExtractor={(item) => item.id}
      renderSectionHeader={renderSectionHeader}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: 100 }}
      stickySectionHeadersEnabled={false}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ExpenseList;
