import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LayoutDashboard, BarChart, Network } from '@tamagui/lucide-icons';
import Dashboard from './dashboard';
import Journal from './journal';
import Projects from './projects';

const Tab = createBottomTabNavigator();

export default function MainLayout() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Dashboard') {
            return <LayoutDashboard color={color} size={size} />;
          } else if (route.name === 'Journal') {
            return <BarChart color={color} size={size} />;
          } else if (route.name === 'Projects') {
            return <Network color={color} size={size} />;
          }
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Journal" component={Journal} />
      <Tab.Screen name="Projects" component={Projects} />
    </Tab.Navigator>
  );
}
