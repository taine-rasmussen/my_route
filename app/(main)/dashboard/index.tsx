import React from 'react';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';
import UserWidget from './userWidget/UserWidget';
import { useAuth } from '@/app/contexts/AuthContext';
import { Spinner } from 'tamagui';

const Dashboard = () => {
  const { loading } = useAuth();
  return (
    <SafeAreaWrapper>
      {loading ? <Spinner size="large" color="$orange10" /> : <UserWidget />}
    </SafeAreaWrapper>
  );
};

export default Dashboard;
