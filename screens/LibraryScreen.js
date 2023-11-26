import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    Pressable,
    ScrollView,
} from "react-native";
import ArtistListScreen from "./ArtistListScreen";
import { useAuth } from "../context/auth-context";
import removeArtistFromUserLibrary from "../utils/removeArtistFromUserLibrary";
import removePlaylistFromUserLibrary from "../utils/removePlaylistfromUserLibrary";
import removeMyPlayListFromUserLibrary from "../utils/removeMyPlayListFromUserLibrary";
import axios from "axios";
import { zingmp3Api } from "../apis/constants";
import Header from "../modules/Search/Header";
import removeMyPlaylistSongFromUserLibrary from "../utils/removeMyPlaylistSongFromUserLibrary";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
    setCurrentProgress,
    setIsPlaying,
    setShowSubPlayer,
} from "../redux-toolkit/playerSlice";

export default function LibraryScreen({ route, navigation }) {
    const { userInfo, setUserInfo } = useAuth();
    const [selectedArtists, setSelectedArtists] = useState(userInfo?.Artist);
    const [playlist, setPlaylist] = useState(userInfo?.Playlist);
    const [myPlaylist, setMyPlaylist] = useState(userInfo?.MyPlaylist);
    const dispatch = useDispatch();

    useFocusEffect(
        React.useCallback(() => {
            setMyPlaylist(userInfo?.MyPlaylist);
            setPlaylist(userInfo?.Playlist);
            setSelectedArtists(userInfo?.Artist);
        }, [userInfo, myPlaylist, playlist])
    );

    const addMusic = () => {
        navigation.navigate("ArtistListScreen", {
            selectedArtists: selectedArtists,
        });
    };

    const navigateToArtistPage = (artist) => {
        console.log(artist);
        navigation.navigate("ArtistPage", { id: artist.playlistId });
    };

    const handleAddPlaylistPress = () => {
        navigation.navigate("CreatePlaylistScreen");
    };

    return (
        <ScrollView style={styles.container}>
            <Header title={"Library"} navigation={navigation} />

            <Pressable
                style={{ position: "absolute", top: 14, right: 20 }}
                onPress={handleAddPlaylistPress}
            >
                <Image
                    source={require("../assets/plus.png")}
                    style={{ width: 20, height: 20 }}
                />
            </Pressable>

            <View style={styles.columnContainer}>
                <View style={styles.sectionContainer}>
                    <TouchableOpacity
                        style={styles.musicItemContainer}
                        onPress={() => {
                            dispatch(setIsPlaying(false));
                            dispatch(setCurrentProgress(0));
                            dispatch(setShowSubPlayer(false));
                            navigation.navigate("PlayList", {
                                type: "liked",
                            });
                        }}
                    >
                        <Image
                            source={require("../assets/like_song_thumb.png")}
                            style={styles.playlistItemImage}
                        />
                        <View style={styles.itemTextContainer}>
                            <Text
                                style={styles.itemTitle}
                            >{`Bài hát đã thích`}</Text>
                        </View>
                    </TouchableOpacity>
                    <FlatList
                        data={myPlaylist}
                        ItemSeparatorComponent={() => (
                            <View style={{ height: 15 }} />
                        )}
                        renderItem={({ item }) => {
                            const playlistSong =
                                userInfo?.MyPlaylistSongs?.find(
                                    (playlist) =>
                                        playlist.playlistId === item.playlistId
                                );
                            const uri = playlistSong
                                ? playlistSong.song.thumbnailM
                                : item.thumbnail;
                            return (
                                <TouchableOpacity
                                    style={styles.musicItemContainer}
                                    onPress={() => {
                                        dispatch(setIsPlaying(false));
                                        dispatch(setCurrentProgress(0));
                                        navigation.navigate("PlayList", {
                                            MyPlaylistId: item.playlistId,
                                        });
                                    }}
                                >
                                    <Image
                                        source={{ uri: uri }}
                                        style={styles.playlistItemImage}
                                    />
                                    <View style={styles.itemTextContainer}>
                                        <Text style={styles.itemTitle}>
                                            {item.name}
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            var songs =
                                                userInfo.MyPlaylistSongs.filter(
                                                    (songPlaylist) =>
                                                        item.playlistId ===
                                                        songPlaylist.playlistId
                                                );

                                            removeMyPlayListFromUserLibrary(
                                                item.playlistId,
                                                userInfo,
                                                setUserInfo
                                            );
                                            songs.forEach((song) => {
                                                removeMyPlaylistSongFromUserLibrary(
                                                    item.playlistId,
                                                    song.song.encodeId,
                                                    userInfo,
                                                    setUserInfo,
                                                    true
                                                );
                                            });

                                            var newMyPlaylist =
                                                myPlaylist.filter(
                                                    (playlist) =>
                                                        playlist.playlistId !==
                                                        item.playlistId
                                                );

                                            setMyPlaylist(newMyPlaylist);
                                        }}
                                    >
                                        <Image
                                            source={require("../assets/delete.png")}
                                            style={{ width: 30, height: 30 }}
                                        />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            );
                        }}
                        keyExtractor={(item) => item.playlistId}
                    />

                    <FlatList
                        data={playlist}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.musicItemContainer}
                                onPress={() =>
                                    navigation.navigate("PlayList", {
                                        id: item.playlistId,
                                    })
                                }
                            >
                                <Image
                                    source={{ uri: item?.thumbnail }}
                                    style={styles.playlistItemImage}
                                />
                                <View style={styles.itemTextContainer}>
                                    <Text style={styles.itemTitle}>
                                        {item?.name}
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    onPress={() => {
                                        const newPlaylist = playlist.filter(
                                            (currentPlaylist) => {
                                                currentPlaylist.playlistId !=
                                                    item.playlistId;
                                            }
                                        );
                                        setPlaylist(newPlaylist);
                                        removePlaylistFromUserLibrary(
                                            item.playlistId,
                                            userInfo,
                                            setUserInfo
                                        );
                                    }}
                                >
                                    <Image
                                        source={require("../assets/delete.png")}
                                        style={{ width: 30, height: 30 }}
                                    />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item?.playlistId}
                        ItemSeparatorComponent={() => (
                            <View style={{ height: 15 }} />
                        )}
                    />

                    <FlatList
                        data={selectedArtists}
                        ItemSeparatorComponent={() => (
                            <View style={{ height: 15 }} />
                        )}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.musicItemContainer}
                                onPress={() => navigateToArtistPage(item)}
                            >
                                <Image
                                    source={{ uri: item.thumbnail }}
                                    style={styles.musicItemImage}
                                />
                                <View style={styles.itemTextContainer}>
                                    <Text style={styles.itemTitle}>
                                        {item.name}
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    onPress={() => {
                                        const newSelectedArtists =
                                            selectedArtists.filter((artist) => {
                                                return (
                                                    artist.artistId !==
                                                    item.artistId
                                                );
                                            });
                                        setSelectedArtists(newSelectedArtists);
                                        removeArtistFromUserLibrary(
                                            item.artistId,
                                            userInfo,
                                            setUserInfo
                                        );
                                    }}
                                >
                                    <Image
                                        source={require("../assets/delete.png")}
                                        style={{ width: 30, height: 30 }}
                                    />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>

                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={addMusic}
                        >
                            <View style={styles.musicButtonCircle}>
                                <Text style={{ fontSize: 36, color: "#fff" }}>
                                    +
                                </Text>
                            </View>
                            <Text style={styles.addButtonLabel}>
                                Add Artist
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        padding: 16,
    },
    header: {
        marginBottom: 16,
    },
    headerText: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
    },
    columnContainer: {
        flexDirection: "column",
    },
    sectionContainer: {
        marginBottom: 16,
        gap: 15,
    },
    musicItemContainer: {
        marginRight: 16,
        alignItems: "center",
        flexDirection: "row",
    },
    playlistItemImage: {
        width: 66,
        height: 64,
        borderRadius: 10,
        backgroundColor: "#fff",
    },
    musicItemImage: {
        width: 66,
        height: 64,
        borderRadius: 33,
    },
    podcastItemContainer: {
        marginRight: 16,
        alignItems: "center",
        flexDirection: "row",
    },
    podcastItemImage: {
        width: 66,
        height: 66,
        borderRadius: 8,
    },
    itemTextContainer: {
        marginLeft: 8,
        minWidth: 280,
    },
    itemTitle: {
        color: "#fff",
        fontSize: 18,
        marginTop: 8,
        textAlign: "left",
    },
    buttonsContainer: {
        flexDirection: "column",
    },
    addButton: {
        flexDirection: "column",
        marginBottom: 8,
    },
    musicButtonCircle: {
        width: 66,
        height: 66,
        borderRadius: 33,
        backgroundColor: "#302C2C",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },
    podcastButtonSquare: {
        width: 66,
        height: 66,
        backgroundColor: "#302C2C",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },
    addButtonLabel: {
        color: "#fff",
        fontSize: 14,
    },
});
