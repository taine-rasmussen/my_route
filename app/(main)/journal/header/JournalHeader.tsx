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

  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
  const [openGradeRangePicker, setOpenGradeRangePicker] = useState(false);

  const calendarIsActive =
    openDatePicker || (props.dateRange.startDate && props.dateRange.endDate);

  const gradeRangeIsActive = openGradeRangePicker || props.gradeRange.length;

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
              props.sortOrder === 'newest' ? '$orange10' : '$background'
            }
            color={props.sortOrder === 'newest' ? '$background' : 'darkgrey'}
            onPress={() => props.onSortChange('newest')}
          />
          <Button
            icon={<ChevronUp />}
            scaleIcon={2}
            circular
            padding={8}
            backgroundColor={
              props.sortOrder === 'oldest' ? '$orange10' : '$background'
            }
            color={props.sortOrder === 'oldest' ? '$background' : '$color10'}
            onPress={() => props.onSortChange('oldest')}
          />
          <PopoverWrapper
            isOpen={openDatePicker}
            onOpenChange={setOpenDatePicker}
            trigger={
              <Button
                backgroundColor={calendarIsActive ? '$orange10' : '$background'}
                color={calendarIsActive ? '$background' : '$color10'}
                icon={<CalendarDays />}
                scaleIcon={2}
                circular
                padding={8}
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
                backgroundColor={
                  gradeRangeIsActive ? '$orange10' : '$background'
                }
                color={gradeRangeIsActive ? '$background' : 'darkgrey'}
                icon={<ArrowDown01 />}
                scaleIcon={2}
                circular
                padding={8}
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
              backgroundColor="$background"
              color="darkgrey"
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
              backgroundColor="$background"
              color="darkgrey"
            />
          )}

          <PopoverWrapper
            isOpen={openPopover}
            onOpenChange={setOpenPopover}
            trigger={
              <Button
                icon={<CirclePlus />}
                scaleIcon={2}
                circular
                padding={8}
                backgroundColor={openPopover ? '$orange10' : '$background'}
                color={openPopover ? '$background' : 'darkgrey'}
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
