import { InputErrorKeys } from "@/app/types";
import { Input } from "tamagui";
import { useEffect, useState } from "react";
import useToast from "@/hooks/useToast";

interface IFormInput extends React.ComponentProps<typeof Input> {
  value: string;
  error: boolean;
  placeholder: string;
  onChange: (e: any) => void;
  setError: (field: InputErrorKeys, value: boolean) => void;
}

const FormInput = (props: IFormInput) => {
  const { showToast } = useToast();
  const toastMessage = "Invalid text";

  // Use state to trigger the toast
  const [isTriggered, setIsTriggered] = useState(false);

  // Update state when input changes
  const handleInputChange = (e: any) => {
    props.onChange(e);
    setIsTriggered((prev) => !prev); // Toggle state to trigger `useEffect`
  };

  useEffect(() => {
    showToast(toastMessage, "error");
  }, [isTriggered]); // Effect runs when `isTriggered` changes

  return (
    <Input
      size="$5"
      {...props}
      borderWidth={3}
      value={props.value}
      onChangeText={handleInputChange}
      placeholder={props.placeholder}
      width={props.width ? props.width : "45%"}
    />
  );
};

export default FormInput;
