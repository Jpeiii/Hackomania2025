import React, { useCallback, useEffect } from "react";
import { Block, Button, Text, Input, Icon, Image } from "../../components";
import NavBar from "../Navbar";
import { useTheme } from "../../hooks";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Switch,
  ScrollView,
} from "react-native";
import syndata from "./data";
import { useNavigation } from "@react-navigation/native";

const goals = [
  { title: "Hormone Balance" },
  { title: "Lose Weight" },
  { title: "Maintain a Balanced Diet" },
];
const budget = [
  { title: "$0-$50" },
  { title: "$51-$100" },
  { title: "$101++" },
];

const genders = [{ title: "Male" }, { title: "Female" }, { title: "Other" }];

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
  const [page, setPage] = React.useState<number>(1);
  const [post, setPost] = React.useState<string | null>(null);
  const [displayData, setDisplayData] = React.useState<any>(syndata);
  const [gotData, setGotData] = React.useState<boolean>(false);
  const baseIconColorPrimary = colors.primary as string;
  const baseIconColorSecondary = colors.secondary as string;
  const navigation = useNavigation();
  const [tab, setTab] = React.useState<boolean>(false);
  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    setPage(1);
  };

  const pickFromAlbum = async () => {
    try {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*,video/*";
      input.onchange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            const photoUri = e.target.result.toString();
            setPost(photoUri);
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    } catch (error) {
      console.error("Error selecting file: ", error);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      gender: selectedGender,
      age: selectedAge,
      healthGoals,
      budget: selectedBudget,
      allergy: allery,
      image: post,
    };
    try {
      const response = await fetch("http://127.0.0.1:8081/crewai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await response.text();
      const report = JSON.parse(result);
      if (result) {
        setGotData(true);
        setDisplayData(report.data);
      } else {
        setLoading(false);
        setGotData(true);
        setDisplayData(syndata);
      }
    } catch (error) {
      console.log(error);
      setGotData(true);
      setDisplayData(syndata);
      setLoading(false);
      // alert("Error: " + (error as Error).message);
    } finally {
      setGotData(true);
      setDisplayData(syndata);
      setLoading(false);
    }
  };

  const contentOne = () => {
    return (
      <View
        style={{
          alignSelf: "center",
          height: "80%",
          width: "80%",
          flexDirection: "column",
        }}
      >
        <Text h5 bold>
          Live Healthier for Longer
        </Text>
        <Text h6>Create a tailored meal plans with NutriGenius AI</Text>
        <Block style={{ marginTop: sizes.s, marginBottom: sizes.s }}>
          <Text>Age: </Text>
          <Input
            placeholder="Enter Age"
            value={selectedAge.toString()}
            keyboardType="numeric"
            onChangeText={(text) => {
              const age = parseInt(text, 10);
              if (!isNaN(age)) {
                setSelectedAge(age);
              }
            }}
            style={{ flex: 1, marginLeft: sizes.sm, marginTop: sizes.s }}
          />
        </Block>
        <Block style={{ marginBottom: sizes.sm }}>
          <Text>Gender:</Text>
          <Block row>
            {genders.map((gender) => (
              <Button
                key={gender.title}
                padding={sizes.s}
                margin={sizes.s}
                height={sizes.l}
                outlined
                borderWidth={1}
                borderColor={
                  selectedGender === gender.title
                    ? colors.primary
                    : colors.borderSecondary
                }
                onPress={() => setSelectedGender(gender.title)}
              >
                <Text>{gender.title}</Text>
              </Button>
            ))}
          </Block>
        </Block>
        <Block style={{ marginBottom: sizes.sm }}>
          <Text>Health Goals:</Text>
          <Block row>
            {goals.map((goal, index) => (
              <Button
                key={index}
                padding={sizes.s}
                margin={sizes.s}
                height={sizes.l}
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
        </Block>
        <Block style={{ marginBottom: sizes.sm }}>
          <Text>Budget Daily:</Text>
          <Block row>
            {budget.map((item, index) => (
              <Button
                key={index}
                padding={sizes.s}
                margin={sizes.s}
                height={sizes.l}
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
        </Block>
        <Block style={{ marginBottom: sizes.sm }}>
          <Text>Allergy:</Text>
          <Input
            placeholder="Enter Allergy"
            value={allery || ""}
            onChangeText={setAllergy}
            style={{ flex: 1, marginLeft: sizes.sm, marginTop: sizes.s }}
          />
        </Block>
        <Block style={{ marginBottom: sizes.s, alignItems: "flex-end" }}>
          <Icon
            iconType="MaterialIcons"
            iconName="navigate-next"
            color={colors.secondary as string}
            style={{
              borderRadius: sizes.s,
              marginRight: sizes.m,
              padding: sizes.s,
            }}
            onPress={handleNextPage}
          />
        </Block>
      </View>
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

  const contentTwo = () => {
    return (
      <View
        style={{
          alignSelf: "center",
          height: "80%",
          width: "80%",
          flexDirection: "column",
        }}
      >
        {!post && (
          <Block
            justify="center"
            align="center"
            style={{ alignSelf: "center" }}
          >
            <Button
              padding={sizes.m}
              margin={sizes.m}
              height={sizes.xxl}
              outlined
              borderWidth={1}
              borderColor={colors.borderSecondary}
              onPress={() => pickFromAlbum()}
            >
              <Text bold textSecondary>
                Select from computer
              </Text>
            </Button>
          </Block>
        )}
        {post && (
          <Block align="center">
            <Image
              source={{ uri: post }}
              style={{
                width: "200%",
                height: "100%",
                borderRadius: sizes.sm,
                marginVertical: sizes.sm,
              }}
              resizeMode="contain" // or "cover" based on your requirement
            />
            <Text>Age: {selectedAge}</Text>
            <Text>Gender: {selectedGender}</Text>
            <Text>Health Goals: {healthGoals.join(", ")}</Text>
            <Text>Budget: {selectedBudget}</Text>
            <Text>Allergy: {allery}</Text>
          </Block>
        )}
        <Block style={{ marginBottom: sizes.s, alignItems: "flex-end" }}>
          <Button primary padding={sizes.s} onPress={handleSubmit}>
            <Text>Submit</Text>
          </Button>
        </Block>
        <Block style={{ marginBottom: sizes.s, alignItems: "flex-start" }}>
          <Icon
            iconType="MaterialIcons"
            iconName="navigate-before"
            color={colors.secondary as string}
            style={{
              borderRadius: sizes.s,
              marginRight: sizes.m,
              padding: sizes.s,
            }}
            onPress={handlePreviousPage}
          />
        </Block>
      </View>
    );
  };

  const contentThree = () => {
    const meal_plan =
      displayData["nutritionist_report"]["meal_plan"][0]["meals"];
    const advisor_rationale =
      displayData["nutritionist_report"]["advisor_rationale"];
    const advisor_summary =
      displayData["dermatalogist_report"]["advisor_summary"];
    const predicted_skin_condition_after_meal_plan =
      displayData["dermatalogist_report"][
        "predicted_skin_condition_after_meal_plan"
      ];

    const current_skin_condition_report =
      displayData["dermatalogist_report"]["current_skin_condition_report"];
    const predicted_biological_age_after_meal_plan =
      displayData["dermatalogist_report"][
        "predicted_biological_age_after_meal_plan"
      ];
    return (
      <View
        style={{
          alignSelf: "center",
          height: "100%",
          width: "80%",
          flexDirection: "column",
        }}
      >
        <Switch
          trackColor={{ false: colors.borderSecondary, true: colors.primary }}
          thumbColor={colors.background}
          ios_backgroundColor={colors.borderSecondary}
          onValueChange={(value) => {
            setTab(value);
          }}
          value={tab}
          style={{ alignSelf: "flex-end" }}
        />
        {tab ? (
          <View>
            <Text h4 bold style={{ color: "green", marginBottom: sizes.s }}>
              Dermatalogist Report
            </Text>
            <Text
              bold
              style={{ color: baseIconColorPrimary, marginBottom: sizes.s }}
            >
              Advise:
            </Text>
            <Text
              style={{ color: baseIconColorPrimary, marginBottom: sizes.m }}
            >
              {advisor_summary}
            </Text>
            <Text
              bold
              style={{ color: baseIconColorPrimary, marginBottom: sizes.s }}
            >
              Current Condition:
            </Text>
            <Text
              style={{ color: baseIconColorPrimary, marginBottom: sizes.m }}
            >
              {current_skin_condition_report}
            </Text>
            <Text
              bold
              style={{ color: baseIconColorPrimary, marginBottom: sizes.s }}
            >
              Prediction:
            </Text>
            <Text
              style={{ color: baseIconColorPrimary, marginBottom: sizes.m }}
            >
              {predicted_skin_condition_after_meal_plan}
            </Text>
            <Text
              bold
              style={{ color: baseIconColorPrimary, marginBottom: sizes.s }}
            >
              Prediction Biological Age after 1 month meal:
            </Text>
            <Text
              style={{ color: baseIconColorPrimary, marginBottom: sizes.m }}
            >
              {predicted_biological_age_after_meal_plan}
            </Text>
            <Image
              source={{ uri: displayData.image }}
              style={{
                width: "200%",
                height: "100%",
                borderRadius: sizes.sm,
                marginVertical: sizes.sm,
              }}
              resizeMode="contain" // or "cover" based on your requirement
            />
          </View>
        ) : (
          <View>
            <Text bold style={{ color: baseIconColorPrimary }}>
              {advisor_rationale}
            </Text>
            <ScrollView>
              {Object.entries(meal_plan)
                .filter(([mealType]) => mealType.toLowerCase() !== "snacks")
                .map(([mealType, mealData]: [string, any]) => (
                  <View
                    key={mealType}
                    style={{
                      margin: sizes.s,
                      padding: sizes.s,
                      borderWidth: 1,
                      borderColor: colors.borderSecondary,
                      borderRadius: sizes.sm,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 5,
                      height: "auto",
                    }}
                  >
                    <Text h4 bold>
                      {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                    </Text>

                    <Text bold>{mealData.name}</Text>
                    <Text>{mealData.recipe}</Text>
                    <Text bold>Portion Size: {mealData.portion_size}</Text>
                    <Text bold>Food Score: {mealData.food_score}</Text>
                    <Block row justify="space-between" marginTop={sizes.s}>
                      <Icon
                        iconType="Ionicons"
                        iconName="heart-outline"
                        selectedIconName="heart"
                        color={baseIconColorSecondary}
                        selectedColor={baseIconColorSecondary}
                        size={sizes.m}
                      />
                      <Icon
                        iconType="Ionicons"
                        iconName="bookmark-outline"
                        selectedIconName="bookmark"
                        color={baseIconColorPrimary}
                        selectedColor={baseIconColorPrimary}
                        size={sizes.m}
                      />
                      <Icon
                        iconType="Ionicons"
                        iconName="share-social-outline"
                        color={baseIconColorSecondary}
                        size={sizes.m}
                        onPress={() => {
                          alert("Share to your friends");
                        }}
                      />
                      <Icon
                        iconType="Ionicons"
                        iconName="chatbubble-ellipses-outline"
                        color={baseIconColorSecondary}
                        size={sizes.m}
                        onPress={() => {
                          alert("Provide feedback");
                        }}
                      />
                      <Icon
                        iconType="Ionicons"
                        iconName="information-circle-outline"
                        color={baseIconColorSecondary}
                        size={sizes.m}
                        onPress={() => {
                          alert(`Nutrition Information:
            Calories: ${mealData.nutrition?.calories ?? 200}
            Protein: ${mealData.nutrition?.protein ?? 200}
            Carbs: ${mealData.nutrition?.carbs ?? 200}
            Fat: ${mealData.nutrition?.fat ?? 200}`);
                        }}
                      />
                    </Block>
                  </View>
                ))}
              {Object.entries(meal_plan)
                .filter(([mealType]) => mealType.toLowerCase() === "snacks")
                .map(([mealType, mealData]: [string, any]) => (
                  <View
                    key={mealType}
                    style={{
                      margin: sizes.s,
                      padding: sizes.s,
                      borderWidth: 1,
                      borderColor: colors.borderSecondary,
                      borderRadius: sizes.sm,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 5,
                      height: "auto",
                    }}
                  >
                    <Text h4 bold>
                      {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                    </Text>
                    <Text bold>{mealData[0].name}</Text>
                    <Text>{mealData[0].recipe}</Text>
                    <Text bold>Portion Size: {mealData[0].portion_size}</Text>
                    <Text bold>Food Score: {mealData[0].food_score}</Text>
                    <Block row justify="space-between" marginTop={sizes.s}>
                      <Icon
                        iconType="Ionicons"
                        iconName="heart-outline"
                        selectedIconName="heart"
                        color={baseIconColorSecondary}
                        selectedColor={baseIconColorSecondary}
                        size={sizes.m}
                      />
                      <Icon
                        iconType="Ionicons"
                        iconName="bookmark-outline"
                        selectedIconName="bookmark"
                        color={baseIconColorPrimary}
                        selectedColor={baseIconColorPrimary}
                        size={sizes.m}
                      />
                      <Icon
                        iconType="Ionicons"
                        iconName="share-social-outline"
                        color={baseIconColorSecondary}
                        size={sizes.m}
                        onPress={() => {
                          alert("Share to your friends");
                        }}
                      />
                      <Icon
                        iconType="Ionicons"
                        iconName="chatbubble-ellipses-outline"
                        color={baseIconColorSecondary}
                        size={sizes.m}
                        onPress={() => {
                          alert("Provide feedback");
                        }}
                      />
                      <Icon
                        iconType="Ionicons"
                        iconName="information-circle-outline"
                        color={baseIconColorSecondary}
                        size={sizes.m}
                        onPress={() => {
                          alert(`Nutrition Information:
            Calories: ${mealData.nutrition?.calories ?? 200}
            Protein: ${mealData.nutrition?.protein ?? 200}
            Carbs: ${mealData.nutrition?.carbs ?? 200}
            Fat: ${mealData.nutrition?.fat ?? 200}`);
                        }}
                      />
                    </Block>
                  </View>
                ))}
            </ScrollView>
          </View>
        )}
      </View>
    );
  };

  return (
    <Block style={{ backgroundColor: colors.background }} flex={1} center isWeb>
      {loading
        ? loadingContent()
        : gotData
        ? contentThree()
        : page === 1
        ? contentOne()
        : contentTwo()}

      {/* {contentThree()} */}
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
