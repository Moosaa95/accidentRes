import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useLayoutEffect, useState } from "react";
import { StatusBar, Text } from "react-native";
import LoginScreen from "./screens/AuthScreens/LoginScreen";
import SignupScreen from "./screens/AuthScreens/SignupScreen";
import WelcomeScreen from "./screens/AuthScreens/WelcomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardScreen from "./screens/private/Home";
import AddContactScreen from "./screens/private/AddEmergencyContact";
import AlertSettingsScreen from "./screens/private/AlertSettings";
const Stack = createNativeStackNavigator()
const BottomTabs = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync()

function Home() {
  return <Text>HOME</Text>
}

function Settings() {
  return <Text>Setting</Text>
}

function AlertTabs() {
  return (
    <BottomTabs.Navigator screenOptions={{
      headerShown: false
    }}>
      <BottomTabs.Screen name="Home" component={DashboardScreen} />
      <BottomTabs.Screen name="Settings" component={Settings} />
    </BottomTabs.Navigator>
  )
}

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      
      
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  )
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="AlertTabs" component={AlertTabs} options={{
              headerShown: false,
            }} />
      <Stack.Screen name="AddEmergencyScreen" component={AddContactScreen} />
      <Stack.Screen name="AlertSettingScreen" component={AlertSettingsScreen} />
      {/* <Stack.Screen name="Dashboard" component={Home} /> */}
    </Stack.Navigator>
  )
}

function Navigation() {
  return (
    <NavigationContainer>
      <AuthStack />
      {/* <AuthenticatedStack /> */}
    </NavigationContainer>
  )
}

function Root() {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setAppIsReady(true);
    }, 1000); // 1 second delay
  }, [])

  useLayoutEffect(() => {
    async function hideSplash() {
      if (appIsReady) {
        await SplashScreen.hideAsync()
      }
    }
    hideSplash()
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return <Navigation />
}

export default function App() {

  return (
    <>
      <StatusBar style="light" />
      <Root />
      {/* <LoginScreen /> */}
      {/* <SignupScreen /> */}
      {/* <WelcomeScreen /> */}
      {/* <Navigation /> */}
      {/* <Text>hii</Text> */}
    </>
  )
}


