export const handleAddExpense = async (expense, user) => {
  if (!user) return;
  try {
    await addDoc(collection(db, "users", user.uid, "expenses"), expense);
    setModalVisible(false);
    // Force refresh month so dot appears immediately
    await refreshExpenses(selectedDate, true);
  } catch (error) {
    console.error("Error adding expense:", error);
  }
};
