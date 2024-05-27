import { View, Text } from "react-native";
import React from "react";
import AnimatedIntro from "@/components/AnimatedIntro";
import BottomLoginSheet from "@/components/BottomLoginSheet";

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <AnimatedIntro />
      <BottomLoginSheet />
    </View>
  );
}
