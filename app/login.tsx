import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const Page = () => {
  const { type } = useLocalSearchParams<{ type: string }>();
  console.log("Page type:", type);
  return (
    <View>
      <Text>Page</Text>
    </View>
  );
};

export default Page;
