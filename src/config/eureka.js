import Eureka from 'eureka-js-client';

const Eureka = require('eureka-js-client').Eureka;

const client = new Eureka({
    instance:{
        app: '',
        hostName: '',
        ipAddr: '',
        port: 8080,
        vipAddress: '',
        dataCenterInfo:{
            name: 'MyOwn'
        },
    },
    eureka:{
        host: '',
        port: '15'
    }
})

export default client;