import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function LayoutAuthentication({ authTitle = "", children }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{authTitle}</Text>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        gap: "20px",
        padding: "20px",
        backgroundColor: "rgb(15, 23, 42)",
        overflow: "hidden",
    },
    title: {
        fontSize: "32px",
        textAlign: "center",
        marginBottom: "40px",
        fontWeight: "bold",
        color: "white",
    },
});
