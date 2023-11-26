import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../context/auth-context";
import { addMyPlayListIntoUserLibrary } from "../utils/addMyPlayListIntoUserlibrary";

export default function CreatePlaylistScreen({ route, navigation }) {
    const [playlistName, setPlaylistName] = useState("");
    const { userInfo, setUserInfo } = useAuth();
    const [id, setId] = useState();
    const inputRef = useRef();

    useEffect(() => {
        const id = userInfo.MyPlaylist ? userInfo.MyPlaylist.length + 1 : 1;
        setId(id);
        setPlaylistName("My playlist #" + id);
    }, []);

    const handleAddPlaylist = () => {
        addMyPlayListIntoUserLibrary(
            id,
            playlistName,
            "https://icons-for-free.com/iconfiles/png/512/music+note+sound+icon-1320183235697157602.png",
            userInfo,
            setUserInfo
        );
        navigation.navigate("LibraryScreen");

        navigation.pop();

        navigation.navigate("AddSongToPlaylistScreen", { id: id });
    };

    return (
        <LinearGradient
            colors={["#5e6869", "#000000"]}
            style={styles.container}
        >
            <Text style={styles.title}>Name your playlist</Text>
            <TextInput
                ref={inputRef}
                style={styles.input}
                placeholder="Playlist name"
                value={playlistName}
                onChangeText={setPlaylistName}
                onFocus={() => inputRef.current.select()}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.buttonTextCancel}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.createButton}
                    onPress={handleAddPlaylist}
                >
                    <Text style={styles.buttonTextCreate}>Create</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "linear-gradient(#121212, #000000)",
    },
    title: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        width: "100%",
        textAlign: "center",
    },
    input: {
        color: "#fff",
        padding: 10,
        marginBottom: 20,
        width: "100%",
        fontSize: 36,
        borderBottomWidth: 3,
        borderBlockColor: "#5e6869",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cancelButton: {
        flex: 1,
        marginRight: 10,
        backgroundColor: "#555",
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 30,
        alignItems: "center",
    },
    createButton: {
        flex: 1,
        marginLeft: 10,
        backgroundColor: "#1ED760",
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 30,
        alignItems: "center",
    },
    buttonTextCreate: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
    },
    buttonTextCancel: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
