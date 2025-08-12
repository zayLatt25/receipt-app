import React, { useState, useRef, useMemo, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { styles, lightCream, darkPink } from "../styles/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

// Import the KeyboardAwareScrollView
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function GroceryList() {
  const { user, authLoading } = useAuth();
  const [items, setItems] = useState([
    { name: "", pcs: "", price: "", checked: false },
  ]);
  const inputRefs = useRef([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const saveTimeoutRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  const formatCurrency = (num) => "$" + num.toFixed(2);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const docRef = doc(db, "users", user.uid, "groceryLists", "myList");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setItems(docSnap.data().items || []);
        }
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsDataLoaded(true);
      }
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    if (!user || !isDataLoaded) return;

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    saveTimeoutRef.current = setTimeout(async () => {
      setIsTyping(false);
      setIsSaving(true);

      try {
        const docRef = doc(db, "users", user.uid, "groceryLists", "myList");
        await setDoc(docRef, { items });
      } catch (error) {
        console.error("Error saving data:", error);
      } finally {
        setIsSaving(false);
      }
    }, 2000);

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [items, user, isDataLoaded]);

  const handleChange = (index, field, value) => {
    setIsTyping(true);
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const toggleCheck = (index) => {
    const updatedItems = [...items];
    updatedItems[index].checked = !updatedItems[index].checked;
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    const lastIndex = items.length - 1;
    if (items[lastIndex].name.trim() === "") {
      if (inputRefs.current[lastIndex]) {
        inputRefs.current[lastIndex].focus();
      }
      return;
    }
    const newItems = [
      ...items,
      { name: "", pcs: "", price: "", checked: false },
    ];
    setItems(newItems);
    setTimeout(() => {
      if (inputRefs.current[newItems.length - 1]) {
        inputRefs.current[newItems.length - 1].focus();
      }
    }, 100);
  };

  const handleDeleteItem = (index) => {
    if (items.length === 1) {
      setItems([{ name: "", pcs: "", price: "", checked: false }]);
    } else {
      const updatedItems = items.filter((_, i) => i !== index);
      setItems(updatedItems);
    }
  };

  const totalPrice = useMemo(() => {
    return items.reduce((sum, item) => {
      const pcs = parseFloat(item.pcs) || 0;
      const price = parseFloat(item.price) || 0;
      return sum + pcs * price;
    }, 0);
  }, [items]);

  if (authLoading || !isDataLoaded) {
    return <LoadingSpinner size="large" color={darkPink} />;
  }

  let savingText = "Saved";
  if (isTyping) savingText = "Waiting to save...";
  if (isSaving) savingText = "Saving...";

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.stickyHeaderContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.pageTitle}>Item List</Text>
          <Text style={styles.savingIndicator}>{savingText}</Text>
        </View>

        <View style={styles.columnHeaderRow}>
          <View style={styles.checkboxHeader} />
          <Text style={styles.firstTableColumnText}>Item</Text>
          <Text style={styles.tableColumnText}>Pcs</Text>
          <Text style={styles.tableColumnText}>Price</Text>
          <View style={styles.deleteBtnColumn} />
        </View>
      </View>

      <KeyboardAwareScrollView
        style={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.keyboardAwareViewStyle}
        enableOnAndroid={true}
      >
        {items.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <TouchableOpacity
              style={[styles.checkbox, item.checked && styles.checkboxChecked]}
              onPress={() => toggleCheck(index)}
            >
              {item.checked && (
                <MaterialIcons name="check" size={18} color={darkPink} />
              )}
            </TouchableOpacity>

            <TextInput
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={styles.itemNameInput}
              placeholder="Item"
              placeholderTextColor={"grey"}
              value={item.name}
              returnKeyType="done"
              onChangeText={(text) => handleChange(index, "name", text)}
              onSubmitEditing={() => {
                if (item.name.trim() !== "") handleAddItem();
              }}
            />
            <TextInput
              style={styles.itemPcsInput}
              placeholder="Pcs"
              placeholderTextColor="grey"
              keyboardType="numeric"
              value={item.pcs}
              returnKeyType="done"
              onChangeText={(text) => handleChange(index, "pcs", text)}
            />
            <TextInput
              style={styles.itemPriceInput}
              placeholder="Price"
              placeholderTextColor="grey"
              keyboardType="numeric"
              value={item.price}
              returnKeyType="done"
              onChangeText={(text) => handleChange(index, "price", text)}
            />
            <TouchableOpacity
              style={styles.deleteBtnCircle}
              onPress={() => handleDeleteItem(index)}
              accessibilityLabel={
                item.name && item.name.trim()
                  ? `Delete item ${item.name}`
                  : `Delete item at position ${index + 1}`
              }
            >
              <MaterialIcons name="delete" size={24} color={lightCream} />
            </TouchableOpacity>
          </View>
        ))}
      </KeyboardAwareScrollView>

      <View style={styles.footerSticky}>
        <Text style={styles.totalText}>
          Total: {formatCurrency(totalPrice)}
        </Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
          <Text style={styles.addButtonText}>+ Add Item</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
