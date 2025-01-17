import {
  SizableText,
  Card,
  XStack,
  Avatar,
  YStack,
  Separator,
  View,
} from "tamagui";
import { MapPin, Settings, Home } from "@tamagui/lucide-icons";
import { useUser } from "@/app/UserContext";
import { useEffect, useState } from "react";
import { IUser } from "@/app/types";

const UserWidget = () => {
  const { user } = useUser();
  const [state, setState] = useState<IUser>({} as IUser);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.id) return;
    const getUserData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_BASE_URL}get_user/?id=${user?.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to create user");
        }

        const data = await response.json();
        setState(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, [user]);

  const username = `${state.first_name} ${state.last_name}`;

  return (
    <Card elevate size="$10" bordered>
      <XStack padding={16} gap={24}>
        <Avatar circular size="$8">
          <Avatar.Image accessibilityLabel="profile_picture" src="" />
          <Avatar.Fallback backgroundColor="$blue10" />
        </Avatar>
        <YStack gap={4}>
          <SizableText size="$6">{username}</SizableText>
          <Separator />
          <XStack gap={8}>
            <XStack gap={4}>
              <MapPin size="$1" />
              <SizableText size="$4">{state.location}</SizableText>
            </XStack>
            <Separator vertical />
            <XStack gap={4}>
              <Home size="$1" />
              <SizableText size="$4">{state.home_gym}</SizableText>
            </XStack>
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
