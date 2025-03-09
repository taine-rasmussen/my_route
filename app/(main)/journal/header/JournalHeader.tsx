import { XStack, Card, Button } from 'tamagui';
import {
  Columns4,
  Columns2,
  ChevronDown,
  ChevronUp,
  CalendarDays,
  CirclePlus,
  ArrowDown01,
} from '@tamagui/lucide-icons';
import { useState } from 'react';
import PopoverWrapper from './PopoverWrapper';
import AddClimbPopoverContent from './AddClimbPopoverContent';
import { SortOrder } from '@/app/types';

interface IJournalHeader {
  sortOrder: SortOrder;
  climbCardView: boolean;
  handleRefresh: () => void;
  onSortChange: (sort: SortOrder) => void;
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
        <XStack gap={12}>
          <Button
            icon={<ChevronDown />}
            scaleIcon={2}
            circular
            padding={8}
            backgroundColor={
              props.sortOrder === 'newest' ? '$orange10' : 'transparent'
            }
            onPress={() => props.onSortChange('newest')}
          />
          <Button
            icon={<ChevronUp />}
            scaleIcon={2}
            circular
            padding={8}
            backgroundColor={
              props.sortOrder === 'oldest' ? '$orange10' : 'transparent'
            }
            onPress={() => props.onSortChange('oldest')}
          />
          <Button icon={<CalendarDays />} scaleIcon={2} circular padding={8} />
          <Button icon={<ArrowDown01 />} scaleIcon={2} circular padding={8} />
        </XStack>

        <XStack gap={12}>
          {props.climbCardView ? (
            <Button
              icon={
                <Columns4
                  onPress={handleViewChange}
                  style={{ transform: [{ rotate: '90deg' }] }}
                />
              }
              scaleIcon={2}
              circular
              padding={8}
            />
          ) : (
            <Button
              icon={
                <Columns2
                  onPress={handleViewChange}
                  style={{ transform: [{ rotate: '90deg' }] }}
                />
              }
              scaleIcon={2}
              circular
              padding={8}
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
