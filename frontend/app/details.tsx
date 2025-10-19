
import { View, Text } from 'react-native';


import { Container } from '@/components/Container';
import { ScreenContent } from '@/components/ScreenContent';

export default function Details() {

  return (
    
      <View className="flex-1 bg-white">
      <Container>
         <ScreenContent>
               <Text>Hello</Text>
         </ScreenContent>
      </Container>
    </View>
  );
}
