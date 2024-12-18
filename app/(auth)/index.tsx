import SignUpFlow from "./SignUpFlow";
import LoginFlow from "./LoginFlow";

const index = () => {
  const hasAccount = false;
  return hasAccount ? <LoginFlow /> : <SignUpFlow />;
};

export default index;
