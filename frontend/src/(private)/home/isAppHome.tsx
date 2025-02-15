import React from "react";
import { Block, Button, Text, Input } from "../../components";
import NavBar from "../Navbar";
import { useTheme } from "../../hooks";
import Slider from "@react-native-community/slider";
import { ActivityIndicator, StyleSheet } from "react-native";

const goals = [
  { title: "Hormone Balance" },
  { title: "Muscle Gain" },
  { title: "Lost Weight" },
  { title: "Maintain a Balanced Diet" },
];
const budget = [
  { title: "Low", range: "0-100" },
  { title: "Medium", range: "101-500" },
  { title: "High", range: "501+" },
];

export default function WebHome() {
  const { sizes, colors } = useTheme();
  const [selectedGender, setSelectedGender] = React.useState<string | null>(
    null
  );
  const [selectedAge, setSelectedAge] = React.useState<number>(18);
  const [healthGoals, setHealthGoals] = React.useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = React.useState<string | null>(
    null
  );
  const [allery, setAllergy] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      gender: selectedGender,
      age: selectedAge,
      healthGoals,
      budget: selectedBudget,
      allergy: allery,
    };
    try {
      const response = await fetch("http://127.0.0.1:8081/crewai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.text();
      console.log(data);
    } catch (error) {
      console.log(error);
      // alert("Error: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const contentOne = () => {
    return (
      <Block style={{ alignSelf: "center" }}>
        <Text>Age: {Math.round(selectedAge)} </Text>
        <Slider
          style={{ width: 200, height: "10%" }}
          minimumValue={18}
          maximumValue={99}
          step={1}
          value={selectedAge}
          onValueChange={(value) => setSelectedAge(value)}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.secondary}
        />
        <Block row style={{ height: sizes.xl }}>
          <Button
            padding={sizes.m}
            margin={sizes.m}
            height={sizes.xl}
            outlined
            borderWidth={1}
            borderColor={
              selectedGender === "Male"
                ? colors.primary
                : colors.borderSecondary
            }
            onPress={() => setSelectedGender("Male")}
          >
            <Text>Male</Text>
          </Button>
          <Button
            padding={sizes.m}
            margin={sizes.m}
            height={sizes.xl}
            outlined
            borderWidth={1}
            borderColor={
              selectedGender === "Female"
                ? colors.primary
                : colors.borderSecondary
            }
            onPress={() => setSelectedGender("Female")}
          >
            <Text>Female</Text>
          </Button>
          <Button
            padding={sizes.m}
            margin={sizes.m}
            height={sizes.xl}
            outlined
            borderWidth={1}
            borderColor={
              selectedGender === "Other"
                ? colors.primary
                : colors.borderSecondary
            }
            onPress={() => setSelectedGender("Other")}
          >
            <Text>Other</Text>
          </Button>
        </Block>
        <Input
          placeholder="Enter your medical history"
          multiline
          numberOfLines={4}
          style={{ width: 300 }}
          value={allery || ""}
          onChangeText={(text) => setAllergy(text)}
        />
        <Block
          row
          justify="center"
          align="center"
          style={{
            alignSelf: "center",
            flexWrap: "wrap",
          }}
        >
          {goals.map((goal, index) => (
            <Button
              key={index}
              padding={sizes.m}
              margin={sizes.s}
              height={sizes.xxl}
              outlined
              borderWidth={1}
              borderColor={
                healthGoals.includes(goal.title)
                  ? colors.primary
                  : colors.borderSecondary
              }
              onPress={() => {
                if (healthGoals.includes(goal.title)) {
                  setHealthGoals(healthGoals.filter((g) => g !== goal.title));
                } else {
                  setHealthGoals([...healthGoals, goal.title]);
                }
              }}
            >
              <Text>{goal.title}</Text>
            </Button>
          ))}
        </Block>
        <Block row>
          {budget.map((item, index) => (
            <Button
              key={index}
              padding={sizes.m}
              margin={sizes.s}
              height={sizes.xxl}
              outlined
              borderWidth={1}
              borderColor={
                selectedBudget === item.title
                  ? colors.primary
                  : colors.borderSecondary
              }
              onPress={() => setSelectedBudget(item.title)}
            >
              <Text>{item.title}</Text>
            </Button>
          ))}
        </Block>
        <Block row justify="flex-end">
          <Button
            padding={sizes.sm}
            height={sizes.l}
            outlined
            onPress={() => handleSubmit()}
          >
            <Text>Submit</Text>
          </Button>
        </Block>
      </Block>
    );
  };

  const loadingContent = () => {
    return (
      <Block center style={[styles.container, styles.horizontal]}>
        <ActivityIndicator
          size="large"
          style={{ alignSelf: "center" }}
          color={colors.borderPrimary as string}
        />
      </Block>
    );
  };

  return (
    <Block style={{ backgroundColor: colors.background }} flex={1} center isWeb>
      {loading ? loadingContent() : contentOne()}
      <NavBar currentScreen="Home" />
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
