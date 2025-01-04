import PasswordInput from "@/components/PasswordInput";
import { YStack, XStack, Input, Separator, Button, Text } from "tamagui";
import {
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { useState, useMemo } from "react";
import FormInput from "@/components/FormInput";

const Form = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const screenWidth = Dimensions.get("window").width;
  const inputWidth = useMemo(() => screenWidth * 0.9 + 16, [screenWidth]);

  return (
    <KeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <YStack gap={16} alignItems="center">
          <XStack gap={16}>
            <FormInput
              value={firstName}
              onChange={setFirstName}
              placeholder="First Name..."
            />
            <FormInput
              value={lastName}
              onChange={setLastName}
              placeholder="Last Name..."
            />
          </XStack>
          <FormInput
            value={email}
            width={inputWidth}
            onChange={setEmail}
            placeholder="Email.."
          />
          <PasswordInput
            value={password}
            onChange={setPassword}
            width={inputWidth}
          />
          <YStack gap={16} marginBlock={36}>
            <Button
              size="$5"
              theme="active"
              justifyContent="center"
              width={inputWidth}
            >
              Create account
            </Button>
            <XStack width={inputWidth}>
              <Separator alignSelf="center" />
              <Text>Or register with</Text>
              <Separator alignSelf="center" />
            </XStack>
            <XStack gap={16}>
              <Button
                size="$5"
                variant="outlined"
                justifyContent="center"
                width={inputWidth / 2 - 16}
              >
                Google
              </Button>
              <Button
                size="$5"
                variant="outlined"
                justifyContent="center"
                width={inputWidth / 2 - 16}
              >
                Apple
              </Button>
            </XStack>
          </YStack>
        </YStack>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Form;
