import { useState } from 'react';
import {
  ListItem,
  SizableText,
  XStack,
  Button,
  Sheet,
  YStack,
  Separator,
} from 'tamagui';
import { Lock } from '@tamagui/lucide-icons';
import PasswordInput from '@/components/PasswordInput';
import { InputErrorKeys } from '@/app/types';
import { getFromSecureStore } from '@/app/utils';

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

  const handleClose = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setInputErrors(initState);
    setIsOpen(false);
  };

  const disableSaveBtn =
    !currentPassword ||
    !newPassword ||
    !confirmNewPassword ||
    Object.values(inputErrors).includes(true) ||
    newPassword !== confirmNewPassword;

  const showPasswordMatchError =
    newPassword && confirmNewPassword && newPassword !== confirmNewPassword;

  const handleSubmit = async () => {
    setInputErrors(initState);

    if (disableSaveBtn) return;

    try {
      const accessToken = await getFromSecureStore('access_token');

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}change_password/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            current_password: currentPassword,
            new_password: newPassword,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.error('Error Response:', data);
        throw new Error(data.detail || 'Something went wrong');
      }

      alert('Password updated successfully');
      handleClose();
    } catch (error) {
      console.error('Error:', error);

      let errorMessage = 'An unexpected error occurred';

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error !== null) {
        errorMessage = JSON.stringify(error);
      }

      alert(errorMessage);
    }
  };

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
              <Separator />
              <YStack gap={16}>
                <PasswordInput
                  isOpen={isOpen}
                  setError={setError}
                  value={currentPassword}
                  errorKey="currentPassword"
                  onChange={setCurrentPassword}
                  placeholder="Current password..."
                  error={inputErrors.currentPassword}
                />
                <YStack>
                  <PasswordInput
                    isOpen={isOpen}
                    value={newPassword}
                    setError={setError}
                    errorKey="newPassword"
                    onChange={setNewPassword}
                    placeholder="New Password..."
                    error={inputErrors.newPassword}
                  />
                  <PasswordInput
                    isOpen={isOpen}
                    setError={setError}
                    value={confirmNewPassword}
                    errorKey="confirmNewPassword"
                    onChange={setConfirmNewPassword}
                    placeholder="Confirm New Password..."
                    error={inputErrors.confirmNewPassword}
                  />
                </YStack>
              </YStack>

              {showPasswordMatchError && (
                <SizableText size="$4" color="red">
                  New password and confirm new password must match.
                </SizableText>
              )}

              <XStack gap={16} width={'95%'}>
                <Button
                  width={'50%'}
                  disabled={disableSaveBtn}
                  opacity={disableSaveBtn ? 0.5 : 1}
                  onPress={handleSubmit}
                >
                  Save
                </Button>
                <Button width={'50%'} onPress={handleClose}>
                  Close
                </Button>
              </XStack>
            </YStack>
          </Sheet.ScrollView>
        </Sheet.Frame>
        <Sheet.Overlay />
      </Sheet>
    </>
  );
};

export default ChangePwdListListItem;
