import SignUpFlow from "./SignUpFlow";
import LoginFlow from "./LoginFlow";
import { useState } from "react";
import SafeAreaWrapper from "@/components/SafeAreaWrapper";

const index = () => {
  const [isLoginView, setisLoginView] = useState<boolean>(false);
  const handleViewToggle = () => setisLoginView((prevState) => !prevState);

  return (
    <SafeAreaWrapper>
      {isLoginView ? (
        <LoginFlow handleViewToggle={handleViewToggle} />
      ) : (
        <SignUpFlow handleViewToggle={handleViewToggle} />
      )}
    </SafeAreaWrapper>
  );
};

export default index;
