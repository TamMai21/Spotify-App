import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LayoutAuthentication from "../components/layout/LayoutAuthentication";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputGroup from "../components/input-group";
import Button from "../components/button";
import { auth } from "../utils/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import Toast from "react-native-toast-message";
const schemaValidation = yup.object({
    email: yup
        .string()
        .email("Please enter valid email address")
        .required("Please enter your email address"),
});
export default function ResetPasswordScreen() {
    const {
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        control,
    } = useForm({
        resolver: yupResolver(schemaValidation),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const handleResetPassword = async (values) => {
        if (!isValid) return;
        await sendPasswordResetEmail(auth, values.email);
        Toast.show({
            type: "success",
            text1: "Reset password successfully",
            text2: "Please check your email to reset password",
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
        });
    };
    return (
        <LayoutAuthentication authTitle="Reset your password">
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
            <Button
                onPress={handleSubmit(handleResetPassword)}
                title="Reset Password"
                disabled={isSubmitting}
                isLoading={isSubmitting}
            ></Button>
        </LayoutAuthentication>
    );
}

const styles = StyleSheet.create({});
