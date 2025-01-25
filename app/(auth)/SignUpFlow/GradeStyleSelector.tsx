import { GradeStyle } from '@/app/types';
import { ChevronDown, ChevronUp, Check } from '@tamagui/lucide-icons';
import {
  XStack,
  SizableText,
  Select,
  Adapt,
  Sheet,
  YStack,
  Separator,
} from 'tamagui';

interface IGradeStyleSelector {
  gradeStyle: string;
  setGradeStyle: (gradeStyle: GradeStyle) => void;
  width: number;
}

const GradeStyleSelector = (props: IGradeStyleSelector) => {
  const gradeStyles = [{ style: 'V Grade' }, { style: 'French' }];

  const handleSelect = (style: GradeStyle) => {
    props.setGradeStyle(style);
  };

  return (
    <XStack gap={16} maxWidth={props.width}>
      <XStack gap={8} alignItems="center">
        <SizableText theme="blue_surface1" size="$6">
          Grading:
        </SizableText>
      </XStack>
      <Select
        value={props.gradeStyle}
        onValueChange={handleSelect}
        disablePreventBodyScroll
      >
        <Select.Trigger
          flex={1}
          maxWidth="100%"
          minWidth={150}
          iconAfter={ChevronDown}
          borderWidth={3}
        >
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
  );
};

export default GradeStyleSelector;
