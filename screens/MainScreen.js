import { Pressable } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import LibraryScreen from "./LibraryScreen";
import IconHome from "../components/icon/IconHome";
import IconSearch from "../components/icon/IconSearch";
import IconLibrary from "../components/icon/IconLibrary";
import SearchStack from "../stacks/SearchStack";
import SubPlayer from "../modules/Player/SubPlayer";
import { useDispatch, useSelector } from "react-redux";
import MusicPlayer from "../modules/Player/MusicPlayer";

const Tab = createBottomTabNavigator();

export default function MainScreen() {
    const showPlayer = useSelector((state) => state.player.showPlayer);
    const playerData = useSelector((state) => state.player.data);
    const showSubPlayer = useSelector((state) => state.player.showSubPlayer);
    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: "white",
                    tabBarInactiveTintColor: "gray",
                    tabBarStyle: { backgroundColor: "black" },
                }}
            >
                {/* <Tab.Screen
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
                /> */}
                <Tab.Screen
                    name="Search"
                    component={SearchStack}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <IconSearch
                                color="white"
                                focused={focused}
                                size={25}
                            ></IconSearch>
                        ),
                        style: {
                            backgroundColor: "black",
                        },
                    }}
                />
                <Tab.Screen
                    name="Library"
                    component={LibraryScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <IconLibrary
                                color="white"
                                focused={focused}
                                size={25}
                            ></IconLibrary>
                        ),
                        style: {
                            backgroundColor: "black",
                        },
                    }}
                />
            </Tab.Navigator>
            <Pressable
                style={{
                    position: "absolute",
                    width: "100%",
                    bottom: 48,
                    left: 0,
                    right: 0,
                    display: showSubPlayer ? "flex" : "none",
                }}
            >
                <SubPlayer data={playerData} />
            </Pressable>
            <Pressable
                style={{
                    position: "absolute",
                    width: "100%",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: showPlayer ? "flex" : "none",
                }}
            >
                <MusicPlayer />
            </Pressable>
        </>
    );
}
