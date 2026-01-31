// utils/imageService.ts

export const getAvatarPath = (file: any, isGroup = false) => {
    // إذا كان الملف عبارة عن رابط نصي مباشر
    if (file && typeof file == 'string') return file;

    // إذا كان الملف كائناً يحتوي على خاصية uri (مثل نتائج مكتبة picker)
    if (file && typeof file == 'object') return file.uri;

    // إذا كانت مجموعة ولم يتوفر لها ملف، أعد الصورة الافتراضية للمجموعات
    if (isGroup) return require('../assets/images/default-avatar.jpg');

    // الحالة الافتراضية للمستخدمين العاديين
    return require('../assets/images/default-avatar.jpg');
};