import SignUpFlow from "./SignUpFlow";
import LoginFlow from "./LoginFlow";
import { useState } from "react";

const index = () => {
  const [isLoginView, setisLoginView] = useState<boolean>(false);
  const handleViewToggle = () => setisLoginView((prevState) => !prevState);

  return isLoginView ? (
    <LoginFlow handleViewToggle={handleViewToggle} />
  ) : (
    <SignUpFlow handleViewToggle={handleViewToggle} />
  );
};

export default index;
