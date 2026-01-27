import { colors } from '@/constants/my-theme';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Animated, StatusBar, StyleSheet, View } from 'react-native';

const FirstPage = () => {
    const router = useRouter()
    // use effect to go to welcome page
    useEffect(() => {
        setTimeout(() => {
            router.replace('/(auth)/welcome');
        }, 1000);
    }, []);


    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={'light-content'}
                backgroundColor={colors.neutral400}
            />
            <Animated.Image
                source={require('@/assets/images/welcome.jpg')}
                style={styles.logo}
                resizeMode={'contain'}
            />
        </View>
    )
}

export default FirstPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.neutral500
    },
    logo: {
        width: '100%',
        height: '100%',
    },
});
