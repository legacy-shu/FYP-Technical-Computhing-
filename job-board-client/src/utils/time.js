export const time = async () => {
  const created = new Date("2023-03-06T20:48:03.901+00:00");
  const now = new Date();

  const elapsedMSec = now.getTime() - created.getTime();
  const elapsedSec = elapsedMSec / 1000; // 9004
  const elapsedMin = elapsedMSec / 1000 / 60; // 150.0666...
  const elapsedHour = elapsedMSec / 1000 / 60 / 60; // 2.501111...

  document.writeln(elapsedMSec);
  document.writeln(elapsedSec);
  document.writeln(elapsedMin);
  document.writeln(elapsedHour);
  const result = {
    elapsedMSec,
    elapsedSec,
    elapsedMin,
    elapsedHour,
  };
  return result;
};
