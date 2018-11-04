import Widget from "../components/widget/widget";

import EventsStore from "../store/events/events.store";
import { setEventsData } from "../store/events/actionCreators";
import Dispatcher from "../store";

import UserReadEventsService from "../services/userReadEventsService";

import * as Types from "../types";

class IndexPage {
  constructor() {
    this.init();
  }

  private init() {
    EventsStore.subscribe(this.renderDashboardWidgets);

    this.initEvents();
  }

  private initEvents() {
    const userReadEvents: string[] = UserReadEventsService.getReadEvents();

    this.loadEvents().then((events: Types.Event[]) => {
      let filteredEvents: Types.Event[] = [];

      if (!userReadEvents) {
        filteredEvents = events;
      } else {
        filteredEvents = events.filter((event: Types.Event) => !userReadEvents.includes(event.id));
      }

      Dispatcher.dispatch(setEventsData(filteredEvents));
    });
  }

  private renderDashboardWidgets() {
    const eventsStoreData = EventsStore.getData();
    const events: Types.Event[] = eventsStoreData.events.filter(
      (event: Types.Event) => !event.userRead
    );

    const dashboardWidgetsList = document.getElementById("dashboard-list");

    // Clear dashboard
    dashboardWidgetsList.innerHTML = "";

    if (!events.length) {
      dashboardWidgetsList.innerHTML = "<h2>У вас нет новых событий</h2>";
    } else {
      events.forEach(event => {
        const widget = new Widget({
          event,
          container: dashboardWidgetsList
        });
      });
    }
  }

  private loadEvents(): Promise<Types.Event[]> {
    // server works only on localmachine
    // run npm start server for it
    if (location.hostname === "localhost") {
      return fetch("http://localhost:8000/api/events", {
        method: "POST",
        body: JSON.stringify({
          type: "critical:info",
          offset: 0,
          limit: 20
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .catch(err => console.error(err));
    }

    return fetch("events.json")
      .then(response => response.json())
      .then(response => response.events)
      .catch(err => console.error(err));
  }
}

export default IndexPage;
