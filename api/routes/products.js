const express = require('express')
const router = express.Router();

const multer = require('multer');
const checkAuth = require('../auth-gaurd/check-auth')
const productController = require('../controllers/products')
const fileFilter = (req, file, cb) => {
if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true)
}else{
    cb(null,false);
}
};
const storage = multer.diskStorage({
    destination: function(req, file, cb){
     cb(null, './uploads/');
    },
    filename: function(req, file, cb){
     cb(null, new Date().toISOString() + file.originalname);
    },
    fileFilter: fileFilter
});
const upload = multer({storage: storage, limits: {fileSize: 1024 * 1024 * 5}})
router.get('/',productController.products_all);

router.post('/', upload.single('productImage'), checkAuth, productController.product_create);
router.get('/:id',productController.product_get);
router.patch('/:id',checkAuth,productController.product_update);

router.delete('/:id',checkAuth, productController.product_delete);


module.exports = router;