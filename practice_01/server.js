const app = require('./src/app.js')
const connectDB = require('./src/config/db.js')
const routes = require('./src/routes/practice.routes.js')
connectDB()

app.use('/api/practices', routes)//call the all api-calls when we test one by one and then /get,/post,/delete,/update,/pagination, like this
app.listen(3030, () => {
    console.log('server is starting on port numner is 3030 ✔️')
})