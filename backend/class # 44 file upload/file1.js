const express = require('express');
const router = express.Router();
const multer = require('multer');
const cors=require('cors');
const Image = require("./mongodb-modle");
const app = express();
const path=require('path');


const jwt = require('jsonwebtoken');
const jwtkey = 'e-comm';
const fs = require('fs');

app.use(express.json());
app.use(cors());


const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../../abc/public/img');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
}).single("user_file");

// app.post("/upload", upload, (req, resp) => {
//   resp.send("file upload")
// });

app.post("/upload", upload,async (req, resp) => {
  resp.send("file upload")
   const {path,filename} = req.file
   let image = new Image({path,filename});
   let result = await image.save();
});

app.get("/products", async (req, resp) => {
    let products = await Image.find();
    console.log("products: ",products);
    if (products.length > 0) {
      resp.send(products);
    } else {
      resp.send({ result: "No Products found"});
    }
  });

  





  app.delete('/delete/:filename', (req, res) => {
    try {
      const filePath = path.join(__dirname, '../../abc/public/img', req.params.filename); 
      fs.unlinkSync(filePath); // Delete the file
      console.log(filePath)
  
      res.status(200).json({ message: 'File deleted successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error deleting file.' });
    }
  });

app.listen(5000);