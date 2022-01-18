var express = require('express');
var multer = require('multer');
var path = require('path');
var fs  = require('fs');

var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/uploads'));
app.get('/', (req, res) => {
    res.render('index');
});

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        var dir = './uploads';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
var upload = multer({storage: storage}).array('files', 12);
app.post('/upload', upload,function (req, res, next) {
    //console.log(req.file.originalname);
    upload(req, res, function (err) {
        
        if (err) {
            return res.end("Something went wrong:(");
        }
        res.end("Upload completed.");
    });
})

app.listen(3000);
