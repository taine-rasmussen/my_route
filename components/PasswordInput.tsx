import { Card, Input, XStack, YStack, Text } from "tamagui";
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
  const errorMessage = "Does not meet password requierments";

  const toggleSecureTextEntry = () =>
    setIsSecureTextEntry((prevState) => !prevState);

  return (
    <YStack width={props.width || "auto"} space={4}>
      <XStack
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
      <YStack height={24}>
        {props.error && (
          <Card elevate size="$4" bordered>
            <Text paddingLeft={8} color="red">
              {errorMessage}
            </Text>
          </Card>
        )}
      </YStack>
    </YStack>
  );
};

export default PasswordInput;
