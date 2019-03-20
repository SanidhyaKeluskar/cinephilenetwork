const express = require("express");
const router = express.Router();

//@Route GET api/profile/test
//@Desc Test profile route
//@acess Public
router.get("/test", (req, res) => {
  res.json({
    msg: "profile works"
  });
});

module.exports = router;
