import { Text, View, StyleSheet } from "react-native";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import React, { useState } from "react";
import { OnePage } from "./user_input/index";
export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const onNextStep = () => {
    setCurrentStep((prevStep) => ((prevStep + 1) % 4 === 0 ? 0 : prevStep + 1));
  };

  return (
    <View style={styles.container}>
      <ProgressSteps activeStep={currentStep}>
        <ProgressStep label="First Step" onNext={onNextStep}>
          <View style={styles.container}>
            <OnePage />
          </View>
        </ProgressStep>
        <ProgressStep
          label="Second Step"
          onNext={onNextStep}
          onPrevious={() =>
            setCurrentStep((prevStep) => (prevStep - 1 + 4) % 4)
          }
        >
          <View style={styles.container}>
            <Text style={styles.text}>This is the content within step 2!</Text>
          </View>
        </ProgressStep>
        <ProgressStep
          label="Third Step"
          onNext={onNextStep}
          onPrevious={() =>
            setCurrentStep((prevStep) => (prevStep - 1 + 4) % 4)
          }
        >
          <View style={styles.container}>
            <Text style={styles.text}>This is the content within step 3!</Text>
          </View>
        </ProgressStep>
        <ProgressStep
          label="Forth Step"
          onNext={onNextStep}
          onPrevious={() =>
            setCurrentStep((prevStep) => (prevStep - 1 + 4) % 4)
          }
        >
          <View style={styles.container}>
            <Text style={styles.text}>This is the content within step 4!</Text>
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#a8dadc", // Calming blueish color
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  text: {
    color: "#1d3557", // Dark blue color for text
  },
});
