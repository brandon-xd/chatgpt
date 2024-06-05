import Colors from "@/constants/Colors";
import { View, Text } from "react-native";
import * as DropdownMenu from "zeego/dropdown-menu";

export type HeaderDropDownProps = {
  title: string;
  selected?: string;
  onSelect?: (key: string) => void;
  items: Array<{ key: string; title: string; icon: string }>;
};

const HeaderDropDown = ({
  title,
  selected,
  items,
  onSelect,
}: HeaderDropDownProps) => {
  // TODO: Add support for icons on Android devices **<DropdownMenu.ItemIcon> only working with iOS props 6/5/2024**
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontWeight: "500", fontSize: 18 }}>{title}</Text>
          {selected && (
            <Text
              style={{
                marginLeft: 6,
                color: Colors.greyLight,
                fontWeight: "500",
                fontSize: 16,
              }}
            >
              {selected} &gt;
            </Text>
          )}
        </View>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {items.map((item) => (
          <DropdownMenu.Item
            key={item.key}
            onSelect={() => onSelect && onSelect(item.key)}
          >
            <DropdownMenu.ItemTitle>{item.title}</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon ios={{ name: item.icon, pointSize: 18 }} />
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default HeaderDropDown;
