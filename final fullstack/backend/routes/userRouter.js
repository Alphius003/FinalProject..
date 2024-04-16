
const { Router } = require("express");

const router = Router();
const userControllers=require("../controllers/userController")
router.get('/user/:userID',userControllers.specificUserId)

router.post("/register-events/:eventID/:userID",userControllers.registerEventsUserIdEventId)

router.delete("/unregister-event/:eventID/:userID",userControllers.deleteevent)


router.get('/register-events/:userID',userControllers.registerEvents)


router.get('/completed-events/',userControllers.completedevents)


router.get('/registrations/:eventID',userControllers.registrations)


router.post('/wishlist',userControllers.wishlist)

router.delete('/wishlist/:eventID',userControllers.delwishlist)

router.get('/event/users/:eventID',userControllers.findID)
module.exports = router;