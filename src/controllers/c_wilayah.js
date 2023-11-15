import axios from "axios";
import { API_WILAYAH } from "../config/secret.js";
import Messages from "../utils/messages.js";

const provinces = (req, res) => {
    axios.get(`${API_WILAYAH}/provinces.json`).then((response) => {
        Messages(res, 200, "Success", response.data);
    }).catch((error) => {
        Messages(res, error.response.status, error.message);
    })
}

const regencies = (req, res) => {
    const id = parseInt(req.params.id)

    if (!id) return Messages(res, 404, "ID province not found", [])

    axios.get(`${API_WILAYAH}/regencies/${id}.json`).then((response) => {
        Messages(res, 200, "Success", response.data);
    }).catch((error) => {
        Messages(res, error.response.status, error.message);
    })
}

const district = (req, res) => {
    const id = parseInt(req.params.id)

    if (!id) return Messages(res, 404, "ID Regency/city not found", [])
    
    axios.get(`${API_WILAYAH}/districts/${id}.json`).then((response) => {
        Messages(res, 200, "Success", response.data);
    }).catch((error) => {
        Messages(res, error.response.status, error.message);
    })
}

const villages = (req, res) => {
    const id = parseInt(req.params.id)

    if (!id) return Messages(res, 404, "ID District not found", [])
    
    axios.get(`${API_WILAYAH}/villages/${id}.json`).then((response) => {
        Messages(res, 200, "Success", response.data);
    }).catch((error) => {
        Messages(res, error.response.status, error.message);
    })
}

export { provinces, regencies, district, villages };