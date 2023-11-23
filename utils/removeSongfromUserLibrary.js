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

        // Check if the Songs array contains the songId
        if (!userDoc.exists() || !userDoc.data().Songs.includes(songId)) {
            console.log("SongId does not exist in Songs");
            return;
        }

        // Update the user's document by removing the songId from the Songs array
        await updateDoc(userRef, {
            Songs: arrayRemove(songId),
        });

        // Update userInfo
        const newSongs = userInfo.Songs.filter((id) => id !== songId);
        setUserInfo({
            ...userInfo,
            Songs: newSongs,
        });

        Toast.show({
            type: "success",
            text1: "Remove song successfully",
            text2: "Song has been removed from your library",
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
        });
    } catch (error) {
        console.log("error:", error);
        Toast.show({
            type: "error",
            text1: "Remove song failed",
            text2: "Something went wrong",
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
        });
    }
}
