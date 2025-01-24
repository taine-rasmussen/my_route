import {
  SizableText,
  Card,
  XStack,
  Avatar,
  YStack,
  Separator,
  View,
} from 'tamagui';
import { MapPin, Settings, Home } from '@tamagui/lucide-icons';
import { useUser } from '@/app/contexts/UserContext';
import { useEffect, useState } from 'react';
import { IUser } from '@/app/types';
import SettingsDialog from '../settingsDialog/SettingsDialog';
import { useAuth } from '@/app/contexts/AuthContext';

const UserWidget = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [userObj, setUserObj] = useState<IUser>({} as IUser);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.id) return;
    const getUserData = async () => {
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_BASE_URL}get_user/?id=${user?.id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (!response.ok) {
          throw new Error('Failed to create user');
        }

        const data = await response.json();
        setUserObj(data);
      } catch (error) {
        console.error(error);
      } finally {
      }
    };

    getUserData();
  }, [user]);

  const handleDialogToggle = () => {
    setOpenDialog((prevState) => !prevState);
  };

  const username = `${userObj.first_name} ${userObj.last_name}`;

  return (
    <>
      <SettingsDialog
        user={userObj}
        signOut={signOut}
        openDialog={openDialog}
        toggleDialog={handleDialogToggle}
      />
      <Card elevate size="$10" bordered>
        <XStack padding={16} gap={24}>
          <Avatar circular size="$8">
            <Avatar.Image
              accessibilityLabel="profile_picture"
              src="/Users/tainerasmussen/Desktop/my_route/assets/images/favicon.png"
            />
            <Avatar.Fallback backgroundColor="$blue10" />
          </Avatar>
          <YStack gap={4}>
            <SizableText size="$6">{username}</SizableText>
            <Separator />
            <XStack gap={8}>
              <XStack gap={4}>
                <MapPin size="$1" />
                <SizableText size="$4">{userObj.location}</SizableText>
              </XStack>
              <Separator vertical />
              <XStack gap={4}>
                <Home size="$1" />
                <SizableText size="$4">{userObj.home_gym}</SizableText>
              </XStack>
            </XStack>
          </YStack>
          <View position="absolute" top={16} right={16}>
            <Settings size="$2" onPress={handleDialogToggle} />
          </View>
        </XStack>
      </Card>
    </>
  );
};

export default UserWidget;
