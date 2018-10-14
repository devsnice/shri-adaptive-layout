const express = require("express");
const app = express();
const port = 8000;
const startTime = new Date();

app.get("/status", (req, res) => {
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

  res.send(time);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
