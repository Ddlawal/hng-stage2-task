const path = require('path')
const express = require('express')
const cors = require('cors')
const { errorMiddleware, ErrorHandler } = require('./src/middleware/errorHandler')
const { config } = require('dotenv')
const exphbs = require('express-handlebars')
const { sendEmail } = require('./src/helper')

config({ path: path.join(__dirname, './.env') })

const app = express()

const port = process.env.PORT || 5000

app.use(cors())
app.use(express.urlencoded({ extended: false }))

app.use(express.json())
app.use(express.static(path.join(__dirname, './public')))

app.engine(
    'hbs',
    exphbs({
        defaultLayout: 'main',
        extname: '.hbs',
    }),
)
app.set('view engine', 'hbs')

app.use(errorMiddleware)

// routes
app.get('/', (req, res) => {
    res.render('home')
})

app.post('/contactMe', async (req, res) => {
    try {
        await sendEmail(req.body)
        res.send('Email sent! Thanks for contacting me')
    } catch (error) {
        ErrorHandler(error.message, error.status)
    }
})

app.listen(port, async () => {
    console.log(`Listening on port: ${port}`)
})
