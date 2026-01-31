import { useAuth } from '@/contexts/Auth'
import React from 'react'
import { Alert, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'

const Logout = () => {
    const { signOut } = useAuth()
    const showLogoutAlert = () => {
        Alert.alert("Confirm", "Are you sure you want to logout?", [
            {
                text: "Cancel",
                onPress: () => console.log('cancel logout'),
                style: 'cancel'
            },
            {
                text: "Logout",
                onPress: () => signOut(),
                style: 'destructive'
            }
        ])
    };
    return (
        <TouchableOpacity
            style={{
                borderRadius: 50,
                overflow: 'hidden',
                width: 50,
                height: 50,
            }}
            onPress={showLogoutAlert}
        >
            {/* <Avatar uri={'../../../assets/images/exit.jpg'} size={50} isGroup={false} /> */
                <ImageBackground
                    source={require("@/assets/images/exit.jpg")}
                    style={{ flex: 1, width: 50, height: 50, borderRadius: 50 }}
                    resizeMethod='resize'
                    resizeMode='stretch'
                ></ImageBackground>}
        </TouchableOpacity>
    )
}

export default Logout

const styles = StyleSheet.create({})