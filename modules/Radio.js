import { Pressable, StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { Image } from "react-native";
import IconLove from "../components/icon/IconLove";
import IconShare from "../components/icon/IconShare";
import IconVerticalThreeDot from "../components/icon/IconVerticalThreeDot";
import IconPlay from "../components/icon/IconPlay";
import Swiper from "react-native-swiper/src";

export default function Radio({ data }) {
    const itemData = data?.items;
    console.log("Radio ~ itemData:", itemData);
    if (!itemData) return null;
    return (
        <View style={styles.container}>
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
                <Image
                    source={{ uri: itemData[0]?.items[0]?.thumbnailM }}
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
            </View>
            <Text
                style={{
                    color: "white",
                    fontSize: 25,
                    fontWeight: "bold",
                    marginTop: 200,
                }}
            >
                Radio Now
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
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#1ED760",
                        borderRadius: 9999,
                        width: 56,
                        height: 56,
                    }}
                >
                    <IconPlay></IconPlay>
                </Pressable>
            </View>
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
                    <Swiper style={{ height: 200 }} showsPagination={false}>
                        {itemData[0]?.items.map((item, index) => {
                            return (
                                <Pressable
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
                                            width: 30,
                                            height: 30,
                                            borderRadius: 9999,
                                            backgroundColor: "red",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: "white",
                                                fontSize: 12,
                                                fontWeight: 700,
                                                textAlign: "center",
                                            }}
                                        >
                                            {item?.activeUsers}
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
