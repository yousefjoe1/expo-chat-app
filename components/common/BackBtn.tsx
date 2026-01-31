import { useRouter } from 'expo-router'
import React from 'react'
import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'

const BackBtn = () => {
    const router = useRouter()
    return (
        <TouchableOpacity onPress={() => router.back()}
            style={{
                backgroundColor: 'white', 'width': 55, height: 55, borderRadius: 50,
                justifyContent: 'center', alignItems: 'center', overflow: 'hidden'
            }}
        >
            <ImageBackground
                source={require("@/assets/images/back-btn.jpg")}
                style={{
                    flex: 1, width: 55, height: 55, borderRadius: 50, justifyContent: 'center', alignItems: 'center'
                    , transform: [{ rotate: '90deg' }]
                }}
                resizeMode='stretch'
            >
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default BackBtn

const styles = StyleSheet.create({})