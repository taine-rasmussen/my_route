import { Sheet, Text, View } from 'tamagui';
import { ChevronDown } from '@tamagui/lucide-icons';

interface ISettingsDialog {
  openDialog: boolean;
  toggleDialog: () => void;
}

const SettingsDialog = (props: ISettingsDialog) => {
  return (
    <Sheet
      modal={true}
      dismissOnSnapToBottom
      open={props.openDialog}
      snapPoints={[85, 50, 25]}
      onOpenChange={props.toggleDialog}
      forceRemoveScrollEnabled={props.openDialog}
    >
      <Sheet.Overlay
        animation="medium"
        exitStyle={{ opacity: 0 }}
        enterStyle={{ opacity: 0 }}
      />
      <Sheet.Frame
        flex={1}
        gap="$5"
        alignItems="center"
        justifyContent="center"
      >
        <View position="absolute" top={10} right={10}>
          <ChevronDown size="$3" onPress={props.toggleDialog} />
        </View>
        <Text>SETTINGS</Text>
      </Sheet.Frame>
    </Sheet>
  );
};

export default SettingsDialog;
