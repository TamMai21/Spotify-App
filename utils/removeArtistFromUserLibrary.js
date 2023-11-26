import {
    arrayRemove,
    collection,
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import Toast from "react-native-toast-message";

export default async function removeArtistFromUserLibrary(
    artistId,
    userInfo,
    setUserInfo
) {
    try {
        // Get a reference to the user's document in the 'users' collection
        const userId = auth.currentUser.uid;
        const userRef = doc(collection(db, "users"), userId);

        // Get the current state of the user's document
        const userDoc = await getDoc(userRef);

        // Check if the Artist array contains the artist
        const artist = userDoc
            .data()
            .Artist?.find((pl) => pl.artistId === artistId);
        if (!userDoc.exists() || !artist) {
            Toast.show({
                type: "error",
                text1: "Thông báo",
                text2: "Nghệ sĩ không có trong thư viện của bạn",
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
            return;
        }

        // Update the user's document by removing the Artist from the Playlist array
        await updateDoc(userRef, {
            Artist: arrayRemove(artist),
        });

        // Update userInfo
        const newArtist = userInfo.Artist.filter(
            (pl) => pl.artistId !== artistId
        );
        setUserInfo({
            ...userInfo,
            Artist: newArtist,
        });

        Toast.show({
            type: "success",
            text1: "Thông báo",
            text2: "Xóa nghệ sĩ khỏi thư viện thành công",
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
            text2: "Xóa nghệ sĩ khỏi thư viện thất bại",
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
        });
    }
}
