const fs = require("fs");
const path = require("path");

const Helpers = require("../helpers");
const pathToEvents = path.join(__dirname, "/events.json");

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 10;

const getEvents = ({ filters, pagination: { offset, limit } }) => {
  try {
    const file = fs.readFileSync(pathToEvents, { encoding: "utf-8" });
    const parsedFile = JSON.parse(file);

    const { events } = parsedFile;

    // filters
    if (filters.type) {
      return Helpers.pagination(
        events.filter(event => filters.type.includes(event.type)),
        offset,
        limit
      );
    }

    // return without filters
    return Helpers.pagination(events, offset, limit);
  } catch (err) {
    throw "Server error";
  }
};

const eventsApi = {
  DEFAULT_OFFSET,
  DEFAULT_LIMIT,
  getEvents
};

module.exports = eventsApi;
