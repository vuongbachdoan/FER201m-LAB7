import axios from "axios";

const URL = "https://65444ee25a0b4b04436c3f2c.mockapi.io"
const ENDPOINT = {
    getAll: `${URL}/news`,
    createOne: `${URL}/news`,
    getOne: `${URL}/news`,
    deleteOne: `${URL}/news`,
    updateOne: `${URL}/news`,
}

export const getAllFlowers = async () => {
    const res = await axios.get(ENDPOINT.getAll);
    return res.data;
}

export const getOneFlower = async (flowerId) => {
    const res = await axios.get(`${ENDPOINT.getOne}/${flowerId}`);
    return res.data;
}

export const createOneFlower = async (newsData) => {
    const res = await axios.post(`${ENDPOINT.createOne}`, newsData);
    return res.data;
}

export const deleteOneFlower = async (flowerId) => {
    const res = await axios.delete(`${ENDPOINT.deleteOne}/${flowerId}`);
    return res.data;
}

export const updateOneFlower = async (newsId, newsData) => {
    const res = await axios.put(`${ENDPOINT.updateOne}/${newsId}`, newsData);
    return res.data;
}