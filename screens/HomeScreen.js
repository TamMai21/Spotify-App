import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, FlatList, StyleSheet } from "react-native";
import { getHomePage } from "../apis/home";

export default function HomeScreen() {
    const [homeData, setHomeData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getHomePage();
                const items = data.data.items;

                const organizedData = items.reduce((acc, item) => {
                    const { sectionType, title, ...rest } = item;

                    if (sectionType === 'new-release' || sectionType === 'playlist') {
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

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Good morning</Text>
                <TouchableOpacity>
                    <Image source={require('../assets/Vector.png')} style={styles.headerIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.list}>
                <FlatList
                    data={homeData}
                    renderItem={({ item }) => (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{item.title}</Text>
                            <FlatList
                                horizontal={true}
                                data={item.sectionType === 'new-release' ? item.items?.all || [] : item.items || []}
                                renderItem={({ item }) => (
                                    <View style={styles.itemContainer}>
                                        <Image source={{ uri: item.thumbnailM }} style={styles.itemImage} />
                                        <Text numberOfLines={2} style={styles.itemTitle}>{item.title}</Text>
                                    </View>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    )}
                />
            </View>
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#121212",
        flex: 1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 25
    },
    headerText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700"
    },
    headerIcon: {
        width: 23,
        height: 23,
    },
    list: {
        flexDirection: 'row'
    },
    section: {
        marginBottom: 12
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 15,
        fontWeight: "700"
    },
    itemContainer: {
        padding: 8,
        marginHorizontal: 6,
        width: 168,
        height: 200,
        borderRadius: 4
    },
    itemImage: {
        width: 152,
        height: 152,
        borderRadius: 4
    },
    itemTitle: {
        color: '#fff',
        fontSize: 16,
        marginTop: 6
    }
});
