import { Sheet, View, YStack } from 'tamagui';
import { ChevronDown } from '@tamagui/lucide-icons';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';
import { IUser } from '@/app/types';
import UserHeader from './UserHeader';
import { useState, useEffect } from 'react';
import SettingsMenu from './SettingsMenu';
import EditProfile from './EditProfile';

interface ISettingsDialog {
  user: IUser;
  openDialog: boolean;
  toggleDialog: () => void;
  signOut: () => Promise<void>;
}

const SettingsDialog = (props: ISettingsDialog) => {
  const [toggleProfileEdit, setToggleProfileEdit] = useState<boolean>(false);
  const [isPwdChangeOpen, setIsPwdChangeOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!props.openDialog) {
      setToggleProfileEdit(false);
      setIsPwdChangeOpen(false);
    }
  }, [props.openDialog]);

  return (
    <Sheet
      modal={true}
      dismissOnSnapToBottom
      open={props.openDialog}
      snapPoints={[94, 50, 25]}
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
            <UserHeader
              user={props.user}
              setToggleProfileEdit={setToggleProfileEdit}
              toggleProfileEdit={toggleProfileEdit}
            />
            {toggleProfileEdit ? (
              <EditProfile
                setToggleProfileEdit={setToggleProfileEdit}
                key={props.openDialog ? 'EditOpen' : 'EditClosed'}
              />
            ) : (
              <SettingsMenu
                isPwdChangeOpen={isPwdChangeOpen}
                setIsPwdChangeOpen={setIsPwdChangeOpen}
                key={props.openDialog ? 'open' : 'closed'}
                signOut={props.signOut}
              />
            )}
          </YStack>
        </SafeAreaWrapper>
      </Sheet.Frame>
    </Sheet>
  );
};

export default SettingsDialog;
