import { useState } from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native";
import {StyleSheet, TextInput} from 'react-native';

export default function SignUp(){
    const [text, onChangeText] = useState('Useless Text');

    return <SafeAreaView>
        <Text>Welcome To FinKinetic</Text>
        <Text>Track Your Expenses With Us</Text>
        <Button title = "Click To Sign In With Google"></Button>
    </SafeAreaView>
}