const Router = require("express").Router();
const auth = require("../middleware/auth");
//Message Model
const Message = require("../models/Message");

/*
    GET messages,
    Access Private
*/

Router.get("/", auth, async (req, res) => {
  try {
    const messages = await Message.find({ user: req.user.id });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/*
    DELETE message,
    Access Private
*/
Router.delete("/:id", auth, async (req, res) => {
  try {
    let message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({
        msg: "Message Not Found",
      });
    }

    await Message.findOneAndDelete(req.params.id);
    res.send("Message Removed");
  } catch (err) {
    console.errors(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = Router;
