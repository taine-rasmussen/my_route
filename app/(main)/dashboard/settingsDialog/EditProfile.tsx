import FormInput from '@/components/FormInput';
import { YStack, Button } from 'tamagui';
import { useMemo, useState } from 'react';
import { InputErrorKeys } from '@/app/types';
import { isValidEmail } from '@/app/utils';

const initState = {
  location: false,
  homeGym: false,
  email: false,
};

const EditProfile = () => {
  const [newLocation, setNewLocation] = useState<string>('');
  const [newHomeGym, setNewHomeGym] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');
  const [inputErrors, setInputErrors] = useState(initState);

  const setError: (field: InputErrorKeys, value: boolean) => void = (
    field,
    value,
  ) => {
    setInputErrors((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const hasAnyInput =
    newLocation.length > 0 || newHomeGym.length > 0 || newEmail.length > 0;

  const hasErrors = Object.values(inputErrors).some(Boolean);

  const disableSubmit = useMemo(() => {
    return !hasAnyInput || hasErrors;
  }, [hasAnyInput, hasErrors]);

  const handleSubmit = () => {
    const isEmailValid = isValidEmail(newEmail);

    if (!isEmailValid) {
      return setError('email', true);
    }

    // If email included but invalid early return and update error Input
    // getBody() - only feilds that have a length
    // Write back end update function
    // submit and notify user of save
    // ensure that all contexts are update to include changes
  };

  return (
    <YStack width={'100%'} padding={8}>
      <FormInput
        isNotRequired
        width={'100%'}
        value={newLocation}
        setError={setError}
        inputType="location"
        onChange={setNewLocation}
        placeholder="New location.."
        error={inputErrors.location}
      />
      <FormInput
        width={'100%'}
        isNotRequired
        value={newHomeGym}
        inputType="homeGym"
        setError={setError}
        onChange={setNewHomeGym}
        placeholder="New home gym..."
        error={inputErrors.homeGym}
      />
      <FormInput
        isNotRequired
        width={'100%'}
        value={newEmail}
        inputType="email"
        setError={setError}
        onChange={(value) => {
          setNewEmail(value);
          if (inputErrors.email && isValidEmail(value)) {
            setError('email', false);
          }
        }}
        placeholder="New email..."
        error={inputErrors.email}
      />

      <Button
        size="$5"
        theme="active"
        onPress={handleSubmit}
        disabled={disableSubmit}
        opacity={disableSubmit ? 0.5 : 1}
      >
        Save changes
      </Button>
    </YStack>
  );
};

export default EditProfile;
