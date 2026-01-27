import ScreenWrapper from '@/components/common/ScreenWrapper'
import React from 'react'
import { StyleSheet, Text } from 'react-native'

const welcome = () => {
    return (
        <ScreenWrapper showPattern bgOpacity={0.5}>
            <Text>welcome</Text>
        </ScreenWrapper>
    )
}

export default welcome

const styles = StyleSheet.create({})