import {
  View,
  Text,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Keyboard,
} from "react-native";
import { defaultStyles } from "@/constants/Styles";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import HeaderDropDown from "@/components/HeaderDropDown";
import MessageInput from "@/components/MessageInput";
import { useEffect, useMemo, useRef, useState } from "react";
import MessageIdeas from "@/components/MessageIdeas";
import { Message, Role } from "@/utils/Interfaces";
import { FlashList } from "@shopify/flash-list";
import ChatMessage from "@/components/ChatMessage";
import { useMMKVString } from "react-native-mmkv";
import { keyStorage, storage } from "@/utils/Storage";
import OpenAI from "react-native-openai";
import { useSQLiteContext } from "expo-sqlite";
import { addChat, addMessage, getMessages } from "@/utils/Database";

const DUMMY_MESSAGES: Message[] = [
  {
    content: "Hello, how can I help you today?",
    role: Role.Bot,
  },
  {
    content:
      "I'd like to know more about React Native development. I'd like to know more about React Native I'd like to know more about React Native I'd like to know more about React Native I'd like to know more about React Native I'd like to know more about React Native",
    role: Role.User,
  },
];

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [height, setHeight] = useState(0);
  const [key, setKey] = useMMKVString("apiKey", keyStorage);
  const [organization, setOrganization] = useMMKVString("org", keyStorage);
  const [gptVersion, setGptVersion] = useMMKVString("gptVersion", storage);

  const db = useSQLiteContext();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [chatId, _setChatId] = useState(id);
  const chatIdRef = useRef(chatId);

  function setChatId(id: string) {
    chatIdRef.current = id;
    _setChatId(id);
  }

  if (!key || key === "" || !organization || organization === "") {
    return <Redirect href={"/(auth)/(modal)/settings"} />;
  }

  useEffect(() => {
    if (id) {
      console.log("Load for chat ID: ", id);
      getMessages(db, parseInt(id)).then((messages) => {
        console.log("Got messages: ", messages);
        setMessages(messages);
      });
    }
  }, [id]);

  const openAI = useMemo(() => new OpenAI({ apiKey: key, organization }), []);

  const getCompletion = async (message: string) => {
    if (messages.length === 0) {
      const result = await addChat(db, message);
      const chatID = result.lastInsertRowId;
      setChatId(chatID.toString());
      addMessage(db, chatID, { content: message, role: Role.User });
    }

    setMessages([
      ...messages,
      { content: message, role: Role.User },
      { role: Role.Bot, content: "" },
    ]);

    openAI.chat.stream({
      messages: [{ role: "user", content: message }],
      model: gptVersion === "4" ? "gpt-4" : "gpt-3.5-turbo",
    });
  };

  useEffect(() => {
    const handleNewMessage = (payload: any) => {
      setMessages((messages) => {
        const newMessage = payload.choices[0]?.delta.content;
        if (newMessage) {
          messages[messages.length - 1].content += newMessage;
          return [...messages];
        }
        if (payload.choices[0]?.finishReason) {
          addMessage(db, parseInt(chatIdRef.current), {
            content: messages[messages.length - 1].content,
            role: Role.Bot,
          });
        }

        return messages;
      });
    };

    openAI.chat.addListener("onChatMessageReceived", handleNewMessage);

    return () => {
      openAI.chat.removeListener("onChatMessageReceived");
    };
  }, [openAI]);

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height);
  };

  return (
    <View style={defaultStyles.pageContainer}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <HeaderDropDown
              title="ChatGPT"
              onSelect={(key) => {
                setGptVersion(key);
              }}
              selected={gptVersion}
              items={[
                { key: "3.5", title: "GPT-3.5", icon: "bolt" },
                { key: "4", title: "GPT-4", icon: "sparkles" },
              ]}
            />
          ),
        }}
      />

      <View style={{ flex: 1 }} onLayout={onLayout}>
        {messages.length === 0 && (
          <View style={[styles.logoContainer, { marginTop: height / 3 - 20 }]}>
            <Image
              source={require("@/assets/images/logo-white.png")}
              style={styles.image}
            />
          </View>
        )}

        <FlashList
          data={messages}
          renderItem={({ item }) => <ChatMessage {...item} />}
          estimatedItemSize={400}
          contentContainerStyle={{ paddingTop: 10, paddingBottom: 90 }}
          keyboardDismissMode="on-drag"
        />
      </View>
      <KeyboardAvoidingView
        keyboardVerticalOffset={70}
        behavior={Platform.OS === "android" ? "padding" : "position"}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
        }}
      >
        {messages.length === 0 && <MessageIdeas onSelectCard={getCompletion} />}
        <MessageInput onShouldSendMessage={getCompletion} />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    backgroundColor: "#000",
    borderRadius: 50,
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: "cover",
  },
  page: {
    flex: 1,
  },
});

export default ChatPage;
