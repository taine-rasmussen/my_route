import { InputErrorKeys, InputType } from "@/app/types";
import { Input, Text, YStack, XStack } from "tamagui";
import { AlertCircle } from "@tamagui/lucide-icons";
import { isValidEmail, getInputErrorMessage } from "@/app/utils";
import { useMemo } from "react";

interface IFormInput extends React.ComponentProps<typeof Input> {
  value: string;
  error: boolean;
  placeholder: string;
  inputType: InputType;
  onChange: (e: any) => void;
  setError: (field: InputErrorKeys, value: boolean) => void;
}

const FormInput = (props: IFormInput) => {
  const errorMessage = useMemo(() => {
    return getInputErrorMessage(props.inputType);
  }, [props.error]);

  const handleBlur = () => {
    if (props.inputType === "email") {
      const isValid = isValidEmail(props.value);
      props.setError("email", !isValid);
    }
  };

  return (
    <YStack width={props.width ? props.width : "45%"} space={4}>
      <Input
        size="$5"
        {...props}
        borderWidth={3}
        value={props.value}
        onBlur={handleBlur}
        onChangeText={props.onChange}
        placeholder={props.placeholder}
      />
      <YStack height={24}>
        {props.error && (
          <XStack paddingInlineStart={8} alignItems="center">
            <AlertCircle size={"$1"} color="red" />
            <Text paddingLeft={8} color="red">
              {errorMessage}
            </Text>
          </XStack>
        )}
      </YStack>
    </YStack>
  );
};

export default FormInput;
