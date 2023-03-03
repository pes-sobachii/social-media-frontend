import {ChangeEvent} from "react";
import axios from "../services/axios";

const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>, setImageUrl: (val: string) => void) => {
    if (!e.target.files) {
        return;
    }
    try {
        const formData = new FormData()
        formData.append('image', e.target.files[0])
        const {data} = await axios.post('http://localhost:5000/upload', formData)
        setImageUrl(data.url)
    } catch (err) {
        console.warn(err)
    }
}

export default handleChangeFile