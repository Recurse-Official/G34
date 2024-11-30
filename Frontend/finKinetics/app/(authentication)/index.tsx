import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from 'axios';
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { Redirect } from "expo-router";

export default async function SignIn(){
    const [key, setKey] = useState();
    const server_url = 'http://localhost:3000/callback'; 
    async function handleSignUp() {
        try {
            const res = await axios.get(server_url);

            if (res.data && res.data.token) {
                // Save token in SecureStore
                await SecureStore.setItemAsync('user_id', res.data.token);
                setKey(res.data.token); // Trigger redirection
            } else {
                console.error("No token in server response:", res.data);
            }
        } catch (error) {
            console.error("Error during sign-in:", error);
        }
    }

    // If key is available, redirect to account
    if (key) {
        return <Redirect href={"/messages"} />;
    }

    return (
        <SafeAreaView>
            <Text>Welcome To FinKinetic</Text>
            <Text>Track Your Expenses With Us</Text>

            <Button title="Click To Sign Up or Sign In With Google" onPress={handleSignUp} />
        </SafeAreaView>
    );
}