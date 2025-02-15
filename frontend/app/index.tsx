import React, { useState } from "react";
import { Text, View, Button, Alert, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  const [loading, setLoading] = useState(false);

  const handleButtonClick = async () => {
    console.log("button clicked");
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8081/", {
        method: "GET",
      });
      const data = await response.text(); // Change to response.text() to handle plain text response
      console.log(data);
      Alert.alert("Success", data);
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button
        title={loading ? "Loading..." : "Connect to Backend"}
        onPress={handleButtonClick}
        disabled={loading}
      />
      <Link href="/about" style={styles.button}>
        Go to About screen
      </Link>
      <Link href="/onboarding" style={styles.button}>
        Onboarding
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
});
