import BackBtn from '@/components/common/BackBtn'
import Avatar from '@/components/common/userProfile/Avatar'
import { colors } from '@/constants/my-theme'
import { useAuth } from '@/contexts/Auth'
import React, { useEffect } from 'react'
import { ActivityIndicator, Alert, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'


import Logout from '@/components/common/userProfile/Logout'
import { updateProfileSocket } from '@/socket/socketEvents'
import AntDesign from '@expo/vector-icons/AntDesign'
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
const Profile = () => {
    const { user, updateToken } = useAuth()
    const [formData, setFormData] = React.useState({
        name: user?.name || '',
        avatar: user?.avatar || '',
    });
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();
    const [image, setImage] = React.useState<string | null>(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library.
        // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
        // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
        // so the app users aren't surprised by a system dialog after picking a video.
        // See "Invoke permissions for videos" sub section for more details.
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert('Permission required', 'Permission to access the media library is required.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            aspect: [4, 3],
            quality: 0.5,
        });

        console.log(result);

        if (!result.canceled) {
            setFormData({
                ...formData,
                avatar: result.assets[0].uri,
            });
        }
    };


    useEffect(() => {
        updateProfileSocket(processUpdateProfile);
        return () => {
            updateProfileSocket(processUpdateProfile, true);
        };
    }, []);

    const processUpdateProfile = (res: any) => {
        setLoading(false);

        if (res.success) {
            updateToken(res.token);
            router.back();
        } else {
            Alert.alert("User", res.msg);
        }
    };
    const handleUpdate = async () => {
        setLoading(true);
        try {
            updateProfileSocket(formData);
            alert("Profile Updated Successfully!");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <ImageBackground
            source={require("@/assets/images/full-ninja.jpg")}
            style={{ flex: 1 }}
        >
            <View style={{ flex: 1, backgroundColor: colors.myBubble + '60' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20, marginHorizontal: 10 }}>
                    <BackBtn />
                    <Logout />
                </View>
                <ScrollView>
                    <View style={{ position: 'relative' }}>
                        <Avatar uri={formData.avatar || ''} size={100} />
                        <TouchableOpacity
                            onPress={pickImage}
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                right: '50%',
                                backgroundColor: colors.neutral500,
                                borderRadius: 50,
                                padding: 5,
                            }}
                        >
                            <AntDesign name="edit" size={24} color="black" />
                            {/* {formData.avatar && <Image source={{ uri: formData.avatar }} style={{ width: 200, height: 200 }} />} */}
                        </TouchableOpacity>
                    </View>
                    {/* <Text
                        style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            backgroundColor: colors.neutral500,
                            textAlign: 'center',
                            padding: 10,
                            borderRadius: 10,
                            marginHorizontal: 20,
                        }}
                    >Profile</Text> */}

                    {/* form */}
                    <View style={formStyles.formContainer}>
                        <View style={formStyles.inputGroup}>
                            <Text style={formStyles.label}>Full Name</Text>
                            <TextInput
                                style={formStyles.input}
                                value={formData.name}
                                onChangeText={(val) => setFormData({ ...formData, name: val })}
                                placeholder="Enter your name"
                                placeholderTextColor="#999"
                            />
                        </View>


                        <View style={formStyles.inputGroup}>
                            <Text style={formStyles.label}>Email Address</Text>
                            <TextInput
                                style={[formStyles.input, { opacity: 0.6 }]} // الإيميل غالباً لا يُعدل بسهولة
                                value={user?.email}
                                editable={false}
                                selectTextOnFocus={false}
                            />
                        </View>

                        <TouchableOpacity
                            style={formStyles.saveButton}
                            onPress={handleUpdate}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text style={formStyles.saveButtonText}>Save Changes</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    )
}

export default Profile

const formStyles = StyleSheet.create({
    formContainer: {
        marginTop: 30,
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        color: '#fff',
        fontSize: 14,
        marginBottom: 8,
        fontWeight: '600',
        marginLeft: 4,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 15,
        borderRadius: 12,
        fontSize: 16,
        color: '#333',
        borderWidth: 1,
        borderColor: colors.neutral200,
    },
    saveButton: {
        backgroundColor: colors.primary || '#007AFF', // استخدم اللون الـ Teal اللي اخترناه
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});