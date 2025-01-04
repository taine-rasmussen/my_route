import { Toast, useToastController, useToastState } from "@tamagui/toast";

type ToastTypes = "error" | "alert";

interface IToastMessage {
  message: string;
  type: ToastTypes;
}

const ToastMessage = (props: IToastMessage) => {
  return <Toast></Toast>;
};
