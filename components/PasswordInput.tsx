import { Input, XStack, YStack, Text } from 'tamagui';
import { AlertCircle, Eye, EyeOff } from '@tamagui/lucide-icons';
import React, { useState } from 'react';
import { InputErrorKeys } from '@/app/types';

interface IPasswordInput {
  value: string;
  error: boolean;
  placeholder?: string;
  width?: number | string;
  errorKey?: InputErrorKeys;
  onChange: (value: string) => void;
  setError: (field: InputErrorKeys, value: boolean) => void;
  isOpen?: boolean;
}

const PasswordInput: React.FC<IPasswordInput> = ({
  value,
  error,
  placeholder,
  width,
  errorKey,
  onChange,
  setError,
  isOpen,
}) => {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState<boolean>(true);
  const errorMessage = 'Password must be at least 7 characters long';

  const toggleSecureTextEntry = () =>
    setIsSecureTextEntry((prevState) => !prevState);

  const handleBlur = () => {
    if (isOpen) {
      const key = errorKey ?? 'password';
      setError(key, value.length < 7);
    }
  };

  return (
    <YStack width={width || 'auto'} space={4}>
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
          value={value}
          onChangeText={onChange}
          secureTextEntry={isSecureTextEntry}
          borderColor={error ? '#F47174' : '$borderColor'}
          placeholder={placeholder ?? 'Password...'}
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
        {error && (
          <XStack paddingInlineStart={8} alignItems="center">
            <AlertCircle size={'$1'} color="#F47174" />
            <Text paddingLeft={8} color="#F47174">
              {errorMessage}
            </Text>
          </XStack>
        )}
      </YStack>
    </YStack>
  );
};

export default PasswordInput;
