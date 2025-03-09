import { YStack, SizableText, XStack, Button, Label } from 'tamagui';
import { useState } from 'react';
import { MultiSelect } from 'react-native-element-dropdown';
import { GradeStyle, VGrade } from '@/app/types';
import { useColorScheme } from 'react-native';
import { useUser } from '@/app/contexts/UserContext';
import { getClimbingGrades } from '@/app/utils';

interface IGradeRangeFilter {
  gradeRange: VGrade[];
  setGradeRange: (grades: VGrade[]) => void;
}

const getStyles = (isDarkMode: boolean) => ({
  dropdown: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    flex: 1,
  },
  dropdownContainerStyle: {
    backgroundColor: isDarkMode ? 'black' : 'white',
  },
  placeholderStyle: {
    fontSize: 14,
    color: isDarkMode ? 'white' : 'black',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: isDarkMode ? 'white' : 'black',
  },
  itemTextStyle: {
    fontSize: 14,
    color: isDarkMode ? 'white' : 'black',
  },
});

const GradeRangeFilter = (props: IGradeRangeFilter) => {
  const { themePreference, user } = useUser();
  const userGrade = user?.grade_style ?? 'V Scale';
  const dropDownItems = getClimbingGrades(userGrade as GradeStyle);

  const [isFocus, setIsFocus] = useState(false);

  const systemColorScheme = useColorScheme();
  const colorScheme =
    themePreference === 'system' ? systemColorScheme : themePreference;

  const isDarkMode = colorScheme === 'dark';
  const styles = getStyles(isDarkMode);

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

  return (
    <YStack gap="$3">
      <Label size="$3">Grade Range</Label>
      <MultiSelect
        style={[
          styles.dropdown,
          isFocus && { borderColor: isDarkMode ? 'white' : 'black' },
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
        mode="modal"
        maxHeight={300}
        alwaysRenderSelectedItem
        visibleSelectedItem
      />
      <XStack gap="$3" justifyContent="flex-end">
        <Button size="$2" disabled={!hasSelection} onPress={handleClear}>
          Clear
        </Button>
      </XStack>
    </YStack>
  );
};

export default GradeRangeFilter;
