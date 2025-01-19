import { Sheet, View, YStack } from 'tamagui';
import { ChevronDown } from '@tamagui/lucide-icons';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';
import { IUser } from '@/app/types';
import UserHeader from './UserHeader';
import { useState } from 'react';
import SettingsMenu from './SettingsMenu';

interface ISettingsDialog {
  openDialog: boolean;
  toggleDialog: () => void;
  user: IUser;
}

const SettingsDialog = (props: ISettingsDialog) => {
  const [toggleProfileEdit, setToggleProfileEdit] = useState<boolean>(false);
  return (
    <Sheet
      modal={true}
      dismissOnSnapToBottom
      open={props.openDialog}
      snapPoints={[95, 50, 25]}
      onOpenChange={props.toggleDialog}
      forceRemoveScrollEnabled={props.openDialog}
    >
      <Sheet.Overlay
        animation="medium"
        exitStyle={{ opacity: 0, elevation: 10 }}
        enterStyle={{ opacity: 0 }}
      />
      <Sheet.Frame flex={1} gap="$5">
        <SafeAreaWrapper>
          <View
            top={10}
            right={10}
            zIndex={10}
            position="absolute"
            onPress={props.toggleDialog}
          >
            <ChevronDown size="$3" />
          </View>
          <YStack gap={64}>
            <UserHeader user={props.user} />
            <SettingsMenu />
          </YStack>
        </SafeAreaWrapper>
      </Sheet.Frame>
    </Sheet>
  );
};

export default SettingsDialog;
