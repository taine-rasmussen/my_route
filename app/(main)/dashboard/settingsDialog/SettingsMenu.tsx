import { Card, View, Separator, YGroup, YStack } from 'tamagui';
import DarkModeListItem from './settingsMenuItems/DarkModeListItem';
import GradingStyleListItem from './settingsMenuItems/GradingStyleListItem';
import DashboardLayoutListItem from './settingsMenuItems/DashboardLayoutListItem';
import UserLogout from './settingsMenuItems/UserLogout';
import ChangePwdListListItem from './settingsMenuItems/ChangePwdListItem';

interface ISettingsMenu {
  signOut: () => Promise<void>;
  setIsPwdChangeOpen: (bol: boolean) => void;
  setToggleProfileEdit: (bol: boolean) => void;
  isPwdChangeOpen: boolean;
}

const SettingsMenu = (props: ISettingsMenu) => {
  return (
    <View alignItems="center">
      <YStack
        width="80%"
        height="72.5%"
        display="flex"
        justifyContent="space-between"
      >
        <Card padding={4} elevate size="$5" bordered>
          <YGroup separator={<Separator />}>
            <YGroup.Item>
              <DarkModeListItem />
            </YGroup.Item>
            <YGroup.Item>
              <DashboardLayoutListItem />
            </YGroup.Item>
            <YGroup.Item>
              <GradingStyleListItem />
            </YGroup.Item>
            <YGroup.Item>
              <ChangePwdListListItem
                setToggleProfileEdit={props.setToggleProfileEdit}
                isPwdChangeOpen={props.isPwdChangeOpen}
                setIsPwdChangeOpen={props.setIsPwdChangeOpen}
              />
            </YGroup.Item>
          </YGroup>
        </Card>
        <UserLogout signOut={props.signOut} />
      </YStack>
    </View>
  );
};

export default SettingsMenu;
