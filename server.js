const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const port = 9527
const concat = require('concat');
const axios = require('axios');

app.use('/', express.static(path.join(__dirname, 'src')))

app.get('/getpdf', async(req, res) => { 

    // concat css
    var css1 = fs.readFileSync('src/css/bootstrap.min.css', 'utf8');
    var css2 = fs.readFileSync('src/css/custom.css', 'utf8');

    //var css = await concat(css1, css2);
    var css = css1 + css2;

    css = Buffer.from(css).toString('base64');
    
    try{
        var response = await axios.get('https://services.eu-central-1.v2.cloudbrowser-api.com/pdf', {
            params: {
                client_print_css: 1,
                client_landscape: 1,
                source: req.query.source, 
                key: '', 
                output_method_return: 2
            }
        })
    } catch (error) {
        console.log(error);
    }
    
    //console.log(response);
    //var response = { 'woot': 'woot1' }
    res.send(response.data)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))