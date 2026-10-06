import axios from 'axios'

//1. yaha pe mene ek custom backend ka URL bnya jisme ek vairabel me store krke isse multiple time use kr skata huu
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

    if (token) {
        /*
            Ab tumhe har request me manually:
headers: {
    Authorization: `Bearer ${token}`
}

likhne ki zarurat nahi padegi.
Axios automatically karega:
Authorization: Bearer eyJhbGciOi...
         */
         config.headers.Authorization = `Bearer ${token}`
    }
    return config //return config q kiya ?? qki congif ek object issme jiske ander method aur header joki token milegaa agr return naa kre toh axios ko yeh heder wla token nhi milega
})
export default api