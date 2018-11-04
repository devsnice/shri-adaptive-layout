import { Dispatcher } from "shriflux";

import { EventsEffects } from "./events/events.store";

const appDispatcher = new Dispatcher();

// Register all effect here

appDispatcher.register(EventsEffects);

export default appDispatcher;
