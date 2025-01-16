import {
  SizableText,
  Card,
  XStack,
  Avatar,
  YStack,
  Separator,
  View,
} from "tamagui";
import { MapPin, Settings } from "@tamagui/lucide-icons";

const UserWidget = () => {
  return (
    <Card elevate size="$10" bordered>
      <XStack padding={16} gap={24}>
        <Avatar circular size="$8">
          <Avatar.Image accessibilityLabel="profile_picture" src="" />
          <Avatar.Fallback backgroundColor="$blue10" />
        </Avatar>
        <YStack gap={4}>
          <SizableText size="$6">Taine Rasmussen</SizableText>
          <Separator />
          <XStack gap={4}>
            <MapPin size="$1" />
            <SizableText size="$4">London</SizableText>
          </XStack>
        </YStack>
        <View position="absolute" top={16} right={16}>
          <Settings size="$2" />
        </View>
      </XStack>
    </Card>
  );
};

export default UserWidget;
