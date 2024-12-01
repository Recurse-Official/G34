import { Alert, Button, Linking, Platform, Text, StyleSheet, ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import * as Device from "expo-device";
import * as Application from "expo-application";

// Define the type for the URL event
type URLEvent = {
  url: 'https://153a-183-82-112-229.ngrok-free.app';
};

export default function SignIn() {
  const [key, setKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const server_url = "https://153a-183-82-112-229.ngrok-free.app";

  const getDeviceId = async () => {
    let deviceId: string;
    if (Platform.OS === "ios") {
      deviceId = (await Application.getIosIdForVendorAsync()) || "";
    } else {
      deviceId = Application.applicationId || "";
    }
    return deviceId || Device.modelId || Date.now().toString();
  };

  const handleDeepLink = ({ url }: URLEvent) => {
    console.log("Received callback URL:", url);
    try {
      const urlObj = new URL(url);
      const token = urlObj.searchParams.get("token");
      if (token) {
        setKey(token);
      }
    } catch (error) {
      console.error("Error parsing callback URL:", error);
    }
  };

  useEffect(() => {
    const subscription = Linking.addEventListener("url", handleDeepLink);

    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  async function handleSignUp() {
    setLoading(true); // Show loading indicator
    try {
      const deviceId = await getDeviceId();
      const deviceName = Device.deviceName || Device.modelName || "Unknown Device";

      const oauth_url =
        `${server_url}?` +
        `device_id=${encodeURIComponent(deviceId)}&` +
        `device_name=${encodeURIComponent(deviceName)}`;

      console.log("Opening URL:", oauth_url);

      const canOpen = await Linking.canOpenURL(oauth_url);
      if (!canOpen) {
        throw new Error("Cannot open URL");
      }

      await Linking.openURL(oauth_url);
    } catch (error) {
      console.error("Error during sign-in:", error);
      Alert.alert(
        "Sign In Error",
        "Unable to open sign-in page. Please try again."
      );
    } finally {
      setLoading(false); // Hide loading indicator
    }
  }

  useEffect(() => {
    if (key) {
      router.push("/messages");
    }
  }, [key, router]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome To FinKinetic</Text>
      <Text style={styles.subtitle}>Track Your Expenses With Us</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" style={styles.loading} />
      ) : (
        <Button title="Sign Up or Sign In" onPress={handleSignUp} color="#007BFF" />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 32,
    textAlign: "center",
  },
  loading: {
    marginTop: 20,
  },
});
