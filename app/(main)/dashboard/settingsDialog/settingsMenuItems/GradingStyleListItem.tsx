import { useUser } from '@/app/contexts/UserContext';
import { GradeStyle } from '@/app/types';
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
  const { user } = useUser();
  const gradeStyles = [{ style: 'V Scale' }, { style: 'Font Scale' }];

  const handleSubmit = async (value: GradeStyle) => {
    const payload = {
      user_id: user?.id,
      updates: {
        grade_style: value,
      },
    };
    try {
      console.log('API FIRED');
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}update_user/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Failed to update grade', error);
    }
  };

  const changeSelectedStyle = (value: GradeStyle) => {
    handleSubmit(value);
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
          value={user?.grade_style}
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
