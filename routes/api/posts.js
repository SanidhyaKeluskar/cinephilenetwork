const express = require("express");
const router = express.Router();

//@Route GET api/posts/test
//@Desc Test posts route
//@acess Public
router.get("/test", (req, res) => {
  res.json({
    msg: "posts works"
  });
});

module.exports = router;
