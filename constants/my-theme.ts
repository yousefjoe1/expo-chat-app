import { scale, verticalScale } from "@/utils/styling";


export const colors = {
  // Primary: A vibrant, modern Blue/Indigo
  primary: "#3b82f6",       // Bright Blue (Blue 500)
  primaryLight: "#dbeafe",  // Soft sky tint (Blue 100)
  primaryDark: "#1d4ed8",   // Deep professional blue (Blue 700)

  // Interface & Text
  text: "#0f172a",          // Near-black slate for readability
  white: "#ffffff",
  black: "#000000",
  rose: "#f43f5e",          // Modern rose-red for errors
  green: "#10b981",         // Emerald green for success

  // Chat Bubbles (Optimized for Blue theme)
  otherBubble: "#f1f5f9",   // Very light cool gray (Slate 100)
  myBubble: "#eff6ff",      // Very light blue tint (Blue 50)

  // Neutrals: Shifted from "Stone" to "Slate" (Cool Grays)
  neutral50: "#f8fafc",
  neutral100: "#f1f5f9",
  neutral200: "#e2e8f0",
  neutral300: "#cbd5e1",
  neutral350: "#b9c4d4",    // Custom mid-cool gray
  neutral400: "#94a3b8",
  neutral500: "#64748b",
  neutral600: "#475569",
  neutral700: "#334155",
  neutral800: "#1e293b",
  neutral900: "#0f172a",
};

export const spacingX = {
  _3: scale(3),
  _5: scale(5),
  _7: scale(7),
  _10: scale(10),
  _12: scale(12),
  _15: scale(15),
  _20: scale(20),
  _25: scale(25),
  _30: scale(30),
  _35: scale(35),
  _40: scale(40),
};

export const spacingY = {
  _5: verticalScale(5),
  _7: verticalScale(7),
  _10: verticalScale(10),
  _12: verticalScale(12),
  _15: verticalScale(15),
  _17: verticalScale(17),
  _20: verticalScale(20),
  _25: verticalScale(25),
  _30: verticalScale(30),
  _35: verticalScale(35),
  _40: verticalScale(40),
  _50: verticalScale(50),
  _60: verticalScale(60),
};

export const radius = {
  _3: verticalScale(3),
  _6: verticalScale(6),
  _10: verticalScale(10),
  _12: verticalScale(12),
  _15: verticalScale(15),
  _17: verticalScale(17),
  _20: verticalScale(20),
  _30: verticalScale(30),
  _40: verticalScale(40),
  _50: verticalScale(50),
  _60: verticalScale(60),
  _70: verticalScale(70),
  _80: verticalScale(80),
  _90: verticalScale(90),
  full: 200,
};
