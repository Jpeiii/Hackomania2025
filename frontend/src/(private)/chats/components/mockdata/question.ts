// if user want to visit Japan, which part of Japan would you like to visit?
// what kind of activities do you enjoy while traveling?
// what is your expectation about Japan, and what do you want to experience?
// what is your budget for this trip?
// what is your preferred type of accommodation during travel?
// Ask as much as possible questions to understand user's preference
export interface QnA {
    _id: number;
    question: string;
    options: string[];
  }
  
  export const dummyData: QnA[] = [
    {
      _id: 0,
      question: "What kind of landscape are you most interested in exploring in Xinjiang?",
      options: [
        " Deserts and sand dunes",
        "Snow-capped mountains",
        "Grasslands and prairies",
        "Lakes and rivers",
      ],
    },
    {
      _id: 1,
      question: "What type of cultural experience would you prefer?",
      options: [
        "Traditional Uyghur music and dance performances",
        "Visiting ancient Silk Road ruins and historical sites",
        "Experiencing local festivals and markets",
        " Exploring museums and cultural heritage sites",
      ],
    },
    {
      _id: 2,
      question:
        "What level of physical activity do you prefer during your trip?",
      options: [
        "Light walking and sightseeing",
        "Moderate hiking and nature trails",
        "Adventurous activities like trekking or camel riding",
        "Relaxed, cultural immersion with minimal physical activity",
      ],
    },
    {
      _id: 3,
      question: "Which city would you like to spend more time exploring in Xinjiang?",
      options: [
        "Urumqi (capital city)",
        "Kashgar (ancient Silk Road town)",
        "Turpan (known for its vineyards and ancient ruins)",
        "Kanas (picturesque lake and nature reserve)",
      ],
    },
    {
      _id: 4,
      question: "Who is your ideal travel companion?",
      options: [
        "Spouse or partner",
        "Family and kids",
        "Friends or group of friends",
        "Solo travel",
        "Other travelers met during the trip",
      ],
    },
  ];