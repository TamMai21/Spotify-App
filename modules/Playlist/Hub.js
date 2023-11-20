import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Swiper from "react-native-swiper/src";
import { useDispatch } from "react-redux";
import { setPlayerData, setPlaylist } from "../../redux-toolkit/playerSlice";
import PlaylistHeader from "./PlaylistHeader";
import ListMusics from "./ListMusics";

export default function Hub({ data, navigation }) {
    const itemData = data?.sections?.slice(0, 2);
    if (!itemData) return null;
    const dispatch = useDispatch();
    dispatch(setPlaylist(itemData[1]?.items));
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
