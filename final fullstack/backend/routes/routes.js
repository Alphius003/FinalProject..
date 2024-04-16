

const { Router } = require("express");

const router = Router();
const AuthControl=require("../controllers/controllers")

router.post('/user', AuthControl.register);
router.post('/', AuthControl.Logintothepage);
router.post('/ForgetPassword',AuthControl.ForgetPassword)
router.post('/ResetPassword',AuthControl.ResetPassword );


  module.exports = router;