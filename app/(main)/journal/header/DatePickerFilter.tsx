import { useEffect, useState } from 'react';
import { XStack, YStack, Button } from 'tamagui';
import DateTimePicker, {
  DateType,
  getDefaultStyles,
} from 'react-native-ui-datepicker';
import { IDateRange } from '@/app/types';

interface IDatePickerFilter {
  dateRange: IDateRange;
  setDateRange: (date: IDateRange) => void;
  onClose: () => void;
}

const DatePickerFilter = (props: IDatePickerFilter) => {
  const defaultStyles = getDefaultStyles();

  const [tempDateRange, setTempDateRange] = useState<IDateRange>({
    startDate: props.dateRange.startDate,
    endDate: props.dateRange.endDate,
  });

  useEffect(() => {
    setTempDateRange({
      startDate: props.dateRange.startDate,
      endDate: props.dateRange.endDate,
    });
  }, [props.dateRange]);

  const handleDateChange = ({
    startDate,
    endDate,
  }: {
    startDate: DateType;
    endDate: DateType;
  }) => {
    setTempDateRange({
      startDate,
      endDate,
    });
  };

  const handleApply = () => {
    props.setDateRange(tempDateRange);
    props.onClose();
  };

  const handleCancel = () => {
    setTempDateRange({
      startDate: props.dateRange.startDate,
      endDate: props.dateRange.endDate,
    });
    props.onClose();
  };

  const handleClear = () => {
    setTempDateRange({
      startDate: null,
      endDate: null,
    });
    props.setDateRange({
      startDate: null,
      endDate: null,
    });
    props.onClose();
  };

  return (
    <YStack>
      <DateTimePicker
        mode="range"
        startDate={tempDateRange.startDate}
        endDate={tempDateRange.endDate}
        onChange={handleDateChange}
        styles={defaultStyles}
      />

      <XStack justifyContent="space-between" paddingTop={12}>
        <Button
          size="$3"
          onPress={handleClear}
          theme="alt1"
          backgroundColor="$red10"
        >
          Clear Dates
        </Button>

        <XStack gap={8}>
          <Button
            size="$3"
            onPress={handleCancel}
            theme="alt1"
            style={{ minWidth: 90 }}
          >
            Cancel
          </Button>
          <Button
            size="$3"
            onPress={handleApply}
            theme="active"
            style={{ minWidth: 90 }}
          >
            Apply
          </Button>
        </XStack>
      </XStack>
    </YStack>
  );
};

export default DatePickerFilter;
