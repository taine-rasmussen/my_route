import React from "react";
import { YStack, H6, SizableText, Text } from "tamagui";

interface IHeader {
  handleViewToggle: () => void;
}

const Header = (props: IHeader) => {
  return (
    <YStack alignSelf="flex-start" padding={16} marginBlock={64}>
      <H6 size="$10">Create an account</H6>
      <SizableText theme="alt1" size="$4">
        Already have an account?{" "}
        <Text
          onPress={props.handleViewToggle}
          style={{ textDecorationLine: "underline", cursor: "pointer" }}
        >
          Log in
        </Text>
      </SizableText>
    </YStack>
  );
};

export default Header;
