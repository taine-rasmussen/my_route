import { YStack, XStack, Button } from 'tamagui';
import { useState } from 'react';
import { MultiSelect } from 'react-native-element-dropdown';
import { GradeStyle, VGrade } from '@/app/types';
import { useWindowDimensions } from 'react-native';
import { useUser } from '@/app/contexts/UserContext';
import { getClimbingGrades } from '@/app/utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IGradeRangeFilter {
  gradeRange: VGrade[];
  setGradeRange: (grades: VGrade[]) => void;
}

const getStyles = (isDarkMode: boolean, isExpanded: boolean) => ({
  dropdown: {
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 8,
    flex: 1,
    padding: 16,
  },
  activeColor: 'red',
  dropdownContainerStyle: {
    backgroundColor: isDarkMode ? '#2a2a2a' : 'white',
  },
  placeholderStyle: {
    fontSize: isExpanded ? 16 : 14,
    color: isDarkMode ? 'white' : '#2a2a2a',
  },
  selectedTextStyle: {
    fontSize: isExpanded ? 16 : 14,
    color: isDarkMode ? 'white' : '#2a2a2a',
  },
  itemTextStyle: {
    fontSize: isExpanded ? 16 : 14,
    color: isDarkMode ? 'white' : '#2a2a2a',
  },
});

const GradeRangeFilter = (props: IGradeRangeFilter) => {
  const { isDarkMode, user } = useUser();
  const { top, bottom } = useSafeAreaInsets();
  const userGrade = user?.grade_style ?? 'V Scale';
  const { width, height } = useWindowDimensions();
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const isExpanded = isFocus || props.gradeRange.length > 0;
  const styles = getStyles(isDarkMode, isExpanded);
  const dropDownItems = getClimbingGrades(userGrade as GradeStyle);
  const [gradeRangePreview, setGradeRangePreview] = useState<VGrade[]>([]);

  const handleChange = (selected: string[]) => {
    const selectedGrades = dropDownItems
      .filter((item) => selected.includes(item.value))
      .map((item) => item.value as VGrade);

    setGradeRangePreview(selectedGrades);
  };

  const handleClear = () => {
    props.setGradeRange([]);
    setGradeRangePreview([]);
  };

  const handleApply = () => {
    if (gradeRangePreview?.length) {
      props.setGradeRange(gradeRangePreview);
      setIsFocus(false);
    }
  };

  const dropdownMaxHeight = Math.min(height * 0.3, height - top - bottom - 50);

  return (
    <YStack gap="$3" width={Math.min(width * 0.8, 400)}>
      <MultiSelect
        style={[
          styles.dropdown,
          isFocus && { borderColor: isDarkMode ? 'white' : '#2a2a2a' },
        ]}
        containerStyle={styles.dropdownContainerStyle}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemTextStyle}
        data={dropDownItems}
        labelField="label"
        valueField="value"
        placeholder="Select grade range"
        value={gradeRangePreview}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleChange}
        activeColor={isDarkMode ? 'black' : 'white'}
        mode="auto"
        maxHeight={dropdownMaxHeight}
        alwaysRenderSelectedItem
        visibleSelectedItem
      />
      <XStack gap="$3" justifyContent="flex-end">
        <Button size="$4" onPress={handleClear} backgroundColor="$red10">
          Clear
        </Button>
        <Button size="$4" onPress={handleApply}>
          Apply
        </Button>
      </XStack>
    </YStack>
  );
};

export default GradeRangeFilter;
