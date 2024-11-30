import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { authorize, refresh } from 'react-native-app-auth';
import { useState } from "react";

export default async function SignIn(){
    const [authInfo, setAuthInfo] = useState(null);

    // Google OAuth Configuration
    const config = {
        issuer: 'https://accounts.google.com',
        clientId: ' 1083679631491-o32lo3nn9se1lnu0cvp2mcjis61bdda9.apps.googleusercontent.com', 
        redirectUrl: 'https://localhost:8081/auth/callback', 
        scopes: ['openid', 'email', 'profile', 'https://www.googleapis.com/auth/drive'],
    };

    async function handleSignUp() {
        try {
            const result = await authorize(config);

            const refreshedState = await refresh(config, {
                refreshToken: result.refreshToken,
            });

        } catch (error) {
            console.error("Authorization Error:", error);
        }
    }

    return (
        <SafeAreaView>
            <Text>Welcome To FinKinetic</Text>
            <Text>Track Your Expenses With Us</Text>
            
            <Button title="Click To Sign Up With Google" onPress={handleSignUp} />

        </SafeAreaView>
    )
}