import React from "react";
import Header from "./Header";
import Form from "./Form";
import { YStack } from "tamagui";

interface ISignUpFlow {
  handleViewToggle: () => void;
}

const SignUpFlow = (props: ISignUpFlow) => {
  return (
    <YStack justifyContent="center">
      <Header handleViewToggle={props.handleViewToggle} />
      <Form />
    </YStack>
  );
};

export default SignUpFlow;
