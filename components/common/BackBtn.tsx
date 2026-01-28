import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const BackBtn = () => {
    const router = useRouter()
    return (
        <TouchableOpacity onPress={() => router.back()}
            style={{
                backgroundColor: 'white', marginTop: 20, 'width': 50, height: 50, borderRadius: 50,
                justifyContent: 'center', alignItems: 'center'
            }}
        >
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'black',
                }}
            >{'<'}</Text>
        </TouchableOpacity>
    )
}

export default BackBtn

const styles = StyleSheet.create({})