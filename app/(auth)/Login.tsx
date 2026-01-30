import BackBtn from '@/components/common/BackBtn';
import { useAuth } from '@/contexts/Auth';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = () => {
    const { signIn } = useAuth();

    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        phone: '',
        role: 'STAFF' //
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = async () => {
        console.log("🚀 Data prepared to send:", formData);
        setLoading(true);
        try {
            const res = await signIn(formData.email, formData.password)

            alert("Check console to see the prepared object!");
        } catch (error) {
            console.error("Registration failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <ImageBackground
                source={require("@/assets/images/login-bg.jpg")}
                style={{ flex: 1 }}
            >
                <BackBtn />

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
                >
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={styles.scrollContainer}>
                        <Text style={styles.title}>Login into your account</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={formData.email}
                            onChangeText={(val) => handleChange('email', val)}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry
                            value={formData.password}
                            onChangeText={(val) => handleChange('password', val)}
                        />

                        <TouchableOpacity style={styles.button} onPress={handleRegister}>
                            <Text style={styles.buttonText}>
                                {
                                    loading ?
                                        <ActivityIndicator color={'white'} /> :
                                        <>
                                            Login
                                        </>
                                }
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>
            </ImageBackground>

        </SafeAreaView>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        opacity: .8
    },
    scrollContainer: {
        padding: 20,
        justifyContent: 'center',
        flexGrow: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#d6cdcdff',
    },
    input: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#eee',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});