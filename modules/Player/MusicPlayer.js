import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect } from "react";
import {
    IconArrowDown,
    IconLove,
    IconNext,
    IconPause,
    IconPlay,
    IconPrev,
    IconRandom,
    IconRepeat,
    IconVerticalThreeDot,
} from "../../components/icon";
import { useDispatch, useSelector } from "react-redux";
import {
    setAudioUrl,
    setCurrentProgress,
    setCurrentSongIndex,
    setIsLove,
    setIsPlaying,
    setIsRandom,
    setIsRepeat,
    setPlayerData,
    setRadioUrl,
    setShowPlayer,
    setShowSubPlayer,
} from "../../redux-toolkit/playerSlice";
import ReactPlayer from "react-player";
import fetchPlayerUrl from "../../utils/fetchPlayerUrl";
import { useLayoutEffect } from "react";
import Toast from "react-native-toast-message";
import { useAuth } from "../../context/auth-context";
import removeSongFromUserLibrary from "../../utils/removeSongfromUserLibrary";
import addSongIntoUserLibrary from "../../utils/addSongIntoUserLibrary";

export default function MusicPlayer() {
    const { userInfo, setUserInfo } = useAuth();
    const data = useSelector((state) => state.player.data);
    const playlist = useSelector((state) => state.player.playlist);
    const [isReady, setIsReady] = React.useState(false);
    const [showMusicPlayer, setShowMusicPlayer] = React.useState(false);
    const playerRef = React.useRef();
    const dispatch = useDispatch();
    const isPlaying = useSelector((state) => state.player.isPlaying);
    const audioUrl = useSelector((state) => state.player.audioUrl);
    const radioUrl = useSelector((state) => state.player.radioUrl);
    const currentProgress = useSelector(
        (state) => state.player.currentProgress
    );
    const isRepeat = useSelector((state) => state.player.isRepeat);
    const isRandom = useSelector((state) => state.player.isRandom);
    const isLove = useSelector((state) => state.player.isLove);
    fetchPlayerUrl(data);
    const progressArea = React.useRef();
    const progressBar = React.useRef();
    useLayoutEffect(() => {
        if (progressBar.current && progressBar.current.style) {
            progressBar.current.style.width =
                (currentProgress / data?.duration) * 100 + "%";
        }
    }, [currentProgress]);
    const currentSongIndex = useSelector(
        (state) => state.player.currentSongIndex
    );

    const handleNext = useCallback(() => {
        if (currentSongIndex < playlist.length - 1) {
            dispatch(setCurrentProgress(0));
            dispatch(setCurrentSongIndex(currentSongIndex + 1));
            dispatch(setAudioUrl(""));
            dispatch(setRadioUrl(""));
            dispatch(setPlayerData(playlist[currentSongIndex + 1]));
            dispatch(setIsPlaying(true));
        }
    }, [currentSongIndex, playlist]);

    const handlePrev = useCallback(() => {
        if (currentSongIndex > 0) {
            dispatch(setCurrentSongIndex(currentSongIndex - 1));
            dispatch(setPlayerData(playlist[currentSongIndex - 1]));
            dispatch(setAudioUrl(""));
            dispatch(setRadioUrl(""));
            dispatch(setCurrentProgress(0));
            dispatch(setIsPlaying(true));
        }
    }, [currentSongIndex, playlist]);
    const handleRepeat = useCallback(() => {
        dispatch(setCurrentProgress(0));
        playerRef.current.seekTo(0);
    }, []);

    const handleRandomSong = useCallback(() => {
        const randomIndex = Math.floor(Math.random() * playlist.length);
        dispatch(setCurrentSongIndex(randomIndex));
        dispatch(setPlayerData(playlist[randomIndex]));
        dispatch(setAudioUrl(""));
        dispatch(setRadioUrl(""));
        dispatch(setCurrentProgress(0));
        dispatch(setIsPlaying(true));
    }, [playlist]);

    const formatDuration = (duration) => {
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60)
            .toString()
            .padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    const handleProgressPress = useCallback(
        (event) => {
            const { width } = progressArea.current.getBoundingClientRect();
            const clickX = event.nativeEvent.offsetX;
            const duration = data?.duration;
            const newProgress = (clickX / width) * duration;
            if (progressBar.current && progressBar.current.style) {
                progressBar.current.style.width =
                    (newProgress / duration) * 100 + "%";
            }
            dispatch(setCurrentProgress(newProgress));
            playerRef.current.seekTo(newProgress);
        },
        [progressArea, data?.duration, progressBar]
    );

    React.useEffect(() => {
        if (userInfo?.Songs?.some((pl) => pl.songId === data?.encodeId)) {
            dispatch(setIsLove(true));
        } else {
            dispatch(setIsLove(false));
        }
    }, [data?.encodeId, userInfo]);

    const handleAdd = () => {
        dispatch(setIsLove(true));
        addSongIntoUserLibrary(
            data?.encodeId,
            data?.title,
            data?.thumbnailM,
            userInfo,
            setUserInfo
        );
    };

    const handleRemove = () => {
        dispatch(setIsLove(false));
        removeSongFromUserLibrary(data?.encodeId, userInfo, setUserInfo);
    };

    if (!data || !playlist) return null;
    return (
        <View style={styles.container}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 100,
                    display: { showMusicPlayer } ? "flex" : "none",
                }}
            >
                <Pressable
                    onPress={() => {
                        dispatch(setShowPlayer(false));
                        dispatch(setShowSubPlayer(true));
                    }}
                >
                    <IconArrowDown></IconArrowDown>
                </Pressable>
                <Text style={{ color: "white", fontSize: 14, fontWeight: 700 }}>
                    {data.artistsNames}
                </Text>
                <Pressable onPress={handleRemove}>
                    <IconVerticalThreeDot></IconVerticalThreeDot>
                </Pressable>
            </View>
            <View style={{ height: 300, borderRadius: 8, marginBottom: 80 }}>
                <Image
                    style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "contain",
                        borderRadius: 8,
                    }}
                    source={{ uri: data.thumbnailM }}
                ></Image>
            </View>
            <View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 20,
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <Text
                            style={{
                                color: "white",
                                fontSize: 20,
                                fontWeight: 700,
                            }}
                        >
                            {data.title}
                        </Text>
                        <Text
                            style={{
                                color: "white",
                                fontSize: 16,
                                fontWeight: 700,
                            }}
                        >
                            {data.artistsNames}
                        </Text>
                    </View>
                    <Pressable onPress={handleAdd}>
                        <IconLove fill={isLove ? "red" : "white"}></IconLove>
                    </Pressable>
                </View>
                <View style={{ gap: 10, display: radioUrl ? "none" : "flex" }}>
                    <Pressable
                        onPress={handleProgressPress}
                        ref={progressArea}
                        style={{
                            height: 4,
                            borderRadius: 9999,
                            backgroundColor: "#6E5283",
                        }}
                    >
                        <View
                            ref={progressBar}
                            style={{
                                height: 4,
                                borderRadius: 9999,
                                backgroundColor: "#FFFFFF",
                            }}
                        ></View>
                    </Pressable>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontSize: 14,
                                fontWeight: 700,
                            }}
                        >
                            {formatDuration(currentProgress)}
                        </Text>
                        <Text
                            style={{
                                color: "white",
                                fontSize: 14,
                                fontWeight: 700,
                            }}
                        >
                            {formatDuration(data.duration)}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 10,
                    }}
                >
                    <Pressable
                        onPress={() => dispatch(setIsRandom(!isRandom))}
                        style={{
                            width: 48,
                            height: 48,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        disabled={radioUrl ? true : false}
                    >
                        <IconRandom
                            fill={isRandom ? "#FFFFFF" : "#A7A7A7"}
                        ></IconRandom>
                    </Pressable>
                    <Pressable
                        onPress={handlePrev}
                        style={{
                            width: 48,
                            height: 48,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        disabled={radioUrl ? true : false}
                    >
                        <IconPrev
                            fill={
                                currentSongIndex === 0 ? "#A7A7A7" : "#FFFFFF"
                            }
                        ></IconPrev>
                    </Pressable>
                    <Pressable
                        onPress={() => dispatch(setIsPlaying(!isPlaying))}
                        style={{
                            width: 48,
                            height: 48,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "white",
                            borderRadius: 9999,
                        }}
                    >
                        {isPlaying && (audioUrl || radioUrl) ? (
                            <IconPause fill="black" />
                        ) : (
                            <IconPlay fill="black" />
                        )}
                    </Pressable>
                    <Pressable
                        onPress={handleNext}
                        style={{
                            width: 48,
                            height: 48,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        disabled={radioUrl ? true : false}
                    >
                        <IconNext
                            fill={
                                currentSongIndex === playlist.length - 1 ||
                                playlist.length === 0
                                    ? "#A7A7A7"
                                    : "#FFFFFF"
                            }
                        ></IconNext>
                    </Pressable>
                    <Pressable
                        onPress={() => dispatch(setIsRepeat(!isRepeat))}
                        style={{
                            width: 48,
                            height: 48,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        disabled={radioUrl ? true : false}
                    >
                        <IconRepeat
                            fill={isRepeat ? "#FFFFFF" : "#A7A7A7"}
                        ></IconRepeat>
                    </Pressable>
                </View>
            </View>
            <View style={{ display: "none" }}>
                {audioUrl ? (
                    <ReactPlayer
                        ref={playerRef}
                        playing={isPlaying}
                        url={audioUrl}
                        onProgress={({ playedSeconds }) => {
                            dispatch(setCurrentProgress(playedSeconds));
                        }}
                        onReady={() => {
                            if (!isReady && currentProgress > 0) {
                                playerRef.current.seekTo(currentProgress);
                                setIsReady(true);
                            }
                        }}
                        onEnded={() => {
                            if (isRepeat) {
                                handleRepeat();
                            } else if (isRandom) {
                                handleRandomSong();
                            } else {
                                if (currentSongIndex === playlist.length - 1) {
                                    dispatch(setCurrentProgress(0));
                                    dispatch(setCurrentSongIndex(0));
                                    dispatch(setPlayerData(playlist[0]));
                                    dispatch(setIsPlaying(false));
                                } else {
                                    handleNext();
                                }
                            }
                        }}
                        onError={() => {
                            Toast.show({
                                type: "error",
                                position: "top",
                                text1: "Error",
                                text2: "Bài hát này chỉ dành cho tài khoản VIP!",
                                visibilityTime: 3000,
                                autoHide: true,
                                topOffset: 30,
                                bottomOffset: 40,
                            });
                            dispatch(setIsPlaying(false));
                            setTimeout(() => {
                                handleNext();
                            }, 5000);
                        }}
                    />
                ) : null}
                {radioUrl && (
                    <ReactPlayer
                        ref={playerRef}
                        playing={isPlaying}
                        url={radioUrl}
                        config={{
                            file: {
                                hlsOptions: {
                                    /* hls.js options */
                                },
                                hlsVersion: "0.14.17", // version of hls.js
                            },
                        }}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000",
        flex: 1,
        paddingTop: 20,
        paddingLeft: 12,
        paddingRight: 12,
    },
});
