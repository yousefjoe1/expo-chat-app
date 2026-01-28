import { colors } from "@/constants/my-theme";
import { ScreenWrapperProps } from "@/types";
import React from "react";
import {
    Dimensions,
    ImageBackground,
    Platform,
    StatusBar,
    View,
} from "react-native";

const { height } = Dimensions.get("window");

const ScreenWrapper = ({
    style,
    children,
    showPattern = false,
    isModal = false,
    bgOpacity = 1,
}: ScreenWrapperProps) => {
    let paddingTop = Platform.OS === "ios" ? height * 0.06 : 40;
    let paddingBottom = 0;

    if (isModal) {
        paddingTop = Platform.OS === "ios" ? height * 0.02 : 45;
        paddingBottom = height * 0.02;
    }

    return (
        <ImageBackground
            source={require("@/assets/images/pattern.jpg")}
            imageStyle={{ opacity: showPattern ? bgOpacity : 0 }}
            style={{ flex: 1, backgroundColor: isModal ? colors.white : colors.neutral350 }}
        >

            <View style={[{ flex: 1, paddingTop, paddingBottom }, style]}>
                <StatusBar barStyle="dark-content" backgroundColor={'transparent'} />
                {/* The screenshot cuts off at the return statement, 
            but usually follows with an ImageBackground if showPattern is true 
        */}
                {children}
            </View>
        </ImageBackground>
    );
};

export default ScreenWrapper;