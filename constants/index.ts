import { Platform } from "react-native";

export const API_URL =
    Platform.OS === "android" ? "http://192.168.0.101:6000/api" : "http://localhost:6000/api";