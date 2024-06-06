import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { Message } from "@/utils/Interfaces";
import { Role } from "@/utils/Interfaces";
import Colors from "@/constants/Colors";
import * as ContextMenu from "zeego/context-menu";
import {
  copyImageToClipboard,
  downloadAndSaveImage,
  shareImage,
} from "@/utils/Image";

const ChatMessage = ({
  content,
  role,
  imageUrl,
  prompt,
  loading,
}: Message & { loading?: boolean }) => {
  const contextItems = [
    {
      title: "Copy",
      systemIcon: "doc.on.doc",
      androidIconName: "ic_menu_slideshow",
      action: () => copyImageToClipboard(imageUrl!),
    },
    {
      title: "Save to Photos",
      systemIcon: "arrow.down.to.line",
      androidIconName: "ic_menu_save",
      action: () => downloadAndSaveImage(imageUrl!),
    },
    {
      title: "Share",
      systemIcon: "square.and.arrow.up",
      androidIconName: "ic_menu_share",
      action: () => shareImage(imageUrl!),
    },
  ];

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
          {loading ? (
            <View style={styles.loading}>
              <ActivityIndicator color={Colors.primary} />
            </View>
          ) : (
            <>
              {content === "" && imageUrl ? (
                <ContextMenu.Root>
                  <ContextMenu.Trigger>
                    <Pressable>
                      <Image
                        source={{ uri: imageUrl }}
                        style={styles.previewImage}
                      />
                    </Pressable>
                  </ContextMenu.Trigger>
                  <ContextMenu.Content>
                    {contextItems.map((item, index) => (
                      <ContextMenu.Item key={item.title} onSelect={item.action}>
                        <ContextMenu.ItemTitle>
                          {item.title}
                        </ContextMenu.ItemTitle>
                        <ContextMenu.ItemIcon
                          // ios={{
                          //   name: item.systemIcon,
                          //   pointSize: 18,
                          // }}
                          androidIconName={item.androidIconName}
                        />
                      </ContextMenu.Item>
                    ))}
                  </ContextMenu.Content>
                  <Image
                    source={{ uri: imageUrl }}
                    style={styles.previewImage}
                  />
                </ContextMenu.Root>
              ) : (
                <Text style={[styles.text, { marginRight: 40 }]}>
                  {content}
                </Text>
              )}
            </>
          )}
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
  loading: {
    justifyContent: "center",
    height: 26,
    marginLeft: 14,
  },
  previewImage: {
    width: 240,
    height: 240,
    borderRadius: 10,
  },
});

export default ChatMessage;
