import React from 'react';
import { YStack } from 'tamagui';
import Header from './Header';
import Form from './Form';

interface ILoginFlow {
  handleViewToggle: () => void;
}

const LoginFlow = (props: ILoginFlow) => {
  return (
    <YStack f={1} bg="white">
      <Header />
      <Form handleViewToggle={props.handleViewToggle} />
    </YStack>
  );
};

export default LoginFlow;
