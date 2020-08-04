const mongoose = require("mongoose");
let ObjectId = mongoose.ObjectId;

let panelResponse = mongoose.Schema(
{
  PanelName   : { type: String, required: true },
  Course_id   : { type: ObjectId, required: true },      //get information from the specifc user.
  answers     : [ String ],
  correct     : Number
});

// create the model
module.exports = mongoose.model("panelResponse", panelResponse);
