import { useToastController } from "@tamagui/toast";

const useToast = () => {
  const toast = useToastController();
  console.log("fired");
  const showToast = (message: string, type: "error" | "alert") => {
    toast.show(type.toUpperCase(), {
      message,
      native: false,
      duration: 3000,
    });
  };

  return { showToast };
};

export default useToast;
