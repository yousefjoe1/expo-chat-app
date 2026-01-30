import { colors } from '@/constants/my-theme'
import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'

const Profile = () => {
    return (
        <ImageBackground
            source={require("@/assets/images/full-ninja.jpg")}
            style={{ flex: 1 }}
        >
            <View style={{ flex: 1, backgroundColor: colors.myBubble + '80' }}>
                <Text>Profile</Text>
            </View>
        </ImageBackground>
    )
}

export default Profile

const styles = StyleSheet.create({})