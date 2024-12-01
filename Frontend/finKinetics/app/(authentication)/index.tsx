import { Alert, Button, Linking, Platform, Text } from "react-native";
import { SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import * as Device from 'expo-device';
import * as Application from 'expo-application';

// Define the type for the URL event
type URLEvent = {
  url: string;
};

export default function SignIn() {
  const [key, setKey] = useState<string | null>(null);
  const router = useRouter();
  const server_url = "https://153a-183-82-112-229.ngrok-free.app";

  const getDeviceId = async () => {
    let deviceId: string;
    if (Platform.OS === 'ios') {
      deviceId = await Application.getIosIdForVendorAsync() || '';
    } else {
      deviceId = Application.applicationId || '';
    }
    return deviceId || Device.modelId || Date.now().toString();
  };

  // Handle deep link callback with proper typing
  const handleDeepLink = ({ url }: URLEvent) => {
    console.log("Received callback URL:", url);
    try {
      const urlObj = new URL(url);
      const token = urlObj.searchParams.get('token');
      if (token) {
        setKey(token);
      }
    } catch (error) {
      console.error("Error parsing callback URL:", error);
    }
  };

  useEffect(() => {
    // Handle incoming links while app is running
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Handle initial URL that opened the app
    Linking.getInitialURL().then(url => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  async function handleSignUp() {
    try {
      const deviceId = await getDeviceId();
      const deviceName = Device.deviceName || Device.modelName || 'Unknown Device';
      
      const oauth_url = `${server_url}?` + 
        `device_id=${encodeURIComponent(deviceId)}&` +
        `device_name=${encodeURIComponent(deviceName)}`;
      
      console.log("Opening URL:", oauth_url);
      
      const canOpen = await Linking.canOpenURL(oauth_url);
      if (!canOpen) {
        throw new Error('Cannot open URL');
      }
      
      await Linking.openURL(oauth_url);
    } catch (error) {
      console.error("Error during sign-in:", error);
      Alert.alert(
        "Sign In Error",
        "Unable to open sign in page. Please try again."
      );
    }
  }

  useEffect(() => {
    if (key) {
      router.push("/messages");
    }
  }, [key, router]);

  return (
    <SafeAreaView>
      <Text>Welcome To FinKinetic</Text>
      <Text>Track Your Expenses With Us</Text>
      <Button 
        title="Click To Sign Up or Sign In" 
        onPress={handleSignUp}
      />
    </SafeAreaView>
  );
}