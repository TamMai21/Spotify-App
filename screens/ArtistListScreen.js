import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TextInput,
} from "react-native";
import axios from "axios";
import { zingmp3Api } from "../apis/constants";
import { useAuth } from "../context/auth-context";
import addArtistIntoUserLibrary from "../utils/addArtistIntoUserLibrary";

const ArtistListScreen = ({ route, navigation }) => {
    const { userInfo, setUserInfo } = useAuth();
    console.log("ArtistListScreen ~ userInfo:", userInfo);
    const [artistData, setArtistData] = useState(null);
    const [selectedArtists, setSelectedArtists] = useState(
        route.params.selectedArtists
    );
    console.log("ArtistListScreen ~ selectedArtists:", selectedArtists);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const artistResponse = await axios.get(
                    zingmp3Api.getArtist(searchText)
                );
                setArtistData(artistResponse.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [searchText]);

    const toggleSelection = (artist) => {
        setSelectedArtists((prevSelectedArtists) => {
            console.log(artist);
            const existingArtist = prevSelectedArtists.find(
                (a) => a.id === artist.id
            );
            if (existingArtist) {
                return prevSelectedArtists.filter((a) => a.id !== artist.id);
            } else {
                return [...prevSelectedArtists, artist];
            }
        });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => toggleSelection(item)}
        >
            <View style={styles.artistContainer}>
                <Image
                    source={{ uri: item.thumbnail }}
                    style={styles.artistImage}
                />
                {selectedArtists.some((artist) => artist.id === item.id) && (
                    <View style={styles.selectionTick}>
                        <Text style={styles.selectionTickText}>✓</Text>
                    </View>
                )}
                <Text style={styles.artistName}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    const handleDone = () => {
        console.log("Selected Artists:", selectedArtists);
        if (selectedArtists.length === 0) {
            navigation.goBack();
            return;
        } else {
            selectedArtists?.forEach(async (artist) => {
                const artistId = artist.id;
                const playlistId = artist.playlistId;
                const name = artist.name;
                const thumbnail = artist.thumbnailM;
                addArtistIntoUserLibrary(
                    artistId,
                    playlistId,
                    name,
                    thumbnail,
                    userInfo,
                    setUserInfo
                );
            });
            navigation.navigate("LibraryHome", { selectedArtists });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>
                Chọn thêm các nghệ sĩ bạn thích.
            </Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Tìm kiếm"
                onChangeText={(text) => setSearchText(text)}
                value={searchText}
            />

            <FlatList
                data={artistData ? artistData.items : []}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                numColumns={3}
            />

            <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
                <Text style={styles.doneButtonText}>Xong</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        padding: 16,
    },
    headerText: {
        color: "white",
        fontSize: 30,
        marginBottom: 8,
    },
    searchInput: {
        minHeight: 40,
        backgroundColor: "white",
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        fontSize: 16,
    },
    listContainer: {
        marginTop: 16,
    },
    itemContainer: {
        marginBottom: 16,
        flex: 1 / 3,
    },
    artistContainer: {
        alignItems: "center",
    },
    artistImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 8,
    },
    artistName: {
        color: "#fff",
        fontSize: 14,
    },
    selectionTick: {
        position: "absolute",
        top: 8,
        right: 8,
        backgroundColor: "white",
        borderRadius: 25,
        padding: 5,
    },
    selectionTickText: {
        color: "black",
        fontSize: 12,
    },
    doneButton: {
        backgroundColor: "white",
        padding: 10,
        alignItems: "center",
        borderRadius: 8,
        marginTop: 16,
        width: "50%", // Adjusted width
        alignSelf: "center", // Centered the button
        marginBottom: 40,
    },
    doneButtonText: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 18,
    },
});

export default ArtistListScreen;
