import Chats from '@/components/chats/Chats';
import { colors } from '@/constants/my-theme';
import { useAuth } from '@/contexts/Auth';
import { testSocket } from '@/socket/socketEvents';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {

    const { user } = useAuth()

    const route = useRouter()

    useEffect(() => {
        testSocket(testSocketCallbackHandler);
        testSocket('test socket hi');

        return () => {
            testSocket(testSocketCallbackHandler, true);
        };
    }, []);

    // تعريف الدالة التي تتعامل مع البيانات القادمة من السيرفر
    const testSocketCallbackHandler = (data: any) => {
        console.log('got response from testSocket event: ', data);
    };

    return (
        <ImageBackground
            source={require("@/assets/images/home.jpg")}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.myBubble + '80' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                        Welcome 👋 {user?.name}
                    </Text>

                    <TouchableOpacity onPress={() => route.push('/Profile')}
                        style={{ overflow: 'hidden', width: 50, height: 50, borderRadius: 50 }}
                    >
                        <ImageBackground
                            source={require("@/assets/images/Shuriken-profile-btn.jpg")}
                            style={{ width: 50, height: 50 }}
                            resizeMode='contain'
                        >
                        </ImageBackground>
                    </TouchableOpacity>

                </View>

                {/* chats */}
                <Chats />
            </SafeAreaView>
        </ImageBackground>

    )
}

export default Home

const styles = StyleSheet.create({})