const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const logger = require('morgan')
const errorHandler = require('errorhandler')
const dotenv = require('dotenv')
const path = require('path')
const multer = require('multer')
const chalk = require('chalk')
const helloController = require('./controller/HelloController')

/**
 * Loading environment variable
 */

dotenv.config({ path: __dirname+'/./../.env.dev'})

const app = express();

app.set('host', process.env.HOST || '0.0.0.0')
app.set('port', process.env.PORT || 9099)

app.get('/', helloController.index)
if(process.env.MESSAGE_BROKER=='kafka'){
    console.log('loading kafka config')
}else{
    console.log('loading rabbitmq config')
}
if (process.env.NODE_ENV == 'development') {
    app.use(errorHandler())
} else {
    app.use((err, req, res, next) => {
        console.error(err)
        res.status(500).send('server error')
    })
}

app.listen(app.get('port'), () => {
    console.log(__dirname+'/./../.env.dev')
    console.log(process.env.PORT)
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'),
        app.get('env'));
    console.log('tekan CTRL-C untuk berhenti')
})