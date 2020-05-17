
const Eureka = require('eureka-js-client').Eureka;

const client = new Eureka({
    instance:{
        app: process.env.PROJECT,
        hostName: process.env.EUREKA_HOST,
        requestMiddleware:(requestOpts,done)=>{
            requestOpts.auth={
                user:process.env.EUREKA_USERNAME,
                password:process.env.EUREKA_PASSWORD
            }
            done(requestOpts)
        },
        ipAddr: '127.0.0.1',
        port: {
            $:process.env.PORT,
            '@enabled':'true'
        },
        vipAddress: 'node-services',
        dataCenterInfo:{
            '@class':'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn'
        },
        registerWithEureka: true,
        fetchRegistry:true,
    },
    eureka:{
        host: process.env.EUREKA_HOST,
        port: process.env.EUREKA_PORT,
        serviceUrls:{
            'defaultZone':['http://admin:admin@localhost:8761/eureka/']
        },
        servicePath:'/eureka/apps/'
    }
})
client.logger.level('debug')
client.start(error=>{
    console.log(error || 'erueka client started')
})
exports.module=client