import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { GestureResponderHandlers } from 'react-native';
import Routes from './src/routes';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './src/context/auth';



export default function App() {
 return (
   <NavigationContainer>
    <AuthProvider>
      <StatusBar 
       backgroundColor={'#131313'} 
       barStyle='light-content'
       />
       <Routes/>
     </AuthProvider>
   </NavigationContainer>
  );
}