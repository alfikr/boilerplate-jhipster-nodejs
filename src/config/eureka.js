
const Eureka = require('eureka-js-client').Eureka;

const client = new Eureka({
    instance:{
        app: process.env.PROJECT,
        instanceId:`${process.env.PROJECT}-${Math.round(Math.random()*(9999-1000+1)+1000)}`,
        hostName: process.env.EUREKA_HOST,
        requestMiddleware:(requestOpts,done)=>{
            requestOpts.auth={
                user:process.env.EUREKA_USERNAME,
                password:process.env.EUREKA_PASSWORD
            }
            done(requestOpts)
        },
        requestRetryDelay:60,
        registyFetchInterval:10,
        ipAddr: process.env.HOST,
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
        host: `${process.env.EUREKA_USERNAME}:${process.env.EUREKA_PASSWORD}@${process.env.EUREKA_HOST}`,
        port: process.env.EUREKA_PORT,
        serviceUrls:{
            'defaultZone':['http://admin:admin@localhost:8761/eureka/']
        },
        servicePath:'/eureka/apps/'
    }
})
client.logger.level('debug')
module.exports=client