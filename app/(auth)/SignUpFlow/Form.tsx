import PasswordInput from "@/components/PasswordInput";
import { YStack, XStack, Separator, Button, Text } from "tamagui";
import {
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { useState, useMemo } from "react";
import FormInput from "@/components/FormInput";
import { InputErrorKeys } from "@/app/types";

const initState = {
  firstName: false,
  lastName: false,
  email: false,
  password: false,
};

const Form = () => {
  const [email, setEmail] = useState<string>("");
  const screenWidth = Dimensions.get("window").width;
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [inputErrors, setInputErrors] = useState(initState); // TS
  const inputWidth = useMemo(() => screenWidth * 0.9 + 24, [screenWidth]);

  const setError: (field: InputErrorKeys, value: boolean) => void = (
    field,
    value
  ) => {
    setInputErrors((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const disableSubmit = useMemo(() => {
    return (
      Object.values(inputErrors).some(Boolean) ||
      ![firstName, lastName, email, password].every((input) => input.length > 0)
    );
  }, [inputErrors, firstName, lastName, email, password]);

  const handleFormSubmit = () => {
    if (password.length < 7) return setError("password", true);
    const body = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password, // encrypt
    };
    console.log(body);
  };

  return (
    <KeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <YStack alignItems="center">
          <XStack gap={24}>
            <FormInput
              value={firstName}
              setError={setError}
              inputType="firstName"
              onChange={setFirstName}
              placeholder="First Name..."
              error={inputErrors.firstName}
            />
            <FormInput
              value={lastName}
              setError={setError}
              inputType="lastName"
              onChange={setLastName}
              placeholder="Last Name..."
              error={inputErrors.lastName}
            />
          </XStack>
          <FormInput
            value={email}
            inputType="email"
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
          <YStack gap={24} marginBlock={64}>
            <Button
              size="$5"
              theme="active"
              width={inputWidth}
              justifyContent="center"
              disabled={disableSubmit}
              onPress={handleFormSubmit}
              opacity={disableSubmit ? 0.5 : 1}
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
