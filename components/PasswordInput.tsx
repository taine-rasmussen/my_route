import { Input, XStack, YStack, Text } from 'tamagui';
import { AlertCircle, Eye, EyeOff } from '@tamagui/lucide-icons';
import React, { useState } from 'react';
import { InputErrorKeys } from '@/app/types';

interface IPasswordInput {
  onChange: (value: string) => void;
  value: string;
  width?: number | string;
  error: boolean;
  setError: (field: InputErrorKeys, value: boolean) => void;
  placeholder?: string;
}

const PasswordInput = (props: IPasswordInput) => {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState<boolean>(true);
  const errorMessage = 'Password must be at least 7 characters long';

  const toggleSecureTextEntry = () =>
    setIsSecureTextEntry((prevState) => !prevState);

  const handleBlur = () => {
    if (props.value.length < 7) {
      return props.setError('password', true);
    } else {
      return props.setError('password', false);
    }
  };

  return (
    <YStack width={props.width || 'auto'} space={4}>
      <XStack
        borderRadius="$4"
        alignItems="center"
        borderColor="$borderColor"
        backgroundColor="$background"
      >
        <Input
          flex={1}
          size={'$5'}
          borderWidth={3}
          onBlur={handleBlur}
          value={props.value}
          placeholder={props.placeholder ? props.placeholder : 'Password...'}
          onChangeText={props.onChange}
          secureTextEntry={isSecureTextEntry}
        />
        <YStack
          right={10}
          height="100%"
          position="absolute"
          justifyContent="center"
        >
          {isSecureTextEntry ? (
            <Eye size={20} color="$color" onPress={toggleSecureTextEntry} />
          ) : (
            <EyeOff size={20} color="$color" onPress={toggleSecureTextEntry} />
          )}
        </YStack>
      </XStack>
      <YStack height={24}>
        {props.error && (
          <XStack paddingInlineStart={8} alignItems="center">
            <AlertCircle size={'$1'} color="red" />
            <Text paddingLeft={8} color="red">
              {errorMessage}
            </Text>
          </XStack>
        )}
      </YStack>
    </YStack>
  );
};

export default PasswordInput;
