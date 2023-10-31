import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchScreen from "./SearchScreen";
import HomeScreen from "./HomeScreen";
import LibraryScreen from "./LibraryScreen";
import IconHome from "../components/icon/IconHome";
import IconSearch from "../components/icon/IconSearch";
import IconLibrary from "../components/icon/IconLibrary";

const Tab = createBottomTabNavigator();

export default function MainScreen() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <IconHome
                            color="blue"
                            focused={focused}
                            size={22}
                        ></IconHome>
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <IconSearch
                            color="blue"
                            focused={focused}
                            size={25}
                        ></IconSearch>
                    ),
                }}
            />
            <Tab.Screen
                name="Library"
                component={LibraryScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <IconLibrary
                            color="blue"
                            focused={focused}
                            size={25}
                        ></IconLibrary>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({});
