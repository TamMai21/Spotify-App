import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { zingmp3Api } from '../apis/constants';
import axios from 'axios';

export default function ArtistPage({ route, navigation }) {
    navigation.setOptions({
        headerShown: true,
        headerTransparent: true,
        headerTintColor: 'white',
        title: ''
    });

    const { artist } = route.params;
    const { title, thumbnail, artists, song } = artist;
    const [albumDetails, setAlbumDetails] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);

    // useEffect(() => {
    //     const isAlreadyFollowing = route.params.selectedArtists?.some(
    //         (selectedArtist) => selectedArtist.title === artist.title
    //     );
    //     setIsFollowing(!!isAlreadyFollowing);
    // }, [route.params?.selectedArtists, artist.title]);

    const toggleFollow = () => {
        setIsFollowing((prev) => {
            if (prev) {
                const updatedSelectedArtists = (route.params?.selectedArtists || []).filter(
                    (selectedArtist) => selectedArtist.title !== artist.title
                );
                navigation.setParams({
                    selectedArtists: updatedSelectedArtists,
                });
            }
            return !prev;
        });
    };

    const fetchAlbumDetails = async () => {
        try {
            const response = await axios.get(zingmp3Api.getAlbumPage(artist.playlistId));

            setAlbumDetails(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAlbumDetails();
    }, []);

    const renderMusicItem = ({ item }) => (
        <TouchableOpacity style={styles.musicItem}>
            <Image source={{ uri: item.thumbnailM }} style={styles.musicThumbnail} />
            <View style={styles.musicDetails}>
                <Text style={styles.musicTitle}>{item.title}</Text>
                <Text style={styles.musicArtists}>{item.artistsNames}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {albumDetails ? (
                <>
                    <View style={styles.topSection}>
                        <Image source={{ uri: albumDetails.thumbnail }} style={styles.artistImage} />
                    </View>
                    <View style={styles.artistDetails}>
                        <Text style={styles.artistName}>{albumDetails.artistsNames}</Text>
                        <Text style={styles.monthlyListeners}>Monthly Listeners: {albumDetails.listen}</Text>
                    </View>

                    <View style={styles.buttonsContainer}>
                        <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={toggleFollow}
                                style={{ borderColor: '#727272', borderWidth: 1, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20 }}>
                                <Text style={{ color: 'white' }}>{isFollowing ? 'Following' : 'Follow'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require('../assets/Vector.svg')} style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ padding: 10 }}>
                                <Image source={require('../assets/Vector (1).svg')} style={{ width: 3, height: 18 }} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity onPress={fetchAlbumDetails}>
                                <Image source={require('../assets/Auto Layout Horizontal.png')} style={{ width: 56, height: 56 }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <FlatList
                        data={albumDetails.song.items}
                        keyExtractor={(item) => item.encodeId}
                        renderItem={renderMusicItem}
                        style={styles.musicList}
                    />
                </>
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        padding: 16,
    },
    topSection: {
        alignItems: "center",
    },
    artistImage: {
        width: 150,
        height: 150,
        borderRadius: 100,
    },
    artistDetails: {
        marginTop: 16,
    },
    artistName: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
        color: 'white'
    },
    monthlyListeners: {
        color: "#fff",
        fontSize: 16,
        opacity: 0.70
    },
    buttonsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 16,
    },
    button: {
        backgroundColor: "#302C2C",
        padding: 8,
        borderRadius: 5,
        marginRight: 8,
    },
    playButton: {
        backgroundColor: "#302C2C",
        padding: 8,
        borderRadius: 5,
        alignSelf: "flex-end",
    },
    musicList: {
        marginTop: 16,
    },
    musicItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    musicThumbnail: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    musicDetails: {
        flex: 1,
    },
    musicTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 4,
    },
    musicArtists: {
        color: "#fff",
        fontSize: 14,
    },
});
