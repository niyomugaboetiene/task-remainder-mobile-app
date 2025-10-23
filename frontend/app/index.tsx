import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AddTask from '@/components/AddTask';
import { Container } from '@/components/Container';
import SignIn from '@/components/SignIn';
import { ScreenContent } from '@/components/ScreenContent';
import Dashboard from '@/components/Dashboard';
import SignUp from '@/components/SignUp';
import { MaterialIcons } from "@expo/vector-icons"

const Tab = createBottomTabNavigator();

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get('http://localhost:5000/loggedIn', { withCredentials: true });
        setLoggedIn(res.data.loggedIn);
      } catch (err) {
        setLoggedIn(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <View className="flex-1">
      <Container>
        <ScreenContent>
          {loggedIn ? (
            <Tab.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Tab.Screen name="Home" component={Dashboard} options={{ tabBarIcon: ({ color, size}) => <MaterialIcons name='home' size={size} color={color}/>}} />
              <Tab.Screen name="Add-task" component={AddTask} />
              <Tab.Screen name="Your-task" component={Dashboard} />
              <Tab.Screen name="Settings" component={Dashboard} />
            </Tab.Navigator>
          ) : (
            <Tab.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Tab.Screen name="Sign-Up" component={SignIn} options={{
                tabBarIcon: ({ color, size }) =>  <MaterialIcons name='person-add' size={size} color={color}/>
              }}/>
              <Tab.Screen name="Sign-In" component={SignUp} options={{
                tabBarIcon: ({ color, size }) => <MaterialIcons name='login' size={size} color={color}/>
              }}/>
            </Tab.Navigator>        
            )}
        </ScreenContent>
      </Container>
    </View>
  );
}
