import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { StatusBar, Text } from "react-native";
import LoginScreen from "./screens/AuthScreens/LoginScreen";
import SignupScreen from "./screens/AuthScreens/SignupScreen";
import WelcomeScreen from "./screens/AuthScreens/WelcomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardScreen from "./screens/private/Home";
import AddContactScreen from "./screens/private/AddEmergencyContact";
import AlertSettingsScreen from "./screens/private/AlertSettings";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IconButton from "./components/ui/IconButton";
import ContactsListScreen from "./screens/private/ListOfContacts";
import EmergencyContextProvider from "./store/emergency-context";
const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

// SplashScreen.preventAutoHideAsync()

function Home() {
  return <Text>HOMErerer</Text>;
}

function Settings() {
  return <Text>Setting</Text>;
}

function AlertTabs() {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <BottomTabs.Screen name="Home" component={DashboardScreen} />
      <BottomTabs.Screen name="Settings" component={Settings} />
    </BottomTabs.Navigator>
  );
}

function AuthStack() {
  console.log("sure things");
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
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  // console.log('auth', authCtx);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        // options={{
        //   headerRight: ({ tintColor }) => (
        //     <IconButton
        //       icon="home"
        //       color={'red'}
        //       size={24}

        //       onPress={() => authCtx.logout()}
        //     />
        //   ),
        //   contentStyle: {borderWidth: 2, marginTop:30}

        // }}
      />
      <Stack.Screen
        name="AlertTabs"
        component={AlertTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="AddEmergencyScreen" component={AddContactScreen} />
      <Stack.Screen name="AlertSettingScreen" component={AlertSettingsScreen} />
      <Stack.Screen name="ListOfContact" component={ContactsListScreen} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  console.log("nannajjnhjhjj", authCtx);
  return (
    <NavigationContainer>
      {/* <AuthStack /> */}
      {/* <AuthenticatedStack /> */}
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

// function Root() {
//   const [appIsReady, setAppIsReady] = useState(false)
//   console.log('ppppp');

//   useEffect(() => {
//     setTimeout(() => {
//       setAppIsReady(true);
//     }, 1000); // 1 second delay
//   }, [])

//   useLayoutEffect(() => {
//     async function hideSplash() {
//       if (appIsReady) {
//         await SplashScreen.hideAsync()
//       }
//     }
//     hideSplash()
//   }, [appIsReady])

//   if (!appIsReady) {
//     return null
//   }

//   return <Navigation />
// }
function Root() {
  const authCtx = useContext(AuthContext);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        // setAuthToken(storedToken)
        authCtx.authenticate(storedToken);
      }
      setAppIsReady(true);
    }

    fetchToken();
  }, []);

  useLayoutEffect(() => {
    async function hideSplash() {
      if (appIsReady) {
        await SplashScreen.hideAsync();
      }
    }

    hideSplash();
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        {/* <EmergencyContextProvider> */}
        <Root />
        {/* </EmergencyContextProvider> */}
      </AuthContextProvider>
      {/* <LoginScreen /> */}
      {/* <SignupScreen /> */}
      {/* <WelcomeScreen /> */}
      {/* <Navigation /> */}
      {/* <Text>hii</Text> */}
    </>
  );
}
