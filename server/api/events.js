const fs = require("fs");
const path = require("path");

const pagination = require("../helpers");
const pathToEvents = path.join(__dirname, "/events.json");

const EVENT_TYPES = ["info", "critical"];
const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 10;

const getEvents = ({ filters, pagination: { offset, limit } }) => {
  console.log(offset, limit);

  try {
    const file = fs.readFileSync(pathToEvents, { encoding: "utf-8" });
    const parsedFile = JSON.parse(file);

    const { events } = parsedFile;

    // filters
    if (filters.type) {
      return pagination(
        events.filter(event => filters.type.includes(event.type)),
        offset,
        limit
      );
    }

    // return without filters
    return pagination(events, offset, limit);
  } catch (err) {
    throw "Server error";
  }
};

const eventsApi = {
  EVENT_TYPES,
  DEFAULT_OFFSET,
  DEFAULT_LIMIT,
  getEvents
};

module.exports = eventsApi;
