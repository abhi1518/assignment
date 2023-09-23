const express = require("express");
const mongoose = require("mongoose");
require("./db/conn");
const Student = require("./models/student");
const Country = require("./models/country");
const State = require("./models/state");
const City = require("./models/city");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.post("/api/registration", (req, res) => {
  const user = new Student(req.body);
  user
    .save()
    .then(() => {
      res.status(201).json({
        status: "success",
        message: "User created successfully",
      });
      
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.get("/api/all_user", async (req, res) => {
  try {
    const user = await Student.find();
    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/country", async (req, res) => {
  try {
    const user = await Country.find();
    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/state", async (req, res) => {
  try {
    const user = await State.find();
    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/api/city", async (req, res) => {
  try {
    const user = await City.find();
    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/studentdetails/:id", (req, res) => {
  const id = req.params.id;
  Student.findById(id)
    .then((data) => {
      if (data) {
        res.json({ message: "data found", data });
        console.log(data);
      } else {
        res.status(404).json({ message: "Data not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Error retrieving data", error });
    });
});

app.get("/api/state/:country", async (req, res) => {
  const countryCode = req.params.country;
  const countryData = await State.find({
    country: countryCode,
  });
  if (!countryData) {
    return res.status(404).json({ message: "state not found" });
  }
  res.status(200).json({ status: "success", data: countryData });
});

app.get("/api/city/:country_code", async (req, res) => {
  const countryCode = req.params.country_code;
  const cityData = await City.find({
    state_code: countryCode,
  });
  if (!cityData) {
    return res.status(404).json({ message: "city not found" });
  }
  res.status(200).json({ status: "success", data: cityData });
});

app.listen(port, () => {
  console.log(`connection is setup at ${port}`);
});



