function greetingTime() {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "Good morning 🌄";
  } else if (currentHour >= 12 && currentHour < 17) {
    return "Good afternoon ☀️";
  } else {
    return "Good evening 🌙";
  }
}
export default greetingTime;
