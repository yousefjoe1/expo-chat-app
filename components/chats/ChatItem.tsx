import { colors } from '@/constants/my-theme'
import { getLastMessageDate } from '@/utils'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Avatar from '../common/userProfile/Avatar'

const ChatItem = () => {
    return (
        <TouchableOpacity style={styles.chatItem}>
            <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <Avatar uri={''} />
                    <View>
                        <Text>person name</Text>
                        <Text>last message</Text>
                    </View>
                </View>
                <Text>
                    {getLastMessageDate({
                        createdAt: new Date().toISOString()
                    })}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default ChatItem

const styles = StyleSheet.create({
    chatItem: {
        backgroundColor: colors.myBubble,
        padding: 10,
        borderRadius: 10,
        margin: 5,
    }
})