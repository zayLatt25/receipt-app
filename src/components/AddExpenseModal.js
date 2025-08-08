import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { styles, lightCream, navyBlue } from "../styles/styles";
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
    } else if (isNaN(amount) || Number(amount) <= 0) {
      newErrors.amount = "Amount must be a positive number.";
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
      id: Date.now().toString(),
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

          {/* --- CATEGORY SELECTOR ABOVE DESCRIPTION & AMOUNT --- */}
          <Text style={{ color: navyBlue, marginBottom: 8, fontWeight: "600" }}>
            Select Category
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 12 }}
          >
            {categories.map((cat) => {
              const selected = category === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  onPress={() => toggleCategory(cat)}
                  style={{
                    backgroundColor: selected ? navyBlue : lightCream,
                    paddingVertical: 8,
                    paddingHorizontal: 14,
                    borderRadius: 20,
                    marginRight: 10,
                    borderWidth: 1,
                    borderColor: navyBlue,
                  }}
                >
                  <Text
                    style={{
                      color: selected ? lightCream : navyBlue,
                      fontWeight: selected ? "bold" : "normal",
                    }}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View
            style={{
              flexDirection: "row",
              marginBottom: 12,
              alignItems: "center",
            }}
          >
            <TextInput
              placeholder="Add Custom Category"
              value={customCategory}
              onChangeText={setCustomCategory}
              style={{
                flex: 1,
                height: 40,
                borderColor: navyBlue,
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 10,
                color: navyBlue,
              }}
              onSubmitEditing={addCustomCategory}
              returnKeyType="done"
            />
            <TouchableOpacity
              onPress={addCustomCategory}
              disabled={!customCategory.trim()}
              style={{
                marginLeft: 10,
                backgroundColor: !customCategory.trim() ? "#999" : navyBlue,
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: lightCream, fontWeight: "bold" }}>Add</Text>
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
              const filtered = text.replace(/[^0-9.]/g, "");
              setAmount(filtered);
              if (errors.amount) setErrors({ ...errors, amount: null });
            }}
          />
          {errors.amount && (
            <Text style={styles.errorText}>{errors.amount}</Text>
          )}

          {/* --- MODAL BUTTONS --- */}
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={onClose} style={{ marginRight: 20 }}>
              <Text style={{ color: navyBlue }}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSave}>
              <Text style={{ color: navyBlue, fontWeight: "bold" }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddExpenseModal;
