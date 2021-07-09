const express = require("express");
const router = express.Router();
const aws = require("aws-sdk");
const { nanoid } = require("nanoid");
const multerS3 = require("multer-s3");
const multer = require("multer");

const {
  createProduct,
  productDetails,
  productUpdate,
  deleteProduct,
  adminProducts,
  uploadResource,
  deleteResource,
  uploadImage,
  allotCourse,
  enrolledStudents,
} = require("../app/http/controllers/products");
const { verifyInstitute } = require("../app/http/middlewares/verifyInstitute");

// !Products Route

// Allot products to Students
router.post("/allotcourse", verifyInstitute, allotCourse);

// All Admin Products
router.get("/myproducts", verifyInstitute, adminProducts);

// ?Create Product
router.post("/createproduct", verifyInstitute, createProduct);

// ? upload image
aws.config.update({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

// S3 bucket
const s3 = new aws.S3();
const storageS3 = multerS3({
  s3,
  bucket: process.env.AWS_BUCKET_NAME,
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key(req, file, cb) {
    cb(null, `${file.originalname}_${nanoid()}`);
  },
});
const uploadS3 = multer({ storage: storageS3 });

router.post(
  "/uploadcontent",
  verifyInstitute,
  uploadS3.single("image"),
  uploadImage
);

// ?Product Details
router.get("/:id", verifyInstitute, productDetails);

// ?Enrolled Students
router.get("/:id/students", verifyInstitute, enrolledStudents);

// ?Update Product
router.put("/:id/update", verifyInstitute, productUpdate);

// ?Delete Product
router.delete("/:id/delete", verifyInstitute, deleteProduct);

//  ?Upload Content
router.post("/:id/upload", verifyInstitute, uploadResource);

//  ?Delete Contenet
router.delete("/:id/delete/:resource", verifyInstitute, deleteResource);

exports.productRoutes = router;
