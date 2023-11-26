import {
    arrayRemove,
    collection,
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import Toast from "react-native-toast-message";

export default async function removeMyPlaylistSongFromUserLibrary(
    playlistId,
    songId,
    userInfo,
    setUserInfo,
    isDeleteAll
) {
    try {
        // Get a reference to the user's document in the 'users' collection
        const userId = auth.currentUser.uid;
        const userRef = doc(collection(db, "users"), userId);

        // Get the current state of the user's document
        const userDoc = await getDoc(userRef);

        // Check if the Songs array contains the song
        const song = userDoc.data().MyPlaylistSongs.filter((s) => s.playlistId === playlistId).find(s => s.song.encodeId === songId);
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
            MyPlaylistSongs: arrayRemove(song),
        });

        // Update userInfo

        const newSongs = userInfo.MyPlaylistSongs.filter(
            (s) => s.song.encodeId !== songId && s.playlistId !== playlistId
        );
        if (isDeleteAll == true) {
            var newMyPlaylist = userInfo.MyPlaylist.filter(playlist =>
                playlist.playlistId !== playlistId
            )

            setUserInfo({
                ...userInfo,
                MyPlaylist: newMyPlaylist,
                MyPlaylistSongs: newSongs,
            });
        } else {
            setUserInfo({
                ...userInfo,
                MyPlaylistSongs: newSongs,
            });
        }

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
