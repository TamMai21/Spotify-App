import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { getHomePage } from "../apis/home";

export default function HomeScreen() {
    useEffect(async () => {
        const data = await getHomePage();
        console.log("useEffect ~ data:", data);
    }, []);
    return (
        <View style={styles}>
            <Text>HomeScreen</Text>
        </View>
    );
}

const styles = StyleSheet.create({});
