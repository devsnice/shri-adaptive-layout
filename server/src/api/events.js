const fs = require("fs");
const path = require("path");

const Helpers = require("../helpers");
const pathToEvents = path.join(__dirname, "../data/events.json");

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 10;

const filterEventsByType = (events, filterTypes) =>
  !filterTypes
    ? events
    : events.filter(event => filterTypes.includes(event.type));

const getEvents = ({ filters, pagination: { offset, limit } }) => {
  return new Promise((resolve, reject) => {
    fs.readFile(pathToEvents, { encoding: "utf-8" }, (err, file) => {
      if (!err) {
        const parsedFile = JSON.parse(file);

        const { events } = parsedFile;

        resolve(
          Helpers.pagination({
            data: filterEventsByType(events, filters.types),
            offset,
            limit
          })
        );
      } else {
        reject("Server error");
      }
    });
  });
};

const eventsApi = {
  DEFAULT_OFFSET,
  DEFAULT_LIMIT,
  getEvents
};

module.exports = eventsApi;
