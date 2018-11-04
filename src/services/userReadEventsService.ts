import StorageService, { storageKeys } from "./storageService";

/**
 * Service work with events, which was marked user as read in LocalStorage
 */
const UserReadEventsService = {
  /**
   * Get marked as read events
   */
  getReadEvents: (): string[] => {
    const userReadEvents = JSON.parse(StorageService.get(storageKeys.userReadEvents));

    return userReadEvents;
  },
  /**
   * Save, that event is marked as read
   */
  markEventAsRead: (id: string): void => {
    const userReadEvents: string[] =
      JSON.parse(StorageService.get(storageKeys.userReadEvents)) || [];

    userReadEvents.push(id);

    StorageService.set(storageKeys.userReadEvents, JSON.stringify(userReadEvents));
  }
};

export default UserReadEventsService;
