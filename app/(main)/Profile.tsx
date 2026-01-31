import BackBtn from '@/components/common/BackBtn'
import Avatar from '@/components/common/userProfile/Avatar'
import { colors } from '@/constants/my-theme'
import { useAuth } from '@/contexts/Auth'
import React, { useEffect } from 'react'
import { ActivityIndicator, Alert, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'


import Logout from '@/components/common/userProfile/Logout'
import { updateProfileSocket } from '@/socket/socketEvents'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useRouter } from 'expo-router'

const Profile = () => {
    const { user, updateToken } = useAuth()
    const [formData, setFormData] = React.useState({
        name: user?.name || '',
    });
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();
    useEffect(() => {
        updateProfileSocket(processUpdateProfile);
        return () => {
            updateProfileSocket(processUpdateProfile, true);
        };
    }, []);

    const processUpdateProfile = (res: any) => {
        console.log("got res: ", res);
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
                        <Avatar uri={user?.avatar || ''} size={100} isGroup={false} />
                        <TouchableOpacity
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