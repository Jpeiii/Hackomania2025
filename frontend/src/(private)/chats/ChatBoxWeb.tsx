import React, { useCallback, useEffect, useState } from "react";
import { Alert, ActivityIndicator, Platform, Text } from "react-native";
import {
  GiftedChat,
  IMessage as OriginalIMessage,
  Send,
  SendProps,
  SystemMessage,
  Bubble,
  BubbleProps,
} from "react-native-gifted-chat";

import { dummyData } from "./components/mockdata/question";

interface IMessage extends OriginalIMessage {
  question?: boolean;
  selection?: string[];
  userAnalysis?: boolean;
  analysis?: any;
  recommendation?: boolean;
  travelAgency?: any;
  initial?: boolean;
}
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavBar } from "./components/navbar";
import AccessoryBar from "./components/AccessoryBar";
import CustomActions from "./components/CustomActions";
import CustomView from "./components/isWeb/CustomView";
import earlierMessages from "./components/earlierMessages";
import messagesData from "./components/isWeb/messages";
import * as Clipboard from "expo-clipboard";
import { useTheme } from "../../hooks";
import { Block, Icon } from "../../components";
import { ITripInformation } from "../../constants/types";
import { set } from "lodash";
const App = () => {
  const { sizes, colors } = useTheme();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [userAnalysis, setUserAnalysis] = useState<any>(null);
  const [AIRecommendation, setAIRecommendation] = useState<any>(null);
  const [showAccessoryBar, setShowAccessoryBar] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePreferenceDataChange = (data: any) => {
    setLoading(true);
    const requestData = {
      preferences: data,
    };

    fetch("http://localhost:8000/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData), // Make sure to send the correct JSON data
    })
      .then((response) => response.json())
      .then((botrsp) => {
        console.log("Bot response: ", botrsp);

        if (!botrsp.response.analysis) {
          Alert.alert("Error! Analysis data is missing in the response");
          console.error("Analysis data is missing in the response");
          return;
        }

        if (!botrsp.response.recommendation) {
          Alert.alert("Error! Recommendation data is missing in the response");
          console.error("Recommendation data is missing in the response");
          return;
        }

        const botResponse = botrsp.response;
        const travel_analysis = botResponse.analysis;
        const travel_recommendation = botResponse.recommendation;
        console.log("Travel Analysis: ", travel_analysis);
        console.log("Travel Recommendation: ", travel_recommendation);
        setLoading(false);
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, [
            {
              _id: Math.floor(Math.random() * 1000000),
              text: "",
              createdAt: new Date(),
              user: {
                _id: 1,
                name: "Chatbot",
                avatar:
                  "https://firebasestorage.googleapis.com/v0/b/v0-0-beta-nomad.appspot.com/o/option2.JPG?alt=media&token=0c61590a-747d-4a6a-a253-dbbbed204a83",
              },
              userAnalysis: true,
              analysis: travel_analysis,
            },
            // {
            //   _id: Math.floor(Math.random() * 1000000),
            //   text: "",
            //   createdAt: new Date(),
            //   user: {
            //     _id: 1,
            //     name: "Chatbottravel_analysis",
            //     avatar:
            //       "https://firebasestorage.googleapis.com/v0/b/v0-0-beta-nomad.appspot.com/o/option2.JPG?alt=media&token=0c61590a-747d-4a6a-a253-dbbbed204a83",
            //   },
            //   recommendation: true,
            //   travelAgency:AIRecommendation,
            // },
          ])
        );
      })
      .catch((error) => {
        console.error("Error in fetching data", error);
      });
  };
  // Callback to handle trip data from the child
  const handleTripDataChange = (data: ITripInformation) => {
    const requestData = {
      departure_location: data.departure,
      destination_location: data.destination,
      season: data.season,
    };
    setLoading(true);
    fetch("http://localhost:8000/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        return response.json(); // Return JSON data
      })
      .then((data) => {
        console.log("Data: ", data);
        console.log("Data length: ", data.length);
        if (data.length > 0) {
          console.log("HERE IS EXECUTED");
          setLoading(false);
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, [
              {
                _id: Math.floor(Math.random() * 1000000),
                text: "",
                createdAt: new Date(),
                user: {
                  _id: 1,
                  name: "Chatbot",
                  avatar:
                    "https://firebasestorage.googleapis.com/v0/b/v0-0-beta-nomad.appspot.com/o/option2.JPG?alt=media&token=0c61590a-747d-4a6a-a253-dbbbed204a83",
                },
                question: true,
                selection: data,
              },
            ])
          );
        } else if (data.error) {
          setLoading(false);
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, [
              {
                _id: Math.floor(Math.random() * 1000000),
                text: "Hi there! I am your personal travel advisor.There was some error in fetching data. Please try again later.",
                createdAt: new Date(),
                user: {
                  _id: 1,
                  name: "Chatbot",
                  avatar:
                    "https://firebasestorage.googleapis.com/v0/b/v0-0-beta-nomad.appspot.com/o/option2.JPG?alt=media&token=0c61590a-747d-4a6a-a253-dbbbed204a83",
                },
              },
            ])
          );

          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, [
              {
                _id: Math.floor(Math.random() * 1000000),
                text: "",
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: "User",
                },
                initial: true,
                selection: data,
              },
            ])
          );
        }
      })
      .catch((error) => {
        console.error("Error in fetching data", error);
      });
  };

  const user = {
    _id: 1,
    name: "Chatbot",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/v0-0-beta-nomad.appspot.com/o/option2.JPG?alt=media&token=0c61590a-747d-4a6a-a253-dbbbed204a83",
  };

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "User",
        },
        initial: true,
      },
      {
        _id: 0,
        text: "Hi there! I am your personal travel advisor. I will base my recommendations on your requirements and connect you with the appropriate travel agencies that can fulfill them.",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "Chatbot",
          avatar:
            "https://firebasestorage.googleapis.com/v0/b/v0-0-beta-nomad.appspot.com/o/option2.JPG?alt=media&token=0c61590a-747d-4a6a-a253-dbbbed204a83",
        },
      },
    ] as IMessage[]);
  }, []);

  const renderCustomView = useCallback((props: any) => {
    return (
      <CustomView
        {...props}
        onTripDataChange={handleTripDataChange}
        onTripPreferenceDataChange={handlePreferenceDataChange}
      />
    );
  }, []);

  const onSend = useCallback((messages: IMessage[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const renderBubble = useCallback((props: BubbleProps<IMessage>) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          left: {
            color: colors.textPrimary,
          },
          right: {
            color: colors.textSecondary,
          },
        }}
        wrapperStyle={{
          left: {
            marginVertical: 2,
            backgroundColor: "#8FD1E1",
          },
          right: {
            marginVertical: 2,
            backgroundColor: "#FFEA89",
          },
        }}
      />
    );
  }, []);

  return (
    <Block
      safe
      flex={1}
      isWeb
      style={{ backgroundColor: colors.chatBackgroundHeader }}
    >
      <NavBar />
      <Block
        style={{ backgroundColor: colors.background }}
        paddingHorizontal={sizes.s}
      >
        {loading && (
          <Block
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1,
            }}
          >
            <ActivityIndicator size="large" color={colors.primary} />
          </Block>
        )}
        <GiftedChat
          user={user}
          scrollToBottom
          renderBubble={renderBubble}
          messages={messages}
          onSend={(messages) => onSend(messages)}
          renderCustomView={renderCustomView}
        />
      </Block>
    </Block>
  );
};

const AppWrapper = () => {
  return (
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  );
};

export default AppWrapper;
