const express = require("express");
const bodyParser = require("body-parser");

const eventApi = require("./api/events");
const statusApi = require("./api/status");

const app = express();
const port = 8000;
var startTime;

app.use(bodyParser.json());
bodyParser.urlencoded({ extended: false });

/**
 * Cors - allow all
 */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/**
 * GET /status
 * return current server running time in format hh:mm:ss
 */
app.get("/status", (req, res) => {
  const time = statusApi.calculateServerRunningTime(startTime);

  res.send(time);
});

/**
 * GET /api/events?type=info:critical?offset=limit=
 * type is a filter by event type
 * offset (default is 0)
 * limit (default is 10)
 * return events
 */
app.post("/api/events", (req, res) => {
  const query = req.body;

  console.log(req);

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
    },
    pagination: {
      offset: +query.offset || eventApi.DEFAULT_OFFSET,
      limit: +query.limit || eventApi.DEFAULT_LIMIT
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
