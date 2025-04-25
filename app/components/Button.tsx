import { Button as TamaguiButton, ButtonProps } from 'tamagui';

type ButtonType = 'normal' | 'cancel';

interface IButton extends ButtonProps {
  type?: ButtonType;
}

const AppButton = ({
  children,
  type = 'normal',
  disabled = false,
  ...rest
}: IButton) => {
  const getTypeStyle = () => {
    switch (type) {
      case 'cancel':
        return {
          backgroundColor: '$red10',
          color: '$red1',
        };
      case 'normal':
      default:
        return {};
    }
  };

  const disabledStyle = disabled
    ? {
        opacity: 0.5,
      }
    : {};

  return (
    <TamaguiButton
      {...rest}
      disabled={disabled}
      {...getTypeStyle()}
      {...disabledStyle}
    >
      {children}
    </TamaguiButton>
  );
};

export default AppButton;
