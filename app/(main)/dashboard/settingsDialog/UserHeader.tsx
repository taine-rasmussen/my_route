import { IUser } from '@/app/types';
import { Avatar, SizableText, YStack, Button } from 'tamagui';

interface IUserHeader {
  user: IUser;
  setToggleProfileEdit: (updater: (prevState: boolean) => boolean) => void;
  toggleProfileEdit: boolean;
}

const UserHeader = (props: IUserHeader) => {
  const username = props.user
    ? `${props.user.first_name} ${props.user.last_name}`
    : '';

  const btnText = props.toggleProfileEdit ? 'Return' : 'Edit Profile';

  const handleProfileEditToggle = () => {
    props.setToggleProfileEdit((prevState) => !prevState);
  };

  return (
    <YStack gap={8} alignItems="center">
      <Avatar circular size="$8">
        <Avatar.Image
          accessibilityLabel="profile_picture"
          src="/Users/tainerasmussen/Desktop/my_route/assets/images/favicon.png"
        />
        <Avatar.Fallback backgroundColor="$blue10" />
      </Avatar>
      <SizableText size="$9">{username}</SizableText>
      <SizableText>{props.user.email}</SizableText>
      <Button onPress={handleProfileEditToggle} minWidth={120}>
        {btnText}
      </Button>
    </YStack>
  );
};

export default UserHeader;
