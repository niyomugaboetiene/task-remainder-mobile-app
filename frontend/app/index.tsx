import { Stack, Link } from 'expo-router';

import { View } from 'react-native';

import AddTask from '@/components/AddTask';
import { Container } from '@/components/Container';
import SignIn from '@/components/SignIn';
import { ScreenContent } from '@/components/ScreenContent';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '@/components/Dashboard';
import SignUp from '@/components/SignUp';

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    
      <View className='flex-1'>
         <Container>
            <ScreenContent>

            </ScreenContent>
         </Container>
    </View>
  );
}

