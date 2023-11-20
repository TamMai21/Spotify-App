import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import IconLove from "../../components/icon/IconLove";
import IconPlay from "../../components/icon/IconPlay";
import { useDispatch, useSelector } from "react-redux";
import {
    setIsPlaying,
    setShowPlayer,
    setShowSubPlayer,
} from "../../redux-toolkit/playerSlice";
import { IconPause } from "../../components/icon";
import fetchPlayerUrl from "../../utils/fetchPlayerUrl";
import { useLayoutEffect } from "react";

export default function SubPlayer({ data }) {
    if (!data || Object.keys(data).length === 0) return null;
    const dispatch = useDispatch();
    const isPlaying = useSelector((state) => state.player.isPlaying);
    const audioUrl = useSelector((state) => state.player.audioUrl);
    const radioUrl = useSelector((state) => state.player.radioUrl);
    const currentProgress = useSelector(
        (state) => state.player.currentProgress
    );
    fetchPlayerUrl(data);
    const progressBar = React.useRef();
    useLayoutEffect(() => {
        progressBar.current.style.width =
            (currentProgress / data?.duration) * 100 + "%";
    }, [currentProgress]);
    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => {
                    dispatch(setShowSubPlayer(false));
                    dispatch(setShowPlayer(true));
                }}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: 54,
                    paddingLeft: 8,
                    paddingRight: 8,
                    flex: 1,
                }}
            >
                <View
                    style={{
                        flex: 4,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 12,
                    }}
                >
                    <Image
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 4,
                            resizeMode: "cover",
                        }}
                        source={{ uri: data.thumbnailM }}
                    ></Image>
                    <View style={{ flex: 1 }}>
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: 700,
                                color: "white",
                            }}
                        >
                            {data.title}
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: 400,
                                color: "white",
                            }}
                        >
                            {data.artistsNames}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 24,
                    }}
                >
                    <Pressable
                        style={{
                            width: 24,
                            height: 24,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <IconLove />
                    </Pressable>
                    <Pressable
                        onPress={() => dispatch(setIsPlaying(!isPlaying))}
                        style={{
                            width: 24,
                            height: 24,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        disabled={!audioUrl && !radioUrl}
                    >
                        {isPlaying && (audioUrl || radioUrl) ? (
                            <IconPause />
                        ) : (
                            <IconPlay />
                        )}
                    </Pressable>
                </View>
            </Pressable>
            <View
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
                        display: radioUrl ? "none" : "flex",
                    }}
                ></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#360d08",
        height: 56,
        width: "100%",
    },
});
