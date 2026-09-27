const app = require('./src/app.js')
// const PORT = require('dotenv')
const connectDB = require('./src/config/db.js')
connectDB()


app.listen(3030, () => {
    console.log('server is running on port number 3030 ✔️')
})