import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import axios from "axios";
import NewRelease from "../NewRelease";
import Radio from "../Radio";
import Hub from "../Hub";

export default function CategoryDetail({ route }) {
    const { item } = route.params;
    const [data, setData] = React.useState({});
    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(item.api);
            const data = res.data;
            setData(data.data);
        }
        fetchData();
    }, []);
    if (!data || !item) return null;
    return (
        <>
            {item.id === 1 ? <NewRelease data={data} /> : null}
            {item.id === 2 ? <Radio data={data} /> : null}
            {item.id !== 1 && item.id !== 2 ? <Hub data={data} /> : null}
        </>
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
