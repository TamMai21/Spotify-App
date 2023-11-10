import { NavigationContainer } from "@react-navigation/native";
import SignInScreen from "./screens/SignInScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "./screens/RegisterScreen";
import Toast from "react-native-toast-message";
import toastConfig from "./utils/toastConfig";
import { AuthProvider } from "./context/auth-context";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import MainScreen from "./screens/MainScreen";
import CategoryDetail from "./modules/Search/CategoryDetail";
import { TextInput, View } from "react-native";
import SearchView from "./modules/Search/SearchView";
import { Pressable } from "react-native";
import { Provider } from "react-redux";
import store from "./redux-toolkit/configureStore";
import HeaderSearch from "./modules/Search/HeaderSearch";

const Stack = createNativeStackNavigator();
export default function App() {
    return (
        <>
            <Provider store={store}>
                <AuthProvider>
                    <NavigationContainer>
                        <Stack.Navigator initialRouteName="App">
                            {/* <Stack.Screen
                                name="Login"
                                component={SignInScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="ResetPassword"
                                component={ResetPasswordScreen}
                                options={{ headerShown: true }}
                            />
                            <Stack.Screen
                                name="Register"
                                component={RegisterScreen}
                                options={{ headerShown: false }}
                            /> */}
                            <Stack.Screen
                                name="Main"
                                component={MainScreen}
                                options={{ headerShown: false }}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                    <Toast config={toastConfig} />
                </AuthProvider>
            </Provider>
        </>
    );
}
