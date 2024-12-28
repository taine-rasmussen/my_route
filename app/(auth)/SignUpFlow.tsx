import React, { useState } from "react";
import { YStack, H1, SizableText, Input, Text } from "tamagui";
import PasswordInput from "@/components/PasswordInput";

interface ISignUpFlow {
  handleViewToggle: () => void;
}

const SignUpFlow = (props: ISignUpFlow) => {
  const [value, setValue] = useState<string>("");

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
      <YStack alignSelf="center" gap={8}>
        <Input flex={1} size="$5" placeholder="Name..." borderWidth={3} />
        <Input flex={1} size="$5" placeholder="Email..." borderWidth={3} />
        <PasswordInput value={value} setValue={setValue} />
      </YStack>
    </>
  );
};

export default SignUpFlow;
