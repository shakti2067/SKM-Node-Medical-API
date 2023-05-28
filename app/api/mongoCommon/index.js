const express = require('express')
const service = require('./mongoCommon.service')


const router = express.Router()


// get all ducoment form collection
router.get('/:collection', service.getAllDocuments)


module.exports = router