import { colors } from "@/constants/my-theme";
import { AvatarProps } from "@/types";
import { getAvatarPath } from "@/utils/imageServices";
import { verticalScale } from "@/utils/styling";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";

const Avatar = ({ uri, size = 40, style, isGroup = false }: AvatarProps) => {
    return (
        <View
            style={[
                styles.avatar,
                { height: verticalScale(size), width: verticalScale(size) },
                style,
            ]}
        >
            <Image
                style={{ flex: 1 }}
                source={getAvatarPath(uri, isGroup)}
                contentFit="cover"
                transition={100}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    avatar: {
        alignSelf: "center",
        backgroundColor: colors.neutral200,
        height: verticalScale(47),
        width: verticalScale(47),
        borderRadius: 50,
        borderWidth: 1,
        borderColor: colors.neutral100,
        overflow: "hidden",
    },
});

export default Avatar;