import {
  Settings2,
  ChevronDown,
  ChevronUp,
  CalendarDays,
  BarChart2,
} from '@tamagui/lucide-icons';
import { useState } from 'react';
import {
  Popover,
  YStack,
  SizableText,
  XStack,
  Button,
  Separator,
} from 'tamagui';

const FilterWidget = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const handleSubmit = () => {
    console.log('save filter');
  };

  return (
    <Popover
      size="$5"
      allowFlip
      stayInFrame
      offset={10}
      placement="bottom"
      onOpenChange={setIsPopoverOpen}
    >
      <Popover.Trigger asChild>
        <Button
          icon={<Settings2 color={isPopoverOpen ? '$orange10' : ''} />}
          scaleIcon={2}
          circular
          padding={8}
        />
      </Popover.Trigger>

      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        width={250}
        height={250}
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        animation={['bouncy', { opacity: { overshootClamping: true } }]}
      >
        <Popover.Arrow borderWidth={1} borderColor="$borderColor" />
        <YStack gap="$3" width={'100%'}>
          <SizableText size={'$8'}>Filters</SizableText>
          <XStack display="flex" justifyContent="space-between">
            <ChevronDown size={'$2'} />
            <ChevronUp size={'$2'} />
            <Separator vertical borderColor={'$orange10'} />
            <BarChart2 size={'$2'} />
            <CalendarDays size={'$2'} />
          </XStack>

          <Popover.Close asChild>
            <Button size="$3" onPress={handleSubmit}>
              Apply
            </Button>
          </Popover.Close>
        </YStack>
      </Popover.Content>
    </Popover>
  );
};

export default FilterWidget;
