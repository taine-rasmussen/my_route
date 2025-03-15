import { useEffect, useState } from 'react';
import { XStack, YStack, Button } from 'tamagui';
import DateTimePicker, {
  DateType,
  getDefaultStyles,
} from 'react-native-ui-datepicker';
import { IDateRange } from '@/app/types';
import { useUser } from '@/app/contexts/UserContext';
import { TextStyle } from 'react-native';

interface IDatePickerFilter {
  dateRange: IDateRange;
  setDateRange: (date: IDateRange) => void;
  onClose: () => void;
}

const DatePickerFilter = (props: IDatePickerFilter) => {
  const defaultStyles = getDefaultStyles();
  const { isDarkMode } = useUser();
  const [tempDateRange, setTempDateRange] = useState<IDateRange>({
    startDate: props.dateRange.startDate,
    endDate: props.dateRange.endDate,
  });

  const customStyles = {
    ...(isDarkMode
      ? defaultStyles
      : {
          container: {
            backgroundColor: '#fff',
          },
          header: {
            backgroundColor: '#f0f0f0',
          },
          dayText: {
            color: '#000',
          },
          selected: {
            backgroundColor: '#007AFF',
            borderRadius: 5,
          },
          selected_label: {
            color: '#fff',
            fontWeight: 'bold' as TextStyle['fontWeight'],
          },
          today: {
            borderColor: '#007AFF',
            borderWidth: 2.5,
            borderRadius: 5,
          },
          range_fill: {
            backgroundColor: '#e6f7ff',
          },
          range_middle: {
            backgroundColor: '#e6f7ff',
          },
          range_middle_label: {
            color: '#000',
          },
          range_start: {
            backgroundColor: '#007AFF',
            borderRadius: 5,
          },
          range_start_label: {
            color: '#fff',
          },
          range_end: {
            backgroundColor: '#007AFF',
            borderRadius: 5,
          },
          range_end_label: {
            color: '#fff',
          },
        }),
  };

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
        styles={customStyles}
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
