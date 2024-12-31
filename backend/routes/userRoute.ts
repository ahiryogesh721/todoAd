import expres from "express";
const router = expres.Router();
import {
  getAllUsers,
  creatUser,
  delletUser,
} from "./../controllers/userControler";

router.get("/", getAllUsers);
router.post("/", creatUser);
router.delete("/:id", delletUser);

module.exports = router;
