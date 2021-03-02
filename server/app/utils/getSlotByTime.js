const getSlotByTime = (dateTime = new Date()) => {
  let hour = Number(dateTime.getHours().toLocaleString());
  let minute = Number(dateTime.getMinutes().toLocaleString());
  let slot;

  if(hour<8 || (hour===8 && minute <40)) slot=1
  else if(hour<10 || (hour ===10&&minute<25)) slot=2
  else if(hour<12 || (hour ===12&&minute<10)) slot=3
  else if(hour<14 || (hour ===10&&minute<10)) slot=4
  else if(hour<15 || (hour ===10&&minute<55)) slot=5
  else slot = 6;

  return slot;
};

module.exports = getSlotByTime;
