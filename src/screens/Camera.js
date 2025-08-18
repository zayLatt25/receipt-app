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
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import styles from "../styles/CameraStyles";
import ReceiptConfirmationScreen from "../components/ReceiptConfirmationScreen";
import { AI_RECEIPT_CONFIG } from "../config/receipt-ai.js";
import { useAuth } from "../context/AuthContext";
import { predefinedCategories } from "../utils/constants";

const prompt = {
  type: "text",
  text: `Extract the following from this receipt: 
        1. Purchase date as 'purchaseDate' (YYYY-MM-DD format)
        2. Suggested category as 'suggestedCategory' from 
        ${predefinedCategories.join(", ")}
        3. Items array with 'name', 'pieces', 'price'
        Note: 'name' should be the item name, 'pieces' is the quantity, and 'price' is the cost per piece.
        Return strictly JSON in this format with no other text or quotations. 
        If any field is not available, return an empty string or 0 for numbers.
        Example:
        {
          "purchaseDate": "2023-10-01",
          "suggestedCategory": "Grocery",
          "items": [
            { "name": "Apple", "pieces": 2, "price": 1 },
            { "name": "Banana", "pieces": 3, "price": 2 }
          ]
        }
        If the image is not a receipt, return an error JSON object: {"errorTitle":"Not a receipt","error": "Please upload a valid receipt image!"}
        If the receipt is unreadable, return an error JSON object: {"errorTitle":"Receipt Unreadable","error": "Please take a clearer photo and try again!"}`,
};

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
              "You are a receipt parser. Always return valid JSON only in the expected format.",
          },
          {
            role: "user",
            content: [
              prompt,
              { type: "image_url", image_url: { url: imageUrl } },
            ],
          },
        ],
        max_tokens: 600,
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      return {
        errorTitle: `HTTP ${response.status}`,
        error: "Server error, please try again later",
      };
    }

    const data = await response.json();
    const receiptData = data?.choices?.[0]?.message?.content?.trim() || "";

    if (!receiptData) {
      return { errorTitle: "Error Occurred", error: "Please try again!" };
    }

    let parsed;
    try {
      parsed = JSON.parse(receiptData);
    } catch {
      return {
        errorTitle: "Server Side Error",
        error: "Invalid JSON response from server, please try again!",
      };
    }

    return parsed;
  } catch (error) {
    return {
      errorTitle: "Error",
      error: "Receipt unreadable, please try again!",
    };
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

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setLoading(true);

        const manipulated = await ImageManipulator.manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 1080 } }],
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );

        if (!manipulated?.uri) throw new Error("Failed to process image");

        const response = await fetch(manipulated.uri);
        const blob = await response.blob();
        const fileName = `receipts/${user?.uid || "guest"}_${Date.now()}.jpg`;
        const storageRef = ref(storage, fileName);

        try {
          await uploadBytes(storageRef, blob);
          const downloadUrl = await getDownloadURL(storageRef);

          await attemptProcess(downloadUrl, storageRef);
        } catch (uploadError) {
          console.error("Firebase Storage upload failed:", uploadError);
          Alert.alert(
            "Upload Error",
            `Failed to upload: ${uploadError.message}`
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

  const attemptProcess = async (downloadUrl, storageRef) => {
    setLoading(true);

    const parsedReceipt = await processReceipt(downloadUrl);

    setLoading(false);

    if (parsedReceipt.error || parsedReceipt.errorTitle) {
      Alert.alert(
        parsedReceipt.errorTitle,
        parsedReceipt.error,
        [
          {
            text: "Retry",
            onPress: () => attemptProcess(downloadUrl, storageRef),
          },
          {
            text: "Cancel",
            style: "cancel",
            onPress: async () => {
              try {
                await deleteObject(storageRef);
              } catch (err) {
                console.error("Failed to delete after cancel:", err);
              }
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      setReceiptData(parsedReceipt);
      setModalVisible(true);

      // delete after success
      try {
        await deleteObject(storageRef);
      } catch (err) {
        console.error("Failed to delete after success:", err);
      }
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setReceiptData(null);
  };

  return (
    <View style={styles.container}>
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

          <Text style={styles.disclaimer}>
            Note: Receipt images are uploaded temporarily and deleted
            automatically after processing. In case of errors, it will be
            manually deleted after a day.
          </Text>
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
