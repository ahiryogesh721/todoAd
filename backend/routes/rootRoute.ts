import expres from "express";
const router = expres.Router();

router.get("/", (req, res) => {
  console.log("hello g");
  res.sendStatus(200);
});

module.exports = router;
