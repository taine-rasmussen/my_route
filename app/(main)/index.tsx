import React from "react";
import { View, Text } from "tamagui";
import SafeAreaWrapper from "@/components/SafeAreaWrapper";
import Nav from "./nav";

const index = () => {
  return (
    <SafeAreaWrapper>
      <Nav />
      <View>
        <Text>Main app test test</Text>
      </View>
    </SafeAreaWrapper>
  );
};

export default index;
