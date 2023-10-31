import { StyleSheet, Text, View } from "react-native";
import React from "react";
import InputGroup from "../components/input-group";
import Button from "../components/button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../utils/firebaseConfig";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import LayoutAuthentication from "../components/layout/LayoutAuthentication";
import InputPasswordGroup from "../components/input-group/InputPasswordGroup";

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
export default function RegisterScreen({ navigation }) {
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
    const handleRegister = async (values) => {
        if (!isValid) return;
        try {
            await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );
            await setDoc(doc(db, "users", auth.currentUser.uid), {
                fullname: values.fullname,
                email: values.email,
                password: values.password,
                avatar: "https://source.unsplash.com/random",
                createdAt: serverTimestamp(),
            });
            await updateProfile(auth.currentUser, {
                displayName: values.fullname,
                photoURL: "https://source.unsplash.com/random",
            });
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
            reset({
                fullname: "",
                email: "",
                password: "",
            });
            navigation.navigate("Main");
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Register failed",
                text2: "Email is already in use",
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
        }
    };
    return (
        <LayoutAuthentication authTitle="Register an spotify account">
            <View>
                <InputGroup
                    label="Full Name:"
                    placeholder="Enter your full name"
                    control={control}
                    name="fullname"
                ></InputGroup>
                {errors?.fullname && (
                    <Text style={styles.errorMessage}>
                        {errors?.fullname?.message}
                    </Text>
                )}
            </View>
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
