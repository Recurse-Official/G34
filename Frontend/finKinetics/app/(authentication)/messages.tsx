import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { requestReadSMSPermission, checkIfHasSMSPermission } from '../../scripts/readperm';
import SmsAndroid from 'react-native-get-sms-android';

interface SMSMessage {
    date: string; 
    body: string;
}

export default function Messages(){
    async function message_Read(){
        const got_access = await requestReadSMSPermission();
        if(got_access){
            var filter = {
                box: 'inbox', 
                minDate: 1554636310165,
                maxDate: 1556277910456,
                bodyRegex: ''
            }

            SmsAndroid.list(
                JSON.stringify(filter),
                (fail: string) => {
                  console.log('Failed with this error: ' + fail);
                },
                (count: any, smsList: string) => {
                    console.log('Count: ', count);
                    try {
                        const arr: SMSMessage[] = JSON.parse(smsList);

                        arr.forEach((object: SMSMessage) => {
                            console.log('Object: ', object);
                            console.log('-->' + object.date);
                            console.log('-->' + object.body);
                        });
                    } catch (error) {
                        console.error('Error parsing SMS list:', error);
                    }
                }
            );
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