const express = require("express");
const bodyParser = require("body-parser");

const eventApi = require("./api/events");
const statusApi = require("./api/status");

const app = express();
const port = 8000;
var startTime;

app.use(bodyParser.json());

/**
 * GET /status
 * return current server running time in format hh:mm:ss
 */
app.get("/status", (req, res) => {
  const time = statusApi.calculateServerRunningTime(startTime);

  res.send(time);
});

/**
 * GET /api/events?type=info:critical
 * type is a filter by event type
 * return events
 */
app.get("/api/events", (req, res) => {
  const query = req.query;

  // Validate type
  // it's valid if every type included in eventApi.EVENT_TYPES
  function getTypeFilters() {
    const { type } = query;
    let filtersType = eventApi.EVENT_TYPES;

    if (type) {
      const types = type.split(":");

      const isValidTypes = types.every(type =>
        eventApi.EVENT_TYPES.includes(type)
      );

      if (!isValidTypes) {
        res.status(400);
        res.send({
          error: "incorrect type"
        });
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

app.get("*", function(req, res) {
  res.send("<h1>Page not found</h1>", 404);
});

app.listen(port, () => {
  startTime = new Date();
  console.log(`App listening on port ${port}!`);
});
