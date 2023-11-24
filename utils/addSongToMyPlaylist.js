import {
    collection,
    doc,
    updateDoc,
    arrayUnion,
} from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import Toast from "react-native-toast-message";

// Function to add songs to a playlist
export async function addSongsToPlaylist(playlistId, selectedSongs) {
    try {
        // Get a reference to the user's document in the 'users' collection
        const userId = auth.currentUser.uid;
        const userRef = doc(collection(db, "users"), userId);

        // Update the user's document by adding the selected songs to the playlist
        await updateDoc(userRef, {
            [`MyPlaylist.${playlistId}.songs`]: arrayUnion(...selectedSongs),
        });

        Toast.show({
            type: "success",
            text1: "Success",
            text2: "Songs added to playlist!",
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
        });
    } catch (error) {
        console.log("error:", error);
        Toast.show({
            type: "error",
            text1: "Error",
            text2: "Failed to add songs to playlist",
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
        });
    }
}