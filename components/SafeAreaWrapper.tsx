import React from "react";
import { SafeAreaView } from "react-native";

interface ISafeViewWrapper {
  children: React.ReactNode;
}

const SafeAreaWrapper = (props: ISafeViewWrapper) => {
  return <SafeAreaView>{props.children}</SafeAreaView>;
};

export default SafeAreaWrapper;
