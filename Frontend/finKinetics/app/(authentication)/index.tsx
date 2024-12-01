import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";

export default function SignIn() {
  const [key, setKey] = useState(null);
  const server_url = "http://192.168.184.154:3000/callback";
  const router = useRouter();

  async function handleSignUp() {
    try {
      const res = await axios.get(server_url);

      if (res.data && res.data.token) {
        await SecureStore.setItemAsync("user_id", res.data.token);
        setKey(res.data.token);
      } else {
        console.error("No token in server response:", res.data);
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      alert("Sign-in failed. Please try again.");
    }
  }

  useEffect(() => {
    if (key) {
      router.push("/messages");
    }
  }, [key]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome To FinKinetic</Text>
      <Text style={styles.subtitle}>Track Your Expenses With Us</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>
          Click To Sign Up or Sign In With Google
        </Text>
      </TouchableOpacity>
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
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 32,
    textAlign: "center",
  },
  button: {
    padding: 10,
    backgroundColor: "#424949",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
