const covidModel = require("../models/covidModel");
var GeoPoint = require("geopoint");
// Add Covid User
exports.createCovid = async (req, res) => {
    const name= req.body.name;
    const lat= req.body.lat;
    const lng= req.body.lng;
  const covid={
    name: name,
    location: {
      type: "Point",
      coordinates: [Number(lat), Number(lng)]
    }
  };
  console.log(covid);
  await covidModel(covid)
    .save()
    .then((val) => {
      res.status(200).json({
        status: 200,
        message: "Add Covid User Successfully",
        data: val,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        message: "Invalid Value, Please Check Your Values",
      });
    });
};
// Get All Covid Users
exports.getAllCovid = async (req, res) => {
  await covidModel
    .find()
    .then((val) => {
      res.status(200).json({
        status: 200,
        length:val.length,
        message: "Get All Covid Users Successfully",
        data: val,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        message: "Don't Find Any User yet",
        data: [],
      });
    });
};

// Search For Covid User By Id
exports.getCovid = async (req, res) => {
  const { id } = req.params;
  await covidModel
    .findById(id)
    .then((val) => {
      res.status(200).json({
        status: 200,
        message: "Find Covid User Successfully",
        data: val,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        message: `Don't find this Covid User By This ID :${id}`,
      });
    });
};

// Update Covid User By Id
exports.updateCovid = async (req, res) => {
  const { id } = req.params;
  const covid = {
    name: req.body.name,
    lat: req.body.lat,
    lng: req.body.lng,
  };
  await covidModel
    .findByIdAndUpdate(id, covid)
    .then((val) => {
      console.log(id);
      console.log(covid);
      res.status(200).json({
        status: 200,
        message: `Update User Successfully`,
        data: val,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        message: `Don't find this Covid User By This ID :${id}`,
        err: err,
      });
    });
};

// Remove Covid User By Id
exports.removeCovid = async (req, res) => {
  const { id } = req.params;
  await covidModel
    .findByIdAndDelete(id)
    .then((val) => {
      res.status(200).json({
        status: 200,
        message: `Delete User Successfully`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        message: `Don't find this Covid User By This ID :${id}`,
        err: err,
      });
    });
};
exports.getDistance = async (req, res) => {
  const lat = req.body.lat;
  const lng = req.body.lng;
  covidModel.find({
    location: {
      $nearSphere: {
        $geometry: {
          type: "Point",
          coordinates: [Number(lat), Number(lng)]
        },
        $maxDistance: 10000
      }
    }
  }, function(err, locations) {
    if (err) {
      console.error(err);
    } else {
      console.log("Found " + locations.length + " locations near New York City:");
      console.log(locations);
    }
  });
  
};
