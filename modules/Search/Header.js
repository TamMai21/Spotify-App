import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Header({ title }) {
    return (
        <View
            style={{
                alignItems: "center",
                flexDirection: "row",
                gap: 20,
                marginBottom: 15,
            }}
        >
            <Image
                source={{
                    uri: "https://images.unsplash.com/photo-1555231955-348aa2312e19?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                }}
                style={{
                    width: 50,
                    height: 50,
                    resizeMode: "cover",
                    borderRadius: 9999,
                }}
            ></Image>
            <Text style={{ fontSize: 28, fontWeight: 700, color: "white" }}>
                {title}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({});
