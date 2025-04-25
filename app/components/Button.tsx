import { Button as TamaguiButton } from 'tamagui';

type ButtonType = 'normal' | 'cancel';

interface IButton {
  text: string;
  size: string;
  type: ButtonType;
  onPress?: () => void;
  disabled?: boolean;
}

const Button = (props: IButton) => {
  return <TamaguiButton size={props.size}>{props.text}</TamaguiButton>;
};

export default Button;
