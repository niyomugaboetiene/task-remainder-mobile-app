import React from 'react';
import { Text, View } from 'react-native';


type ScreenContentProps = {
  children?: React.ReactNode;
};

export const ScreenContent = ({ children} : ScreenContentProps) => {
  return (
    <View className='w-full flex-1'>
      {children}
    </View>
  );
};
