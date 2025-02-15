import React, { useCallback, useReducer } from "react";
import { Alert, Linking, Platform, Text } from "react-native";
import {
  GiftedChat,
  IMessage,
  Send,
  SendProps,
  SystemMessage,
  Bubble,
  BubbleProps,
} from "react-native-gifted-chat";
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
const user = {
  _id: 1,
  name: "Developer",
};

interface IState {
  messages: any[];
  step: number;
  loadEarlier?: boolean;
  isLoadingEarlier?: boolean;
  isTyping: boolean;
}

enum ActionKind {
  SEND_MESSAGE = "SEND_MESSAGE",
  LOAD_EARLIER_MESSAGES = "LOAD_EARLIER_MESSAGES",
  LOAD_EARLIER_START = "LOAD_EARLIER_START",
  SET_IS_TYPING = "SET_IS_TYPING",
  // LOAD_EARLIER_END = 'LOAD_EARLIER_END',
}

// An interface for our actions
interface StateAction {
  type: ActionKind;
  payload?: any;
}

function reducer(state: IState, action: StateAction) {
  switch (action.type) {
    case ActionKind.SEND_MESSAGE: {
      return {
        ...state,
        step: state.step + 1,
        messages: action.payload,
      };
    }
    case ActionKind.LOAD_EARLIER_MESSAGES: {
      return {
        ...state,
        loadEarlier: true,
        isLoadingEarlier: false,
        messages: action.payload,
      };
    }
    case ActionKind.LOAD_EARLIER_START: {
      return {
        ...state,
        isLoadingEarlier: true,
      };
    }
    case ActionKind.SET_IS_TYPING: {
      return {
        ...state,
        isTyping: action.payload,
      };
    }
  }
}

const App = () => {
  const { sizes, colors } = useTheme();
  const [state, dispatch] = useReducer(reducer, {
    messages: messagesData,
    step: 0,
    loadEarlier: true,
    isLoadingEarlier: false,
    isTyping: false,
  });

  const onSend = useCallback(
    (messages: any[]) => {
      const sentMessages = [{ ...messages[0], sent: true, received: true }];
      const newMessages = GiftedChat.append(
        state.messages,
        sentMessages,
        Platform.OS !== "web"
      );

      dispatch({ type: ActionKind.SEND_MESSAGE, payload: newMessages });
    },
    [dispatch, state.messages]
  );

  const onLoadEarlier = useCallback(() => {
    dispatch({ type: ActionKind.LOAD_EARLIER_START });
    setTimeout(() => {
      const newMessages = GiftedChat.prepend(
        state.messages,
        earlierMessages() as IMessage[],
        Platform.OS !== "web"
      );

      dispatch({
        type: ActionKind.LOAD_EARLIER_MESSAGES,
        payload: newMessages,
      });
    }, 1500); // simulating network
  }, [dispatch, state.messages]);

  const parsePatterns = useCallback(() => {
    return [
      {
        pattern: /#(\w+)/,
        style: { textDecorationLine: "underline", color: "darkorange" },
        onPress: () => Linking.openURL("http://gifted.chat"),
      },
    ];
  }, []);

  const onLongPressAvatar = useCallback((pressedUser: any) => {
    Alert.alert(JSON.stringify(pressedUser));
  }, []);

  const onPressAvatar = useCallback(() => {
    Alert.alert("On avatar press");
  }, []);

  const handleLongPress = useCallback(
    (context: unknown, currentMessage: object) => {
      if (!currentMessage.text) return;

      const options = ["Copy text", "Cancel"];

      const cancelButtonIndex = options.length - 1;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (context as any).actionSheet().showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        (buttonIndex: number) => {
          switch (buttonIndex) {
            case 0:
              Clipboard.setStringAsync(currentMessage.text);
              break;
            default:
              break;
          }
        }
      );
    },
    []
  );

  const onQuickReply = useCallback((replies: any[]) => {
    const createdAt = new Date();
    if (replies.length === 1)
      onSend([
        {
          createdAt,
          _id: Math.round(Math.random() * 1000000),
          text: replies[0].title,
          user,
        },
      ]);
    else if (replies.length > 1)
      onSend([
        {
          createdAt,
          _id: Math.round(Math.random() * 1000000),
          text: replies.map((reply) => reply.title).join(", "),
          user,
        },
      ]);
    else console.warn("replies param is not set correctly");
  }, []);

  const renderQuickReplySend = useCallback(() => {
    return <Text>{" custom send =>"}</Text>;
  }, []);

  const setIsTyping = useCallback(
    (isTyping: boolean) => {
      dispatch({ type: ActionKind.SET_IS_TYPING, payload: isTyping });
    },
    [dispatch]
  );

  const onSendFromUser = useCallback(
    (messages: IMessage[] = []) => {
      const createdAt = new Date();
      const messagesToUpload = messages.map((message) => ({
        ...message,
        user,
        createdAt,
        _id: Math.round(Math.random() * 1000000),
      }));

      onSend(messagesToUpload);
    },
    [onSend]
  );

  const renderAccessory = useCallback(() => {
    return (
      <AccessoryBar
        onSend={onSendFromUser}
        isTyping={() => setIsTyping(!state.isTyping)}
      />
    );
  }, [onSendFromUser, setIsTyping, state.isTyping]);

  const renderCustomActions = useCallback(
    (props) =>
      Platform.OS === "web" ? null : (
        <CustomActions {...props} onSend={onSendFromUser} />
      ),
    [onSendFromUser]
  );

  const renderSystemMessage = useCallback((props) => {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15,
        }}
        textStyle={{
          fontSize: 14,
        }}
      />
    );
  }, []);

  const renderCustomView = useCallback((props) => {
    return <CustomView {...props} />;
  }, []);

  const renderSend = useCallback((props: SendProps<IMessage>) => {
    return (
      <Send
        {...props}
        containerStyle={{ justifyContent: "center", paddingHorizontal: 10 }}
      >
        <Icon
          iconType="Feather"
          iconName="send"
          color={colors.textPrimaryLight as string}
          size={sizes.m}
          style={{ marginHorizontal: sizes.s }}
        />
      </Send>
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
        <GiftedChat
          scrollToBottom
          messages={state.messages} // messages array
          onSend={onSend}
          renderBubble={renderBubble}
          user={user}
          timeTextStyle={{
            left: { color: colors.primary },
            right: { color: colors.secondary },
          }}
          renderSend={renderSend}
          keyboardShouldPersistTaps="never"
          isTyping={state.isTyping}
          infiniteScroll
          loadEarlier={state.loadEarlier}
          onLoadEarlier={onLoadEarlier}
          isLoadingEarlier={state.isLoadingEarlier}
          renderCustomView={renderCustomView}
          // renderSystemMessage={renderSystemMessage}

          // renderAccessory={renderAccessory}
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
