import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import Input from "../components/input";

export default function SignInScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Sign In to Spotify</Text>
            <Input
                label="Email:"
                placeholder="Enter your email address"
            ></Input>
            <Input label="password" placeholder="Enter your password"></Input>
            <Button
                title="Login"
                onPress={() => alert("Login successfully")}
            ></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        gap: "30px",
    },
    text: {
        fontSize: "32px",
        alignContent: "center",
        marginBottom: "40px",
    },
});
