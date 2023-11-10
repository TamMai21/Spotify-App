import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function SearchView() {
    return (
        <View style={styles.container}>
            <Text
                style={{
                    color: "white",
                    fontSize: 20,
                    fontWeight: 700,
                    marginBottom: 10,
                }}
            >
                Play what you like
            </Text>
            <Text
                style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: 400,
                    textAlign: "center",
                }}
            >
                Search for artists, songs, radio stations, and more content
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
