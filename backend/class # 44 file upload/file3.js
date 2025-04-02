const express = require('express');
const multer = require('multer');

const app = express();

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.mp4');
    }
  })
}).single("user_file");

app.post("/upload", upload, (req, resp) => {
  resp.send("file upload")
});

app.get("/ad", (req, resp) => {
  resp.send(`<!DOCTYPE html>
<html>
<head>
  <title>Image Upload</title>
</head>
<body>

  <h2>Single Image Upload</h2>

  <form action="/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="user_file" accept="video/*">
    <button type="submit">Upload</button>
  </form>

</body>
</html>`)
});

app.listen(5000);