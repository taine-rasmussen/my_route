import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import FormInput from '@/components/FormInput';
import { GradeStyle, InputErrorKeys } from '@/app/types';
import { SizableText, View, YStack } from 'tamagui';
import GradeStyleSelector from './GradeStyleSelector';

interface IUserInfoForm {
  inputWidth: number;
  setError: (field: InputErrorKeys, value: boolean) => void;
  location: string;
  setLocation: (location: string) => void;
  homeGym: string;
  setHomeGym: (homeGym: string) => void;
  gradeStyle: string;
  setGradeStyle: (gradeStyle: GradeStyle) => void;
  inputErrors: any;
}

const UserInfoForm = (props: IUserInfoForm) => {
  return (
    <KeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <YStack>
          <FormInput
            value={props.location}
            setError={props.setError}
            inputType="location"
            onChange={props.setLocation}
            width={props.inputWidth}
            placeholder="Location..."
            error={props.inputErrors.location}
          />
          <FormInput
            value={props.homeGym}
            setError={props.setError}
            inputType="lastName"
            onChange={props.setHomeGym}
            width={props.inputWidth}
            placeholder="Home Gym..."
            error={props.inputErrors.homeGym}
          />
          <GradeStyleSelector
            width={props.inputWidth}
            gradeStyle={props.gradeStyle}
            setGradeStyle={props.setGradeStyle}
          />
          <View alignSelf="center" paddingBlockStart={16}>
            <SizableText theme="alt1" size="$4">
              Options can be changed in settings later
            </SizableText>
          </View>
        </YStack>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default UserInfoForm;
