const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const logger = require('morgan')
const errorHandler = require('errorhandler')
const dotenv = require('dotenv')
const path = require('path')
const browserSync = require('browser-sync')
const multer = require('multer')
const helmet = require('helmet')
const chalk = require('chalk')
const route = require('./router')
const swaggerUI = require('swagger-ui-express')
const swaggerDoc = require('../swagger.json')

/**
 * Adding hot reload with webpack
 */
/**
 * Loading environment variable
 */
dotenv.config({path:__dirname+'/./../.env'})
dotenv.config({ path: __dirname + '/./../.env.dev' })
const options = {
    swaggerOptions: {
        explorer: true
    }
}
const app = express();

app.set('host', process.env.HOST || '0.0.0.0')
app.set('port', process.env.PORT || 9099)

/**
 * Secure apps
 */
app.use(helmet())
/**
 * parsing request body
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
/**
 * compress
 */
app.use(compression())
/**
 * eureka registration
 */
const client = require('./config/eureka')

app.use(route)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc, options))
app.get('/health', (req, res) => {
     
    console.log("Health json is called ");
    res.json({"status":"UP"});
  
  });  
if (process.env.MESSAGE_BROKER == 'kafka') {
    console.log('loading kafka config')
} else {
    console.log('loading rabbitmq config')
}
if (process.env.NODE_ENV == 'development') {
    app.use(errorHandler())
    browserSync.create().init({
        logSnippet: false,
        watch: true,
        ui: false,
        open:'local',
        port: parseInt(process.env.PORT) + 1,
        proxy: 'localhost:' + process.env.PORT
    })
} else {
    app.use((err, req, res, next) => {
        console.error(err)
        res.status(500).send('server error')
    })
}

app.listen(app.get('port'), () => {
    console.log(process.env.PROJECT)
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'),
        app.get('env'));
    
    console.log('tekan CTRL-C untuk berhenti')
})