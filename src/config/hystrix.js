const HystrixConfig = require('hystrixjs').hystrixConfig;
HystrixConfig.init({
    "hystrix.circuit.volumeThreshold.forceOverride":true,
    "hystrix.circuit.volumeThreshold.override":0
})
