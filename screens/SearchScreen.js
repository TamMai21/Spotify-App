import {
    FlatList,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
} from "react-native";
import React from "react";
import { zingmp3Api } from "../apis/constants";
import Header from "../modules/Search/Header";
import { useDispatch } from "react-redux";
import { setCurrentProgress, setIsPlaying } from "../redux-toolkit/playerSlice";
import { View } from "react-native-web";

const data = [
    {
        id: 1,
        title: "New Releases",
        color: "#148A08",
        api: zingmp3Api.getNewSong(),
    },
    {
        id: 2,
        title: "Radio",
        color: "#148A08",
        api: zingmp3Api.getRadioPage(),
    },
    {
        id: 3,
        title: "V-Pop",
        color: "#F037A5",
        api: zingmp3Api.getHubDetail("IWZ9Z087"),
    },
    {
        id: 4,
        title: "Dance/Electronic",
        color: "#FDBB2C",
        api: zingmp3Api.getHubDetail("IWZ9Z08B"),
    },
    {
        id: 5,
        title: "K-Pop",
        color: "#1DB954",
        api: zingmp3Api.getHubDetail("IWZ9Z08U"),
    },
    {
        id: 6,
        title: "US-UK",
        color: "#148A08",
        api: zingmp3Api.getHubDetail("IWZ9Z086"),
    },
    {
        id: 7,
        title: "C-Pop",
        color: "#F037A5",
        api: zingmp3Api.getHubDetail("IWZ9Z08Z"),
    },
    {
        id: 8,
        title: "Bolero",
        color: "#FDBB2C",
        api: zingmp3Api.getHubDetail("IWZ9Z09U"),
    },
    {
        id: 9,
        title: "Children's",
        color: "#1DB954",
        api: zingmp3Api.getHubDetail("IWZ9Z090"),
    },
    {
        id: 10,
        title: "Jazz",
        color: "#148A08",
        api: zingmp3Api.getHubDetail("IWZ9Z0AB"),
    },
    {
        id: 11,
        title: "Latin",
        color: "#F037A5",
        api: zingmp3Api.getHubDetail("IWZ9Z08F"),
    },
    {
        id: 12,
        title: "Classical",
        color: "#FDBB2C",
        api: zingmp3Api.getHubDetail("IWZ9Z0C9"),
    },
    {
        id: 13,
        title: "Hip Hop",
        color: "#1DB954",
        api: zingmp3Api.getHubDetail("IWZ9Z08C"),
    },
    {
        id: 14,
        title: "Remix",
        color: "#1DB954",
        api: zingmp3Api.getHubDetail("IWZ9Z0BO"),
    },
];

export default function SearchScreen({ navigation }) {
    const dispatch = useDispatch();
    return (
        <ScrollView style={styles.container}>
            <Header title={"Search"} navigation={navigation} />
            <Pressable
                onPress={() => navigation.navigate("SearchView")}
                style={{
                    width: "100%",
                    height: 44,
                    backgroundColor: "white",
                    borderRadius: 8,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: 16,
                    gap: 8,
                    marginBottom: 20,
                }}
            >
                <Text>
                    <svg
                        width={22}
                        height={22}
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M9.53298 0.278954C4.35298 0.278954 0.125977 4.41895 0.125977 9.55795C0.125977 14.697 4.35198 18.837 9.53298 18.837C11.767 18.837 13.823 18.067 15.44 16.779L19.793 21.132C19.8852 21.2275 19.9956 21.3036 20.1176 21.3561C20.2396 21.4085 20.3708 21.4361 20.5036 21.4372C20.6364 21.4384 20.768 21.4131 20.8909 21.3628C21.0138 21.3125 21.1255 21.2382 21.2194 21.1444C21.3133 21.0505 21.3875 20.9388 21.4378 20.8159C21.4881 20.693 21.5134 20.5613 21.5122 20.4286C21.5111 20.2958 21.4835 20.1646 21.4311 20.0425C21.3787 19.9205 21.3025 19.8102 21.207 19.718L16.863 15.374C18.2079 13.7343 18.942 11.6786 18.94 9.55795C18.94 4.41795 14.714 0.277954 9.53298 0.277954V0.278954ZM2.12598 9.55795C2.12598 5.55195 5.42798 2.27795 9.53298 2.27795C13.638 2.27795 16.94 5.55195 16.94 9.55795C16.94 13.564 13.638 16.837 9.53298 16.837C5.42798 16.837 2.12598 13.565 2.12598 9.55795Z"
                            fill="black"
                        />
                    </svg>
                </Text>
                <Text style={{ fontSize: 16, fontWeight: 400, color: "black" }}>
                    What do you want to listen to?
                </Text>
            </Pressable>
            <Text
                style={{
                    fontSize: 15,
                    fontWeight: 700,
                    marginBottom: 35,
                    color: "white",
                }}
            >
                Browse all
            </Text>
            <View
                style={{
                    marginBottom: 80,
                }}
            >
                <FlatList
                    columnWrapperStyle={{
                        marginRight: 16,
                        marginLeft: 8,
                    }}
                    numColumns={2}
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => {
                                dispatch(setIsPlaying(false));
                                dispatch(setCurrentProgress(0));
                                navigation.navigate("CategoryDetail", { item });
                            }}
                            style={{
                                width: 164,
                                height: 92,
                                backgroundColor: item.color,
                                borderRadius: 8,
                                marginBottom: 16,
                                paddingLeft: 16,
                                marginRight: 16,
                            }}
                        >
                            <Text
                                ellipsizeMode="tail"
                                numberOfLines={1}
                                style={{
                                    marginTop: 15,
                                    marginLeft: 5,
                                    fontSize: 16,
                                    fontWeight: "700",
                                    color: "white",
                                }}
                            >
                                {item.title}
                            </Text>
                        </Pressable>
                    )}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000",
        flex: 1,
        paddingTop: 40,
        paddingLeft: 16,
        paddingRight: 16,
    },
});
