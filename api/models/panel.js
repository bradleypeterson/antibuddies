const mongoose = require('mongoose');
let ObjectId = mongoose.ObjectId;

// Connects the two panels

let panelsSchema = mongoose.Schema({
    panel_id        : ObjectId,
    cItem_id        : ObjectId,
    panelName       : String,
    pDifficulty     : Number
});

// create the model
module.exports = mongoose.model('Panels', panelsSchema);

//  Panel Scores
let panelScoresSchema = mongoose.Schema({
    panelScore_id   : ObjectId,
    panel_id        : ObjectId,
    user_id         : ObjectId,
    errors          : Number,
    tries           : Number,
    completed       : Boolean
});

// create the model
module.exports = mongoose.model('PanelsScores', panelScoresSchema);


// Panel data
let panelRowsSchema = mongoose.Schema({
    row_id          : ObjectId,
    panel_id        : Number,
    rowNumber       : Number,
    D               : String,
    C               : String,
    lc              : String,
    f               : String,
    V               : String,
    Cw              : String,
    K               : String,
    lk              : String,
    Kpa             : String,
    Kpb             : String,
    Jsa             : String,
    Jsb             : String,
    Fya             : String,
    Fyb             : String,
    Jka             : String,
    Lea             : String,
    Leb             : String,
    P1              : String,
    M               : String,
    N               : String,
    S               : String,
    ls              : String,
    Lua             : String,
    Lub             : String,
    Xga             : String,
    rIS             : String,
    thirstySeven    : String,
    AHG             : String,
    CC              : Boolean
});

// create the model
module.exports = mongoose.model('PanelRows', panelRowsSchema);



let panelData = mongoose.schema({ 

  PanelName: String,
  RowNumber: [
    {
      RhHr: {
          D: String,
          C: String,
          c: String,
          E: String,
          e: String,
          f: String
      },
      Kelly: {
          K:   String,
          k:   String,
          Kpb: String,
          Jsb: String
        }
      // mo to come
    }
  ]

});



/*

panel {

  "PanelName": "UniqueName",
  "RowNumber": [
    {
      "Rh-Hr": {
        "D": "+",
        "C": "0",
        "c": "0",
        "E": "0",
        "e": "0",
        "f": "0"
      },
      "Kelly": {
        "K": "0",
        "k": "0",
        "Kpb": "0",
        "Jsb": "0"
      },
      "Duffy": {
        "Fya": "0",
        "Fyb": "0"
      },
      "Kidd": {
        "Jka": "0",
        "Jkb": "0"
      },
      "Lewis": {
        "Lea": "0",
        "Leb": "0"
      },
      "P": {
        "P1": "0"
      },
      "MNSs": {
        "M": "0",
        "N": "0",
        "S": "0",
        "s": "0"
      },
      "Lutheran": {
        "Lub": "0"
      },
      "Xg": {
      "Xga": "0"
      },
      "Results": {
        "IS": "0",
        "37": "0",
        "AHG": "0",
        "CC": "0"
      }
    }
  ]
  
}


*/