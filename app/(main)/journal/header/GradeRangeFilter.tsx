import { YStack, SizableText, XStack, Button, Label } from 'tamagui';
import { useState } from 'react';
import { MultiSelect } from 'react-native-element-dropdown';
import { GradeStyle, VGrade } from '@/app/types';
import { useColorScheme, useWindowDimensions } from 'react-native';
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
  const { themePreference, user } = useUser();
  const userGrade = user?.grade_style ?? 'V Scale';
  const dropDownItems = getClimbingGrades(userGrade as GradeStyle);

  const [isFocus, setIsFocus] = useState(false);

  const systemColorScheme = useColorScheme();
  const { width, height } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();

  const colorScheme =
    themePreference === 'system' ? systemColorScheme : themePreference;

  const isDarkMode = colorScheme === 'dark';
  const isExpanded = isFocus || props.gradeRange.length > 0;
  const styles = getStyles(isDarkMode, isExpanded);

  const handleChange = (selected: string[]) => {
    const selectedGrades = dropDownItems
      .filter((item) => selected.includes(item.value))
      .map((item) => item.value as VGrade);

    props.setGradeRange(selectedGrades);
    setIsFocus(false);
  };

  const handleClear = () => {
    props.setGradeRange([]);
  };

  const hasSelection = props.gradeRange.length > 0;

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
        value={props.gradeRange}
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
        <Button size="$4" disabled={!hasSelection} onPress={handleClear}>
          Clear
        </Button>
      </XStack>
    </YStack>
  );
};

export default GradeRangeFilter;
