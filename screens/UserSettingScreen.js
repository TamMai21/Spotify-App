import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Toggle from "../components/Toggle";
import { useAuth } from "../context/auth-context";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";

export default function UserSettingScreen({ navigation }) {
    const { userInfo, setUserInfo } = useAuth();
    console.log("UserSettingScreen ~ userInfo:", userInfo);
    const handleLogout = () => {
        signOut(auth);
        setUserInfo(null);
        navigation.navigate("Login");
    };
    return (
        <View style={styles.container}>
            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 20,
                }}
            >
                <Text style={{ color: "white", fontSize: 24, fontWeight: 700 }}>
                    Tài khoản miễn phí
                </Text>
                <Pressable
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: 250,
                        height: 60,
                        backgroundColor: "white",
                        borderRadius: 9999,
                    }}
                >
                    <Text
                        style={{
                            color: "black",
                            fontSize: 22,
                            fontWeight: 700,
                        }}
                    >
                        Đăng ký Premium
                    </Text>
                </Pressable>
            </View>
            <View style={{ marginTop: 40, gap: 10 }}>
                <Text style={{ color: "white", fontSize: 20, fontWeight: 700 }}>
                    Tài khoản
                </Text>
                <Pressable
                    onPress={() => navigation.navigate("ChangeDisplayName")}
                >
                    <Text
                        style={{
                            color: "white",
                            fontSize: 18,
                            fontWeight: 500,
                        }}
                    >
                        Tên tài khoản
                    </Text>
                    <Text
                        style={{
                            color: "#ccc",
                            fontSize: 14,
                            fontWeight: 500,
                        }}
                    >
                        {userInfo?.displayName || "undefined"}
                    </Text>
                </Pressable>
                <Pressable
                    onPress={() => navigation.navigate("ChangePassword")}
                >
                    <Text
                        style={{
                            color: "white",
                            fontSize: 18,
                            fontWeight: 500,
                        }}
                    >
                        Email
                    </Text>
                    <Text
                        style={{
                            color: "#ccc",
                            fontSize: 14,
                            fontWeight: 500,
                        }}
                    >
                        {userInfo?.email || "undefined"}
                    </Text>
                </Pressable>
                <Text
                    style={{
                        color: "white",
                        fontSize: 20,
                        fontWeight: 700,
                        marginTop: 10,
                        marginBottom: 10,
                    }}
                >
                    Trình tiết kiệm dữ liệu
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 30,
                    }}
                >
                    <View style={{ flex: 3 }}>
                        <Text
                            style={{
                                color: "white",
                                fontSize: 18,
                                fontWeight: 500,
                            }}
                        >
                            Lưu dữ liệu
                        </Text>
                        <Text
                            style={{
                                color: "#ccc",
                                fontSize: 14,
                                fontWeight: 500,
                            }}
                        >
                            Đặt chất lượng âm thanh ở mức thấp, ẩn Canvas cũng
                            như các bản xem trước dạng âm thanh và video trên
                            trang chủ
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Toggle></Toggle>
                    </View>
                </View>
                <Text
                    style={{
                        color: "white",
                        fontSize: 20,
                        fontWeight: 700,
                        marginTop: 10,
                        marginBottom: 10,
                    }}
                >
                    Podcast video
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 30,
                    }}
                >
                    <View style={{ flex: 3 }}>
                        <Text
                            style={{
                                color: "white",
                                fontSize: 18,
                                fontWeight: 500,
                            }}
                        >
                            Chỉ tải âm thanh xuống
                        </Text>
                        <Text
                            style={{
                                color: "#ccc",
                                fontSize: 14,
                                fontWeight: 500,
                            }}
                        >
                            Chỉ lưu podcast video ở dạng âm thanh
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Toggle></Toggle>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 30,
                    }}
                >
                    <View style={{ flex: 3 }}>
                        <Text
                            style={{
                                color: "white",
                                fontSize: 18,
                                fontWeight: 500,
                            }}
                        >
                            Chỉ phát trực tuyến âm thanh
                        </Text>
                        <Text
                            style={{
                                color: "#ccc",
                                fontSize: 14,
                                fontWeight: 500,
                            }}
                        >
                            Chỉ phát podcast video ở dạng âm thanh khi không có
                            Wi-Fi
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Toggle></Toggle>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 30,
                    }}
                >
                    <View style={{ flex: 3 }}>
                        <Text
                            style={{
                                color: "white",
                                fontSize: 18,
                                fontWeight: 500,
                            }}
                        >
                            Lựa chọn ưu tiên về nội dung
                        </Text>
                        <Text
                            style={{
                                color: "#ccc",
                                fontSize: 14,
                                fontWeight: 500,
                            }}
                        >
                            Bật để phát nội dung nhạy cảm Nội dung khiêu dâm
                            dược dán nhãn{" "}
                            <View
                                style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 5,
                                    backgroundColor: "gray",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Text style={{ color: "black" }}>E</Text>
                            </View>
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Toggle></Toggle>
                    </View>
                </View>
                <Text
                    style={{
                        color: "white",
                        fontSize: 20,
                        fontWeight: 700,
                        marginTop: 10,
                        marginBottom: 10,
                    }}
                >
                    Phát lại
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 30,
                    }}
                >
                    <View style={{ flex: 3 }}>
                        <Text
                            style={{
                                color: "white",
                                fontSize: 18,
                                fontWeight: 500,
                            }}
                        >
                            Chuyển bài
                        </Text>
                        <Text
                            style={{
                                color: "#ccc",
                                fontSize: 14,
                                fontWeight: 500,
                            }}
                        >
                            Cho phép bạn chuyển giữa các bài
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Toggle></Toggle>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 30,
                    }}
                >
                    <View style={{ flex: 3 }}>
                        <Text
                            style={{
                                color: "white",
                                fontSize: 18,
                                fontWeight: 500,
                            }}
                        >
                            Liên tục
                        </Text>
                        <Text
                            style={{
                                color: "#ccc",
                                fontSize: 14,
                                fontWeight: 500,
                            }}
                        >
                            Cho phép phát lại liên tục
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Toggle></Toggle>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 30,
                    }}
                >
                    <View style={{ flex: 3 }}>
                        <Text
                            style={{
                                color: "white",
                                fontSize: 18,
                                fontWeight: 500,
                            }}
                        >
                            Tự động phối
                        </Text>
                        <Text
                            style={{
                                color: "#ccc",
                                fontSize: 14,
                                fontWeight: 500,
                            }}
                        >
                            Cho phép chuyển tiếp mượt mà giữa các bài hát trong
                            danh sách phát tuyển chọn.
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Toggle></Toggle>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 30,
                    }}
                >
                    <View style={{ flex: 3 }}>
                        <Text
                            style={{
                                color: "white",
                                fontSize: 18,
                                fontWeight: 500,
                            }}
                        >
                            Hiển thị Bài hát không phát được
                        </Text>
                        <Text
                            style={{
                                color: "#ccc",
                                fontSize: 14,
                                fontWeight: 500,
                            }}
                        >
                            Hiển thị các bài hát không phát được.
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Toggle></Toggle>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 30,
                    }}
                >
                    <View style={{ flex: 3 }}>
                        <Text
                            style={{
                                color: "white",
                                fontSize: 18,
                                fontWeight: 500,
                            }}
                        >
                            Đồng bộ hóa âm lượng
                        </Text>
                        <Text
                            style={{
                                color: "#ccc",
                                fontSize: 14,
                                fontWeight: 500,
                            }}
                        >
                            Đặt cùng mức âm lượng cho tất cả bản nhạc.
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Toggle></Toggle>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 30,
                    }}
                >
                    <View style={{ flex: 3 }}>
                        <Text
                            style={{
                                color: "white",
                                fontSize: 18,
                                fontWeight: 500,
                            }}
                        >
                            Đơn âm
                        </Text>
                        <Text
                            style={{
                                color: "#ccc",
                                fontSize: 14,
                                fontWeight: 500,
                            }}
                        >
                            Thiết lập để loa trái và loa phải phát âm thanh
                            giống nhau
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Toggle></Toggle>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 30,
                    }}
                >
                    <View style={{ flex: 3 }}>
                        <Text
                            style={{
                                color: "white",
                                fontSize: 18,
                                fontWeight: 500,
                            }}
                        >
                            Trạng thái phát của thiết bị
                        </Text>
                        <Text
                            style={{
                                color: "#ccc",
                                fontSize: 14,
                                fontWeight: 500,
                            }}
                        >
                            Cho phép các ứng dụng khác trên thiết bị của bạn nắm
                            được bạn đang nghe gì.
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Toggle></Toggle>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 30,
                    }}
                >
                    <View style={{ flex: 3 }}>
                        <Text
                            style={{
                                color: "white",
                                fontSize: 18,
                                fontWeight: 500,
                            }}
                        >
                            Tự động phát nội dung tương tự
                        </Text>
                        <Text
                            style={{
                                color: "#ccc",
                                fontSize: 14,
                                fontWeight: 500,
                            }}
                        >
                            Thưởng thức nhạc không gián đoạn. Chúng tôi sẽ phát
                            một bài hát tương tự khi nhạc bạn đang nghe kết
                            thúc.
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Toggle></Toggle>
                    </View>
                </View>
                <Text
                    style={{
                        color: "white",
                        fontSize: 20,
                        fontWeight: 700,
                        marginTop: 10,
                        marginBottom: 10,
                    }}
                >
                    Khác
                </Text>
                <Pressable
                    style={{ marginBottom: "80px" }}
                    onPress={handleLogout}
                >
                    <Text
                        style={{
                            color: "white",
                            fontSize: 20,
                            fontWeight: 600,
                        }}
                    >
                        Đăng xuất
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        paddingTop: 50,
        paddingLeft: 5,
        paddingRight: 5,
        overflow: "scroll",
    },
});
