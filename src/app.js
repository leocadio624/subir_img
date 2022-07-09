const express = require('express')
const cors = require('cors')
const multer = require('multer')
const sharp = require('sharp')

const app = express();

//settings
app.set('port', process.env.PORT || 3000);
app.use(cors());

const helperImg = (filePath, fileName, size = 300) => {
    return sharp(filePath)
        .resize(size)
        .toFile(`./optimize/${fileName}.png`)
}

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null , './uploads')
    },
    filename:(req, file, cb) => {
        const ext = file.originalname.split('.').pop();
        cb(null, `${Date.now()}.${ext}`)
    }
});

const upload = multer({storage})

app.post('/upload', upload.single('file'), (req, res) => {
    
    helperImg(req.file.path, `resize-${req.file.filename}`)
    res.send({data:'Imagen cargada'})
});


app.listen(app.get('port'), () =>{
    console.log('servidor iniciado...');
});


