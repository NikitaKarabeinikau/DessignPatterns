import {Router} from 'express'
import bodyParser from 'body-parser'
import {getMail,getMailbyID} from '../classes/controller/controllers'


const router = Router();
const urlencodedParser = bodyParser.urlencoded({extended: false,})
const path = require('path')



router.get('/', urlencodedParser, (req, res) =>{
    // res.sendFile(path.join(__dirname + '/views/table.html'))
    res.sendFile(path.join(__dirname + '/views/index.html'))
})

router.get('/data',getMail)
router.get('/data/:id',getMailbyID)
// router.get('/data', (req,res) => createData)

export default router;