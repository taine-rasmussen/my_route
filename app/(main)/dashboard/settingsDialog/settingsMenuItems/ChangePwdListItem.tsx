import { useState } from 'react';
import { ListItem, SizableText, XStack, Button, Sheet, YStack } from 'tamagui';
import { Lock } from '@tamagui/lucide-icons';
import PasswordInput from '@/components/PasswordInput';
import { InputErrorKeys } from '@/app/types';

const initState = {
  currentPassword: false,
  newPassword: false,
  confirmNewPassword: false,
};

const ChangePwdListListItem = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [inputErrors, setInputErrors] = useState(initState);

  const setError: (field: InputErrorKeys, value: boolean) => void = (
    field,
    value,
  ) => {
    setInputErrors((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  console.log(isOpen);

  return (
    <>
      <ListItem>
        <XStack
          flex={1}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <XStack gap={8} alignItems="center">
            <Lock size="$1" />
            <SizableText size="$6">Password</SizableText>
          </XStack>
          <Button onPress={() => setIsOpen(true)}>Change</Button>
        </XStack>
      </ListItem>

      <Sheet modal open={isOpen} onOpenChange={setIsOpen} dismissOnSnapToBottom>
        <Sheet.Frame>
          <Sheet.ScrollView>
            <YStack padding={16} gap={12}>
              <SizableText size="$6">Reset Password</SizableText>
              <YStack>
                <PasswordInput
                  setError={setError}
                  value={currentPassword}
                  onChange={setCurrentPassword}
                  placeholder="Current password..."
                  error={inputErrors.currentPassword}
                />
                <PasswordInput
                  value={newPassword}
                  setError={setError}
                  onChange={setNewPassword}
                  placeholder="New Password..."
                  error={inputErrors.newPassword}
                />
                <PasswordInput
                  setError={setError}
                  value={confirmNewPassword}
                  onChange={setConfirmNewPassword}
                  placeholder="Confirm New Password..."
                  error={inputErrors.confirmNewPassword}
                />
              </YStack>
              <Button>Save</Button>
              <Button onPress={() => setIsOpen(false)}>Close</Button>
            </YStack>
          </Sheet.ScrollView>
        </Sheet.Frame>
        <Sheet.Overlay />
      </Sheet>
    </>
  );
};

export default ChangePwdListListItem;
