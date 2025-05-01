import SignUpFlow from './SignUpFlow';
import LoginFlow from './LoginFLow';
import { useState } from 'react';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';

const index = () => {
  const [isLoginView, setIsLoginView] = useState<boolean>(true);
  const handleViewToggle = () => setIsLoginView((prevState) => !prevState);

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
