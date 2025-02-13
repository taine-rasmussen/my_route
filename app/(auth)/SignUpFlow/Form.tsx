import PasswordInput from '@/components/PasswordInput';
import { YStack, XStack, Separator, Button, Text } from 'tamagui';
import {
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import { useState, useMemo } from 'react';
import FormInput from '@/components/FormInput';
import { GradeStyle, InputErrorKeys } from '@/app/types';
import UserInfoForm from './UserInfoForm';

const initState = {
  firstName: false,
  lastName: false,
  email: false,
  password: false,
  location: false,
  homeGym: false,
};

const Form = () => {
  const [email, setEmail] = useState<string>('');
  const screenWidth = Dimensions.get('window').width;
  const [homeGym, setHomeGym] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [inputErrors, setInputErrors] = useState(initState);
  const [gradeStyle, setGradeStyle] = useState<GradeStyle>('V Scale');
  const [changeFormPage, setChangeFormPage] = useState<boolean>(false);
  const inputWidth = useMemo(() => screenWidth * 0.9 + 24, [screenWidth]);

  const setError: (field: InputErrorKeys, value: boolean) => void = (
    field,
    value,
  ) => {
    setInputErrors((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleContinue = () => {
    setChangeFormPage((prevState) => !prevState);
  };

  const formButtonText = changeFormPage ? 'Create Account' : 'Continue';

  const disableSubmit = useMemo(() => {
    return changeFormPage
      ? Object.values(inputErrors).some(Boolean) ||
          ![firstName, lastName, email, password, location].every(
            (input) => input.length > 0,
          )
      : Object.values(inputErrors).some(Boolean) ||
          ![firstName, lastName, email, password].every(
            (input) => input.length > 0,
          );
  }, [inputErrors, firstName, lastName, email, password]);

  const handleFormSubmit = async () => {
    if (password.length < 7) return setError('password', true);
    if (Object.values(inputErrors).some(Boolean)) return;

    const body = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      location: location,
      home_gym: homeGym,
      grade_style: gradeStyle,
    };

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}users/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const data = await response.json();
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setLocation('');
      setHomeGym('');
    } catch (error) {
      console.error(error);
    }
  };

  const formButtonOnPress = changeFormPage ? handleFormSubmit : toggleContinue;

  return (
    <KeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <YStack alignItems="center">
          {changeFormPage ? (
            <UserInfoForm
              inputWidth={inputWidth}
              location={location}
              setLocation={setLocation}
              setError={setError}
              homeGym={homeGym}
              setHomeGym={setHomeGym}
              gradeStyle={gradeStyle}
              setGradeStyle={setGradeStyle}
              inputErrors={inputErrors}
            />
          ) : (
            <>
              <XStack gap={24}>
                <FormInput
                  value={firstName}
                  setError={setError}
                  inputType="firstName"
                  onChange={setFirstName}
                  placeholder="First Name..."
                  error={inputErrors.firstName}
                />
                <FormInput
                  value={lastName}
                  setError={setError}
                  inputType="lastName"
                  onChange={setLastName}
                  placeholder="Last Name..."
                  error={inputErrors.lastName}
                />
              </XStack>

              <FormInput
                value={email}
                inputType="email"
                width={inputWidth}
                setError={setError}
                onChange={setEmail}
                placeholder="Email.."
                error={inputErrors.email}
              />
              <PasswordInput
                value={password}
                width={inputWidth}
                setError={setError}
                onChange={setPassword}
                error={inputErrors.password}
              />
            </>
          )}

          <YStack gap={24} marginBlock={24}>
            <Button
              size="$5"
              theme="active"
              width={inputWidth}
              justifyContent="center"
              disabled={disableSubmit}
              onPress={formButtonOnPress}
              opacity={disableSubmit ? 0.5 : 1}
            >
              {formButtonText}
            </Button>

            <XStack width={inputWidth}>
              <Separator alignSelf="center" />
              <Text>Or register with</Text>
              <Separator alignSelf="center" />
            </XStack>

            <XStack gap={16}>
              <Button
                size="$5"
                variant="outlined"
                justifyContent="center"
                width={inputWidth / 2 - 16}
              >
                Google
              </Button>
              <Button
                size="$5"
                variant="outlined"
                justifyContent="center"
                width={inputWidth / 2 - 16}
              >
                Apple
              </Button>
            </XStack>
          </YStack>
        </YStack>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Form;
