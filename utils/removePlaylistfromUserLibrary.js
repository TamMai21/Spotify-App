import {
    arrayRemove,
    collection,
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import Toast from "react-native-toast-message";

export default async function removePlaylistFromUserLibrary(
    playlistId,
    userInfo,
    setUserInfo
) {
    try {
        // Get a reference to the user's document in the 'users' collection
        const userId = auth.currentUser.uid;
        const userRef = doc(collection(db, "users"), userId);

        // Get the current state of the user's document
        const userDoc = await getDoc(userRef);

        // Check if the Playlist array contains the playlist
        const playlist = userDoc
            .data()
            .Playlist.find((pl) => pl.playlistId === playlistId);
        if (!userDoc.exists() || !playlist) {
            Toast.show({
                type: "error",
                text1: "Thông báo",
                text2: "Playlist không có trong thư viện của bạn",
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
            return;
        }

        // Update the user's document by removing the playlist from the Playlist array
        await updateDoc(userRef, {
            Playlist: arrayRemove(playlist),
        });

        // Update userInfo
        const newPlaylist = userInfo.Playlist.filter(
            (pl) => pl.playlistId !== playlistId
        );
        setUserInfo({
            ...userInfo,
            Playlist: newPlaylist,
        });

        Toast.show({
            type: "success",
            text1: "Thông báo",
            text2: "Xóa playlist khỏi thư viện thành công",
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
            text2: "Xóa playlist khỏi thư viện thất bại",
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
        });
    }
}
