const express = require("express");
const router = express.Router();

const {
  create,
  todoById,
  read,
  update,
  remove,
  list,
} = require("../controllers/todo");

const todo = require("../models/todo");

router.get("/todo/:todoId", read);

router.post(
  "/todo/create",

  create
);

router.put(
  "/todo/update/:todoId",

  update
);
/**yyyyyyyyyyyyyyyyyyyyyyy */

router.delete(
  "/todo/:todoId",

  remove
);
router.get("/todos", list);

router.param("todoId", todoById);

module.exports = router;
