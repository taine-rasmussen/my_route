import { GradeStyle } from '@/app/types';
import usePostRequest from '@/hooks/usePostRequest';
import {
  ChevronDown,
  ChevronUp,
  Check,
  BarChart4,
} from '@tamagui/lucide-icons';
import { useState } from 'react';
import {
  ListItem,
  XStack,
  SizableText,
  Select,
  Adapt,
  Sheet,
  YStack,
  Separator,
} from 'tamagui';

const GradingStyleListItem = () => {
  const gradeStyles = [{ style: 'V Scale' }, { style: 'Font Scale' }];
  const [selectedStyle, setSelectedStyle] = useState<GradeStyle>('V Scale');

  const changeSelectedStyle = (value: GradeStyle) => {
    setSelectedStyle(value);
  };

  const handleSubmit = async () => {
    const { data, loading } = usePostRequest('update_user');
  };

  return (
    <ListItem>
      <XStack
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <XStack gap={8} alignItems="center">
          <BarChart4 size="$1" />
          <SizableText size="$6">Grade</SizableText>
        </XStack>
        <Select
          value={selectedStyle}
          onValueChange={changeSelectedStyle}
          disablePreventBodyScroll
        >
          <Select.Trigger width="60%" iconAfter={ChevronDown}>
            <Select.Value placeholder="Select a grade style" />
          </Select.Trigger>

          <Adapt when="sm" platform="touch">
            <Sheet
              modal
              dismissOnSnapToBottom
              animationConfig={{
                type: 'spring',
                damping: 20,
                mass: 0.3,
                stiffness: 250,
              }}
            >
              <Sheet.Frame>
                <Sheet.ScrollView>
                  <Adapt.Contents />
                </Sheet.ScrollView>
              </Sheet.Frame>
              <Sheet.Overlay
                animation="lazy"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
              />
            </Sheet>
          </Adapt>

          <Select.Content zIndex={200000}>
            <Select.ScrollUpButton
              alignItems="center"
              justifyContent="center"
              position="relative"
              width="100%"
              height="$3"
            >
              <YStack zIndex={10}>
                <ChevronUp size={20} />
              </YStack>
            </Select.ScrollUpButton>

            <Select.Viewport minWidth={200}>
              <Select.Group>
                <Select.Label>
                  <SizableText size="$8">Grades</SizableText>
                </Select.Label>
                <Separator />
                {gradeStyles.map((grade, i) => (
                  <Select.Item index={i} key={grade.style} value={grade.style}>
                    <Select.ItemText>{grade.style}</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Viewport>

            <Select.ScrollDownButton
              alignItems="center"
              justifyContent="center"
              position="relative"
              width="100%"
              height="$3"
            >
              <YStack zIndex={10}>
                <ChevronDown size={20} />
              </YStack>
            </Select.ScrollDownButton>
          </Select.Content>
        </Select>
      </XStack>
    </ListItem>
  );
};

export default GradingStyleListItem;
