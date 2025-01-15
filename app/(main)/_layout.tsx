import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LayoutDashboard, BarChart, Network } from "@tamagui/lucide-icons";
import Dashboard from "./dashboard";
import Tracker from "./tracker";
import Projects from "./projects";

const Tab = createBottomTabNavigator();

export default function MainLayout() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Dashboard") {
            return <LayoutDashboard color={color} size={size} />;
          } else if (route.name === "Tracker") {
            return <BarChart color={color} size={size} />;
          } else if (route.name === "Projects") {
            return <Network color={color} size={size} />;
          }
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Tracker" component={Tracker} />
      <Tab.Screen name="Projects" component={Projects} />
    </Tab.Navigator>
  );
}
