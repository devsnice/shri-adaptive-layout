const calculateServerRunningTime = startTime => {
  const currentTime = new Date();
  const passedTime = new Date(currentTime - startTime);

  const hours = passedTime.getUTCHours();
  const minutes = passedTime.getUTCMinutes();
  const seconds = passedTime.getUTCSeconds();

  const parseToTwoSigns = value => {
    if (value.toString().length === 1) {
      return `0${value}`;
    }

    return value;
  };

  const time = `${parseToTwoSigns(hours)}:${parseToTwoSigns(
    minutes
  )}:${parseToTwoSigns(seconds)}`;

  return time;
};

module.exports = {
  calculateServerRunningTime
};
