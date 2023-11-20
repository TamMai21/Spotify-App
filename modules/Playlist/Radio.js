import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import Swiper from "react-native-swiper/src";
import { useDispatch } from "react-redux";
import {
    setAudioUrl,
    setIsPlaying,
    setPlayerData,
    setRadioUrl,
    setShowPlayer,
} from "../../redux-toolkit/playerSlice";
import { IconEyeOpen } from "../../components/icon";
import PlaylistHeader from "./PlaylistHeader";

export default function Radio({ data }) {
    const itemData = data?.items;
    const dispatch = useDispatch();
    if (!itemData) return null;
    return (
        <View style={styles.container}>
            <PlaylistHeader data={data} type="radio" />
            <View style={{ marginBottom: 80 }}>
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
                    <Swiper style={{ height: 200 }} showsPagination={false}>
                        {itemData[0]?.items.map((item, index) => {
                            return (
                                <Pressable
                                    onPress={() => {
                                        dispatch(setPlayerData(item));
                                        dispatch(setShowPlayer(true));
                                        dispatch(setAudioUrl(""));
                                        dispatch(setRadioUrl(""));
                                        dispatch(setIsPlaying(true));
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
                                        }}
                                    ></Image>
                                    <View
                                        style={{
                                            position: "absolute",
                                            top: 10,
                                            left: 10,
                                            width: 100,
                                            height: 30,
                                            borderRadius: 9999,
                                            flexDirection: "row",
                                            backgroundColor: "red",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: "white",
                                                fontSize: 18,
                                                fontWeight: 700,
                                                textAlign: "center",
                                            }}
                                        >
                                            {item?.activeUsers}
                                        </Text>
                                        <Text
                                            style={{
                                                marginLeft: 5,
                                                marginTop: 5,
                                            }}
                                        >
                                            <IconEyeOpen />
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            position: "absolute",
                                            top: 10,
                                            right: 10,
                                            width: 60,
                                            height: 30,
                                            borderRadius: 8,
                                            backgroundColor: "red",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: "white",
                                                fontSize: 14,
                                                fontWeight: 700,
                                            }}
                                        >
                                            Live
                                        </Text>
                                    </View>
                                </Pressable>
                            );
                        })}
                    </Swiper>
                </View>
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
