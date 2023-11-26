import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Button from "../components/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Toast from "react-native-toast-message";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../utils/firebaseConfig";
import { useAuth } from "../context/auth-context";
import LayoutAuthentication from "../components/layout/LayoutAuthentication";
import { doc, setDoc } from "firebase/firestore";
import IconEyeClose from "../components/icon/IconEyeClose";
import { InputGroup, InputPasswordGroup } from "../components/input-group";

const schemaValidation = yup.object({
    password: yup.string().required("Please enter your password"),
    email: yup
        .string()
        .email("Please enter valid email address")
        .required("Please enter your email address"),
});

export default function SignInScreen({ navigation }) {
    const { userInfo } = useAuth();
    useEffect(() => {
        if (userInfo) {
            navigation.navigate("Main");
        }
    }, [userInfo]);
    const {
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        control,
        reset,
    } = useForm({
        resolver: yupResolver(schemaValidation),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const handleSignIn = async (values) => {
        if (!isValid) return;
        try {
            await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );
            await setDoc(
                doc(db, "users", auth.currentUser.uid),
                {
                    password: values.password,
                },
                { merge: true }
            );
            reset({
                email: "",
                password: "",
            });
            Toast.show({
                type: "success",
                text1: "Sign in successfully",
                text2: "Welcome to Spotify",
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
            navigation.navigate("Main");
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
            <View>
                <InputGroup
                    label="Email:"
                    placeholder="Enter your email address"
                    control={control}
                    name="email"
                ></InputGroup>
                {errors?.email && (
                    <Text style={styles.errorMessage}>
                        {errors?.email?.message}
                    </Text>
                )}
            </View>
            <View>
                <InputPasswordGroup
                    label="Password"
                    placeholder="Enter your password"
                    control={control}
                    name="password"
                ></InputPasswordGroup>
                {errors?.password && (
                    <Text style={styles.errorMessage}>
                        {errors?.password?.message}
                    </Text>
                )}
            </View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Text></Text>
                <Text
                    style={{
                        color: "white",
                        fontStyle: "italic",
                        fontSize: "16px",
                    }}
                    onPress={() => navigation.navigate("ResetPassword")}
                >
                    Forgot password?
                </Text>
            </View>
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
        marginTop: 5,
    },
});
