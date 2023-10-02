import { StyleSheet, Text, View } from "react-native";
import React from "react";
import InputGroup from "../components/input-group";
import Button from "../components/button";

export default function SignInScreen({ navigation }) {
    const handleSignIn = () => {
        navigation.navigate("Home");
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In to Spotify</Text>
            <InputGroup
                label="Email:"
                placeholder="Enter your email address"
            ></InputGroup>
            <InputGroup
                label="Password"
                placeholder="Enter your password"
            ></InputGroup>
            <Button onPress={handleSignIn} title="Login"></Button>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
                Not register yet?{" "}
                <Text
                    style={{ textDecorationLine: "underline", color: "blue" }}
                    onPress={() => navigation.navigate("Register")}
                >
                    Register
                </Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        gap: "30px",
        padding: "40px",
        backgroundColor: "rgb(15, 23, 42)",
    },
    title: {
        fontSize: "32px",
        textAlign: "center",
        marginBottom: "40px",
        fontWeight: "bold",
        color: "white",
    },
});
