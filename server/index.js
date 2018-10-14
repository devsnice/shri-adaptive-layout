const express = require("express");
const bodyParser = require("body-parser");

const eventApi = require("./api/events");

const app = express();
const port = 8000;
const startTime = new Date();

app.use(bodyParser.json());

app.get("/status", (req, res) => {
  const currentTime = new Date();
  const passedTime = new Date(currentTime - startTime);

  const hours = passedTime.getUTCHours();
  const minutes = passedTime.getUTCMinutes();
  const seconds = passedTime.getUTCSeconds();

  const parseToTwoSigns = value => {
    if (value.toString().length === 1) {
      return `0${value}`;
    }

    return value;
  };

  const time = `${parseToTwoSigns(hours)}:${parseToTwoSigns(
    minutes
  )}:${parseToTwoSigns(seconds)}`;

  res.send(time);
});

app.get("/api/events", (req, res) => {
  const query = req.query;

  // Validate type
  // it's valid if every type included in eventApi.EVENT_TYPES
  function getTypeFilters() {
    const { type } = query;
    let filtersType = [];

    if (type) {
      const types = type.split(":");

      const isValidTypes = types.every(type =>
        eventApi.EVENT_TYPES.includes(type)
      );

      if (!isValidTypes) {
        res.status(400);
        res.send("incorrect type");
      } else {
        filtersType = types;
      }
    }

    return filtersType;
  }

  const events = eventApi.getEvents({
    filters: {
      type: getTypeFilters()
    }
  });

  res.send(events);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
