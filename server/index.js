const express = require("express");
const bodyParser = require("body-parser");

const eventApi = require("./api/events");
const statusApi = require("./api/status");

const Helpers = require("./helpers");

const app = express();
const port = 8000;
let startTime;

app.use(bodyParser.json());
bodyParser.urlencoded({ extended: false });

/**
 * Cors - allow all
 */
app.use((req, res, next) => {
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
  let typeFilters;

  try {
    typeFilters = Helpers.getTypeFilters(query);

    const events = eventApi.getEvents({
      filters: {
        type: typeFilters
      },
      pagination: {
        offset: +query.offset || eventApi.DEFAULT_OFFSET,
        limit: +query.limit || eventApi.DEFAULT_LIMIT
      }
    });

    res.send(events);
  }
  catch (e) {
    res.status(e.status);
    res.send({
      error: e.error
    });
  }
});

app.get("*", (req, res) => {
  res.send("<h1>Page not found</h1>", 404);
});

app.listen(port, () => {
  startTime = new Date();

  console.log(`App listening on port ${port}!`);
});
