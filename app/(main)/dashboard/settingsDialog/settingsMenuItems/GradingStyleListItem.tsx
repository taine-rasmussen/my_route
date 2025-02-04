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
  Separator,
  Button,
  YStack,
} from 'tamagui';

const GradingStyleListItem = () => {
  const { user, setUser } = useUser();
  const gradeStyles: GradeStyle[] = ['V Scale', 'Font Scale'];
  const [tempValue, setTempValue] = useState<GradeStyle | null>(null);
  const [loading, setLoading] = useState(false);

  const hasSelectedNewStyle = user?.grade_style !== tempValue && tempValue;

  const handleSubmit = async () => {
    if (!tempValue || loading) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}update_user/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: user?.id,
            updates: { grade_style: tempValue },
          }),
        },
      );

      if (!response.ok) throw new Error('Failed to update grade');

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Failed to update grade', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (!user?.grade_style) return;
    setTempValue(user?.grade_style);
  };

  return (
    <>
      <ListItem>
        <XStack flex={1} alignItems="center" justifyContent="space-between">
          <XStack gap={8} alignItems="center">
            <BarChart4 size="$1" />
            <SizableText size="$6">Grade</SizableText>
          </XStack>

          <Select
            value={tempValue ?? user?.grade_style}
            onValueChange={(value) => setTempValue(value as GradeStyle)}
            disablePreventBodyScroll
          >
            <Select.Trigger width="60%" iconAfter={ChevronDown}>
              <Select.Value placeholder="Select a grade style" />
            </Select.Trigger>

            <Adapt when="sm" platform="touch">
              <Sheet modal dismissOnSnapToBottom>
                <Sheet.Frame>
                  <Sheet.ScrollView>
                    <Adapt.Contents />
                  </Sheet.ScrollView>
                </Sheet.Frame>
                <Sheet.Overlay />
              </Sheet>
            </Adapt>

            <Select.Content zIndex={1000}>
              <Select.ScrollUpButton>
                <ChevronUp size={20} />
              </Select.ScrollUpButton>

              <Select.Viewport minWidth={200}>
                <Select.Group>
                  <Select.Label>
                    <SizableText size="$8">Grades</SizableText>
                  </Select.Label>
                  <Separator />
                  {gradeStyles.map((style, i) => (
                    <Select.Item key={style} index={i} value={style}>
                      <Select.ItemText>{style}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Viewport>

              <Select.ScrollDownButton>
                <ChevronDown size={20} />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select>
        </XStack>
      </ListItem>

      {hasSelectedNewStyle && (
        <ListItem>
          <XStack gap={8} alignItems="center" width={'70%'}>
            <SizableText size="$4" color={'#F47174'}>
              Changing grade will affect the grades of all previously logged
              climbs and projects.
            </SizableText>
            <YStack gap={8}>
              <Button theme="active" onPress={handleSubmit} disabled={loading}>
                {loading ? 'Updating...' : 'Confirm'}
              </Button>
              <Button theme="active" onPress={handleCancel}>
                Cancel
              </Button>
            </YStack>
          </XStack>
        </ListItem>
      )}
    </>
  );
};

export default GradingStyleListItem;
