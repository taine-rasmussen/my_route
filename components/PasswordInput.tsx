import { Input, XStack, YStack } from "tamagui";
import { Eye, EyeOff } from "@tamagui/lucide-icons";
import React, { useState } from "react";

interface IPasswordInput {
  value: string;
  setValue: (value: string) => void;
}

const PasswordInput = (props: IPasswordInput) => {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState<boolean>(true);

  const toggleSecureTextEntry = () =>
    setIsSecureTextEntry((prevState) => !prevState);

  return (
    <YStack padding="$4">
      <XStack
        borderWidth={1}
        borderRadius="$4"
        alignItems="center"
        borderColor="$borderColor"
        backgroundColor="$background"
      >
        <Input
          flex={1}
          size={"$5"}
          borderWidth={3}
          paddingRight={40}
          value={props.value}
          placeholder="Password..."
          onChangeText={props.setValue}
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
    </YStack>
  );
};

export default PasswordInput;
