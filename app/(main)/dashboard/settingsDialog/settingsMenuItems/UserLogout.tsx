import { LogOut } from '@tamagui/lucide-icons';
import { Button, AlertDialog, XStack } from 'tamagui';
import { useUser } from '@/app/contexts/UserContext';

interface IUserLogout {
  signOut: () => Promise<void>;
}

const UserLogout = (props: IUserLogout) => {
  const { setUser } = useUser();

  const handleSignOut = () => {
    props.signOut();
    setUser(null);
  };

  return (
    <AlertDialog native>
      <AlertDialog.Trigger asChild>
        <Button
          size="$6"
          color="salmon"
          borderWidth={1}
          borderColor="grey"
          iconAfter={LogOut}
        >
          Sign out
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Content
          bordered
          elevate
          key="content"
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >
          <AlertDialog.Title>Are you sure?</AlertDialog.Title>
          <XStack gap="$3" justifyContent="flex-end">
            <AlertDialog.Cancel asChild>
              <Button>No</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild onPress={handleSignOut}>
              <Button theme="active">Yes</Button>
            </AlertDialog.Action>
          </XStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
};

export default UserLogout;
