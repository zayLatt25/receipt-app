import React, { useState, useRef, useMemo, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { styles, lightCream, darkPink, navyBlue } from "../styles/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { Swipeable } from "react-native-gesture-handler";

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

  // Updated save effect with proper debounce and delayed saving status
  useEffect(() => {
    if (!user || !isDataLoaded) return;

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    // Set timeout to save after 2 seconds of no typing
    saveTimeoutRef.current = setTimeout(async () => {
      setIsTyping(false); // User stopped typing
      setIsSaving(true); // Start saving indicator

      try {
        const docRef = doc(db, "users", user.uid, "groceryLists", "myList");
        await setDoc(docRef, { items });
      } catch (error) {
        console.error("Error saving data:", error);
      } finally {
        setIsSaving(false); // End saving indicator
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

  // Toggle check state
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

  // Render right action for Swipeable (Delete button)
  const renderRightActions = (index) => {
    return (
      <TouchableOpacity
        style={styles.swipeDeleteButton}
        onPress={() => handleDeleteItem(index)}
      >
        <MaterialIcons name="delete" size={24} color={lightCream} />
      </TouchableOpacity>
    );
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
      <View style={styles.titleRow}>
        <Text style={styles.pageTitle}>Item List</Text>
        <Text style={styles.savingIndicator}>{savingText}</Text>
      </View>

      <ScrollView
        style={{ padding: 16, marginBottom: 70 }}
        keyboardShouldPersistTaps="handled"
      >
        {items.map((item, index) => (
          <Swipeable
            key={index}
            renderRightActions={() => renderRightActions(index)}
          >
            <View style={styles.itemRow}>
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  item.checked && styles.checkboxChecked,
                ]}
                onPress={() => toggleCheck(index)}
              >
                {item.checked && (
                  <MaterialIcons name="check" size={18} color={darkPink} />
                )}
              </TouchableOpacity>

              <TextInput
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={[styles.groceryListInput, { flex: 2 }]}
                placeholder="Item"
                placeholderTextColor={lightCream}
                value={item.name}
                returnKeyType="next"
                onChangeText={(text) => handleChange(index, "name", text)}
                onSubmitEditing={() => {
                  if (item.name.trim() !== "") handleAddItem();
                }}
              />
              <TextInput
                style={[
                  styles.groceryListInput,
                  { flex: 1, textAlign: "center" },
                ]}
                placeholder="Pcs"
                placeholderTextColor={lightCream}
                keyboardType="numeric"
                value={item.pcs}
                returnKeyType="done"
                onChangeText={(text) => handleChange(index, "pcs", text)}
              />
              <TextInput
                style={[
                  styles.groceryListInput,
                  { flex: 1, textAlign: "center" },
                ]}
                placeholder="Price"
                placeholderTextColor={lightCream}
                keyboardType="numeric"
                value={item.price}
                returnKeyType="done"
                onChangeText={(text) => handleChange(index, "price", text)}
              />
            </View>
          </Swipeable>
        ))}
      </ScrollView>

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
