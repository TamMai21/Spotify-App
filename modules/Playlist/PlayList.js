import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import PlaylistHeader from "./PlaylistHeader";
import ListMusics from "./ListMusics";
import axios from "axios";
import { zingmp3Api } from "../../apis/constants";
import { useDispatch } from "react-redux";
import {
    setCurrentProgress,
    setPlaylist,
    setPlaylistId,
} from "../../redux-toolkit/playerSlice";
import { useAuth } from "../../context/auth-context";
import { useFocusEffect } from "@react-navigation/core";

export default function PlayList({ navigation, route }) {
    const { id, MyPlaylistId, type } = route?.params;
    const [data, setData] = React.useState({});
    const [myPlaylistData, setMyPlaylistData] = useState([]);
    const [songData, setSongData] = useState([]);
    console.log("PlayList ~ songData:", songData);
    const [myPlaylist, setMyPlaylist] = useState();
    const dispatch = useDispatch();
    const { userInfo, setUserInfo } = useAuth();
    console.log("PlayList ~ userInfo:", userInfo);
    const [myPlayListSongs, setMyPlayListSongs] = useState(null);

    const handleAddMusicToMyPlayList = () => {
        navigation.navigate("AddSongToPlaylistScreen", { id: MyPlaylistId });
    };

    useEffect(() => {
        async function fetchSongData() {
            if (userInfo?.Songs) {
                const promises = userInfo.Songs.map((item) =>
                    axios.get(
                        `https://zing-mp3-api.vercel.app/api/song/info/${item.songId}`
                    )
                );
                const res = await Promise.all(promises);
                setSongData(res.map((r) => r.data.data));
            }
        }
        fetchSongData();
    }, [userInfo?.Songs]);

    useFocusEffect(
        React.useCallback(() => {
            async function fetchPlayListData() {
                if (!MyPlaylistId) {
                    // If MyPlaylistId is not present, fetch data from the API
                    const res = await axios.get(zingmp3Api.getAlbumPage(id));
                    const data = res.data;
                    setData(data.data);
                    dispatch(setPlaylist(data?.data?.song.items));
                    dispatch(setPlaylistId(id));
                    dispatch(setCurrentProgress(0));
                } else {
                    const myPlaylistData = userInfo?.MyPlaylistSongs.filter(
                        (item) => item.playlistId === MyPlaylistId
                    );
                    setMyPlaylistData(myPlaylistData);
                    const songDetailsPromises = myPlaylistData.map(
                        async (item) => {
                            const songRes = await axios.get(
                                zingmp3Api.getSong(item.song.encodeId)
                            );
                            return songRes.data.data;
                        }
                    );

                    // Wait for all requests to finish
                    const songDetails = await Promise.all(songDetailsPromises);
                    setMyPlayListSongs({ items: songDetails });
                }
            }
            fetchPlayListData();
        }, [MyPlaylistId, id, userInfo])
    );
    return (
        <View style={styles.container}>
            {type === "liked" && (
                <PlaylistHeader
                    data={userInfo?.Songs}
                    type="playlist"
                    isLiked={true}
                />
            )}

            {type !== "liked" && (
                <PlaylistHeader
                    data={MyPlaylistId ? myPlaylist : data}
                    myPlaylist={userInfo?.MyPlaylist?.find(
                        (MyPlaylist) => MyPlaylist.playlistId == MyPlaylistId
                    )}
                    type="playlist"
                />
            )}

            {/* <PlaylistHeader
                data={MyPlaylistId ? myPlaylistData[0] : data}
                myPlaylist={userInfo?.MyPlaylist?.find(
                    (MyPlaylist) => MyPlaylist.playlistId == MyPlaylistId
                )}
            /> */}
            {!MyPlaylistId && type !== "liked" && (
                <>
                    <ListMusics data={data?.song} />
                </>
            )}
            {!MyPlaylistId && type === "liked" && (
                <>
                    <ListMusics data={songData} type="liked" />
                </>
            )}
            {MyPlaylistId && (
                <>
                    <ListMusics
                        navigation={navigation}
                        data={myPlayListSongs}
                        type="myPlaylist"
                        onAddMusic={handleAddMusicToMyPlayList}
                    />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000",
        flex: 1,
        paddingTop: 40,
        paddingLeft: 16,
        paddingRight: 16,
        overflow: "scroll",
    },
});
