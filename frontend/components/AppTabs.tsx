import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from '@/components/Dashboard';
import SignUp from '@/components/SignUp';
import SignIn from './SignIn';
import AddTask from './AddTask';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
import { MaterialIcons, Ionicons, Feather  } from "@expo/vector-icons"
function Tabs() {
    return (
<Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case "Home": return <Ionicons name="home" size={size} color={color} />;
            case "Add Task": return <MaterialIcons name="add-circle" size={size} color={color} />;
            case "Tasks": return <MaterialIcons name="task" size={size} color={color} />;
            case "Settings": return <Feather name="settings" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="Add Task" component={AddTask} />
      <Tab.Screen name="Tasks" component={AddTask} />
      {/* <Tab.Screen name="Settings" component={Settings} /> */}
    </Tab.Navigator>
    )
}

export default Tabs;