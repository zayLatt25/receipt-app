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

export default function App() {
  const { user, authLoading } = useAuth();
  const [items, setItems] = useState([{ name: "", pcs: "", price: "" }]);
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
    setIsTyping(true); // User is typing now
    const updatedItems = [...items];
    updatedItems[index][field] = value;
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
    const newItems = [...items, { name: "", pcs: "", price: "" }];
    setItems(newItems);
    setTimeout(() => {
      if (inputRefs.current[newItems.length - 1]) {
        inputRefs.current[newItems.length - 1].focus();
      }
    }, 100);
  };

  const handleDeleteItem = (index) => {
    if (items.length === 1) {
      setItems([{ name: "", pcs: "", price: "" }]);
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
    <SafeAreaView style={{ flex: 1, backgroundColor: navyBlue }}>
      <View style={{ paddingHorizontal: 16 }}>
        <Text style={styles.title}>Item List</Text>
        <Text style={styles.savingIndicator}>{savingText}</Text>
      </View>

      <ScrollView
        style={{ padding: 16, marginBottom: 70 }}
        keyboardShouldPersistTaps="handled"
      >
        {items.map((item, index) => (
          <View key={index} style={styles.itemCard}>
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
            <TouchableOpacity
              style={styles.deleteBtnCircle}
              onPress={() => handleDeleteItem(index)}
            >
              <MaterialIcons name="delete" size={20} color={lightCream} />
            </TouchableOpacity>
          </View>
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
