import axios from "axios";

const BASE_URL = 'http://localhost:8080/api';

const GET = async (path, body = {}, auth = true, blob = false) => {
    const TOKEN = await window.localStorage.getItem('token');
    if (auth) {
        body.headers = { "Authorization": `Bearer ${TOKEN}` };
    }
    if (blob) {
        body.responseType = 'blob';
    }
    let res = null;
    try {
        res = await axios.get(path, body,);
        return res;
    } catch (e) {
        return {
            status: 500,
            data: []
        };
    }
}

const POST = async (path, body, auth = true) => {
    const TOKEN = await window.localStorage.getItem('token');
    let res = null;
    try {
        res = await axios.post(path, body, auth ? { headers: { "Authorization": `Bearer ${TOKEN}` } } : {})
        return {
            status: res.status,
            data: res.data
        };
    } catch (e) {
        console.log(e);
        return {
            status: 500,
            data: []
        };
    }
}

const PUT = async (path, body, auth = true) => {
    const TOKEN = await window.localStorage.getItem('token');
    let res = null;
    try {
        res = await axios.put(path, body, auth ? { headers: { "Authorization": `Bearer ${TOKEN}` } } : {})
        return {
            status: res.status,
            data: res.data
        };
    } catch (e) {
        console.log(e);
        return {
            status: 500,
            data: []
        };
    }
}

const DELETE = async (path, body, auth = true) => {
    const TOKEN = await window.localStorage.getItem('token');
    let res = null;
    try {
        res = await axios.delete(path, body, auth ? { headers: { "Authorization": `Bearer ${TOKEN}` } } : {})
        return {
            status: res.status,
            data: res.data
        };
    } catch (e) {
        console.log(e);
        return {
            status: 500,
            data: []
        };
    }
}

export const login = async (body) => {
    return await POST(BASE_URL + '/auth/login', body, false);
};

export const register = async (body) => {
    return await POST(BASE_URL + '/auth/register', body, false);
};

export const getTasks = async (body) => {
    return await GET(BASE_URL + '/tasks', body, false);
};

export const createTask = async (body) => {
    return await POST(BASE_URL + '/tasks', body, false);
};

export const updateTask = async (id,body) => {
    return await PUT(BASE_URL + `/tasks/${id}`, body, false);
};

export const deleteTask = async (id,body) => {
    return await DELETE(BASE_URL + `/tasks/${id}`, body, false);
};