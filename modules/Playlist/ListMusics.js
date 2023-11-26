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
import SkeletonContent from "react-native-skeleton-content";

export default function ListMusics({ data, type, onAddMusic }) {
    const dispatch = useDispatch();
    const handleAddMusicToMyPlayList = () => {
        onAddMusic();
    };

    const isLoading =
        (!data || Object.keys(data).length === 0) && type !== "myPlaylist";

    const skeletonLayout = [
        {
            key: "listMusics",
            marginTop: 320,
            children: [
                ...Array(50)
                    .fill()
                    .map((_, index) => ({
                        key: `musicItem${index}`,
                        flexDirection: "row",
                        alignItems: "center",
                        children: [
                            {
                                key: `index${index}`,
                                width: "100%",
                                height: 50,
                                borderRadius: 10,
                                marginBottom: 20,
                            },
                        ],
                    })),
            ],
        },
    ];
    return (
        <View style={{ marginBottom: 80 }}>
            {type == "myPlaylist" && (
                <Pressable
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                        marginTop: 10,
                        flex: 1,
                    }}
                    onPress={() => handleAddMusicToMyPlayList()}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                        }}
                    >
                        <View style={{ backgroundColor: "#333", padding: 10 }}>
                            <Image
                                source={require("../../assets/plus.png")}
                                style={{ width: 30, height: 30 }}
                            />
                        </View>
                        <Text
                            style={{
                                color: "white",
                                fontSize: 16,
                                fontWeight: "bold",
                            }}
                        >
                            Thêm vào danh sách phát này
                        </Text>
                    </View>
                </Pressable>
            )}
            <SkeletonContent
                containerStyle={{ flex: 1 }}
                isLoading={isLoading}
                layout={skeletonLayout}
            >
                {data?.items?.map((item, index) => {
                    return (
                        <Pressable
                            onPress={() => {
                                dispatch(setIsPlaying(false));
                                dispatch(setCurrentProgress(0));
                                dispatch(setCurrentSongIndex(index));
                                dispatch(setPlayerData(item));
                                dispatch(setAudioUrl(""));
                                dispatch(setRadioUrl(""));
                                dispatch(setShowPlayer(true));
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
            </SkeletonContent>
        </View>
    );
}

const styles = StyleSheet.create({});
