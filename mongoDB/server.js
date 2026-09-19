const app = require('./src/app.js')
const connectDB = require('./src/db/db.js')
connectDB()//call the function to connect to our database
app.listen(3030,()=>{
    console.log('server is running on port number 3030')
})