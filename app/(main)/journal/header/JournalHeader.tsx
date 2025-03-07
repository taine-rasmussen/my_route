import { SizableText, XStack, Card } from 'tamagui';
import AddClimbPopover from './AddClimbPopover';
import { Columns4, Columns2 } from '@tamagui/lucide-icons';
import FilterPopover from './FilterPopover';

interface IJournalHeader {
  handleRefresh: () => void;
  climbCardView: boolean;
  setClimbCardView: (bol: boolean) => void;
}

const JournalHeader = (props: IJournalHeader) => {
  const handleViewChange = () => {
    props.setClimbCardView(!props.climbCardView);
  };
  return (
    <Card padding={4} elevate size="$2" bordered padded>
      <XStack
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding={8}
      >
        <SizableText size={'$9'}>Journal</SizableText>
        <XStack gap={8}>
          {props.climbCardView ? (
            <Columns4
              size="$3"
              color="$orange10"
              onPress={handleViewChange}
              style={{ transform: [{ rotate: '90deg' }] }}
            />
          ) : (
            <Columns2
              size="$3"
              color="$orange10"
              onPress={handleViewChange}
              style={{ transform: [{ rotate: '90deg' }] }}
            />
          )}
          <FilterPopover />
          <AddClimbPopover handleRefresh={props.handleRefresh} />
        </XStack>
      </XStack>
    </Card>
  );
};

export default JournalHeader;
