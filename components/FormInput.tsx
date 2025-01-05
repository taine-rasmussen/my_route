import { InputErrorKeys } from "@/app/types";
import { Input } from "tamagui";

interface IFormInput extends React.ComponentProps<typeof Input> {
  value: string;
  error: boolean;
  placeholder: string;
  onChange: (e: any) => void;
  setError: (field: InputErrorKeys, value: boolean) => void;
}

const FormInput = (props: IFormInput) => {
  return (
    <>
      <Input
        size="$5"
        {...props}
        borderWidth={3}
        value={props.value}
        onChangeText={props.onChange}
        placeholder={props.placeholder}
        width={props.width ? props.width : "45%"}
      />
    </>
  );
};

export default FormInput;
