import { LogOut } from '@tamagui/lucide-icons';
import { Button } from 'tamagui';

const UserLogout = () => {
  // Plug into backend logout
  // remove tokens
  // navigate to login flow
  return (
    <Button
      size="$6"
      color="salmon"
      borderWidth={1}
      borderColor="grey"
      iconAfter={LogOut}
    >
      Sign out
    </Button>
  );
};

export default UserLogout;
