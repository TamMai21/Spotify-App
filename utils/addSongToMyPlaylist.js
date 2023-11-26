import {
    collection,
    doc,
    getDoc,
    updateDoc,
    arrayUnion,
} from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import Toast from "react-native-toast-message";

export async function addSongsToMyPlaylist(playlistId, songs) {
    try {
        const userId = auth.currentUser.uid;
        const userRef = doc(collection(db, "users"), userId);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            throw new Error("User document not found");
        }

        const existingMyPlaylistSongs = userDoc.data().MyPlaylistSongs || [];

        // Add the songs to the MyPlaylistSongs array
        const updatedMyPlaylistSongs = arrayUnion(
            ...songs.map((song) => ({ playlistId, song }))
        );

        // Update the user's document with the modified MyPlaylistSongs
        await updateDoc(userRef, {
            MyPlaylistSongs: updatedMyPlaylistSongs,
        });

        return updatedMyPlaylistSongs;
    } catch (error) {
        console.error("Error adding songs to MyPlaylistSongs:", error);
        throw error; // Rethrow the error for handling in the component
    }
}
