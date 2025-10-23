import { Stack, Link } from 'expo-router';
import { Settings, View } from 'react-native';

import AddTask from '@/components/AddTask';
import { Container } from '@/components/Container';
import SignIn from '@/components/SignIn';
import { ScreenContent } from '@/components/ScreenContent';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '@/components/Dashboard';
import SignUp from '@/components/SignUp';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Tab = createBottomTabNavigator();

export default function Home() {  
  const [loggin, setLoggin] = useState(false);
  useEffect(() => {
   const checkLogin = async() => {
    await axios.get('http://localhost:5000/loggedIn', { withCredentials: true });
     setLoggin(true);
   }
   checkLogin();
  }, []);

  return (
         <View className='flex-1'>
             <Container>
                <ScreenContent>
                  {loggin ? (
                    <Tab.Navigator initialRouteName='Sign-in'>
                        <Tab.Screen name='Home' component={Dashboard}/>
                        <Tab.Screen name='Add-task' component={AddTask}/>
                        <Tab.Screen name='Your-task' component={Dashboard}/>
                        <Tab.Screen name='Settings' component={Dashboard}/>
                    </Tab.Navigator>
                  ) : (
                    <Tab.Navigator>
                        <Tab.Screen name='Sign-in' component={SignIn}/>
                        <Tab.Screen name='Sign-up' component={SignUp}/>
                    </Tab.Navigator>
                  )}
                </ScreenContent>
                  </Container>
          </View>  
);}