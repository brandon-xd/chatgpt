import { View, Text, StyleSheet, Image } from "react-native";
import { Message } from "@/utils/interfaces";
import { Role } from "@/utils/interfaces";
import Colors from "@/constants/Colors";

const ChatMessage = ({ content, role, imageUrl, prompt }: Message) => {
  return (
    <View>
      {role === Role.Bot ? (
        <View style={styles.row}>
          <View style={[styles.item]}>
            <Image
              source={require("@/assets/images/logo-white.png")}
              style={styles.btnImage}
            />
          </View>
          <Text style={[styles.text, { marginRight: 40 }]}>{content}</Text>
        </View>
      ) : (
        <View style={styles.row}>
          <Text
            style={[
              styles.text,
              { backgroundColor: "lightgreen", marginLeft: 40 },
            ]}
          >
            {content}
          </Text>
          <Image
            source={require("@/assets/images/george.png")}
            style={styles.avatar}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 14,
    gap: 8,
    marginVertical: 4,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 10,
  },
  item: {
    borderRadius: 10,
    width: 30,
    height: 30,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  btnImage: {
    width: 20,
    height: 20,
    margin: 5,
    backgroundColor: "#000",
    resizeMode: "contain",
  },
  text: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 16,
    padding: 5,
    borderRadius: 12,
    backgroundColor: "#eee",
    marginRight: "auto",
  },
});

export default ChatMessage;
