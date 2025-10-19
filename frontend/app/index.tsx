import { Stack, Link } from 'expo-router';

import { View } from 'react-native';

import AddTask from '@/components/AddTask';
import { Container } from '@/components/Container';
import { ScreenContent } from '@/components/ScreenContent';



export default function Home() {
  return (
    
      <View className='flex-1'>
         <Container>
            <ScreenContent>
                 <AddTask />
            </ScreenContent>
         </Container>
    </View>
  );
}


const styles = {
  container: "flex flex-1 bg-white",
}

