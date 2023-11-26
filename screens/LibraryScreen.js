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
import axios from "axios";
import { zingmp3Api } from "../apis/constants";
import Header from "../modules/Search/Header";

export default function LibraryScreen({ route, navigation }) {
    const { userInfo, setUserInfo } = useAuth();
    console.log("LibraryScreen ~ userInfo:", userInfo);
    const [selectedArtists, setSelectedArtists] = useState([]);
    var object;
    useEffect(() => {
        if (route.params && route.params.selectedArtists) {
            setSelectedArtists(route.params.selectedArtists);
        }
    }, [route.params]);

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
                style={{ position: "absolute", top: 30, right: 20 }}
                onPress={handleAddPlaylistPress}
            >
                <Image
                    source={require("../assets/plus.png")}
                    style={{ width: 20, height: 20 }}
                />
            </Pressable>

            <View style={styles.columnContainer}>
                <View style={styles.sectionContainer}>
                    <FlatList
                        data={userInfo.MyPlaylist}
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
                                </TouchableOpacity>
                            );
                        }}
                        keyExtractor={(item) => item.playlistId}
                    />

                    <FlatList
                        data={userInfo.Playlist}
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
