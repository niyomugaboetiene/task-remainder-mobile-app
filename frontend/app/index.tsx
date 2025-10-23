import { Stack, Link } from 'expo-router';

import { View } from 'react-native';

import AddTask from '@/components/AddTask';
import { Container } from '@/components/Container';
import SignIn from '@/components/SignIn';
import { ScreenContent } from '@/components/ScreenContent';
import SignUp from '@/components/SignUp';



export default function Home() {
  return (
    
      <View className='flex-1'>
         <Container>
            <ScreenContent>
                 {/* <AddTask /> */}
                 {/* <SignIn /> */}
                 <SignUp />
            </ScreenContent>
         </Container>
    </View>
  );
}

