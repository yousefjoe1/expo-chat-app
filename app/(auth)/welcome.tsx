import ScreenWrapper from '@/components/common/ScreenWrapper'
import { colors } from '@/constants/my-theme'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const Welcome = () => {
    const router = useRouter()



    return (
        <ScreenWrapper showPattern bgOpacity={0.5} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>welcome</Text>

            <TouchableOpacity
                onPress={
                    () => router.push('/(auth)/Register')
                }
                style={{
                    padding: 10,
                    backgroundColor: colors.green,
                    borderRadius: 20,
                    marginTop: 20,
                    width: '50%',
                    alignItems: 'center'
                }}>
                <Text
                    style={{
                        color: colors.white,
                        fontSize: 16,
                        fontWeight: 'bold',

                    }}
                >Register</Text>
            </TouchableOpacity>
        </ScreenWrapper>
    )
}

export default Welcome

const styles = StyleSheet.create({})