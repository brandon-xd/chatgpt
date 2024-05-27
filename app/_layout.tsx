import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function RootLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="login"
        options={{
          presentation: "modal",
          title: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name="close" size={24} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
