export const CULTURE = [
  {
    id: "honai",
    name: "Honai",
    en: "Honai is a traditional house in Papua. It is round with a grass roof that keeps the family warm inside.",
    id_text: "Honai adalah rumah adat Papua. Berbentuk bulat dengan atap jerami yang menjaga keluarga tetap hangat di dalamnya.",
    image: "https://static.prod-images.emergentagent.com/jobs/22cefb94-57bb-4740-925f-65da674e47de/images/c1e66f54d4db6f44b1bc376ad105bcce2b5f1d203673dcd6564c78f2adcf5593.jpeg",
    story: "story-1"
  },
  {
    id: "noken",
    name: "Noken",
    en: "Noken is a traditional woven bag made from wood fiber or leaves. It is carried on the head by Papuan women.",
    id_text: "Noken adalah tas rajut tradisional yang terbuat dari serat kayu atau dedaunan. Noken dibawa di atas kepala oleh wanita Papua.",
    image: "https://static.prod-images.emergentagent.com/jobs/22cefb94-57bb-4740-925f-65da674e47de/images/a0dc5415c426d82d003c40bccf0fbc4db25f90bcb6e2b924eea955d6901f1ffc.jpeg",
    story: "story-4"
  },
  {
    id: "papeda",
    name: "Papeda",
    en: "Papeda is a traditional sago porridge. It is soft, sticky, and served with yellow fish soup.",
    id_text: "Papeda adalah bubur sagu tradisional. Bertekstur lembut, lengket, dan biasanya disajikan dengan kuah ikan kuning.",
    image: "https://static.prod-images.emergentagent.com/jobs/22cefb94-57bb-4740-925f-65da674e47de/images/d25d2b8b2cd9666fb76b8eb79c335fa6fd9ac8e0d9907148d2f60e85fb6ede12.jpeg",
    story: "story-2"
  },
  {
    id: "bird_of_paradise",
    name: "Bird of Paradise",
    en: "The Bird of Paradise (Cendrawasih) is a beautiful bird with colorful feathers found in the tropical forests of Papua.",
    id_text: "Burung Cendrawasih adalah burung yang sangat indah dengan bulu berwarna-warni yang ditemukan di hutan tropis Papua.",
    image: "https://static.prod-images.emergentagent.com/jobs/22cefb94-57bb-4740-925f-65da674e47de/images/82d27ef8022c37254a10b23a00948376b6b7a2e9301a9f6357600c2692758c9c.jpeg",
    story: "story-3"
  },
  {
    id: "tifa",
    name: "Tifa",
    en: "Tifa is a traditional Papuan drum made of wood with beautiful carvings and covered with animal skin.",
    id_text: "Tifa adalah gendang tradisional Papua yang terbuat dari kayu dengan ukiran indah dan dilapisi kulit hewan.",
    image: "https://static.prod-images.emergentagent.com/jobs/22cefb94-57bb-4740-925f-65da674e47de/images/33a5d55853f5eb34a57f7ae2fc19f9ea7342e2d199f111fd5b686d04efbcd682.jpeg",
    story: "story-6"
  },
  {
    id: "sentani_lake",
    name: "Sentani Lake",
    en: "Sentani Lake is a large and peaceful lake in Jayapura. It is surrounded by green hills and home to traditional stilt villages.",
    id_text: "Danau Sentani adalah danau besar yang damai di Jayapura. Dikelilingi bukit-bukit hijau dan menjadi tempat tinggal bagi desa-desa terapung tradisional.",
    image: "https://static.prod-images.emergentagent.com/jobs/22cefb94-57bb-4740-925f-65da674e47de/images/bad7a933915ecdc240ce7c09c9334942ca55e2caaaeea9694edbeed8fb3545be.jpeg",
    story: "story-5"
  }
];

export const STORIES = [
  {
    id: "story-1",
    title: "My Honai",
    category: "Traditional House",
    level: "Beginner",
    grade: "Grade 1-2",
    cover: "https://static.prod-images.emergentagent.com/jobs/22cefb94-57bb-4740-925f-65da674e47de/images/c1e66f54d4db6f44b1bc376ad105bcce2b5f1d203673dcd6564c78f2adcf5593.jpeg",
    duration: 2,
    text: [
      "This is a Honai.",
      "A Honai is a traditional house in Papua.",
      "It is small and round.",
      "The roof is made of grass.",
      "Families stay warm inside the Honai."
    ],
    vocabulary: [
      { word: "Honai", meaning: "A traditional house in Papua", example: "This is a Honai." },
      { word: "House", meaning: "A building where people live", example: "We stay inside the house." },
      { word: "Roof", meaning: "The top cover of a building", example: "The roof keeps us dry." },
      { word: "Grass", meaning: "A green plant that covers the ground", example: "The grass is soft." },
      { word: "Family", meaning: "A group of parents and children", example: "I love my family." }
    ],
    quiz: [
      {
        question: "What is a Honai?",
        options: ["A traditional house", "A traditional food", "A bird"],
        answer: 0
      },
      {
        question: "What is the roof made of?",
        options: ["Glass", "Grass", "Metal"],
        answer: 1
      },
      {
        question: "Who stays inside the Honai?",
        options: ["Families", "Fish", "Birds"],
        answer: 0
      }
    ]
  },
  {
    id: "story-2",
    title: "Papeda Day",
    category: "Food",
    level: "Beginner",
    grade: "Grade 1-2",
    cover: "https://static.prod-images.emergentagent.com/jobs/22cefb94-57bb-4740-925f-65da674e47de/images/d25d2b8b2cd9666fb76b8eb79c335fa6fd9ac8e0d9907148d2f60e85fb6ede12.jpeg",
    duration: 2,
    text: [
      "Today, my family eats Papeda.",
      "Papeda is made from sago.",
      "It is soft and sticky.",
      "We eat Papeda with fish and yellow soup.",
      "Papeda is one of our favorite foods."
    ],
    vocabulary: [
      { word: "Papeda", meaning: "A traditional sago porridge from Papua", example: "I like eating Papeda." },
      { word: "Sago", meaning: "Starch from sago palm stems", example: "We make porridge from sago." },
      { word: "Fish", meaning: "An animal that swims in water", example: "Yellow fish soup is tasty." },
      { word: "Soup", meaning: "A hot liquid food", example: "Yellow soup is delicious." },
      { word: "Sticky", meaning: "Tending to cling or glue", example: "Papeda is soft and sticky." }
    ],
    quiz: [
      {
        question: "What is Papeda made from?",
        options: ["Rice", "Sago", "Corn"],
        answer: 1
      },
      {
        question: "What is the texture of Papeda?",
        options: ["Hard and dry", "Soft and sticky", "Cold and sweet"],
        answer: 1
      },
      {
        question: "What do we eat Papeda with?",
        options: ["Chicken and rice", "Fish and yellow soup", "Bread and butter"],
        answer: 1
      }
    ]
  },
  {
    id: "story-3",
    title: "The Bird of Paradise",
    category: "Animals",
    level: "Beginner",
    grade: "Grade 3-4",
    cover: "https://static.prod-images.emergentagent.com/jobs/22cefb94-57bb-4740-925f-65da674e47de/images/82d27ef8022c37254a10b23a00948376b6b7a2e9301a9f6357600c2692758c9c.jpeg",
    duration: 3,
    text: [
      "The Bird of Paradise lives in Papua.",
      "It has beautiful feathers.",
      "The bird lives in the forest.",
      "It can fly high in the sky.",
      "People in Papua are proud of this beautiful bird."
    ],
    vocabulary: [
      { word: "Paradise", meaning: "A very beautiful place or bird", example: "This is a bird of paradise." },
      { word: "Feather", meaning: "One of the light things covering a bird", example: "The feathers are colorful." },
      { word: "Forest", meaning: "A large area covered with trees", example: "Wild animals live in the forest." },
      { word: "Fly", meaning: "To move through the air with wings", example: "Birds can fly high." },
      { word: "Proud", meaning: "Feeling deep satisfaction in achievements or treasures", example: "I am proud of my home." }
    ],
    quiz: [
      {
        question: "Where does the Bird of Paradise live?",
        options: ["In the desert", "In the ocean", "In the forest"],
        answer: 2
      },
      {
        question: "What makes this bird special?",
        options: ["It can swim fast", "It has beautiful feathers", "It is very big"],
        answer: 1
      },
      {
        question: "How do people in Papua feel about the bird?",
        options: ["They are proud of it", "They are afraid of it", "They do not like it"],
        answer: 0
      }
    ]
  },
  {
    id: "story-4",
    title: "My Noken",
    category: "Daily Life",
    level: "Intermediate",
    grade: "Grade 3-4",
    cover: "https://static.prod-images.emergentagent.com/jobs/22cefb94-57bb-4740-925f-65da674e47de/images/a0dc5415c426d82d003c40bccf0fbc4db25f90bcb6e2b924eea955d6901f1ffc.jpeg",
    duration: 3,
    text: [
      "My mother makes a Noken.",
      "A Noken is a traditional woven bag.",
      "She weaves it using strong wood fiber.",
      "My mother carries the Noken on her forehead.",
      "She fills it with fresh sweet potatoes and green vegetables.",
      "I love my Noken because it is strong and beautiful."
    ],
    vocabulary: [
      { word: "Noken", meaning: "Traditional woven bag from Papua", example: "We carry goods in a Noken." },
      { word: "Woven", meaning: "Made by interlacing threads or fibers", example: "A woven bag is strong." },
      { word: "Weaves", meaning: "Creates fabric or items by interlacing threads", example: "She weaves a beautiful pattern." },
      { word: "Fiber", meaning: "Threadlike material from plants or trees", example: "Wood fiber is used for weaving." },
      { word: "Forehead", meaning: "The part of the face above the eyebrows", example: "She wears the bag strap on her forehead." }
    ],
    quiz: [
      {
        question: "What is a Noken?",
        options: ["A woven bag", "A type of hat", "A sweet potato"],
        answer: 0
      },
      {
        question: "Where is the Noken carried?",
        options: ["On the shoulder", "On the forehead", "In the hand"],
        answer: 1
      },
      {
        question: "What is inside the mother's Noken?",
        options: ["Books and pens", "Sweet potatoes and vegetables", "Shells and fish"],
        answer: 1
      }
    ]
  },
  {
    id: "story-5",
    title: "A Day at Sentani Lake",
    category: "Nature",
    level: "Intermediate",
    grade: "Grade 5-6",
    cover: "https://static.prod-images.emergentagent.com/jobs/22cefb94-57bb-4740-925f-65da674e47de/images/bad7a933915ecdc240ce7c09c9334942ca55e2caaaeea9694edbeed8fb3545be.jpeg",
    duration: 3,
    text: [
      "Today, we visit Sentani Lake.",
      "The lake is big and very peaceful.",
      "Green hills surround the clear water.",
      "We see children playing happily near the water.",
      "Fishermen row wooden boats to catch fish.",
      "We enjoy the cool wind and watch the beautiful sunset over the mountains."
    ],
    vocabulary: [
      { word: "Lake", meaning: "A large body of water surrounded by land", example: "Sentani is a famous lake." },
      { word: "Peaceful", meaning: "Quiet and calm", example: "The lake is quiet and peaceful." },
      { word: "Fishermen", meaning: "People who catch fish", example: "Fishermen catch fish in the lake." },
      { word: "Row", meaning: "To propel a boat using oars", example: "They row the boat to the shore." },
      { word: "Sunset", meaning: "The time when the sun disappears below the horizon", example: "The sunset looks orange."}
    ],
    quiz: [
      {
        question: "What surrounds the water of Sentani Lake?",
        options: ["Tall buildings", "Green hills", "Sandy deserts"],
        answer: 1
      },
      {
        question: "What do the fishermen use to catch fish?",
        options: ["Large ships", "Wooden boats", "Helicopters"],
        answer: 1
      },
      {
        question: "What beautiful view do we watch at the end of the day?",
        options: ["The sunrise", "The sunset", "The heavy rain"],
        answer: 1
      }
    ]
  },
  {
    id: "story-6",
    title: "Playing the Tifa",
    category: "Arts & Music",
    level: "Beginner",
    grade: "Grade 3-4",
    cover: "https://static.prod-images.emergentagent.com/jobs/22cefb94-57bb-4740-925f-65da674e47de/images/33a5d55853f5eb34a57f7ae2fc19f9ea7342e2d199f111fd5b686d04efbcd682.jpeg",
    duration: 2,
    text: [
      "My father plays a Tifa.",
      "A Tifa is a traditional drum from Papua.",
      "It is made of wood.",
      "He hits the drum with his hands.",
      "The Tifa makes a loud and happy sound.",
      "Everyone dances and smiles when the Tifa plays."
    ],
    vocabulary: [
      { word: "Tifa", meaning: "A traditional wooden drum from Papua", example: "He plays the Tifa." },
      { word: "Drum", meaning: "A musical instrument played by beating", example: "I like playing the drum." },
      { word: "Hits", meaning: "Beats or strikes with hands", example: "He hits the drum softly." },
      { word: "Loud", meaning: "Making a lot of noise", example: "The music is loud." },
      { word: "Dance", meaning: "To move your body to music", example: "We dance together." }
    ],
    quiz: [
      {
        question: "What is a Tifa?",
        options: ["A traditional drum", "A traditional dance", "A traditional house"],
        answer: 0
      },
      {
        question: "How is the Tifa played?",
        options: ["By blowing it", "By hitting it with hands", "By shaking it"],
        answer: 1
      },
      {
        question: "What happens when the Tifa plays?",
        options: ["Everyone sleeps", "Everyone cries", "Everyone dances"],
        answer: 2
      }
    ]
  },
  {
    id: "story-7",
    title: "Yospan Dance",
    category: "Arts & Music",
    level: "Intermediate",
    grade: "Grade 5-6",
    cover: "https://static.prod-images.emergentagent.com/jobs/22cefb94-57bb-4740-925f-65da674e47de/images/0567927607a95e2180814b8b61525c127a830ad9712240af152efd3c54a327e0.jpeg",
    duration: 3,
    text: [
      "Today is the village festival.",
      "We dance the Yospan dance together.",
      "Yospan is a traditional dance of friendship.",
      "We wear colorful skirts and feathers on our heads.",
      "We leap and clap our hands happily.",
      "The fast music of Tifa makes us feel excited and joyful."
    ],
    vocabulary: [
      { word: "Yospan", meaning: "A traditional dance from Papua", example: "Yospan is a joyful dance." },
      { word: "Festival", meaning: "A day or period of celebration", example: "We celebrate the festival." },
      { word: "Friendship", meaning: "A relationship between friends", example: "This is a dance of friendship." },
      { word: "Leap", meaning: "To jump high or forward", example: "We leap and clap during the dance." },
      { word: "Clap", meaning: "To strike the palms of hands together", example: "We clap to the beat." }
    ],
    quiz: [
      {
        question: "What kind of dance is Yospan?",
        options: ["A dance of sadness", "A dance of friendship", "A slow dance"],
        answer: 1
      },
      {
        question: "What do the dancers wear on their heads?",
        options: ["Caps", "Feathers", "Helmets"],
        answer: 1
      },
      {
        question: "How do the dancers move in Yospan?",
        options: ["They sleep", "They leap and clap", "They run away"],
        answer: 1
      }
    ]
  },
  {
    id: "story-8",
    title: "My Village in Papua",
    category: "Daily Life",
    level: "Beginner",
    grade: "Grade 1-2",
    cover: "https://static.prod-images.emergentagent.com/jobs/22cefb94-57bb-4740-925f-65da674e47de/images/7244f78bdd9df1133946d675aad4d1ef81c14625af0681f3e59ba07fe396b0ec.jpeg",
    duration: 2,
    text: [
      "Welcome to my beautiful village in Papua.",
      "My village is green and quiet.",
      "We have many round Honai houses.",
      "Behind the houses, there are tall mountains.",
      "We play outside under the blue sky.",
      "I love my village very much."
    ],
    vocabulary: [
      { word: "Village", meaning: "A small group of houses in the countryside", example: "I live in a small village." },
      { word: "Quiet", meaning: "Making very little noise", example: "My village is calm and quiet." },
      { word: "Behind", meaning: "At the back of something", example: "The mountains are behind our houses." },
      { word: "Mountain", meaning: "A very high hill", example: "The mountains are tall." },
      { word: "Outside", meaning: "Not inside a building", example: "We play outside in the sun." }
    ],
    quiz: [
      {
        question: "How is the village described?",
        options: ["Green and quiet", "Loud and busy", "Dirty and hot"],
        answer: 0
      },
      {
        question: "What is behind the houses?",
        options: ["A river", "Tall mountains", "A big school"],
        answer: 1
      },
      {
        question: "What houses are in the village?",
        options: ["Modern apartments", "Round Honai houses", "Stone castles"],
        answer: 1
      }
    ]
  }
];
