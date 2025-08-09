// utils/sizes.js
import { Dimensions, PixelRatio } from "react-native";

// Get device screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Base guideline sizes for scaling (based on iPhone 6/7/8 dimensions)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

/**
 * Scales a size horizontally based on device screen width compared to base width.
 * Use this for width, horizontal padding/margin, or horizontal elements.
 * @param {number} size
 * @returns {number}
 */
export const scale = (size) => (SCREEN_WIDTH / guidelineBaseWidth) * size;

/**
 * Scales a size vertically based on device screen height compared to base height.
 * Use this for height, vertical padding/margin, or vertical elements.
 * @param {number} size
 * @returns {number}
 */
export const verticalScale = (size) =>
  (SCREEN_HEIGHT / guidelineBaseHeight) * size;

/**
 * Scales a size moderately, allowing to control the scaling factor.
 * This smooths out scaling differences to avoid overly large or small elements.
 * Factor defaults to 0.5 for moderate scaling between original and scaled size.
 * @param {number} size
 * @param {number} factor
 * @returns {number}
 */
export const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

/**
 * Normalizes font size to account for device font settings and pixel density.
 * Helps keep fonts readable and consistent across devices with different pixel densities.
 * @param {number} size
 * @returns {number}
 */
export const normalizeFont = (size) => {
  const newSize = size * PixelRatio.getFontScale();
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
