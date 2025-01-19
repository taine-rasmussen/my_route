import { Card, View, Separator, YGroup } from 'tamagui';
import DarkModeListItem from './settingsMenuItems/DarkModeListItem';
import GradingStyleListItem from './settingsMenuItems/GradingStyleListItem';
import DashboardLayoutListItem from './settingsMenuItems/DashboardLayoutListItem';

const SettingsMenu = () => {
  return (
    <View alignItems="center">
      <Card width="80%">
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
    </View>
  );
};

export default SettingsMenu;
