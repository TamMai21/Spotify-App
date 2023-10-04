import { NavigationContainer } from "@react-navigation/native";
import SignInScreen from "./screens/SignInScreen";
import HomeScreen from "./screens/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "./screens/RegisterScreen";
import Toast from "react-native-toast-message";
import toastConfig from "./utils/toastConfig";

const Stack = createNativeStackNavigator();
export default function App() {
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="App">
                    <Stack.Screen
                        name="Login"
                        component={SignInScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Register"
                        component={RegisterScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        // options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
            <Toast config={toastConfig} />
        </>
    );
}
