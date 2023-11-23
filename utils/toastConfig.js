import { BaseToast, ErrorToast } from "react-native-toast-message";

const toastConfig = {
    success: (props) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: "#28a745", borderLeftWidth: 10 }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 16,
                fontWeight: "500",
            }}
            text2Style={{
                fontSize: 14,
                fontWeight: "400",
                width: "80%",
            }}
        />
    ),
    error: (props) => (
        <ErrorToast
            {...props}
            style={{
                borderLeftColor: "#dc3545",
                borderLeftWidth: 10,
            }}
            text1Style={{
                fontSize: 16,
                fontWeight: "500",
            }}
            text2Style={{
                fontSize: 14,
                fontWeight: "400",
                width: "80%",
            }}
        />
    ),
    warning: (props) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: "#ffc107", borderLeftWidth: 10 }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 16,
                fontWeight: "500",
            }}
            text2Style={{
                fontSize: 14,
                fontWeight: "400",
                width: "80%",
            }}
        />
    ),
};

export default toastConfig;
