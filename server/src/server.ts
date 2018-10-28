const express = require("express");
import { Request, Response, NextFunction } from "express";

const bodyParser = require("body-parser");

import Helpers from "./helpers";

import eventApi from "./api/events";
import statusApi from "./api/status";

const app = express();
const port = 8000;

app.use(bodyParser.json());
bodyParser.urlencoded({ extended: false });

/**
 * Cors - allow all
 */
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/**
 * GET /status
 * @return {string} time - Current server running time in format hh:mm:ss
 */
app.get("/status", (req: Request, res: Response) => {
  const time = statusApi.calculateServerRunningTime();

  res.send(time);
});

/**
 * GET /api/events?type=info:critical?offset=limit=
 * @bodyparam {string} type - is a filter by event type
 * @bodyparam {number} offset - (default is 0)
 * @bodyparam {number} limit - (default is 10)
 * @return {Events} events
 */
app.post("/api/events", async (req: Request, res: Response) => {
  const query = req.body;
  let typeFilters;

  try {
    typeFilters = Helpers.getTypeFilters(query.type);

    const events = await eventApi.getEvents({
      filters: {
        types: typeFilters
      },
      pagination: {
        offset: +query.offset || eventApi.DEFAULT_OFFSET,
        limit: +query.limit || eventApi.DEFAULT_LIMIT
      }
    });

    res.send(events);
  } catch (e) {
    res.status(e.status).send({
      error: e.error
    });
  }
});

app.get("*", (req: Request, res: Response) => {
  res.status(404).send("<h1>Page not found</h1>");
});

app.listen(port, () => {
  statusApi.setServerStartTime(new Date());

  console.log(`App listening on port ${port}!`);
});
