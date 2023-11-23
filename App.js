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
import { ScrollView, TextInput, View, Pressable } from "react-native";
import { Provider } from "react-redux";
import store from "./redux-toolkit/configureStore";
import HeaderSearch from "./modules/Search/HeaderSearch";
import ReactPlayer from "react-player";
import { useEffect } from "react";
import UserSettingScreen from "./screens/UserSettingScreen";
import ChangePassword from "./modules/User/ChangePassword";
import ChangeDisplayName from "./modules/User/ChangeDisplayName";

const Stack = createNativeStackNavigator();
export default function App() {
    useEffect(() => {
        document.body.style.overflow = "hidden";
    }, []);
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
                            <Stack.Screen
                                name="UserSetting"
                                component={UserSettingScreen}
                                options={{
                                    headerTintColor: "white",
                                    headerBackground: () => {
                                        return (
                                            <View
                                                style={{
                                                    backgroundColor: "#000",
                                                    flex: 1,
                                                }}
                                            ></View>
                                        );
                                    },
                                    headerSearchBarOptions: {
                                        backgroundColor: "#000",
                                    },
                                    headerTitle: "Cài đặt",
                                }}
                            />
                            <Stack.Screen
                                name="ChangeDisplayName"
                                component={ChangeDisplayName}
                                options={{
                                    headerTintColor: "white",
                                    headerBackground: () => {
                                        return (
                                            <View
                                                style={{
                                                    backgroundColor: "#000",
                                                    flex: 1,
                                                }}
                                            ></View>
                                        );
                                    },
                                    headerSearchBarOptions: {
                                        backgroundColor: "#000",
                                    },
                                    headerTitle: "Đổi tên hiển thị",
                                }}
                            />
                            <Stack.Screen
                                name="ChangePassword"
                                component={ChangePassword}
                                options={{
                                    headerTintColor: "white",
                                    headerBackground: () => {
                                        return (
                                            <View
                                                style={{
                                                    backgroundColor: "#000",
                                                    flex: 1,
                                                }}
                                            ></View>
                                        );
                                    },
                                    headerSearchBarOptions: {
                                        backgroundColor: "#000",
                                    },
                                    headerTitle: "Đổi mật khẩu",
                                }}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                    <Toast config={toastConfig} />
                </AuthProvider>
            </Provider>
        </>
    );
}
