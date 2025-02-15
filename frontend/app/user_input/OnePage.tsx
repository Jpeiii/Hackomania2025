import React from "react";
import { Alert, Button, View, Text, StyleSheet } from "react-native";

const handleButtonClick = async () => {
  console.log("button clicked");
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
    console.log("button clicked");
  }
};

const OnePage: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.box, { backgroundColor: "powderblue", flex: 1 }]}>
        <Text style={styles.text}>
          Hello I am baymax, I am your personal healthcare
        </Text>
      </View>
      <View
        style={[
          styles.box,
          { backgroundColor: "skyblue", flex: 5, flexDirection: "column" },
        ]}
      >
        <Text style={styles.text}>Biological Sex</Text>
        <Button title="Press me" color="#f194ff" onPress={handleButtonClick} />
      </View>
      <View style={[styles.box, { backgroundColor: "steelblue", flex: 3 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    height: "100%",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    flex: 1,
    flexDirection: "row",
  },
  box: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "100%",
    minHeight: 100,
  },
});

export default OnePage;
