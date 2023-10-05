import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import { useController } from "react-hook-form";
import IconEyeClose from "../icon/IconEyeClose";
import IconEyeOpen from "../icon/IconEyeOpen";

export default function InputPasswordGroup({
    label = "",
    placeholder = "",
    name = "",
    control,
    children,
    ...props
}) {
    const { field } = useController({
        control,
        name,
        defaultValue: "",
    });
    const [togglePassword, setTogglePassword] = useState(false);
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{label}</Text>
            <TextInput
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={!togglePassword ? true : false}
                {...field}
                {...props}
            ></TextInput>
            {togglePassword ? (
                <IconEyeOpen
                    style={styles.icon}
                    onPress={() => {
                        setTogglePassword(false);
                    }}
                ></IconEyeOpen>
            ) : (
                <IconEyeClose
                    style={styles.icon}
                    onPress={() => {
                        setTogglePassword(true);
                    }}
                ></IconEyeClose>
            )}
            {children}
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
        paddingRight: "50px",
    },
    icon: {
        width: "20px",
        height: "20px",
        color: "white",
        position: "absolute",
        top: "62%",
        right: "15px",
    },
});
