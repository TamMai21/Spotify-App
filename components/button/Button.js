import React, { useEffect } from "react";
import { Text, StyleSheet, Pressable, ActivityIndicator } from "react-native";

export default function Button(props) {
    const { onPress, title = "", disabled, isLoading = false } = props;
    return (
        <Pressable style={styles.button} onPress={onPress} disabled={disabled}>
            {isLoading ? (
                <ActivityIndicator
                    size="small"
                    color="#fff"
                    style={styles.loading}
                />
            ) : (
                <Text style={styles.text}>{title}</Text>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "#F62682",
        borderRadius: 10,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },
    loading: {
        width: "20px",
        height: "20px",
        border: "2px solid transparent",
        borderRadius: "50%",
    },
});
