import { StyleSheet, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LibraryScreen from "../screens/LibraryScreen";
import ArtistListScreen from "../screens/ArtistListScreen";
import Artist from "../modules/Playlist/Artist";
import PlayList from "../modules/Playlist/PlayList";
const Stack = createNativeStackNavigator();
export default function LibraryStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="LibraryHome"
                component={LibraryScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ArtistListScreen"
                component={ArtistListScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ArtistPage"
                component={Artist}
                options={{
                    headerTitle: "",
                    headerBackground: () => {
                        return (
                            <View
                                style={{
                                    background: "#0080AE",
                                    flex: 1,
                                }}
                            ></View>
                        );
                    },
                    headerTintColor: "white",
                    headerShadowVisible: false,
                }}
            />
            <Stack.Screen
                name="PlayList"
                component={PlayList}
                options={{
                    headerTitle: "",
                    headerBackground: () => {
                        return (
                            <View
                                style={{
                                    background: "#0080AE",
                                    flex: 1,
                                }}
                            ></View>
                        );
                    },
                    headerTintColor: "white",
                    headerShadowVisible: false,
                }}
            />
        </Stack.Navigator>
    );
}
