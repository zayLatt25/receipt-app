import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { addDoc, collection } from "firebase/firestore";
import { predefinedCategories } from "../utils/constants";
import { db } from "../firebase";

const ReceiptConfirmationScreen = ({ visible, onClose, receiptData, user }) => {
  const [purchaseDate, setPurchaseDate] = useState("");
  const [category, setCategory] = useState("Others");
  const [items, setItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState("");

  // Initialize state from receiptData whenever modal opens
  useEffect(() => {
    if (receiptData) {
      setPurchaseDate(receiptData.purchaseDate || "");
      setCategory(receiptData.suggestedCategory || "Others");
      setItems(receiptData.items || []);
      setTotalAmount(receiptData.totalAmount?.toString() || "");
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
    if (key === "pieces" || key === "unitPrice") {
      updated[index][key] = value.replace(/[^0-9.]/g, "");
    } else {
      updated[index][key] = value;
    }
    setItems(updated);
  };

  const handleConfirm = async () => {
    if (!purchaseDate || !items.length || !totalAmount) {
      Alert.alert("Validation Error", "Please fill all required fields.");
      return;
    }

    try {
      const expense = {
        date: purchaseDate,
        category,
        total: parseFloat(totalAmount),
        items: items.map((i) => ({
          name: i.name,
          pieces: parseFloat(i.pieces),
          unitPrice: parseFloat(i.unitPrice),
        })),
        createdAt: new Date(),
      };

      await handleAddExpense(expense, user);
      Alert.alert("Success", "Expense saved!");
      onClose();
    } catch (error) {
      console.error("Error saving expense:", error);
      Alert.alert("Error", "Failed to save expense. Please try again.");
    }
  };

  const renderItem = ({ item, index }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5,
      }}
    >
      <TextInput
        style={{
          flex: 2,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 6,
          padding: 5,
          marginRight: 5,
        }}
        placeholder="Name"
        value={item.name}
        onChangeText={(text) => updateItem(index, "name", text)}
      />
      <TextInput
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 6,
          padding: 5,
          marginRight: 5,
        }}
        placeholder="Qty"
        keyboardType="numeric"
        value={item.pieces?.toString() || ""}
        onChangeText={(text) => updateItem(index, "pieces", text)}
      />
      <TextInput
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 6,
          padding: 5,
        }}
        placeholder="Price"
        keyboardType="numeric"
        value={item.unitPrice?.toString() || ""}
        onChangeText={(text) => updateItem(index, "unitPrice", text)}
      />
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
          Confirm Receipt
        </Text>

        {/* Purchase Date */}
        <Text style={{ marginTop: 10 }}>Purchase Date</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 8,
            marginVertical: 5,
          }}
          placeholder="YYYY-MM-DD"
          value={purchaseDate}
          onChangeText={setPurchaseDate}
        />

        {/* Category */}
        <Text style={{ marginTop: 10 }}>Category</Text>
        <FlatList
          data={predefinedCategories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setCategory(item)}
              style={{
                padding: 10,
                borderWidth: 1,
                borderColor: category === item ? "blue" : "#ccc",
                borderRadius: 20,
                marginRight: 8,
                backgroundColor: category === item ? "#dbeafe" : "#fff",
              }}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />

        {/* Items */}
        <Text style={{ marginTop: 15, fontWeight: "bold" }}>Items</Text>
        <FlatList
          data={items}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
        />

        {/* Total */}
        <Text style={{ marginTop: 10 }}>Total Amount</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 8,
            marginVertical: 5,
          }}
          keyboardType="numeric"
          value={totalAmount}
          onChangeText={setTotalAmount}
        />

        {/* Actions */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            onPress={onClose}
            style={{
              padding: 12,
              backgroundColor: "#f3f4f6",
              borderRadius: 8,
              flex: 1,
              marginRight: 5,
              alignItems: "center",
            }}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleConfirm}
            style={{
              padding: 12,
              backgroundColor: "#2563eb",
              borderRadius: 8,
              flex: 1,
              marginLeft: 5,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ReceiptConfirmationScreen;
