//this file stand for server starting 
const app = require('./src/app.js')
const PORT = 3009;
app.listen(PORT,()=>{
    console.log(`✔️ server is running on port number is ${PORT}`)
})