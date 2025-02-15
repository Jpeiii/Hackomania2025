export default [
  {
    _id: 7,
    text: "",
    createdAt: new Date(),
    user: {
      _id: 2,
      name: "User",
    },
    shopnow: true,
  },
  {
    _id: 6,
    text: "You could select those you interested in and I will connect you with the travel agencies.",
    createdAt: new Date(),
    user: {
      _id: 1,
      name: "ChatBot",
    },
  },
  {
    _id: 5,
    text: "Thank you for providing your preferences. Based on your preferences, I got few recommendations for you.",
    createdAt: new Date(),
    user: {
      _id: 1,
      name: "ChatBot",
    },
  },
  {
    _id: 4,
    text: "",
    createdAt: new Date(),
    user: {
      _id: 2,
      name: "User",
    },
    preferences: true,
  },
  {
    _id: 3,
    text: "Please select your preferences for the trip to Xinjiang Urumqi, so we can connect you with the appropriate travel agencies.",
    createdAt: new Date(),
    user: {
      _id: 1,
      name: "ChatBot",
    },
  },
  {
    _id: 2,
    text: "Thank you for your information. Here is a summary of your trip: You are planning to travel to Xinjiang Urumqi on 2022-12-12. This is a 14-day trip for 4 people, departing from Changi Airport and landing at Urumqi Diwopu International Airport. ",
    createdAt: new Date(),
    user: {
      _id: 1,
      name: "ChatBot",
    },
  },
  {
    _id: 1,
    text: "",
    createdAt: new Date(),
    user: {
      _id: 2,
      name: "User",
    },
    initial: true,
  },
  {
    _id: 0,
    text: " Hi there! I am your personal travel advisor. I will base my recommendations on your requirements and connect you with the appropriate travel agencies that can fulfill them.",
    createdAt: new Date(),
    user: {
      _id: 1,
      name: "ChatBot",
    },
  },
];
