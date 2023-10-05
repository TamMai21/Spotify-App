import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import InputGroup from "../components/input-group";
import Button from "../components/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Toast from "react-native-toast-message";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { useAuth } from "../context/auth-context";
import LayoutAuthentication from "../components/layout/LayoutAuthentication";
// import { EyeOn } from "../assets";
// import { ReactComponentElement as EyeOn } from "../assets";

const schemaValidation = yup.object({
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

export default function SignInScreen({ navigation }) {
    const {
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        control,
        reset,
    } = useForm({
        resolver: yupResolver(schemaValidation),
        defaultValues: {
            email: "azuredev@gmail.com",
            password: "AzureVDT@123",
        },
    });
    const { userInfo } = useAuth();
    const handleSignIn = async (values) => {
        if (!isValid) return;
        try {
            await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );
            Toast.show({
                type: "success",
                text1: "Sign in successfully",
                text2: "Welcome to Spotify",
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
            navigation.navigate("Home");
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Sign in failed",
                text2: "Password or email is incorrect",
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
        }
    };
    return (
        <LayoutAuthentication authTitle="Sign In to Spotify">
            {/* <EyeOn /> */}
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
                isPassword={true}
            >
                {errors?.password && (
                    <Text style={styles.errorMessage}>
                        {errors?.password?.message}
                    </Text>
                )}
            </InputGroup>
            <Text
                style={{
                    color: "white",
                    fontStyle: "italic",
                    fontSize: "16px",
                    textAlign: "right",
                }}
                onPress={() => navigation.navigate("ResetPassword")}
            >
                Forgot password?
            </Text>
            <Button
                onPress={handleSubmit(handleSignIn)}
                title="Login"
                disabled={isSubmitting}
                isLoading={isSubmitting}
            ></Button>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
                Not register yet?{" "}
                <Text
                    style={{ textDecorationLine: "underline", color: "blue" }}
                    onPress={() => navigation.navigate("Register")}
                >
                    Register
                </Text>
            </Text>
        </LayoutAuthentication>
    );
}

const styles = StyleSheet.create({
    errorMessage: {
        color: "red",
        fontSize: "14px",
        fontWeight: "bold",
    },
});
