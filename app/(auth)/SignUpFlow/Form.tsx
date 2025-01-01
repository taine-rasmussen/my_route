import PasswordInput from "@/components/PasswordInput";
import { YStack, XStack, Input, Separator, Button, Text } from "tamagui";
import { Dimensions, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useState } from "react";

const Form = () => {
  const [value, setValue] = useState<string>("");
  const screenWidth = Dimensions.get("window").width;
  const inputWidth = screenWidth * 0.9 + 16;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <YStack gap={16} alignItems="center">
        <XStack gap={16}>
          <Input
            size="$5"
            placeholder="First Name..."
            borderWidth={3}
            width="45%"
          />
          <Input
            size="$5"
            placeholder="Last Name..."
            borderWidth={3}
            width="45%"
          />
        </XStack>
        <Input
          size="$5"
          placeholder="Email..."
          borderWidth={3}
          width={inputWidth}
        />
        <PasswordInput value={value} setValue={setValue} width={inputWidth} />
        <YStack gap={16} marginBlock={36}>
          <Button
            size="$5"
            theme="active"
            justifyContent="center"
            width={inputWidth}
          >
            Create account
          </Button>
          <XStack width={inputWidth}>
            <Separator alignSelf="center" />
            <Text>Or register with</Text>
            <Separator alignSelf="center" />
          </XStack>
          <XStack gap={16}>
            <Button
              size="$5"
              variant="outlined"
              justifyContent="center"
              width={inputWidth / 2 - 16}
            >
              Google
            </Button>
            <Button
              size="$5"
              variant="outlined"
              justifyContent="center"
              width={inputWidth / 2 - 16}
            >
              Apple
            </Button>
          </XStack>
        </YStack>
      </YStack>
    </TouchableWithoutFeedback>
  );
};

export default Form;
