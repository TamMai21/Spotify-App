import {
    arrayRemove,
    collection,
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import Toast from "react-native-toast-message";

export default async function removeSongFromUserLibrary(
    songId,
    userInfo,
    setUserInfo
) {
    try {
        // Get a reference to the user's document in the 'users' collection
        const userId = auth.currentUser.uid;
        const userRef = doc(collection(db, "users"), userId);

        // Get the current state of the user's document
        const userDoc = await getDoc(userRef);

        // Check if the Songs array contains the song
        const song = userDoc.data().Songs.find((s) => s.songId === songId);
        if (!userDoc.exists() || !song) {
            Toast.show({
                type: "error",
                text1: "Thông báo",
                text2: "Bài hát không tồn tại trong thư viện của bạn",
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
            return;
        }

        // Update the user's document by removing the song from the Songs array
        await updateDoc(userRef, {
            Songs: arrayRemove(song),
        });

        // Update userInfo
        const newSongs = userInfo.Songs.filter((s) => s.songId !== songId);
        setUserInfo({
            ...userInfo,
            Songs: newSongs,
        });

        Toast.show({
            type: "success",
            text1: "Thông báo",
            text2: "Bài hát đã được xóa khỏi thư viện của bạn",
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
            text2: "Đã có lỗi xảy ra, vui lòng thử lại sau",
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
        });
    }
}
