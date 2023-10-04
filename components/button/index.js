import React from "react";
import { Text, StyleSheet, Pressable, Animated } from "react-native";
const spinValue = new Animated.Value(0);

// Tạo animation quay
Animated.loop(
    Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
    })
).start();

export default function Button(props) {
    const { onPress, title = "", disabled, isLoading = false } = props;
    return (
        <Pressable style={styles.button} onPress={onPress} disabled={disabled}>
            {isLoading ? (
                <Animated.View style={styles.loading}></Animated.View>
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
        borderTopColor: "white",
        borderRightColor: "white",
        borderRadius: "50%",
        transform: [
            {
                rotate: spinValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "360deg"],
                }),
            },
        ],
    },
});
