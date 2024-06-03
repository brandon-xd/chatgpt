import {
  View,
  Text,
  StyleSheet,
  Image,
  Touchable,
  useWindowDimensions,
  TextInput,
} from "react-native";
import { Drawer } from "expo-router/drawer";
import Colors from "@/constants/Colors";
import { Link, useNavigation, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import {
  DrawerContentScrollView,
  useDrawerStatus,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomDrawerContent from "@/components/CustomDrawerContent";

// export const CustomDrawerContent = (props: any) => {
//   const { bottom, top } = useSafeAreaInsets();
//   // const db = useSQLiteContext();
//   const isDrawerOpen = useDrawerStatus() === "open";
//   // const [history, setHistory] = useState<Chat[]>([]);
//   const router = useRouter();

//   return (
//     <View style={{ flex: 1, marginTop: top }}>
//       <View style={{ paddingBottom: 10 }}>
//         <View style={[styles.searchSection]}>
//           <Ionicons
//             name="search"
//             size={20}
//             color={Colors.grey}
//             style={styles.searchIcon}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Search"
//             underlineColorAndroid="transparent"
//           />
//         </View>
//       </View>
//       <DrawerContentScrollView
//         contentContainerStyle={{ paddingTop: 0 }}
//         {...props}
//       >
//         <DrawerItemList {...props} />
//       </DrawerContentScrollView>

//       <View
//         style={{
//           padding: 16,
//           paddingBottom: 10 + bottom,
//           backgroundColor: Colors.light,
//         }}
//       >
//         <Link href="/(auth)/(modal)/settings" asChild>
//           <TouchableOpacity style={styles.footer}>
//             <Image
//               source={{ uri: "https://galaxies.dev/img/meerkat_2.jpg" }}
//               style={styles.avatar}
//             />
//             <Text style={styles.userName}>Mika Meerkat</Text>
//             <Ionicons
//               name="ellipsis-horizontal"
//               size={24}
//               color={Colors.greyLight}
//             />
//           </TouchableOpacity>
//         </Link>
//       </View>
//     </View>
//   );
// };

const Layout = () => {
  const navigation = useNavigation();
  const dimensions = useWindowDimensions();

  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerTitleAlign: "center",
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
          >
            <FontAwesome6
              name="grip-lines"
              size={22}
              color={Colors.grey}
              style={{ marginLeft: 16 }}
            />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: Colors.light,
        },
        headerShadowVisible: false,
        drawerActiveBackgroundColor: Colors.selected,
        drawerInactiveTintColor: "#000",
        drawerActiveTintColor: "#000",
        overlayColor: "rgba(0,0,0,0.2)",
        drawerItemStyle: { borderRadius: 12 },
        drawerLabelStyle: { marginLeft: -20 },
        drawerStyle: { width: dimensions.width * 0.8 },
      }}
    >
      <Drawer.Screen
        name="(chat)/new"
        getId={() => Math.random().toString()}
        options={{
          title: "New Chat",
          drawerIcon: () => (
            <View style={[styles.item, { backgroundColor: "#000" }]}>
              <Image
                source={require("@/assets/images/logo-white.png")}
                style={styles.btnImage}
              />
            </View>
          ),
          headerRight: () => (
            <Link href="/(auth)/(drawer)/(chat)/new" push asChild>
              <TouchableOpacity>
                <Ionicons
                  name="create-outline"
                  size={24}
                  color={Colors.grey}
                  style={{ marginRight: 16 }}
                />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />

      <Drawer.Screen
        name="dalle"
        options={{
          title: "Dall-E",
          drawerIcon: () => (
            <View style={[styles.item, { backgroundColor: "#000" }]}>
              <Image
                source={require("@/assets/images/dalle.png")}
                style={styles.dallEImage}
              />
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="explore"
        options={{
          title: "Explore GPTs",
          drawerIcon: () => (
            <View style={styles.exploreItem}>
              <Ionicons name="apps-outline" size={20} color={"#000"} />
            </View>
          ),
        }}
      />
    </Drawer>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    marginHorizontal: 16,
    borderRadius: 10,
    height: 34,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.input,
  },
  searchIcon: {
    padding: 6,
  },
  input: {
    flex: 1,
    paddingTop: 8,
    paddingRight: 8,
    paddingBottom: 8,
    paddingLeft: 0,
    alignItems: "center",
    color: "#424242",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  roundImage: {
    width: 30,
    height: 30,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  item: {
    borderRadius: 15,
    overflow: "hidden",
  },
  btnImage: {
    margin: 6,
    width: 16,
    height: 16,
  },
  dallEImage: {
    width: 28,
    height: 28,
    resizeMode: "cover",
  },
  exploreItem: {
    backgroundColor: "#fff",
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Layout;
