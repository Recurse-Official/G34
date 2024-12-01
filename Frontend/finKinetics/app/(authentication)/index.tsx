import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



interface SMSMessage {
    date: string; 
    body: string;
}

export default function Messages(){
    async function message_Read(){
        const got_access = await requestReadSMSPermission();
        if(got_access){
            return <View>Congrats! Permission Granted</View>
        }
        else{
            console.error('Messages not read');
        }
    }
    return <SafeAreaView>
        <Text>Message Permissions Required</Text>
        <Button title="Click To give access to Messages" onPress={message_Read}/>
    </SafeAreaView>
}