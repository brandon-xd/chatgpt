import Colors from "@/constants/Colors";
import { Stack, router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(drawer)"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="(modal)/settings"
        options={{
          headerTitle: "Settings",
          headerTitleAlign: "center",
          presentation: "modal",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.selected },
          headerRight: () => (
            <>
              {router.canGoBack() && (
                <TouchableOpacity
                  onPress={() => router.back()}
                  style={{
                    backgroundColor: Colors.greyLight,
                    borderRadius: 20,
                    padding: 2,
                  }}
                >
                  <Ionicons
                    name="close-outline"
                    size={24}
                    color={Colors.grey}
                  />
                </TouchableOpacity>
              )}
            </>
          ),
        }}
      ></Stack.Screen>
    </Stack>
  );
};

export default Layout;
