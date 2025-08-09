import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { styles } from "../styles/styles";
import FormInput from "./FormInput";
import dayjs from "dayjs";

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

const AddExpenseModal = ({ visible, onClose, onSave, initialDate }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [categories, setCategories] = useState(predefinedCategoriesInit);
  const [category, setCategory] = useState(null);
  const [customCategory, setCustomCategory] = useState("");
  const [errors, setErrors] = useState({});
  const [expenseDate, setExpenseDate] = useState(
    initialDate ? new Date(initialDate) : new Date()
  );

  useEffect(() => {
    if (!visible) {
      setDescription("");
      setAmount("");
      setCategory(null);
      setCustomCategory("");
      setErrors({});
      setExpenseDate(initialDate ? new Date(initialDate) : new Date());
      setCategories(predefinedCategoriesInit);
    }
  }, [visible, initialDate]);

  const validate = () => {
    const newErrors = {};
    if (!description.trim()) newErrors.description = "Description is required.";
    if (!amount) {
      newErrors.amount = "Amount is required.";
    } else {
      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        newErrors.amount = "Amount must be a positive number.";
      }
    }
    if (!category) {
      newErrors.categories = "Please select or add a category.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const toggleCategory = (cat) => {
    if (category === cat) {
      setCategory(null);
    } else {
      setCategory(cat);
      if (errors.categories) setErrors({ ...errors, categories: null });
    }
  };

  const addCustomCategory = () => {
    const cat = customCategory.trim();
    if (!cat) return;

    const exists = categories.some(
      (c) => c.toLowerCase() === cat.toLowerCase()
    );
    if (exists) {
      setCategory(cat);
      setCustomCategory("");
      if (errors.categories) setErrors({ ...errors, categories: null });
      return;
    }

    setCategories([cat, ...categories]);
    setCategory(cat);
    setCustomCategory("");
    if (errors.categories) setErrors({ ...errors, categories: null });
  };

  const handleSave = () => {
    if (!validate()) return;

    onSave({
      description: description.trim(),
      amount: parseFloat(amount),
      date: dayjs(expenseDate).format("YYYY-MM-DD"),
      category,
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            Add Expense - {dayjs(expenseDate).format("DD MMM YYYY")}
          </Text>

          {/* --- CATEGORY SELECTOR --- */}
          <Text style={styles.modalSubtitle}>Select Category</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
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
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      selected && styles.categoryButtonTextSelected,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View style={styles.customCategoryRow}>
            <TextInput
              placeholder="Add Custom Category"
              value={customCategory}
              onChangeText={setCustomCategory}
              style={styles.customCategoryInput}
              onSubmitEditing={addCustomCategory}
              returnKeyType="done"
            />
            <TouchableOpacity
              onPress={addCustomCategory}
              disabled={!customCategory.trim()}
              style={[
                styles.addCategoryButton,
                !customCategory.trim() && styles.addCategoryButtonDisabled,
              ]}
            >
              <Text style={styles.addCategoryButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
          {errors.categories && (
            <Text style={styles.errorText}>{errors.categories}</Text>
          )}

          {/* --- DESCRIPTION & AMOUNT BELOW CATEGORY --- */}
          <FormInput
            placeholder="Description"
            value={description}
            onChangeText={(text) => {
              setDescription(text);
              if (errors.description)
                setErrors({ ...errors, description: null });
            }}
          />
          {errors.description && (
            <Text style={styles.errorText}>{errors.description}</Text>
          )}

          <FormInput
            placeholder="Amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={(text) => {
              // Remove all non-digit and non-decimal characters
              let filtered = text.replace(/[^0-9.]/g, "");
              // Allow only the first decimal point
              const parts = filtered.split(".");
              if (parts.length > 1) {
                filtered = parts[0] + "." + parts.slice(1).join("");
              }
              setAmount(filtered);
              if (errors.amount) setErrors({ ...errors, amount: null });
            }}
          />
          {errors.amount && (
            <Text style={styles.errorText}>{errors.amount}</Text>
          )}

          {/* --- MODAL BUTTONS --- */}
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddExpenseModal;
