import { Store, Types } from "shriflux";
import * as AppModelTypes from "../../types";

// Actions
export const EventsActions = {
  SET_EVENTS: "SET_EVENTS",
  MARK_EVENT_AS_READ: "MARK_EVENT_AS_READ"
};

// Store
interface IEventsStoreData {
  events: AppModelTypes.Event[];
}

const initialData: IEventsStoreData = {
  events: []
};

const EventsStore = new Store({
  initialData
});

// Effects for store
export const EventsEffects = (action: Types.IAction) => {
  const { type, payload } = action;

  switch (type) {
    case EventsActions.SET_EVENTS:
      EventsStore.updateData({
        events: payload.events
      });
      break;
    case EventsActions.MARK_EVENT_AS_READ:
      const data = EventsStore.getData();

      EventsStore.updateData({
        events: data.events.map(
          (event: AppModelTypes.Event) =>
            event.id === payload.id ? { ...event, userRead: true } : event
        )
      });
      break;

    default:
      break;
  }
};

export default EventsStore;
