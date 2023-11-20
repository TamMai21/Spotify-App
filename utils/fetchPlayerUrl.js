import React from "react";
import { useDispatch } from "react-redux";
import { setAudioUrl, setRadioUrl } from "../redux-toolkit/playerSlice";
import Toast from "react-native-toast-message";
import axios from "axios";

export default function fetchPlayerUrl(data) {
    const dispatch = useDispatch();
    React.useEffect(() => {
        async function fetchData() {
            if (!data?.encodeId) return;
            const res = await axios.get(
                `https://zing-mp3-api.vercel.app/api/song/${data?.encodeId}`
            );
            if (res.data) {
                if (res.data.err !== 0) {
                    if (data?.type === "livestream")
                        dispatch(setRadioUrl(data.streaming));
                    else {
                        dispatch(
                            setAudioUrl(
                                `http://api.mp3.zing.vn/api/streaming/audio/${data.encodeId}/320`
                            )
                        );
                    }
                } else {
                    dispatch(setAudioUrl(res.data.data[128]));
                }
            } else {
                Toast.show({
                    type: "error",
                    text1: "Lỗi",
                    text2: "Bài hát này chỉ dành cho VIP",
                    visibilityTime: 2000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40,
                });
                dispatch(setAudioUrl(""));
            }
        }
        fetchData();
    }, [data.encodeId]);
}
