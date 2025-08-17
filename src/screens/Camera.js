import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import styles from "../styles/CameraStyles";
import ReceiptConfirmationScreen from "../components/ReceiptConfirmationScreen";
import { AI_RECEIPT_CONFIG } from "../config/receipt-ai.js";
import { useAuth } from "../context/AuthContext";

// Send image URL to OpenAI
const processReceipt = async (imageUrl) => {
  try {
    const response = await fetch(`${AI_RECEIPT_CONFIG.apiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AI_RECEIPT_CONFIG.apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a receipt parser. Always return valid JSON only in the format the app expects.",
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Extract the following from this receipt: 
                  1. Purchase date as 'purchaseDate' (YYYY-MM-DD format)
                  2. Suggested category as 'suggestedCategory'
                  3. Items array with 'name', 'pieces', 'unitPrice'
                  4. Total amount as 'totalAmount'
                  Return strictly JSON in this format.`,
              },
              { type: "image_url", image_url: { url: imageUrl } },
            ],
          },
        ],
        max_tokens: 600,
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errText}`);
    }

    const data = await response.json();
    console.log("OpenAI raw response:", data.choices[0].message.content);

    const rawContent = data.choices[0].message.content.trim();
    const cleanedContent = rawContent
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```$/i, "")
      .trim();

    const parsed = JSON.parse(cleanedContent);
    return parsed;
  } catch (error) {
    console.error("Error processing receipt:", error);
    throw error;
  }
};

export default function CameraScreen() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const storage = getStorage();

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Camera permission is needed.");
      return false;
    }
    return true;
  };

  const handleImage = async (fromCamera = true) => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = fromCamera
        ? await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.8,
          })
        : await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 0.8,
          });

      if (!result.canceled && result.assets[0]) {
        setLoading(true);

        // 1️⃣ Resize/compress image
        const manipulated = await ImageManipulator.manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 1080 } }],
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );

        if (!manipulated.uri) {
          throw new Error("Failed to manipulate image");
        }

        // 2️⃣ Upload to Firebase Storage
        const response = await fetch(manipulated.uri);
        const blob = await response.blob();
        const fileName = `receipts/${user.uid}_${Date.now()}.jpg`;
        const storageRef = ref(storage, fileName);

        try {
          await uploadBytes(storageRef, blob);
          const downloadUrl = await getDownloadURL(storageRef);
          console.log("Uploaded image URL:", downloadUrl);

          // 3️⃣ Process receipt using OpenAI
          const parsedReceipt = await processReceipt(downloadUrl);
          setReceiptData(parsedReceipt);
          setModalVisible(true);
        } catch (uploadError) {
          console.error("Firebase Storage upload failed:", uploadError);
          Alert.alert(
            "Upload Error",
            `Failed to upload image to storage: ${uploadError.message}`
          );
        }
      }
    } catch (error) {
      console.error("Error handling image:", error);
      Alert.alert("Error", "Failed to process receipt. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setReceiptData(null);
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
        Receipt Scanner
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#2563eb" />
      ) : (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleImage(true)}
          >
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleImage(false)}
          >
            <Text style={styles.buttonText}>Pick from Gallery</Text>
          </TouchableOpacity>
        </>
      )}

      {receiptData && (
        <ReceiptConfirmationScreen
          visible={modalVisible}
          onClose={handleCloseModal}
          receiptData={receiptData}
          user={user}
        />
      )}
    </View>
  );
}
