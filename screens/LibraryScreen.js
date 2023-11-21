import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
} from "react-native";
import ArtistListScreen from "./ArtistListScreen";

export default function LibraryScreen({ route, navigation }) {
    const [selectedArtists, setSelectedArtists] = useState([]);

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

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Your Library</Text>
            </View>

            <View style={styles.columnContainer}>
                <View style={styles.sectionContainer}>
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
                            <Text style={styles.addButtonLabel}>Add Music</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
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
    },
    musicItemContainer: {
        marginRight: 16,
        alignItems: "center",
        flexDirection: "row",
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
