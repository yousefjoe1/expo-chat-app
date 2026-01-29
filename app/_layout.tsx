import 'react-native-reanimated';

import { AuthProvider } from '@/contexts/Auth';
import { Stack } from "expo-router";
import React from "react";

const StackLayout = () => {
  return <Stack screenOptions={{ headerShown: false }} />;
};

const RootLayout = () => {
  return (
    <AuthProvider>
      <StackLayout />
    </AuthProvider>
  );
};

export default RootLayout;
