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
    setCurrentProgress,
    setCurrentSongIndex,
    setIsLove,
    setIsPlaying,
    setPlayerData,
    setShowSubPlayer,
} from "../../redux-toolkit/playerSlice";
import { useEffect } from "react";
import addPlaylistIntoUserLibrary from "../../utils/addPlaylistIntoUserLibrary";
import { useAuth } from "../../context/auth-context";
import removePlaylistFromUserLibrary from "../../utils/removePlaylistfromUserLibrary";
import SkeletonContent from "react-native-skeleton-content";

export default function PlaylistHeader({ data, type, myPlaylist }) {
    if ((!data || Object.keys(data).length === 0) && !myPlaylist) {
        console.log("Loading...");
        return (
            <SkeletonContent
                containerStyle={{ flex: 1 }}
                isLoading={true}
                layout={[
                    {
                        key: "playlistHeader",
                        width: "100%",
                        height: 300,
                        marginTop: 10,
                        children: [
                            {
                                key: "playlistImage",
                                width: 200,
                                height: 200,
                                borderRadius: 9999,
                                marginLeft: 100,
                            },
                            {
                                key: "playlistTitle",
                                width: 200,
                                height: 20,
                                marginTop: 10,
                                marginLeft: 10,
                            },
                            {
                                key: "playlistButton",
                                width: "100%",
                                height: 56,
                                marginTop: 10,
                                marginLeft: 10,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                children: [
                                    {
                                        key: "playlistButtonIcon",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 25,
                                        children: [
                                            {
                                                key: "playlistButtonIcon1",
                                                width: 24,
                                                height: 24,
                                                borderRadius: 10,
                                            },
                                            {
                                                key: "playlistButtonIcon2",
                                                width: 24,
                                                height: 24,
                                                borderRadius: 10,
                                                marginLeft: 10,
                                            },
                                            {
                                                key: "playlistButtonIcon3",
                                                width: 24,
                                                height: 24,
                                                borderRadius: 10,
                                                marginLeft: 10,
                                            },
                                        ],
                                    },
                                    {
                                        key: "playlistButtonIcon",
                                        children: [
                                            {
                                                key: "playlistButtonIcon1",
                                                width: 56,
                                                height: 56,
                                                borderRadius: 9999,
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ]}
            />
        );
    }
    const { userInfo, setUserInfo } = useAuth();
    console.log("PlaylistHeader ~ userInfo:", userInfo);
    const isPlaying = useSelector((state) => state.player.isPlaying);
    const playlist = useSelector((state) => state.player.playlist);
    const currentSongIndex = useSelector(
        (state) => state.player.currentSongIndex
    );
    const isLove = useSelector((state) => state.player.isLove);
    const playlistId = useSelector((state) => state.player.playlistId);
    console.log("PlaylistHeader ~ playlistId:", playlistId);
    const dispatch = useDispatch();

    // create a function to autoplay the playlist
    useEffect(() => {
        if (playlist?.length > 0) {
            dispatch(setIsPlaying(false));
            dispatch(setCurrentProgress(0));
            dispatch(setPlayerData(playlist[currentSongIndex]));
            dispatch(setCurrentSongIndex(currentSongIndex));
            dispatch(setShowSubPlayer(true));
        }
    }, [playlist, currentSongIndex]);

    useEffect(() => {
        if (userInfo?.Playlist?.some((pl) => pl.playlistId === playlistId)) {
            console.log("running");
            dispatch(setIsLove(true));
        } else {
            dispatch(setIsLove(false));
        }
    }, [playlistId, userInfo]);

    const handleAddPlaylist = () => {
        dispatch(setIsLove(true));
        addPlaylistIntoUserLibrary(
            playlistId,
            data?.title,
            data?.thumbnailM,
            userInfo,
            setUserInfo
        );
    };

    const handleRemove = () => {
        dispatch(setIsLove(false));
        removePlaylistFromUserLibrary(playlistId, userInfo, setUserInfo);
    };
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
                {!myPlaylist && type === "newrelease" && (
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
                {!myPlaylist && type === "radio" && (
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
                {!myPlaylist && type === "hub" && (
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
                {!myPlaylist && type === "playlist" && (
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
                {myPlaylist && data?.song && (
                    <Image
                        source={{ uri: data.song.thumbnailM }}
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
                {myPlaylist && !data?.song && (
                    <Image
                        source={{ uri: myPlaylist.thumbnail }}
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
                {!myPlaylist && type === "radio" ? "Radio Now" : data?.title}
                {myPlaylist && myPlaylist?.name}
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
                    <Pressable onPress={handleAddPlaylist}>
                        {myPlaylist && (
                            <Image
                                source={require("../../assets/download-circular-button.png")}
                                style={{ width: 24, height: 24 }}
                            />
                        )}
                        {!myPlaylist && (
                            <IconLove
                                fill={isLove ? "red" : "white"}
                            ></IconLove>
                        )}
                    </Pressable>
                    <Pressable onPress={handleRemove}>
                        <IconShare></IconShare>
                    </Pressable>
                    <IconVerticalThreeDot></IconVerticalThreeDot>
                </View>
                <Pressable
                    onPress={() => {
                        dispatch(setIsPlaying(!isPlaying));
                    }}
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
