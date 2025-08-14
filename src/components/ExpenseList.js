import React, { useState, useEffect, useMemo, useCallback } from "react";
import { View, Text, SectionList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../styles/ExpenseListStyles";

const STORAGE_KEY = "collapsedCategories";

const ExpenseList = ({ expenses, onDeleteExpense }) => {
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

  const toggleCollapse = useCallback(
    async (category) => {
      const newCollapsed = { ...collapsed, [category]: !collapsed[category] };
      setCollapsed(newCollapsed);
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newCollapsed));
      } catch (e) {
        console.error("Failed to save collapsed state", e);
      }
    },
    [collapsed]
  );

  const grouped = useMemo(() => {
    const sectionMap = new Map();
    for (const expense of expenses) {
      const category = expense.category || "Uncategorized";
      if (sectionMap.has(category)) {
        const section = sectionMap.get(category);
        section.data.push(expense);
        section.total += expense.amount;
      } else {
        sectionMap.set(category, {
          title: category,
          data: [expense],
          total: expense.amount,
        });
      }
    }
    return Array.from(sectionMap.values());
  }, [expenses]);

  const dayTotal = useMemo(() => {
    return expenses.reduce((sum, exp) => sum + exp.amount, 0);
  }, [expenses]);

  const renderSectionHeader = ({ section: { title, total } }) => {
    const isCollapsed = collapsed[title];
    return (
      <TouchableOpacity
        onPress={() => toggleCollapse(title)}
        style={styles.sectionHeader}
      >
        <Text style={styles.collapseArrow}>{isCollapsed ? "›" : "⌄"}</Text>
        <Text style={styles.sectionHeaderText}>
          {title} (Total: ${total.toFixed(2)})
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
          styles.expenseItemRow,
        ]}
      >
        <View style={styles.expenseDetails}>
          <Text style={[styles.expenseText, styles.expenseDescription]}>
            {item.description}
          </Text>
          <Text style={[styles.expenseText, styles.expenseAmount]}>
            ${item.amount.toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.deleteBtnCircle}
          onPress={() => onDeleteExpense(item.id)}
          accessibilityLabel={`Delete item ${item.description || index + 1}`}
        >
          <MaterialIcons name="delete" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <View style={styles.dayTotalContainer}>
        <Text style={styles.dayTotalText}>
          Total for the day: ${dayTotal.toFixed(2)}
        </Text>
      </View>
      <SectionList
        sections={grouped}
        keyExtractor={(item) => item.id}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        contentContainerStyle={styles.sectionListContainer}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        extraData={collapsed}
      />
    </>
  );
};

export default ExpenseList;
