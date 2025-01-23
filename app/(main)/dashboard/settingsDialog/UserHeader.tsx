import { IUser } from '@/app/types';
import { Avatar, SizableText, YStack, Button } from 'tamagui';

interface IUserHeader {
  user: IUser;
  setToggleProfileEdit: (bol: boolean) => void;
}

const UserHeader = (props: IUserHeader) => {
  const username = props.user
    ? `${props.user.first_name} ${props.user.last_name}`
    : '';

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
      <Button onPress={() => props.setToggleProfileEdit(true)}>
        Edit profile
      </Button>
    </YStack>
  );
};

export default UserHeader;
