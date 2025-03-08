import { SizableText, XStack, Card, Button } from 'tamagui';
import {
  Columns4,
  Columns2,
  Settings2,
  CirclePlus,
} from '@tamagui/lucide-icons';
import { useState } from 'react';
import PopoverWrapper from './PopoverWrapper';
import AddClimbPopoverContent from './AddClimbPopoverContent';

interface IJournalHeader {
  handleRefresh: () => void;
  climbCardView: boolean;
  setClimbCardView: (bol: boolean) => void;
}

const JournalHeader = (props: IJournalHeader) => {
  const handleViewChange = () => {
    props.setClimbCardView(!props.climbCardView);
  };

  const [openPopover, setOpenPopover] = useState<boolean>(false);
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
          <PopoverWrapper
            isOpen={openPopover}
            onOpenChange={setOpenPopover}
            trigger={
              <Button
                icon={<CirclePlus color={openPopover ? '$orange10' : ''} />}
                scaleIcon={2}
                circular
                padding={8}
              />
            }
            content={
              <AddClimbPopoverContent handleRefresh={props.handleRefresh} />
            }
          />
        </XStack>
      </XStack>
    </Card>
  );
};

export default JournalHeader;
