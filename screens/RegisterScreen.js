import { StyleSheet, Text, View } from "react-native";
import React from "react";
import InputGroup from "../components/input-group";
import Button from "../components/button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";

const schemaValidation = yup.object({
    fullname: yup.string().required("Please enter your full name"),
    password: yup
        .string()
        .min(8, "Your password must be at least 8 character or greater")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            {
                message:
                    "Your password must have at least with one lowercase, uppercase, digit and special character",
            }
        )
        .required("Please enter your password"),
    email: yup
        .string()
        .email("Please enter valid email address")
        .required("Please enter your email address"),
});
export default function RegisterScreen() {
    const {
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        control,
        reset,
    } = useForm({
        resolver: yupResolver(schemaValidation),
        defaultValues: {
            fullname: "",
            email: "",
            password: "",
        },
    });
    console.log(errors);
    const handleRegister = (values) => {
        if (!isValid) return;
        console.log(values);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
                console.log(values);
                reset({
                    fullname: "",
                    email: "",
                    password: "",
                });
                Toast.show({
                    type: "success",
                    text1: "Register successfully",
                    text2: "Welcome to Spotify",
                    visibilityTime: 2000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40,
                });
                // navigation.navigate("Home");
            }, 5000);
        });
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register Account</Text>
            <InputGroup
                label="Full Name:"
                placeholder="Enter your full name"
                control={control}
                name="fullname"
            >
                {errors?.fullname && (
                    <Text style={styles.errorMessage}>
                        {errors?.fullname?.message}
                    </Text>
                )}
            </InputGroup>
            <InputGroup
                label="Email:"
                placeholder="Enter your email address"
                control={control}
                name="email"
            >
                {errors?.email && (
                    <Text style={styles.errorMessage}>
                        {errors?.email?.message}
                    </Text>
                )}
            </InputGroup>
            <InputGroup
                label="Password"
                placeholder="Enter your password"
                control={control}
                name="password"
            >
                {errors?.password && (
                    <Text style={styles.errorMessage}>
                        {errors?.password?.message}
                    </Text>
                )}
            </InputGroup>
            <Button
                title="Register"
                onPress={handleSubmit(handleRegister)}
                disabled={isSubmitting}
                isLoading={isSubmitting}
            ></Button>
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
    errorMessage: {
        color: "red",
        fontSize: "14px",
        fontWeight: "bold",
    },
});
