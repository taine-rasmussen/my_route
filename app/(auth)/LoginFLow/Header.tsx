import React from "react";
import { YStack, H6, SizableText } from "tamagui";

const Header = () => {
  return (
    <YStack alignSelf="center" padding={16} marginBlock={64}>
      <H6 size="$10">Welcome Back</H6>
      <SizableText theme="alt1" size="$4" alignSelf="center">
        Log into your account below
      </SizableText>
    </YStack>
  );
};

export default Header;
