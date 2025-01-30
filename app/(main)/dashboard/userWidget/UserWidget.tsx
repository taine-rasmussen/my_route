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
import { useState } from 'react';
import SettingsDialog from '../settingsDialog/SettingsDialog';
import { useAuth } from '@/app/contexts/AuthContext';

const UserWidget = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleDialogToggle = () => {
    setOpenDialog((prevState) => !prevState);
  };

  const username = user ? `${user.first_name} ${user.last_name}` : 'nah';

  return (
    <>
      <SettingsDialog
        user={user}
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
                <SizableText size="$4">{user.location}</SizableText>
              </XStack>
              <Separator vertical />
              <XStack gap={4}>
                <Home size="$1" />
                <SizableText size="$4">{user.home_gym}</SizableText>
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
