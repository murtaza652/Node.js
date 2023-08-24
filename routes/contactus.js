const path=require('path');
const express=require('express');
const contactController=require('../controllers/contactus');
const router= express.Router();

router.get("/",contactController.contact);
router.post("/success",contactController.success);

module.exports =router;