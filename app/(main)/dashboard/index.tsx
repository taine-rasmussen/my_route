import React from 'react';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';
import UserWidget from './userWidget/UserWidget';
import { useAuth } from '@/app/contexts/AuthContext';
import { Spinner, View } from 'tamagui';
import { useUser } from '@/app/contexts/UserContext';

const Dashboard = () => {
  const { loading: authLoading } = useAuth();
  const { user, loading: userLoading } = useUser();

  const isLoading =
    authLoading || userLoading || user == null || user == undefined;

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
