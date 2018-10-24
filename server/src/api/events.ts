import * as fs from "fs";
import * as path from "path";

import Helpers from "../helpers";
import * as Types from "../../types/index";

const pathToEvents = path.join(__dirname, "../data/events.json");

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 10;

const filterEventsByType = (
  events: Array<Types.Event>,
  filterTypes: Array<string>
): Array<Types.Event> =>
  !filterTypes ? events : events.filter(event => filterTypes.includes(event.type));

const getEvents = ({
  filters,
  pagination: { offset, limit }
}: {
  filters: Types.Filters;
  pagination: Types.Pagination;
}) => {
  return new Promise((resolve, reject) => {
    fs.readFile(pathToEvents, { encoding: "utf-8" }, (err: Error, file: string) => {
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

export default eventsApi;
