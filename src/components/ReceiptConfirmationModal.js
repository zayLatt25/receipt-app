import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addDoc, collection } from "firebase/firestore";
import { predefinedCategories } from "../utils/constants";
import { db } from "../firebase";
import { styles } from "../styles/ReceiptConfirmationStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LoadingSpinner from "./LoadingSpinner";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ReceiptConfirmationModal = ({ visible, onClose, receiptData, user }) => {
  const insets = useSafeAreaInsets();

  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const [category, setCategory] = useState("Others");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (receiptData) {
      setPurchaseDate(
        receiptData.purchaseDate
          ? new Date(receiptData.purchaseDate)
          : new Date()
      );
      setCategory(receiptData.suggestedCategory || "Others");
      setItems(receiptData.items || []);
    }
  }, [receiptData]);

  const handleAddExpense = async (expense) => {
    if (!user) return;
    try {
      await addDoc(collection(db, "users", user.uid, "expenses"), expense);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const updateItem = (index, key, value) => {
    const updated = [...items];
    if (key === "pieces" || key === "price") {
      updated[index][key] = value.replace(/[^0-9.]/g, "");
    } else {
      updated[index][key] = value;
    }
    setItems(updated);
  };

  const totalAmount = useMemo(() => {
    return items.reduce((sum, i) => {
      const qty = parseFloat(i.pieces) || 0;
      const price = parseFloat(i.price) || 0;
      return sum + qty * price;
    }, 0);
  }, [items]);

  const handleConfirm = async () => {
    if (!purchaseDate || !items.length) {
      Alert.alert("Validation Error", "Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      const categoryToUse = predefinedCategories.includes(category)
        ? category
        : "Others";

      for (const i of items) {
        const qty = isNaN(parseFloat(i.pieces)) ? 0 : parseFloat(i.pieces);
        const price = isNaN(parseFloat(i.price)) ? 0 : parseFloat(i.price);

        const expense = {
          description: i.name || "Unknown",
          amount: qty * price,
          category: categoryToUse,
          date: purchaseDate.toISOString().split("T")[0], // YYYY-MM-DD
          createdAt: new Date(),
        };

        await handleAddExpense(expense);
      }

      Alert.alert("Success", "Expense saved!");
      onClose();
    } catch (error) {
      console.error("Error saving expenses:", error);
      Alert.alert("Error", "Failed to save expenses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.itemRow}>
      <View style={styles.itemInputsContainer}>
        {/* Name Input */}
        <TextInput
          style={[styles.itemInputCommon, styles.itemNameInput]}
          placeholder="Name"
          value={item.name}
          onChangeText={(text) => updateItem(index, "name", text)}
          onSubmitEditing={() => Keyboard.dismiss()}
        />

        {/* Quantity Input */}
        <TextInput
          style={[styles.itemInputCommon, styles.itemQtyInput]}
          placeholder="Qty"
          keyboardType="numeric"
          value={item.pieces?.toString() || ""}
          onChangeText={(text) => updateItem(index, "pieces", text)}
          returnKeyType="done"
          onSubmitEditing={() => Keyboard.dismiss()}
        />

        {/* Price Input */}
        <View style={styles.priceContainer}>
          <Text style={styles.priceSign}>$</Text>
          <TextInput
            style={styles.itemPriceInput}
            placeholder="Price"
            keyboardType="numeric"
            value={item.price?.toString() || ""}
            onChangeText={(text) => updateItem(index, "price", text)}
            returnKeyType="done"
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.deleteBtnCircle}
        onPress={() => {
          const updated = items.filter((_, i) => i !== index);
          setItems(updated);
        }}
        accessibilityLabel={
          item.name && item.name.trim()
            ? `Delete item ${item.name}`
            : `Delete item at position ${index + 1}`
        }
      >
        <MaterialIcons name="delete" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Confirm Receipt</Text>

          <Text style={styles.label}>Purchase Date</Text>
          <DateTimePicker
            value={purchaseDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              if (selectedDate) {
                setPurchaseDate(selectedDate);
              }
            }}
          />

          <Text style={styles.label}>Category</Text>
          <View style={styles.categoryGrid}>
            {predefinedCategories.map((cat) => {
              const selected = category === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setCategory(cat)}
                  style={[
                    styles.categoryButton,
                    selected
                      ? styles.selectedCategory
                      : styles.unselectedCategory,
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
          </View>
        </View>

        <KeyboardAvoidingView
          style={styles.scrollableContent}
          behavior={Platform.OS === "ios" ? "padding" : null}
        >
          <FlatList
            data={items}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            style={styles.flatListStyle}
            keyboardShouldPersistTaps="handled"
          />
        </KeyboardAvoidingView>

        <View style={styles.footerContainer}>
          <Text style={styles.totalText}>Total: ${totalAmount.toFixed(2)}</Text>

          <View style={styles.actionsContainer}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleConfirm}
              style={styles.confirmButton}
              disabled={loading}
            >
              {loading ? (
                <LoadingSpinner size="small" color="#fff" />
              ) : (
                <Text style={styles.confirmButtonText}>Confirm</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ReceiptConfirmationModal;
