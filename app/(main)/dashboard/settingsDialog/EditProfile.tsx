import FormInput from '@/components/FormInput';
import { YStack, Button } from 'tamagui';
import { useState } from 'react';
import { InputErrorKeys } from '@/app/types';

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
  const disableSubmit = !hasAnyInput || hasErrors;

  console.log(inputErrors);

  return (
    <YStack width={'100%'} padding={8}>
      <FormInput
        value={newLocation}
        inputType="location"
        width={'100%'}
        setError={setError}
        onChange={setNewLocation}
        placeholder="New location.."
        error={inputErrors.location}
      />
      <FormInput
        value={newHomeGym}
        inputType="homeGym"
        width={'100%'}
        setError={setError}
        onChange={setNewHomeGym}
        placeholder="New home gym..."
        error={inputErrors.homeGym}
      />
      <FormInput
        value={newEmail}
        inputType="email"
        width={'100%'}
        setError={setError}
        onChange={setNewEmail}
        placeholder="New email..."
        error={inputErrors.email}
      />
      <Button
        disabled={disableSubmit}
        size="$5"
        theme="active"
        opacity={disableSubmit ? 0.5 : 1}
      >
        Save changes
      </Button>
    </YStack>
  );
};

export default EditProfile;
