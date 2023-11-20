import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import PlaylistHeader from "./PlaylistHeader";
import ListMusics from "./ListMusics";
import axios from "axios";
import { zingmp3Api } from "../../apis/constants";
import { useDispatch } from "react-redux";
import { setPlaylist } from "../../redux-toolkit/playerSlice";

export default function Artist({ route }) {
    const { id } = route.params;
    const [data, setData] = React.useState({});
    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchPlayListData() {
            const res = await axios.get(zingmp3Api.getAlbumPage(id));
            const data = res.data;
            setData(data.data);
            dispatch(setPlaylist(data.data.song.items));
        }
        fetchPlayListData();
    }, []);
    return (
        <View style={styles.container}>
            <PlaylistHeader data={data} type="playlist" />
            <ListMusics data={data?.song} />
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
