import { Input, XStack, YStack } from "tamagui";
import { Eye, EyeOff } from "@tamagui/lucide-icons";
import React, { useState } from "react";
import { InputErrorKeys } from "@/app/types";

interface IPasswordInput {
  onChange: (value: string) => void;
  value: string;
  width?: number | string;
  error?: boolean;
  setError?: (field: InputErrorKeys, value: boolean) => void;
}

const PasswordInput = (props: IPasswordInput) => {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState<boolean>(true);

  const toggleSecureTextEntry = () =>
    setIsSecureTextEntry((prevState) => !prevState);

  return (
    <XStack
      width={props.width || "auto"}
      borderRadius="$4"
      alignItems="center"
      borderColor="$borderColor"
      backgroundColor="$background"
    >
      <Input
        borderWidth={3}
        flex={1}
        size={"$5"}
        value={props.value}
        placeholder="Password..."
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
  );
};

export default PasswordInput;
