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
import { InputErrorKeys } from "@/app/types";

const Form = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [inputErrors, setInputErrors] = useState({
    firstName: true,
    lastName: false,
    email: false,
    password: false,
  });

  const screenWidth = Dimensions.get("window").width;
  const inputWidth = useMemo(() => screenWidth * 0.9 + 16, [screenWidth]);

  const setError: (field: InputErrorKeys, value: boolean) => void = (
    field,
    value
  ) => {
    setInputErrors((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <KeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <YStack gap={16} alignItems="center">
          <XStack gap={16}>
            <FormInput
              value={firstName}
              setError={setError}
              onChange={setFirstName}
              placeholder="First Name..."
              error={inputErrors.firstName}
            />
            <FormInput
              value={lastName}
              setError={setError}
              onChange={setLastName}
              placeholder="Last Name..."
              error={inputErrors.lastName}
            />
          </XStack>
          <FormInput
            value={email}
            width={inputWidth}
            setError={setError}
            onChange={setEmail}
            placeholder="Email.."
            error={inputErrors.email}
          />
          <PasswordInput
            value={password}
            width={inputWidth}
            setError={setError}
            onChange={setPassword}
            error={inputErrors.password}
          />
          <YStack gap={16} marginBlock={36}>
            <Button
              size="$5"
              theme="active"
              width={inputWidth}
              justifyContent="center"
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
