import { useRouter } from 'expo-router';
import { Spinner } from 'tamagui';
import { useAuth } from './contexts/AuthContext';

export default function CustomLayout() {
  const { loading, isLoggedIn } = useAuth();
  const router = useRouter();

  if (loading) {
    return <Spinner size="large" color="$orange10" />;
  }

  if (isLoggedIn) {
    router.replace('/(main)');
  } else {
    router.replace('/(auth)');
  }

  return null;
}
