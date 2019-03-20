const express = require("express");
const router = express.Router();

//@Route GET api/users/test
//@Desc Test user route
//@acess Public
router.get("/test", (req, res) => res.json({ msg: "user works" }));

module.exports = router;
