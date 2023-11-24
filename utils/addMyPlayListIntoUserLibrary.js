import {
    collection,
    doc,
    getDoc,
    updateDoc,
    arrayUnion,
} from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import Toast from "react-native-toast-message";

export async function addMyPlayListIntoUserLibrary(playlistId, name, thumbnail, userInfo, setUserInfo) {
    try {
        const userId = auth.currentUser.uid;
        const userRef = doc(collection(db, "users"), userId);

        const userDoc = await getDoc(userRef);

        const playlist = { playlistId, name, thumbnail };

        if (
            userDoc.exists() &&
            userDoc.data().Playlist?.some((pl) => pl.playlistId === playlistId)
        ) {
            Toast.show({
                type: "success",
                text1: "Thông báo",
                text2: "Playlist đã có trong thư viện của bạn",
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
            return;
        }

        await updateDoc(userRef, {
            MyPlaylist: arrayUnion(playlist),
        });

        setUserInfo({
            ...userInfo,
            MyPlaylist: [...(userInfo.MyPlaylist || []), playlist],
        });

        Toast.show({
            type: "success",
            text1: "Thông báo",
            text2: "Thêm playlist vào thư viện thành công",
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
        });
    } catch (error) {
        console.log("error:", error);
        Toast.show({
            type: "error",
            text1: "Thông báo",
            text2: "Thêm playlist vào thư viện thất bại",
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
        });
    }
}
