import {
    collection,
    doc,
    getDoc,
    updateDoc,
    arrayUnion,
} from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import Toast from "react-native-toast-message";

export default async function addPlaylistIntoUserLibrary(
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

        // Check if the Playlist array contains the playlistId
        if (userDoc.exists() && userDoc.data().Playlist.includes(playlistId)) {
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

        // Update the user's document by adding the playlistId to the Playlist array
        await updateDoc(userRef, {
            Playlist: arrayUnion(playlistId),
        });
        // Update userInfo
        setUserInfo({
            ...userInfo,
            Playlist: [...(userInfo.Playlist || []), playlistId],
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
