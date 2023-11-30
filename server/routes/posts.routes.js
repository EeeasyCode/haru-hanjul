const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const router = express.Router();


const PostsController = require('../controllers/posts.contoller');

const postsController = new PostsController();
const upload2 = multer();

try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
}),
limits: { fileSize: 5 * 1024 * 1024 },
});


router.get('/create', (req, res) => {
    res.render('posts');
})
router.post('/create', upload2.none(), postsController.createPost);

router.post('/img', upload.single('img'), (req, res) => {
    console.log(req.file);
    res.json({ url: `/img/${req.file.filename}` });
});
  
router.get("/upload", (req, res) => {
    res.render("image.html");
})



module.exports = router;


  
  
  
  