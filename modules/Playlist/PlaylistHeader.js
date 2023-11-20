import { Image, Pressable, Text, View } from "react-native";
import React from "react";
import {
    IconLove,
    IconPause,
    IconPlay,
    IconShare,
    IconVerticalThreeDot,
} from "../../components/icon";
import { useDispatch, useSelector } from "react-redux";
import {
    setAudioUrl,
    setCurrentProgress,
    setCurrentSongIndex,
    setIsPlaying,
    setPlayerData,
    setRadioUrl,
    setShowPlayer,
    setShowSubPlayer,
} from "../../redux-toolkit/playerSlice";
import { useEffect } from "react";

export default function PlaylistHeader({ data, type }) {
    if (!data) return null;
    const playlist = useSelector((state) => state.player.playlist);
    const isPlaying = useSelector((state) => state.player.isPlaying);
    const currentSongIndex = useSelector(
        (state) => state.player.currentSongIndex
    );
    return (
        <>
            <View
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    width: "100%",
                    height: 300,
                    background:
                        "linear-gradient(180deg, #0080AE 0%, rgba(0, 0, 0, 0.00) 100%)",
                }}
            >
                {type === "newrelease" && (
                    <Image
                        source={{ uri: data?.items?.[0].thumbnailM }}
                        style={{
                            position: "absolute",
                            top: 10,
                            left: 100,
                            width: 200,
                            height: 200,
                            borderRadius: 9999,
                            resizeMode: "cover",
                        }}
                    ></Image>
                )}
                {type === "radio" && (
                    <Image
                        source={{
                            uri: data?.items?.[0]?.items?.[0]?.thumbnailM,
                        }}
                        style={{
                            position: "absolute",
                            top: 10,
                            left: 100,
                            width: 200,
                            height: 200,
                            borderRadius: 9999,
                            resizeMode: "cover",
                        }}
                    ></Image>
                )}
                {type === "hub" && (
                    <Image
                        source={{ uri: data?.thumbnailHasText }}
                        style={{
                            position: "absolute",
                            top: 10,
                            left: 100,
                            width: 200,
                            height: 200,
                            borderRadius: 9999,
                            resizeMode: "cover",
                        }}
                    ></Image>
                )}
                {type === "playlist" && (
                    <Image
                        source={{ uri: data?.thumbnailM }}
                        style={{
                            position: "absolute",
                            top: 10,
                            left: 100,
                            width: 200,
                            height: 200,
                            borderRadius: 9999,
                            resizeMode: "cover",
                        }}
                    ></Image>
                )}
            </View>
            <Text
                style={{
                    color: "white",
                    fontSize: 25,
                    fontWeight: "bold",
                    marginTop: 200,
                }}
            >
                {type === "radio" ? "Radio Now" : data?.title}
            </Text>
            <View
                style={{
                    marginTop: 10,
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                }}
            >
                <View
                    style={{
                        flex: 2,
                        alignItems: "center",
                        flexDirection: "row",
                        gap: 25,
                    }}
                >
                    <IconLove></IconLove>
                    <IconShare></IconShare>
                    <IconVerticalThreeDot></IconVerticalThreeDot>
                </View>
                <Pressable
                    onPress={() => dispatch(setIsPlaying(!isPlaying))}
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#1ED760",
                        borderRadius: 9999,
                        width: 56,
                        height: 56,
                    }}
                >
                    {!isPlaying ? (
                        <IconPlay fill="white"></IconPlay>
                    ) : (
                        <IconPause fill="white"></IconPause>
                    )}
                </Pressable>
            </View>
        </>
    );
}
