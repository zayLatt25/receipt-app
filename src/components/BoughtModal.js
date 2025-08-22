// BoughtModal.js
import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { styles } from "../styles/styles";

const predefinedCategoriesInit = [
  "Grocery",
  "Transport",
  "Bills",
  "Entertainment",
  "Eating Out",
  "Health",
  "Shopping",
  "Others",
];

export default function BoughtModal({
  visible,
  onClose,
  selectedIds,
  groceries,
  onSaveBought,
}) {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [categories, setCategories] = useState(predefinedCategoriesInit);
  const [category, setCategory] = useState(null);
  const [customCategory, setCustomCategory] = useState("");
  const [errors, setErrors] = useState({});

  const selectedItems = groceries.filter((g) => selectedIds.includes(g.id));

  useEffect(() => {
    if (!visible) {
      setDate(new Date());
      setCategory(null);
      setCustomCategory("");
      setErrors({});
      setCategories(predefinedCategoriesInit);
    }
  }, [visible]);

  const toggleCategory = (cat) => {
    setCategory((prev) => (prev === cat ? null : cat));
    if (errors.categories) setErrors({ ...errors, categories: null });
  };

  const addCustomCategory = () => {
    const cat = customCategory.trim();
    if (!cat) return;
    const exists = categories.some(
      (c) => c.toLowerCase() === cat.toLowerCase()
    );
    if (!exists) setCategories([cat, ...categories]);
    setCategory(cat);
    setCustomCategory("");
    if (errors.categories) setErrors({ ...errors, categories: null });
  };

  const validate = () => {
    const newErrors = {};
    if (!category) newErrors.categories = "Please select or add a category.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = () => {
    if (!validate()) return;
    const purchaseDate = dayjs(date).format("YYYY-MM-DD");
    onSaveBought(selectedItems, purchaseDate, category);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent testID="modal">
      <View style={styles.modalOverlay} testID="modalOverlay">
        <View style={styles.modalContent} testID="modalContent">
          <Text style={styles.modalTitle} testID="modalTitle">
            Mark as Bought
          </Text>

          {/* Show selected items */}
          <Text style={{ marginBottom: 8 }} testID="selectedItems">
            {selectedItems.map((item) => item.name).join(", ")}
          </Text>

          {/* Date Picker */}
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={[styles.button, { marginBottom: 10 }]}
            testID="openDatePicker"
          >
            <Text style={styles.buttonText} testID="dateText">
              Date: {dayjs(date).format("DD MMM YYYY")}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              onChange={(e, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setDate(selectedDate);
              }}
              testID="dateTimePicker"
            />
          )}

          {/* Category Selector */}
          <Text style={styles.modalSubtitle} testID="categoryTitle">
            Select Category
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
            testID="categoryScroll"
          >
            {categories.map((cat) => {
              const selected = category === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  onPress={() => toggleCategory(cat)}
                  style={[
                    styles.categoryButton,
                    selected && styles.categoryButtonSelected,
                  ]}
                  testID={`categoryButton-${cat}`}
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      selected && styles.categoryButtonTextSelected,
                    ]}
                    testID={`categoryText-${cat}`}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Add Custom Category */}
          <View style={styles.customCategoryRow}>
            <TextInput
              placeholder="Add Custom Category"
              value={customCategory}
              onChangeText={setCustomCategory}
              style={styles.customCategoryInput}
              onSubmitEditing={addCustomCategory}
              returnKeyType="done"
              testID="customCategoryInput"
            />
            <TouchableOpacity
              onPress={addCustomCategory}
              disabled={!customCategory.trim()}
              style={[
                styles.addCategoryButton,
                !customCategory.trim() && styles.addCategoryButtonDisabled,
              ]}
              testID="addCustomCategoryButton"
            >
              <Text style={styles.addCategoryButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
          {errors.categories && (
            <Text style={styles.errorText} testID="categoryError">
              {errors.categories}
            </Text>
          )}

          {/* Action Buttons */}
          <View style={styles.modalButtons} testID="modalButtons">
            <TouchableOpacity
              onPress={onClose}
              style={styles.cancelButton}
              testID="cancelButton"
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConfirm} testID="saveButton">
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
