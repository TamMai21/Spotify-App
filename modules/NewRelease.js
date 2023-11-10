import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import IconPlay from "../components/icon/IconPlay";
import IconLove from "../components/icon/IconLove";
import IconShare from "../components/icon/IconShare";
import IconVerticalThreeDot from "../components/icon/IconVerticalThreeDot";

export default function NewRelease({ data }) {
    if (!data) return null;
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
            </View>
            <Text
                style={{
                    color: "white",
                    fontSize: 25,
                    fontWeight: "bold",
                    marginTop: 200,
                }}
            >
                {data?.title}
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
                {data?.items?.map((item, index) => {
                    return (
                        <View
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
                        </View>
                    );
                })}
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
        width: "100vw",
    },
});
