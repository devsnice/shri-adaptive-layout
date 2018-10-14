const fs = require("fs");
const path = require("path");

const pathToEvents = path.join(__dirname, "/events.json");

const EVENT_TYPES = ["info", "critical"];

const getEvents = ({ filters }) => {
  const file = fs.readFileSync(pathToEvents, { encoding: "utf-8" });
  const parsedFile = JSON.parse(file);

  const { events } = parsedFile;

  if (filters.type) {
    return events.filter(event => filters.type.includes(event.type));
  }

  return events;
};

const eventsApi = {
  EVENT_TYPES,
  getEvents
};

module.exports = eventsApi;
