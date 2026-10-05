import axios from 'axios'

//1. yaha pe mene ek customer backend ka URL bnya jisme ek vairabel me store krke isse multiple time use kr skata huu
//Custom Axios instance banaya.
/*
    axios.create({
        hme yeh axios ko custome build kr skte h yeh freedom deta h hme axios
        isshme hme yeh 3-4 methos milte jo url me provide hoti h 
        axios.create({
            method:'GET',
            url:'/profile',
            'baseURL':'http://localhost:5000,
            'header':{
                authorization:'token!@#$%^&*(poiuytrelkjhgfd)
            }
        })
    })
 */
const api = axios.create({
    baseURL: 'http://localhost:3136' //backend URL
})
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (!token) {

    }
})