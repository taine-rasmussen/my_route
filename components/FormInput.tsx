import { InputErrorKeys } from "@/app/types";
import { Input, Text, YStack } from "tamagui";

interface IFormInput extends React.ComponentProps<typeof Input> {
  value: string;
  error: boolean;
  placeholder: string;
  onChange: (e: any) => void;
  setError: (field: InputErrorKeys, value: boolean) => void;
}

const FormInput = (props: IFormInput) => {
  const errorMessage = "Invalid Input";

  return (
    <YStack width={props.width ? props.width : "45%"} space={4}>
      <Input
        size="$5"
        {...props}
        borderWidth={3}
        value={props.value}
        onChangeText={props.onChange}
        placeholder={props.placeholder}
      />
      <YStack height={24}>
        {props.error && (
          <Text paddingLeft={8} color="red">
            {errorMessage}
          </Text>
        )}
      </YStack>
    </YStack>
  );
};

export default FormInput;
