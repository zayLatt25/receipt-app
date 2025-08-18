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
} from "react-native";
import { addDoc, collection } from "firebase/firestore";
import { predefinedCategories } from "../utils/constants";
import { db } from "../firebase";
import { styles } from "../styles/ReceiptConfirmationStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Keyboard } from "react-native";

const ReceiptConfirmationModal = ({ visible, onClose, receiptData, user }) => {
  const insets = useSafeAreaInsets();

  const [purchaseDate, setPurchaseDate] = useState("");
  const [category, setCategory] = useState("Others");
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (receiptData) {
      setPurchaseDate(receiptData.purchaseDate || "");
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

    try {
      const expense = {
        date: purchaseDate,
        category: predefinedCategories.includes(category) ? category : "Others",
        total: totalAmount,
        items: items.map((i) => ({
          name: i.name || "Unknown",
          pieces: isNaN(parseFloat(i.pieces)) ? 0 : parseFloat(i.pieces),
          price: isNaN(parseFloat(i.price)) ? 0 : parseFloat(i.price),
        })),
        createdAt: new Date(),
      };

      await handleAddExpense(expense);
      Alert.alert("Success", "Expense saved!");
      onClose();
    } catch (error) {
      console.error("Error saving expense:", error);
      Alert.alert("Error", "Failed to save expense. Please try again.");
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.itemRow}>
      <TextInput
        style={[styles.itemInput, { flex: 2, marginRight: 5 }]}
        placeholder="Name"
        value={item.name}
        onChangeText={(text) => updateItem(index, "name", text)}
        onSubmitEditing={() => Keyboard.dismiss()}
      />

      <TextInput
        style={[styles.itemInput, { flex: 1, marginRight: 5 }]}
        placeholder="Qty"
        keyboardType="numeric"
        value={item.pieces?.toString() || ""}
        onChangeText={(text) => updateItem(index, "pieces", text)}
        returnKeyType="done"
        onSubmitEditing={() => Keyboard.dismiss()}
      />

      <TextInput
        style={[styles.itemInput, { flex: 1 }]}
        placeholder="Price"
        keyboardType="numeric"
        value={item.price?.toString() || ""}
        onChangeText={(text) => updateItem(index, "price", text)}
        returnKeyType="done"
        onSubmitEditing={() => Keyboard.dismiss()}
      />
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View
        style={{ flex: 1, backgroundColor: "white", paddingTop: insets.top }}
      >
        {/* Sticky Header */}
        <View style={{ paddingHorizontal: 16, paddingBottom: 10 }}>
          <Text style={styles.title}>Confirm Receipt</Text>

          <Text style={styles.label}>Purchase Date</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={purchaseDate}
            onChangeText={setPurchaseDate}
          />

          <Text style={styles.label}>Category</Text>
          <FlatList
            data={predefinedCategories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setCategory(item)}
                style={[
                  styles.categoryButton,
                  category === item
                    ? styles.selectedCategory
                    : styles.unselectedCategory,
                ]}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Scrollable Items List */}
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : null}
        >
          <FlatList
            data={items}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, paddingHorizontal: 16 }}
            keyboardShouldPersistTaps="handled"
          />
        </KeyboardAvoidingView>

        {/* Sticky Footer */}
        <View
          style={{
            padding: 16,
            borderTopWidth: 1,
            borderColor: "#ddd",
            backgroundColor: "white",
          }}
        >
          <Text style={styles.totalText}>Total: ${totalAmount.toFixed(2)}</Text>

          <View style={styles.actionsContainer}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleConfirm}
              style={styles.confirmButton}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ReceiptConfirmationModal;
