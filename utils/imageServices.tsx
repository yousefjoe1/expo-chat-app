// utils/imageService.ts

import { API_URL_MEDIA } from "@/constants";
// utils/imageService.ts
import axios from 'axios';

const cloudnary = `https://api.cloudinary.com/v1_1/${API_URL_MEDIA}/image/upload`


// دالة رفع الملفات إلى Cloudinary
export const uploadFileToCloudinary = async (
    file: { uri?: string } | string,
    folderName: string
): Promise<any> => {
    try {
        if (!file) return { success: true, data: null };
        if (typeof file == "string") return { success: true, data: file };

        if (file && file.uri) {
            const formData = new FormData();
            formData.append("file", {
                uri: file.uri,
                type: "image/jpeg",
                name: file.uri.split("/").pop() || "file.jpg",
            } as any);

            formData.append("upload_preset", "CLOUDINARY_UPLOAD_PRESET");
            formData.append("folder", folderName);

            const response = await axios.post(cloudnary, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            return { success: true, data: response.data.secure_url };
        }
    } catch (error) {
        console.error("Upload error:", error);
        return { success: false, data: null };
    }
};

export const getAvatarPath = (file: any, isGroup = false) => {
    if (file && typeof file == 'string') return file;

    if (file && typeof file == 'object') return file.uri;

    if (isGroup) return require('../assets/images/default-avatar.jpg');

    return require('../assets/images/default-avatar.jpg');
};