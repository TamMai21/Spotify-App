import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SignInScreen from "./screens/SignInScreen";

export default function App() {
    return (
        <View style={styles.container}>
            <SignInScreen></SignInScreen>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        width: "100%",
        padding: "40px",
    },
});
