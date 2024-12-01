import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { requestReadSMSPermission, checkIfHasSMSPermission } from '../../scripts/readperm';
import { StyleSheet } from "react-native";


interface SMSMessage {
    date: string; 
    body: string;
}

export default function Messages(){
    async function message_Read(){
        const got_access = await requestReadSMSPermission();
        if(got_access){
            return <View>Congrats!!</View>
        }
        else{
            console.error('Messages not read');
        }
    }
    return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Message Permissions Required</Text>
          <View style={styles.button}>
            <Button
              title="Click To give access to Messages"
              color="transparent"
              onPress={message_Read}
            />
          </View>
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
      backgroundColor: "#f0f8ff", // Light blue background
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      color: "#333", // Dark gray
      marginBottom: 20,
      textAlign: "center",
    },
    button: {
      padding: 12,
      backgroundColor: "#007BFF", // Blue button
      borderRadius: 8,
      marginTop: 10,
    },
    buttonText: {
      color: "#fff", // White text
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 16,
    },
});
  