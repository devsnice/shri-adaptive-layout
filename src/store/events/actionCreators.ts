import { EventsActions } from "./events.store";

export const setEventsData = (events: object[]) => ({
  type: EventsActions.SET_EVENTS,
  payload: {
    events
  }
});

export const markEventAsRead = (id: string) => ({
  type: EventsActions.MARK_EVENT_AS_READ,
  payload: {
    id
  }
});
