import {
  YStack,
  SizableText,
  XStack,
  Button,
  Separator,
  Popover,
} from 'tamagui';
import {
  ChevronDown,
  ChevronUp,
  CalendarDays,
  BarChart2,
} from '@tamagui/lucide-icons';

const FilterPopoverContent = () => {
  const handleSubmit = () => {
    console.log('save filter');
  };

  return (
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
  );
};

export default FilterPopoverContent;
