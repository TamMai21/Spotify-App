import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";

export default function Toggle() {
    const [isToggle, setIsToggle] = React.useState(false);
    const marginLeft = useRef(new Animated.Value(5)).current;

    const handleToggle = () => {
        setIsToggle(!isToggle);
        Animated.timing(marginLeft, {
            toValue: isToggle ? 5 : 25,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    return (
        <Pressable
            onPress={handleToggle}
            style={{
                width: 50,
                height: 25,
                backgroundColor: isToggle ? "#F62682" : "white",
                borderRadius: 9999,
            }}
        >
            <Animated.View
                style={{
                    width: 20,
                    height: 20,
                    backgroundColor: isToggle ? "white" : "#F62682",
                    borderRadius: 9999,
                    marginTop: "auto",
                    marginBottom: "auto",
                    marginLeft: marginLeft,
                }}
            ></Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({});
