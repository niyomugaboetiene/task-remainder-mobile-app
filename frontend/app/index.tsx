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

const Tab = createBottomTabNavigator();

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get('http://localhost:5000/loggedIn', { withCredentials: true });
        if (res.data.loggedIn) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
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
              initialRouteName="Home"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Tab.Screen name="Home" component={Dashboard} />
              <Tab.Screen name="Add-task" component={AddTask} />
              <Tab.Screen name="Your-task" component={Dashboard} />
              <Tab.Screen name="Settings" component={Dashboard} />
            </Tab.Navigator>
          ) : (
            <View>
              <SignIn />
            </View>
          )}
        </ScreenContent>
      </Container>
    </View>
  );
}
