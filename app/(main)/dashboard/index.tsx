import React from 'react';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';
import UserWidget from './userWidget/UserWidget';
import { useAuth } from '@/app/contexts/AuthContext';
import { Spinner, View } from 'tamagui';
import { useUser } from '@/app/contexts/UserContext';

const Dashboard = () => {
  const { loading: authLoading } = useAuth();
  const { user, loading: userLoading } = useUser();

  // Check loading state
  const isLoading = authLoading || userLoading || user == null;

  // Log values to debug the issue
  console.log('Dashboard State:', {
    authLoading,
    userLoading,
    user,
    isLoading,
  });

  return (
    <SafeAreaWrapper>
      {isLoading ? (
        <View>
          <Spinner size="large" color="$orange10" />
        </View>
      ) : (
        <UserWidget />
      )}
    </SafeAreaWrapper>
  );
};

export default Dashboard;
