import { useAuth } from '@/contexts/Auth';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';

const Register = () => {

    const { signUp } = useAuth();

    const router = useRouter()

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: 'mm',
        email: 'mm@gmail.com',
        password: '123',
    });

    const handleChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = async () => {
        console.log("🚀 Data prepared to send:", formData);
        setLoading(true);
        try {
            const res = await signUp(formData.email, formData.password, formData.name)
            console.log("🚀 ~ handleRegister ~ res:", res)
            // alert("Check console to see the prepared object!");
        } catch (error) {
            console.error("Registration failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Create Account</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={formData.name}
                    onChangeText={(val) => handleChange('name', val)}
                />

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

                <TouchableOpacity disabled={loading} style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>
                        {
                            loading ?
                                <ActivityIndicator color={'white'} /> :
                                <>
                                    Register
                                </>
                        }
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={
                    () => {
                        router.push('/(auth)/Login')
                    }
                }>
                    <Text style={styles.buttonText}>Have an accout ? Login</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Register;

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
        color: '#333',
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