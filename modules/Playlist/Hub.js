import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Swiper from "react-native-swiper/src";
import { useDispatch, useSelector } from "react-redux";
import {
    setCurrentProgress,
    setCurrentSongIndex,
    setIsPlaying,
    setPlayerData,
    setPlaylist,
} from "../../redux-toolkit/playerSlice";
import PlaylistHeader from "./PlaylistHeader";
import ListMusics from "./ListMusics";
import SkeletonContent from "react-native-skeleton-content";

export default function Hub({ data, navigation }) {
    const itemData = data?.sections?.slice(0, 2);
    if (!itemData) {
        return (
            <View style={styles.container}>
                <SkeletonContent
                    containerStyle={{ flex: 1, padding: 16 }}
                    isLoading={true}
                    layout={[
                        {
                            key: "hubSkeleton",
                            children: [
                                {
                                    key: "headerSkeleton",
                                    width: "100%",
                                    height: 300,
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
                            ],
                        },
                        {
                            key: "swiperSkeleton",
                            width: "100%",
                            height: 200,
                            marginTop: 20,
                        },
                        {
                            key: "listMusics",
                            marginTop: 40,
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
                    ]}
                />
            </View>
        );
    }
    const dispatch = useDispatch();
    if (itemData[1]?.items) {
        dispatch(setPlaylist(itemData[1]?.items));
        dispatch(setCurrentProgress(0));
        dispatch(setCurrentSongIndex(0));
    }

    return (
        <View style={styles.container}>
            <PlaylistHeader data={data} type="hub" />
            <View style={{ marginBottom: 10 }}>
                <View>
                    <Text
                        style={{
                            color: "white",
                            fontSize: 20,
                            fontWeight: 700,
                            marginTop: 20,
                            textTransform: "capitalize",
                        }}
                    >
                        {itemData[0]?.title}
                    </Text>
                    <Swiper
                        style={{ height: 200, marginTop: 10 }}
                        showsPagination={false}
                    >
                        {itemData[0]?.items.map((item, index) => {
                            return (
                                <Pressable
                                    onPress={() => {
                                        dispatch(setIsPlaying(false));
                                        dispatch(setCurrentProgress(0));
                                        dispatch(setCurrentSongIndex(0));
                                        navigation.navigate("PlayList", {
                                            id: item.encodeId,
                                        });
                                    }}
                                    key={index}
                                    style={{
                                        flex: 1,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Image
                                        source={{ uri: item.thumbnailM }}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: 8,
                                            resizeMode: "contain",
                                        }}
                                    ></Image>
                                </Pressable>
                            );
                        })}
                    </Swiper>
                </View>
            </View>
            <View style={{ marginBottom: 80 }}>
                <Text
                    style={{
                        color: "white",
                        fontSize: 20,
                        fontWeight: 700,
                        marginTop: 20,
                        textTransform: "capitalize",
                    }}
                >
                    {itemData[1]?.title}
                </Text>
                <ListMusics data={itemData[1]} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000",
        flex: 1,
        paddingTop: 40,
        paddingLeft: 16,
        paddingRight: 16,
        overflow: "scroll",
    },
});
