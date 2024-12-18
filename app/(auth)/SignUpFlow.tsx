import React, { useState } from "react";
import { YStack, H1, SizableText, Input } from "tamagui";
import InputWithIcon from "@/components/PasswordInput";

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
          <span
            onClick={props.handleViewToggle}
            style={{ textDecorationLine: "underline", cursor: "pointer" }}
          >
            Log in
          </span>
        </SizableText>
      </YStack>
      <YStack alignSelf="center" gap={8}>
        <Input flex={1} size="$5" placeholder="Name..." borderWidth={3} />
        <Input flex={1} size="$5" placeholder="Email..." borderWidth={3} />
        <InputWithIcon value={value} setValue={setValue} />
      </YStack>
    </>
  );
};

export default SignUpFlow;
