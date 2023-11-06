import axios from "axios";

export const getAllUsers = async () => {
    const res = await axios.get('https://65444ee25a0b4b04436c3f2c.mockapi.io/users');
    return res.data;
}

export const createUser = async (data) => {
    const res = await axios.post('https://65444ee25a0b4b04436c3f2c.mockapi.io/users', data);
    return res.data;
}