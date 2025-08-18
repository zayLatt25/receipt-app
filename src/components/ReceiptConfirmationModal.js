import React, { useState, useEffect, useMemo } from "react";
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

export const ReceiptConfirmationModal = ({
  visible,
  onClose,
  receiptData,
  user,
}) => {
  const [purchaseDate, setPurchaseDate] = useState("");
  const [category, setCategory] = useState("Others");
  const [items, setItems] = useState([]);

  // Initialize state from receiptData whenever modal opens
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

  // Auto-calculate total
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
        value={item.price?.toString() || ""}
        onChangeText={(text) => updateItem(index, "price", text)}
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

        {/* Auto Total */}
        <View style={{ marginTop: 20, alignItems: "flex-end" }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Total: ${totalAmount.toFixed(2)}
          </Text>
        </View>

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
