import React from 'react';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';
import UserWidget from './userWidget/UserWidget';
import { useAuth } from '@/app/contexts/AuthContext';
import { Spinner, View, YStack } from 'tamagui';
import { useUser } from '@/app/contexts/UserContext';
import BarChartWidget from './widgets/BarChartWidget';
import HeatMapWidget from './widgets/HeatMapWidget';
import { useToast } from 'react-native-toast-notifications';

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
        <YStack gap={16}>
          <UserWidget />
          <BarChartWidget />
          <HeatMapWidget />
        </YStack>
      )}
    </SafeAreaWrapper>
  );
};

export default Dashboard;
