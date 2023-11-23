import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { useAuth } from "../../context/auth-context";
import { auth } from "../../utils/firebaseConfig";
import { updateProfile } from "firebase/auth";
import Toast from "react-native-toast-message";

export default function ChangeDisplayName() {
    const { userInfo, setUserInfo } = useAuth();
    console.log("ChangeDisplayName ~ userInfo:", userInfo);
    const [displayName, setDisplayName] = React.useState("");
    const handleChangeDisplayName = async () => {
        if (displayName.length === 0) {
            Toast.show({
                type: "error",
                text1: "Lỗi",
                text2: "Tên hiển thị không được để trống",
                visibilityTime: 1000,
                autoHide: true,
                onHide: () => {},
            });
            return;
        } else {
            await updateProfile(auth.currentUser, {
                displayName: displayName,
            });
            Toast.show({
                type: "success",
                text1: "Thành công",
                text2: "Đổi tên hiển thị thành công",
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
            setUserInfo((prevState) => ({
                ...prevState,
                displayName: displayName,
            }));
        }
    };
    return (
        <View style={styles.container}>
            <Text style={{ color: "white", fontSize: 30, fontWeight: 700 }}>
                Đổi tên hiển thị của bạn
            </Text>
            <TextInput
                style={{
                    width: "100%",
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: "white",
                    borderColor: "white",
                    borderWidth: 1,
                    fontSize: 20,
                    fontWeight: 500,
                }}
                defaultValue={userInfo.displayName}
                onChangeText={(text) => setDisplayName(text)}
            ></TextInput>
            <Pressable
                onPress={handleChangeDisplayName}
                style={{
                    width: 100,
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: "#F62682",
                    fontSize: 20,
                    fontWeight: 500,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text style={{ color: "white", fontSize: 20, fontWeight: 500 }}>
                    Hoàn tất
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        gap: 20,
    },
});
