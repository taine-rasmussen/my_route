import React from "react";
import { YStack, H1, SizableText } from "tamagui";

interface ISignUpFlow {
  handleViewToggle: () => void;
}

const SignUpFlow = (props: ISignUpFlow) => {
  return (
    <YStack alignSelf="center">
      <H1>Create an account</H1>
      <SizableText theme="alt1" size="$3">
        Already have an account?{" "}
        <span onClick={props.handleViewToggle}>Log in</span>
      </SizableText>
    </YStack>
  );
};

export default SignUpFlow;
