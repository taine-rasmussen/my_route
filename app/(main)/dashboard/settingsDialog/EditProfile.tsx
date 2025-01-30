import FormInput from '@/components/FormInput';
import { YStack, Button } from 'tamagui';
import { useMemo, useState } from 'react';
import { InputErrorKeys } from '@/app/types';
import { isValidEmail } from '@/app/utils';
import { useUser } from '@/app/contexts/UserContext';

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
  const { user } = useUser();

  const setError: (field: InputErrorKeys, value: boolean) => void = (
    field,
    value,
  ) => {
    setInputErrors((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isValidInput = (value: string) => value.trim().length > 0;

  const hasAnyInput =
    isValidInput(newLocation) ||
    isValidInput(newHomeGym) ||
    isValidInput(newEmail);

  const hasErrors = Object.values(inputErrors).some(Boolean);

  const disableSubmit = useMemo(() => {
    return !hasAnyInput || hasErrors;
  }, [hasAnyInput, hasErrors]);

  const getBody = () => {
    const body: Record<string, string> = {};

    if (isValidInput(newLocation)) body.location = newLocation.trim();
    if (isValidInput(newHomeGym)) body.homeGym = newHomeGym.trim();
    if (isValidInput(newEmail) && isValidEmail(newEmail))
      body.email = newEmail.trim();

    return body;
  };

  const handleSubmit = async () => {
    const body = getBody();
    console.log(body, 'BODY');

    const payload = {
      user_id: user?.id,
      updates: body,
    };

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}user_update/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const data = await response.json();
      console.log(data, 'RESPONSE');
    } catch (error) {
      console.error('Failed to update user:', error);
    }

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
          if (inputErrors.email) {
            setError('email', isValidEmail(value));
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
