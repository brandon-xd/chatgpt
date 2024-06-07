import Colors from "@/constants/Colors";
import { Stack, router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SQLiteProvider } from "expo-sqlite";
import { migrateDbIfNeeded } from "@/utils/Database";

const Layout = () => {
  return (
    <SQLiteProvider databaseName="chats.db" onInit={migrateDbIfNeeded}>
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
        <Stack.Screen
          name="(modal)/[url]"
          options={{
            headerTitle: "",
            presentation: "fullScreenModal",
            headerShadowVisible: false,
            headerBlurEffect: "dark",
            headerTransparent: true,
            headerStyle: { backgroundColor: "rgba(0,0,0,0.5)" },
            headerLeft: () => (
              <>
                {router.canGoBack() && (
                  <TouchableOpacity
                    onPress={() => router.back()}
                    style={{
                      borderRadius: 20,
                      padding: 4,
                    }}
                  >
                    <Ionicons name="close-outline" size={28} color={"#fff"} />
                  </TouchableOpacity>
                )}
              </>
            ),
          }}
        ></Stack.Screen>
      </Stack>
    </SQLiteProvider>
  );
};

export default Layout;
