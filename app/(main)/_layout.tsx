import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Plus } from "@tamagui/lucide-icons";
import Dashboard from "./dashboard";
import Tracker from "./tracker";
import Projects from "./projects";

const Tab = createBottomTabNavigator();

export default function MainLayout() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          return <Plus color={color} size={size} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Tracker" component={Tracker} />
      <Tab.Screen name="Porjects" component={Projects} />
    </Tab.Navigator>
  );
}
