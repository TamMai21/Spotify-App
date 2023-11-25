import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import PlaylistHeader from "./PlaylistHeader";
import ListMusics from "./ListMusics";
import axios from "axios";
import { zingmp3Api } from "../../apis/constants";
import { useDispatch } from "react-redux";
import { setPlaylist, setPlaylistId } from "../../redux-toolkit/playerSlice";
import { useAuth } from "../../context/auth-context";

export default function PlayList({ route }) {
    const { id, MyPlaylistId } = route.params;
    const [data, setData] = React.useState({});
    const [myPlaylistData, setMyPlaylistData] = useState([]);
    const dispatch = useDispatch();
    const { userInfo, setUserInfo } = useAuth();
    const [myPlayListSongs, setMyPlayListSongs] = useState(null)
    useEffect(() => {
        async function fetchPlayListData() {
            if (!MyPlaylistId) {
                // If MyPlaylistId is not present, fetch data from the API
                const res = await axios.get(zingmp3Api.getAlbumPage(id));
                const data = res.data;
                setData(data.data);
                dispatch(setPlaylist(data?.data?.song.items));
                dispatch(setPlaylistId(id));
            } else {
                const myPlaylistData = userInfo?.MyPlaylistSongs.filter(
                    (item) => item.playlistId === MyPlaylistId
                );
                setMyPlaylistData(myPlaylistData);
                const songDetailsPromises = myPlaylistData.map(async (item) => {
                    const songRes = await axios.get(zingmp3Api.getSong(item.song.encodeId));
                    return songRes.data.data;
                });

                // Wait for all requests to finish
                const songDetails = await Promise.all(songDetailsPromises);
                setMyPlayListSongs({ items: songDetails });
            }
        }
        fetchPlayListData();
    }, []);
    return (
        <View style={styles.container}>
            <PlaylistHeader
                data={MyPlaylistId ? myPlaylistData[0] : data}
                myPlaylist={userInfo.MyPlaylist.find(MyPlaylist => MyPlaylist.playlistId == MyPlaylistId)}
                type="playlist" />
            {!MyPlaylistId && (
                <>
                    <ListMusics data={data?.song} />
                </>
            )}
            {MyPlaylistId && (
                <>
                    <ListMusics data={myPlayListSongs} />
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
