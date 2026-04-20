import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import LoginScreen from './src/screens/LoginScreen';
import CreateProfileScreen from './src/screens/CreateProfileScreen';
import GoalSelectionScreen from './src/screens/GoalSelectionScreen';
import ActivityLevelScreen from './src/screens/ActivityLevelScreen';
import TrainingPlanScreen from './src/screens/TrainingPlanScreen';
import MoodSelectionScreen from './src/screens/MoodSelectionScreen';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  SignUp: undefined;
  Login: undefined;
  CreateProfile: undefined;
  GoalSelection: undefined;
  ActivityLevel: undefined;
  TrainingPlan: undefined;
  MoodSelection: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#2DB34A" />
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CreateProfile" component={CreateProfileScreen} />
        <Stack.Screen name="GoalSelection" component={GoalSelectionScreen} />
        <Stack.Screen name="ActivityLevel" component={ActivityLevelScreen} />
        <Stack.Screen name="TrainingPlan" component={TrainingPlanScreen} />
        <Stack.Screen name="MoodSelection" component={MoodSelectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
