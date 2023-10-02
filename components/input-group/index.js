import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

export default function InputGroup({ label = "", placeholder = "" }) {
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
        justifyContent: "flex-start",
        gap: "10px",
    },
    text: {
        fontSize: "20px",
        color: "white",
    },
    input: {
        width: "100%",
        height: "40px",
        borderWidth: 1,
        borderColor: "white",
        borderRadius: "8px",
        padding: "10px",
        fontSize: "20px",
        color: "white",
    },
});
