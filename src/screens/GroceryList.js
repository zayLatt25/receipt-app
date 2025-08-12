import React, { useState, useRef, useMemo, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { styles, lightCream, darkPink } from "../styles/styles";
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

  const formatCurrency = (num) => "$" + num.toFixed(2);

  // Load grocery list from Firestore when user is ready
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

  // Save grocery list to Firestore whenever items change and user is available
  useEffect(() => {
    if (!user || !isDataLoaded) return;

    const saveData = async () => {
      try {
        const docRef = doc(db, "users", user.uid, "groceryLists", "myList");
        await setDoc(docRef, { items });
      } catch (error) {
        console.error("Error saving data:", error);
      }
    };
    saveData();
  }, [items, user, isDataLoaded]);

  const handleChange = (index, field, value) => {
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

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Item List</Text>

      {items.map((item, index) => (
        <View key={index} style={styles.itemRow}>
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
              { flex: 1, marginHorizontal: 5, textAlign: "center" },
            ]}
            placeholder="Pcs"
            placeholderTextColor={lightCream}
            keyboardType="numeric"
            value={item.pcs}
            returnKeyType="done"
            onChangeText={(text) => handleChange(index, "pcs", text)}
            onSubmitEditing={() => {
              if (item.name.trim() !== "") handleAddItem();
            }}
          />
          <TextInput
            style={[
              styles.groceryListInput,
              { flex: 1, marginRight: 5, textAlign: "center" },
            ]}
            placeholder="Price"
            placeholderTextColor={lightCream}
            keyboardType="numeric"
            value={item.price}
            returnKeyType="done"
            onChangeText={(text) => handleChange(index, "price", text)}
            onSubmitEditing={() => {
              if (item.name.trim() !== "") handleAddItem();
            }}
          />
          <TouchableOpacity
            style={styles.deleteBtnNoBg}
            onPress={() => handleDeleteItem(index)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <MaterialIcons name="delete" size={24} color={darkPink} />
          </TouchableOpacity>
        </View>
      ))}

      <View style={styles.footerRow}>
        <Text style={styles.totalText}>
          Total: {formatCurrency(totalPrice)}
        </Text>
        <Button title="+ Add Item" onPress={handleAddItem} color={darkPink} />
      </View>
    </ScrollView>
  );
}
