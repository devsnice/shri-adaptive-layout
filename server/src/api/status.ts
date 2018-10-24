let startTime: Date;

const setServerStartTime = (date: Date): Date => (startTime = date);

const calculateServerRunningTime = (): string => {
  const currentTime: Date = new Date();
  const passedTime: Date = new Date(currentTime.getTime() - startTime.getTime());

  const hours: number = passedTime.getUTCHours();
  const minutes: number = passedTime.getUTCMinutes();
  const seconds: number = passedTime.getUTCSeconds();

  const parseToTwoSigns = (value: number): string | number => {
    if (value.toString().length === 1) {
      return `0${value}`;
    }

    return value;
  };

  const time = `
    ${parseToTwoSigns(hours)}:${parseToTwoSigns(minutes)}:${parseToTwoSigns(seconds)}`;

  return time;
};

export default {
  setServerStartTime,
  calculateServerRunningTime
};
