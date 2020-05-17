const express = require('express')
const router = express.Router()
const helloController = require('../controller/HelloController')
router.get('/',helloController.index)

module.exports=router