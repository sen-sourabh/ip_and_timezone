import axios from "axios";
import { ipStackGeo } from "../config/geo_key";

export const getIpAddress = async () => {
    return await axios.get("https://api.ipify.org?format=json")
    .then(async (res) => {
        return res.data.ip
    })
    .catch((err) => {
        console.log("Error from getIPAddress: ", err);
    })
}

export const getGeoLocation = async (ip: string) => {
    // + '?access_key=' + ipStackGeo.API_KEY
    return await axios.get(ipStackGeo.BASE_URL + ip)
    .then((result) => {
        return result;
    })
    .catch((err) => {
        console.log("Error from getGeoLocation: ", err);
    })
}