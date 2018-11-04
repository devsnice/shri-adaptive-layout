export const storageKeys = {
  userReadEvents: "userReadEvents"
};

const StorageService = {
  set: (key: string, value: any): void => {
    window.localStorage.setItem(key, value);
  },
  get: (key: string): any => {
    return window.localStorage.getItem(key);
  }
};

export default StorageService;
