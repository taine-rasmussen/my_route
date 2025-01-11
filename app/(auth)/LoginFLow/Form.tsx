import FormInput from "@/components/FormInput";
import PasswordInput from "@/components/PasswordInput";
import { Button, SizableText, YStack, Text, Separator, XStack } from "tamagui";
import { useState, useMemo } from "react";
import { Dimensions } from "react-native";
import { InputErrorKeys } from "@/app/types";

interface IForm {
  handleViewToggle: () => void;
}

const initState = {
  email: false,
  password: false,
};

const Form = (props: IForm) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [inputErrors, setInputErrors] = useState(initState);
  const screenWidth = Dimensions.get("window").width;
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
      ![email, password].every((input) => input.length > 0)
    );
  }, [inputErrors, email, password]);

  const handleFormSubmit = async () => {
    if (password.length < 7) return setError("password", true);
    const body = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();
      console.log("Login successful:", data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <YStack alignItems="center">
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
      <YStack gap={24} alignItems="center" width="95%">
        <Button
          size="$5"
          theme="active"
          width={inputWidth}
          justifyContent="center"
          disabled={disableSubmit}
          onPress={handleFormSubmit}
          opacity={disableSubmit ? 0.5 : 1}
        >
          Login
        </Button>
        <XStack width={inputWidth}>
          <Separator alignSelf="center" />
          <Text>Or continue with</Text>
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
        <SizableText theme="alt1" size="$4">
          Don't have an account?{" "}
          <Text
            onPress={props.handleViewToggle}
            style={{ textDecorationLine: "underline", cursor: "pointer" }}
          >
            Sign up
          </Text>
        </SizableText>
      </YStack>
    </YStack>
  );
};

export default Form;
