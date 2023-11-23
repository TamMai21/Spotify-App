import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { useAuth } from "../../context/auth-context";
import { IconEyeClose, IconEyeOpen } from "../../components/icon";
import Toast from "react-native-toast-message";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../utils/firebaseConfig";
import {
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
} from "firebase/auth";
export default function ChangePassword() {
    const { userInfo, setUserInfo } = useAuth();
    const [togglePassword, setTogglePassword] = React.useState(false);
    const [toggleNewPassword, setToggleNewPassword] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [errorPassword, setErrorPassword] = React.useState("");
    const [errorNewPassword, setErrorNewPassword] = React.useState("");
    const handleChangePassword = async () => {
        if (password !== userInfo.password) {
            setErrorPassword("Mật khẩu hiện tại không đúng");
            setErrorNewPassword("");
            return;
        } else {
            if (newPassword === "") {
                setErrorNewPassword("Mật khẩu mới không được để trống");
                setErrorPassword("");
                return;
            } else if (newPassword === password) {
                setErrorNewPassword(
                    "Mật khẩu mới không được trùng với mật khẩu hiện tại"
                );
                setErrorPassword("");
                return;
            } else if (
                newPassword.match(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                ) === null
            ) {
                setErrorNewPassword(
                    "Mật khẩu mới phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
                );
                setErrorPassword("");
                return;
            } else {
                const user = auth.currentUser;
                const credential = EmailAuthProvider.credential(
                    user?.email,
                    password
                );
                await reauthenticateWithCredential(
                    auth.currentUser,
                    credential
                );
                await updatePassword(auth.currentUser, newPassword);
                await setDoc(
                    doc(db, "users", auth.currentUser.uid),
                    {
                        password: newPassword,
                    },
                    { merge: true }
                );
                // Update password in userInfo
                setUserInfo({
                    ...userInfo,
                    password: newPassword,
                });
                Toast.show({
                    type: "success",
                    text1: "Đổi mật khẩu thành công",
                    visibilityTime: 3000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40,
                });
            }
        }
    };
    return (
        <View style={styles.container}>
            <View style={{ alignItems: "center" }}>
                <Text style={{ color: "white", fontSize: 40, fontWeight: 700 }}>
                    Đổi mật khẩu
                </Text>
            </View>
            <View style={{ gap: 10, marginBottom: 10 }}>
                <Text style={{ color: "white", fontSize: 18, fontWeight: 700 }}>
                    Địa chỉ email
                </Text>
                <TextInput
                    style={{
                        width: "100%",
                        padding: 10,
                        backgroundColor: "#333333",
                        fontSize: 20,
                        fontWeight: 500,
                        color: "white",
                        border: "none",
                        outline: "none",
                    }}
                    value={userInfo.email}
                ></TextInput>
            </View>
            <View style={{ gap: 10, marginBottom: 10 }}>
                <Text style={{ color: "white", fontSize: 18, fontWeight: 700 }}>
                    Mật khẩu hiện tại
                </Text>
                <TextInput
                    placeholder="Nhập mật khẩu hiện tại"
                    style={{
                        width: "100%",
                        padding: 10,
                        backgroundColor: "#333333",
                        fontSize: 20,
                        fontWeight: 500,
                        color: "white",
                        border: "none",
                        outline: "none",
                    }}
                    secureTextEntry={!togglePassword ? true : false}
                    onChangeText={(text) => setPassword(text)}
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
            </View>
            {errorPassword && (
                <Text style={styles.errorMessage}>{errorPassword}</Text>
            )}
            <View style={{ gap: 10, marginBottom: 10 }}>
                <Text style={{ color: "white", fontSize: 18, fontWeight: 700 }}>
                    Mật khẩu mới
                </Text>
                <TextInput
                    placeholder="Nhập mật khẩu mới"
                    style={{
                        width: "100%",
                        padding: 10,
                        backgroundColor: "#333333",
                        fontSize: 20,
                        fontWeight: 500,
                        color: "white",
                        border: "none",
                        outline: "none",
                    }}
                    secureTextEntry={!toggleNewPassword ? true : false}
                    onChangeText={(text) => setNewPassword(text)}
                ></TextInput>
                {toggleNewPassword ? (
                    <IconEyeOpen
                        style={styles.icon}
                        onPress={() => {
                            setToggleNewPassword(false);
                        }}
                    ></IconEyeOpen>
                ) : (
                    <IconEyeClose
                        style={styles.icon}
                        onPress={() => {
                            setToggleNewPassword(true);
                        }}
                    ></IconEyeClose>
                )}
            </View>
            {errorNewPassword && (
                <Text style={styles.errorMessage}>{errorNewPassword}</Text>
            )}
            <Pressable
                onPress={handleChangePassword}
                style={{
                    width: "100%",
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#F62682",
                    borderRadius: 9999,
                }}
            >
                <Text style={{ color: "white", fontSize: 20, fontWeight: 700 }}>
                    Lưu
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        gap: 20,
        padding: 20,
    },
    icon: {
        width: "20px",
        height: "20px",
        color: "white",
        position: "absolute",
        top: "62%",
        right: "15px",
    },
    errorMessage: {
        color: "red",
        fontSize: "14px",
        fontWeight: "bold",
        marginTop: 5,
    },
});
