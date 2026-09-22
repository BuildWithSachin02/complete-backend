const app = require('./src/app.js')
const connectDB = require('./src/config/db.js')
connectDB()

app.listen(3030, () => {
    console.log('server is starting on port numner is 3030')
})