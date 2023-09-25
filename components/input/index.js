import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

export default function Input({ label = "", placeholder = "" }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{label}</Text>
            <TextInput
                placeholder={placeholder}
                style={styles.input}
            ></TextInput>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        gap: "10px",
    },
    text: {
        fontSize: "20px",
    },
    input: {
        width: "100%",
        height: "40px",
        borderWidth: 1,
        borderRadius: "8px",
        padding: "10px",
        fontSize: "20px",
    },
});
