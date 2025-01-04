import { Input } from "tamagui";

interface IFormInput extends React.ComponentProps<typeof Input> {
  value: string;
  placeholder: string;
  onChange: (e: any) => void;
}

const FormInput = (props: IFormInput) => {
  return (
    <Input
      size="$5"
      {...props}
      borderWidth={3}
      value={props.value}
      onChangeText={props.onChange}
      placeholder={props.placeholder}
      width={props.width ? props.width : "45%"}
    />
  );
};

export default FormInput;
