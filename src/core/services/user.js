import axios from "axios";

export const getAllUsers = async () => {
    const res = await axios.get('https://65444ee25a0b4b04436c3f2c.mockapi.io/users');
    return res.data;
}

export const createUser = async (data) => {
    const res = await axios.post('https://65444ee25a0b4b04436c3f2c.mockapi.io/users', data);
    return res.data;
}

export const deleteUser = async (userId) => {
    const res = await axios.delete(`https://65444ee25a0b4b04436c3f2c.mockapi.io/users/${userId}`);
    return res.data;
}

export const updateUser = async (userId, data) => {
    const res = await axios.put(`https://65444ee25a0b4b04436c3f2c.mockapi.io/users/${userId}`, data);
    return res.data;
}