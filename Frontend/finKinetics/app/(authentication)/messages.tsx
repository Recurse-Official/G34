import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {StyleSheet, TextInput} from 'react-native';

export default function Messages(){
    return <SafeAreaView>
        <Text>Message Permissions Required</Text>
        <Button title="Click To give access to Messages"></Button>
    </SafeAreaView>
}