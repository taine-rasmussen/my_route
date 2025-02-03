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
  AlertDialog,
  Button,
} from 'tamagui';

const GradingStyleListItem = () => {
  const { user } = useUser();
  const gradeStyles = [{ style: 'V Scale' }, { style: 'Font Scale' }];
  const [selectedValue, setSelectedValue] = useState(user?.grade_style);
  const [tempValue, setTempValue] = useState<GradeStyle | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = async (value: GradeStyle) => {
    const payload = {
      user_id: user?.id,
      updates: { grade_style: value },
    };
    try {
      console.log('API FIRED');
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}update_user/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      );
      if (!response.ok) throw new Error('Failed to update grade');
      setSelectedValue(value);
    } catch (error) {
      console.error('Failed to update grade', error);
    }
  };

  const handleValueChange = (value: GradeStyle) => {
    setTempValue(value);
    setDialogOpen(true);
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };

  const handleConfirm = () => {
    if (tempValue) handleSubmit(tempValue);
    setDialogOpen(false);
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
            value={selectedValue}
            onValueChange={handleValueChange}
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
                  {gradeStyles.map((grade, i) => (
                    <Select.Item
                      key={grade.style}
                      index={i}
                      value={grade.style}
                    >
                      <Select.ItemText>{grade.style}</Select.ItemText>
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
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen} native>
        <AlertDialog.Overlay key="overlay" />
        <AlertDialog.Content
          bordered
          elevate
          key="content"
          animation="quick"
          zIndex={3000}
          position="absolute"
        >
          <YStack space>
            <AlertDialog.Title>Change Grade Style</AlertDialog.Title>
            <AlertDialog.Description>
              Changing grade style will affect all previous tracked climbs and
              projects. Are you sure?
            </AlertDialog.Description>
            <XStack gap="$3" justifyContent="flex-end">
              {console.log(
                'Cancel Button:',
                <Button onPress={handleCancel}>Cancel</Button>,
              )}
              <Button onPress={handleCancel}>Cancel</Button>
              {console.log(
                'Continue Button:',
                <Button theme="active" onPress={handleConfirm}>
                  Continue
                </Button>,
              )}
              <Button theme="active" onPress={handleConfirm}>
                Continue
              </Button>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
};

// render the alertdialog at the root of the menu component and prop drill the open toggle
// think how we can pass it a function to use the handleSubmit on continue

export default GradingStyleListItem;
