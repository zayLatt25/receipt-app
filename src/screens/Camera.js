import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Animated,
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
import ReceiptConfirmationModal from "../components/ReceiptConfirmationModal";
import { AI_RECEIPT_CONFIG } from "../config/receipt-ai.js";
import { useAuth } from "../context/AuthContext";
import { predefinedCategories } from "../utils/constants";
import { colors } from "../styles/theme";

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

// const processReceipt = async () => {
//   return {
//     items: [
//       { name: "KINGS CARNIVAL 1.2L", pieces: 2, price: 4.59 },
//       { name: "KING CHOC M/CHIP I/C 1.2L", pieces: 2, price: 4.59 },
//       { name: "KNORR CUBES TYAM 60G", pieces: 2, price: 2.11 },
//       { name: "KNORR CUBES BEEF 60G", pieces: 2, price: 2.11 },
//       { name: "VEPO PURE D/WATER 1.5L", pieces: 2, price: 0.7 },
//       { name: "MYS FY XIAO BAI CHYE 200G", pieces: 2, price: 0.75 },
//       { name: "ENOKI MUSHROOM 200G", pieces: 2, price: 1.4 },
//       { name: "C82 COLOUR RICE 100G", pieces: 2, price: 1.4 },
//       { name: "CHKN BONELESS LEG(P) 200G", pieces: 2, price: 2.35 },
//       { name: "CHN H/POTATOES 1.2KG", pieces: 1, price: 4.7 },
//       { name: "CHN PD C/CABBAGE(KG)", pieces: 1, price: 2.09 },
//       { name: "SANREMO 3MIN QK MCRN 500G", pieces: 1, price: 2.25 },
//       { name: "THA PD GREEN MANGO", pieces: 3, price: 1.25 },
//       { name: "PREGI CARBONARA MR 295G", pieces: 1, price: 2.7 },
//       { name: "PREGI TRAD.300G", pieces: 1, price: 2.7 },
//     ],
//     purchaseDate: "2025-08-15",
//     suggestedCategory: "Grocery",
//   };
// };

export default function CameraScreen() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState("");
  const [loadingProgress, setLoadingProgress] = useState(0);
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
        setLoadingStage("Processing image...");
        setLoadingProgress(20);

        const manipulated = await ImageManipulator.manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 1080 } }],
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );

        if (!manipulated?.uri) throw new Error("Failed to process image");

        setLoadingStage("Preparing upload...");
        setLoadingProgress(40);

        const response = await fetch(manipulated.uri);
        const blob = await response.blob();
        const fileName = `receipts/${user?.uid || "guest"}_${Date.now()}.jpg`;
        const storageRef = ref(storage, fileName);

        try {
          setLoadingStage("Uploading to Firebase...");
          setLoadingProgress(60);
          
          await uploadBytes(storageRef, blob);
          
          setLoadingStage("Getting download URL...");
          setLoadingProgress(80);
          
          const downloadUrl = await getDownloadURL(storageRef);

          setLoadingStage("Processing receipt with AI...");
          setLoadingProgress(90);

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
      setLoadingStage("");
      setLoadingProgress(0);
    }
  };

  const attemptProcess = async (downloadUrl, storageRef) => {
    setLoadingStage("Analyzing receipt...");
    setLoadingProgress(95);

    const parsedReceipt = await processReceipt(downloadUrl);

    setLoading(false);
    setLoadingStage("");
    setLoadingProgress(0);

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
        <View style={styles.loadingContainer}>
          <View style={styles.loadingCard}>
            <View style={styles.loadingIconContainer}>
              <ActivityIndicator size="large" color={colors.navyBlue} />
            </View>
            <Text style={styles.loadingTitle}>Processing Receipt</Text>
            <Text style={styles.loadingStage}>{loadingStage}</Text>
            
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${loadingProgress}%` }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>{loadingProgress}%</Text>
            </View>
            
            <View style={styles.loadingSteps}>
              <View style={[styles.stepDot, loadingProgress >= 20 && styles.stepDotActive]}>
                <Text style={styles.stepDotText}>1</Text>
              </View>
              <View style={styles.stepLine} />
              <View style={[styles.stepDot, loadingProgress >= 60 && styles.stepDotActive]}>
                <Text style={styles.stepDotText}>2</Text>
              </View>
              <View style={styles.stepLine} />
              <View style={[styles.stepDot, loadingProgress >= 90 && styles.stepDotActive]}>
                <Text style={styles.stepDotText}>3</Text>
              </View>
            </View>
            
            <View style={styles.stepLabels}>
              <Text style={[styles.stepLabel, loadingProgress >= 20 && styles.stepLabelActive]}>
                Process
              </Text>
              <Text style={[styles.stepLabel, loadingProgress >= 60 && styles.stepLabelActive]}>
                Upload
              </Text>
              <Text style={[styles.stepLabel, loadingProgress >= 90 && styles.stepLabelActive]}>
                Analyze
              </Text>
            </View>
          </View>
        </View>
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
        <ReceiptConfirmationModal
          visible={modalVisible}
          onClose={handleCloseModal}
          receiptData={receiptData}
          user={user}
        />
      )}
    </View>
  );
}
