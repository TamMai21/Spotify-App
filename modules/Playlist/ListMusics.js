import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import {
    setAudioUrl,
    setCurrentProgress,
    setCurrentSongIndex,
    setIsPlaying,
    setPlayerData,
    setRadioUrl,
    setShowPlayer,
} from "../../redux-toolkit/playerSlice";

export default function ListMusics({ data }) {
    if (!data) return null;
    const dispatch = useDispatch();
    return (
        <View style={{ marginBottom: 80 }}>
            {data?.items?.map((item, index) => {
                return (
                    <Pressable
                        onPress={() => {
                            dispatch(setPlayerData(item));
                            dispatch(setCurrentSongIndex(index));
                            dispatch(setAudioUrl(""));
                            dispatch(setRadioUrl(""));
                            dispatch(setShowPlayer(true));
                            dispatch(setCurrentProgress(0));
                            dispatch(setIsPlaying(true));
                        }}
                        key={index}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                            marginTop: 10,
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontSize: 18,
                                fontWeight: "bold",
                            }}
                        >
                            {index + 1}
                        </Text>
                        <Image
                            source={{ uri: item?.thumbnailM }}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 9999,
                                resizeMode: "cover",
                            }}
                        ></Image>
                        <View style={{ flex: 1 }}>
                            <Text
                                style={{
                                    color: "white",
                                    fontSize: 16,
                                    fontWeight: "bold",
                                }}
                            >
                                {item?.title}
                            </Text>
                            <Text
                                style={{
                                    color: "white",
                                    fontSize: 14,
                                    fontWeight: "bold",
                                }}
                            >
                                {item?.artistsNames}
                            </Text>
                        </View>
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({});
