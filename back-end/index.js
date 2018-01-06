const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
var router = express.Router();
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

router.post('/posts', (req, res) => {
    res.send([{ id: 1, title: 1 }, { id: 2, title: 2 }])
})

app.use('/api', router);
app.listen(3000, () => console.log('liuzhenglai.com listening on port 3000!'))