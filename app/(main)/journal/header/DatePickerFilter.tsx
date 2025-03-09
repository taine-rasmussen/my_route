import { YStack } from 'tamagui';
import DateTimePicker, {
  DateType,
  getDefaultStyles,
} from 'react-native-ui-datepicker';
import { IDateRange } from '@/app/types';

interface IDatePickerFilter {
  dateRange: IDateRange;
  setDateRange: (date: IDateRange) => void;
}

const DatePickerFilter = (props: IDatePickerFilter) => {
  const defaultStyles = getDefaultStyles();

  const handleDateChange = ({
    startDate,
    endDate,
  }: {
    startDate: DateType;
    endDate: DateType;
  }) => {
    props.setDateRange({
      startDate,
      endDate,
    });
  };

  return (
    <YStack>
      <DateTimePicker
        mode="range"
        startDate={props.dateRange.startDate}
        endDate={props.dateRange.endDate}
        onChange={handleDateChange}
        styles={defaultStyles}
      />
    </YStack>
  );
};

export default DatePickerFilter;
