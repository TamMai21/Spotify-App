import { StyleSheet, Text, View } from "react-native";
import React from "react";
import InputGroup from "../components/input-group";
import Button from "../components/button";

export default function RegisterScreen() {
    const handleRegister = () => {
        navigation.navigate("Home");
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register Account</Text>
            <InputGroup
                label="Email:"
                placeholder="Enter your email address"
            ></InputGroup>
            <InputGroup
                label="Full Name:"
                placeholder="Enter your full name"
            ></InputGroup>
            <InputGroup
                label="Password"
                placeholder="Enter your password"
            ></InputGroup>
            <InputGroup
                label="Confirm Password"
                placeholder="Enter your password"
            ></InputGroup>
            <Button title="Register" onPress={handleRegister}></Button>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
                Already have account?{" "}
                <Text
                    style={{ textDecorationLine: "underline", color: "blue" }}
                    onPress={() => navigation.navigate("Login")}
                >
                    Login
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
        marginBottom: "20px",
        fontWeight: "bold",
        color: "white",
    },
});
