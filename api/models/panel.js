const mongoose = require('mongoose');

// panel schema
let panel = mongoose.Schema({
  Course_id: { type: mongoose.ObjectId, required: true },
  PatientName: String,
  HospitalNumber: String,
  Institute: String,
  BloodGroup: String,
  AntibodyIdentifier: String,
  TechName: String,
  Date: Date,
  PanelName: { type: String, required: true },
  difficulty: String,
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
        },
      Duffy: {
        Jka: String,
        Jkb: String
      },
      Kidd: {
        Jka: String,
        Jkb: String
      },
      Lewis: {
        Lea: String,
        Leb: String
      },
      P: {
        P1: String
      },
      MNSs: {
        M: String,
        N: String,
        S: String,
        s: String
      },
      Lutheran: {
        Lub: String
      },
      Xg: {
        Xga: String
      },
      Results: {
        IS:  String,
        "37":  String,
        AHG: String,
        CC:  String
      }
    }
  ]
});

// export the model
module.exports = mongoose.model('panel', panel);

/*
Panel example:

{
  "Course_id":          {
    "oid": "5ef40c81310c490f756ddab8"
  },
  "PatientName":        "String",
  "HospitalNumber":     "String",
  "Institute":          "String",
  "BloodGroup":         "Something",
  "AntibodyIdentifier": "Something",
  "TechName":           "John",
  "Date":               "01/01/2020",
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