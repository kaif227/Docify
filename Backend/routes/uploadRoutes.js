const express=require("express");

const router=
express.Router();

const {
uploadFiles
}
=
require(
"../controllers/uploadController"
);

router.post(
"/upload",
uploadFiles
);

module.exports=router;