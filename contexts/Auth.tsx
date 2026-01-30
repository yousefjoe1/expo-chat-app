import { AuthContextProps, DecodedTokenProps, UserProps } from "@/types";
import { useRouter } from "expo-router";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { login, register } from "@/services/auth";
import { connectSocket } from "@/socket/socket";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext<AuthContextProps>({
    token: null,
    user: null,
    signIn: async () => { },
    signUp: async () => { },
    signOut: async () => { },
    updateToken: async () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProps | null>(null);
    const router = useRouter();

    const loadToken = async () => {
        const storedToken = await AsyncStorage.getItem("token");

        if (storedToken) {
            try {
                const decoded = jwtDecode<DecodedTokenProps>(storedToken);
                if (decoded.exp && decoded.exp < Date.now() / 1000) {
                    // token has expired, navigate to welcome page
                    await AsyncStorage.removeItem('token');
                    gotoWelcomePage();
                    return;
                }
                setToken(storedToken);
                setUser(decoded.user);
                await connectSocket();

                gotoHomePage();
                // 
            } catch (error) {
                gotoWelcomePage();
                console.log('failed to decode token: ', error);
            }
        }
    }
        ;

    const gotoHomePage = () => {
        router.push("/(main)/Home");
    };

    const gotoWelcomePage = () => {
        router.push("/(auth)/welcome");
    };

    useEffect(() => {

        loadToken();
    }, []);


    const updateToken = async (token: string) => {
        if (token) {
            setToken(token);
            await AsyncStorage.setItem("token", token);
            // decode token (user)
            const decoded = jwtDecode<DecodedTokenProps>(token);
            console.log("decoded token: ", decoded);
            setUser(decoded.user);
        }
    };

    const signIn = async (email: string, password: string) => {
        const response = await login(email, password);
        await updateToken(response.token);
        await connectSocket();
        router.replace("/(main)/Home");
    };
    const signUp = async (
        email: string,
        password: string,
        name: string,
        avatar?: string | null
    ) => {
        const response = await register(email, password, name, avatar);
        await updateToken(response.token);
        await connectSocket();
        router.replace("/(main)/Home");
    };

    const signOut = async () => {
        setToken(null);
        setUser(null);
        await AsyncStorage.removeItem("token");
        router.replace("/(auth)/welcome");
    };

    return (
        <AuthContext.Provider value={{ token, user, signIn, signUp, signOut, updateToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext)