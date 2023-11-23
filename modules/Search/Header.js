import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuth } from "../../context/auth-context";

export default function Header({ title, navigation }) {
    const { userInfo } = useAuth();
    return (
        <View
            style={{
                alignItems: "center",
                flexDirection: "row",
                gap: 20,
                marginBottom: 15,
            }}
        >
            <Pressable onPress={() => navigation.navigate("UserSetting")}>
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
            </Pressable>
            <Text style={{ fontSize: 18, fontWeight: 700, color: "white" }}>
                {`${title} ${userInfo.displayName}`}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({});
