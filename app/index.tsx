import ScreenWrapper from '@/components/common/ScreenWrapper';
import { colors } from '@/constants/my-theme';
import { StyleSheet } from 'react-native';
import Register from './(auth)/Register';

const FirstPage = () => {

    return (
        <ScreenWrapper showPattern bgOpacity={0.5}>
            <Register />
        </ScreenWrapper>
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
