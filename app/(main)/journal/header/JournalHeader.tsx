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
import { IDateRange, SortOrder, VGrade } from '@/app/types';
import DatePickerFilter from './DatePickerFilter';
import GradeRangeFilter from './GradeRangeFilter';
import { useUser } from '@/app/contexts/UserContext';

interface IJournalHeader {
  gradeRange: VGrade[];
  setGradeRange: (grades: VGrade[]) => void;
  dateRange: IDateRange;
  setDateRange: (date: IDateRange) => void;
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
  const { isDarkMode } = useUser();
  const [openPopover, setOpenPopover] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openGradeRangePicker, setOpenGradeRangePicker] = useState(false);

  const calendarIsActive = !!(
    openDatePicker ||
    (props.dateRange.startDate && props.dateRange.endDate)
  );
  const gradeRangeIsActive = !!(
    openGradeRangePicker || props.gradeRange.length
  );

  const getButtonStyles = (isActive: boolean) => ({
    backgroundColor: isActive ? '$orange10' : '$background',
    color: isActive ? 'white' : isDarkMode ? 'white' : '#909090',
  });

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
            {...getButtonStyles(props.sortOrder === 'newest')}
            onPress={() => props.onSortChange('newest')}
          />
          <Button
            icon={<ChevronUp />}
            scaleIcon={2}
            circular
            padding={8}
            {...getButtonStyles(props.sortOrder === 'oldest')}
            onPress={() => props.onSortChange('oldest')}
          />
          <PopoverWrapper
            isOpen={openDatePicker}
            onOpenChange={setOpenDatePicker}
            trigger={
              <Button
                icon={<CalendarDays />}
                scaleIcon={2}
                circular
                padding={8}
                {...getButtonStyles(calendarIsActive)}
              />
            }
            content={
              <DatePickerFilter
                onClose={() => setOpenDatePicker(false)}
                dateRange={props.dateRange}
                setDateRange={props.setDateRange}
              />
            }
          />
          <PopoverWrapper
            isOpen={openGradeRangePicker}
            onOpenChange={setOpenGradeRangePicker}
            trigger={
              <Button
                icon={<ArrowDown01 />}
                scaleIcon={2}
                circular
                padding={8}
                {...getButtonStyles(gradeRangeIsActive)}
              />
            }
            content={
              <GradeRangeFilter
                setGradeRange={props.setGradeRange}
                gradeRange={props.gradeRange}
              />
            }
          />
        </XStack>

        <XStack gap={12}>
          <Button
            icon={
              props.climbCardView ? (
                <Columns4 style={{ transform: [{ rotate: '90deg' }] }} />
              ) : (
                <Columns2 style={{ transform: [{ rotate: '90deg' }] }} />
              )
            }
            scaleIcon={2}
            circular
            padding={8}
            {...getButtonStyles(false)}
            onPress={handleViewChange}
          />
          <PopoverWrapper
            isOpen={openPopover}
            onOpenChange={setOpenPopover}
            trigger={
              <Button
                icon={<CirclePlus />}
                scaleIcon={2}
                circular
                padding={8}
                {...getButtonStyles(openPopover)}
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
