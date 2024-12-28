import React from "react";
import { View, Text } from "tamagui";

interface ILoginFlow {
  handleViewToggle: () => void;
}

const LoginFlow = (props: ILoginFlow) => {
  return (
    <View>
      <Text>Login Flow</Text>
    </View>
  );
};

export default LoginFlow;
