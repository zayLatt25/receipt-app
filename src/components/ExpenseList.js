import React, { useState, useEffect } from "react";
import { View, Text, SectionList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles, lightCream } from "../styles/styles";

// Store the collapsed state in AsyncStorage
const STORAGE_KEY = "collapsedCategories";

const ExpenseList = ({ expenses }) => {
  const [collapsed, setCollapsed] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) setCollapsed(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load collapsed state", e);
      }
    })();
  }, []);

  const toggleCollapse = async (category) => {
    const newCollapsed = { ...collapsed, [category]: !collapsed[category] };
    setCollapsed(newCollapsed);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newCollapsed));
    } catch (e) {
      console.error("Failed to save collapsed state", e);
    }
  };

  // Group expenses by category & calculate totals
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

  const renderSectionHeader = ({ section: { title, total } }) => {
    const isCollapsed = collapsed[title];
    return (
      <TouchableOpacity
        onPress={() => toggleCollapse(title)}
        style={styles.sectionHeader}
      >
        <Text style={styles.collapseArrow}>{isCollapsed ? "›" : "⌄"}</Text>
        <Text style={styles.sectionHeaderText}>
          {title} (${total.toFixed(2)})
        </Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item, index, section }) => {
    if (collapsed[section.title]) return null;

    return (
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
  };

  return (
    <SectionList
      sections={grouped}
      keyExtractor={(item) => item.id}
      renderSectionHeader={renderSectionHeader}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: 100 }}
      stickySectionHeadersEnabled={false}
      showsVerticalScrollIndicator={false}
      extraData={collapsed}
    />
  );
};

export default ExpenseList;
