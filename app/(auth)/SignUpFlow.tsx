import React, { useState } from "react";
import {
  YStack,
  H1,
  SizableText,
  Input,
  Text,
  XStack,
  Button,
  Separator,
} from "tamagui";
import PasswordInput from "@/components/PasswordInput";
import { Dimensions } from "react-native";

interface ISignUpFlow {
  handleViewToggle: () => void;
}

const SignUpFlow = (props: ISignUpFlow) => {
  const [value, setValue] = useState<string>("");
  const screenWidth = Dimensions.get("window").width;
  const inputWidth = screenWidth * 0.9 + 16;

  return (
    <>
      <YStack alignSelf="center">
        <H1>Create an account</H1>
        <SizableText theme="alt1" size="$3">
          Already have an account?{" "}
          <SizableText theme="alt1" size="$3">
            Already have an account?{" "}
            <Text
              onPress={props.handleViewToggle}
              style={{ textDecorationLine: "underline", cursor: "pointer" }}
            >
              Log in
            </Text>
          </SizableText>
        </SizableText>
      </YStack>
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
    </>
  );
};

export default SignUpFlow;
