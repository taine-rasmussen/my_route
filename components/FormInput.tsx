import { InputErrorKeys } from "@/app/types";
import { Input, Label, YStack } from "tamagui";

interface IFormInput extends React.ComponentProps<typeof Input> {
  value: string;
  error: boolean;
  placeholder: string;
  onChange: (e: any) => void;
  setError: (field: InputErrorKeys, value: boolean) => void;
}

const FormInput = (props: IFormInput) => {
  return (
    <YStack width={props.width ? props.width : "45%"}>
      <Input
        size="$5"
        {...props}
        borderWidth={3}
        value={props.value}
        onChangeText={props.onChange}
        placeholder={props.placeholder}
      />
      {/* {props.error && <ToolTip message={"Invaild characters"} type={"error"} />} */}
    </YStack>
  );
};

export default FormInput;
