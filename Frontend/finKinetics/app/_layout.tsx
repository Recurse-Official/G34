import { Slot } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function root_Lay() {
    return (
        <SafeAreaView style={container}>
            <Slot />
        </SafeAreaView>
    );
}

const page = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#36454F', 
    },
});

const container = page.container; 
