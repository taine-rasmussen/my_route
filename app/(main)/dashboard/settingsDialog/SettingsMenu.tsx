import { Card, View, Separator, YGroup, YStack } from 'tamagui';
import DarkModeListItem from './settingsMenuItems/DarkModeListItem';
import GradingStyleListItem from './settingsMenuItems/GradingStyleListItem';
import DashboardLayoutListItem from './settingsMenuItems/DashboardLayoutListItem';
import UserLogout from './settingsMenuItems/UserLogout';

const SettingsMenu = () => {
  return (
    <View alignItems="center">
      <YStack
        width="80%"
        height="72.5%"
        display="flex"
        justifyContent="space-between"
      >
        <Card>
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
          </YGroup>
        </Card>
        <UserLogout />
      </YStack>
    </View>
  );
};

export default SettingsMenu;
