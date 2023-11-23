import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    FlatList,
    StyleSheet,
    Pressable,
} from "react-native";
import { getHomePage } from "../apis/home";
import { useDispatch } from "react-redux";
import {
    setAudioUrl,
    setCurrentProgress,
    setCurrentSongIndex,
    setIsPlaying,
    setPlayerData,
    setPlaylist,
    setRadioUrl,
    setShowPlayer,
} from "../redux-toolkit/playerSlice";
import Header from "../modules/Search/Header";
import { useAuth } from "../context/auth-context";

export default function HomeScreen({ navigation }) {
    const [homeData, setHomeData] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getHomePage();
                const items = data.data.items;

                const organizedData = items.reduce((acc, item) => {
                    const { sectionType, title, ...rest } = item;

                    if (
                        sectionType === "new-release" ||
                        sectionType === "playlist"
                    ) {
                        acc.push({ sectionType, title, ...rest });
                    }

                    return acc;
                }, []);

                setHomeData(organizedData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const getCurrentTime = () => {
        const hour = new Date().toLocaleTimeString("vi-VN", {
            hour: "2-digit",
        });
        // convert hour to number
        const hourNumber = parseInt(hour.split(":")[0]);
        const str = "";
        if (hourNumber >= 0 && hourNumber < 12) {
            return "Good morning";
        }
        if (hourNumber >= 12 && hourNumber < 18) {
            return "Good afternoon";
        }
        if (hourNumber >= 18 && hourNumber < 24) {
            return "Good evening";
        }
        return str;
    };

    return (
        <ScrollView style={styles.container}>
            <Header title={getCurrentTime()} navigation={navigation} />
            <View style={styles.list}>
                <FlatList
                    data={homeData}
                    renderItem={({ item }) => (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>
                                {item.title}
                            </Text>
                            <FlatList
                                horizontal={true}
                                data={
                                    item.sectionType === "new-release"
                                        ? item.items?.all || []
                                        : item.items || []
                                }
                                renderItem={({ item }) => (
                                    <Pressable
                                        onPress={() => {
                                            if (item.duration > 0) {
                                                dispatch(setPlayerData(item));
                                                dispatch(
                                                    setCurrentSongIndex(0)
                                                );
                                                dispatch(setPlaylist([]));
                                                dispatch(setAudioUrl(""));
                                                dispatch(setRadioUrl(""));
                                                dispatch(setShowPlayer(true));
                                                dispatch(setCurrentProgress(0));
                                                dispatch(setIsPlaying(true));
                                            } else {
                                                navigation.navigate(
                                                    "PlayList",
                                                    {
                                                        id: item.encodeId,
                                                    }
                                                );
                                            }
                                        }}
                                        style={styles.itemContainer}
                                    >
                                        <Image
                                            source={{ uri: item.thumbnailM }}
                                            style={styles.itemImage}
                                        />
                                        <Text
                                            numberOfLines={2}
                                            style={styles.itemTitle}
                                        >
                                            {item.title}
                                        </Text>
                                    </Pressable>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    )}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#121212",
        flex: 1,
        padding: 15,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 25,
    },
    headerText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
    headerIcon: {
        width: 23,
        height: 23,
    },
    list: {
        flexDirection: "row",
    },
    section: {
        marginBottom: 12,
    },
    sectionTitle: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "700",
    },
    itemContainer: {
        paddingVertical: 8,
        width: 168,
        height: 200,
        borderRadius: 4,
    },
    itemImage: {
        width: 152,
        height: 152,
        borderRadius: 4,
    },
    itemTitle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 6,
    },
});
