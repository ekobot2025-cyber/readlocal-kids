export const CULTURE = [
  {
    id: "honai",
    name: "Honai",
    en: "Honai is a traditional house in Papua. It is round with a grass roof that keeps the family warm inside.",
    id_text: "Honai adalah rumah adat Papua. Berbentuk bulat dengan atap jerami yang menjaga keluarga tetap hangat di dalamnya.",
    image: "/images/stories/story-19.png",
    story: "story-19"
  },
  {
    id: "noken",
    name: "Noken",
    en: "Noken is a traditional woven bag made from wood fiber or leaves. It is carried on the head or shoulder.",
    id_text: "Noken adalah tas rajut tradisional yang terbuat dari serat kayu atau dedaunan. Noken dibawa di atas kepala atau bahu.",
    image: "/images/stories/story-22.png",
    story: "story-22"
  },
  {
    id: "papeda",
    name: "Papeda",
    en: "Papeda is a traditional sago porridge. It is soft, sticky, and served with yellow fish soup.",
    id_text: "Papeda adalah bubur sagu tradisional. Bertekstur lembut, lengket, dan biasanya disajikan dengan kuah ikan kuning.",
    image: "/images/stories/story-20.png",
    story: "story-20"
  },
  {
    id: "bird_of_paradise",
    name: "Bird of Paradise",
    en: "The Bird of Paradise (Cendrawasih) is a beautiful bird with colorful feathers found in the tropical forests of Papua.",
    id_text: "Burung Cendrawasih adalah burung yang sangat indah dengan bulu berwarna-warni yang ditemukan di hutan tropis Papua.",
    image: "/images/stories/story-21.png",
    story: "story-21"
  },
  {
    id: "tifa",
    name: "Tifa",
    en: "Tifa is a traditional Papuan drum made of wood with beautiful carvings and covered with animal skin.",
    id_text: "Tifa adalah gendang tradisional Papua yang terbuat dari kayu dengan ukiran indah dan dilapisi kulit hewan.",
    image: "/images/stories/story-24.png",
    story: "story-24"
  },
  {
    id: "sentani_lake",
    name: "Sentani Lake",
    en: "Sentani Lake is a large and peaceful lake near Jayapura. It is surrounded by green hills and village communities.",
    id_text: "Danau Sentani adalah danau besar yang damai di dekat Jayapura. Dikelilingi bukit-bukit hijau dan komunitas desa.",
    image: "/images/stories/story-23.png",
    story: "story-23"
  }
];

export const STORIES = [
  // ================= LEVEL 1: GRADE 1-2 / BEGINNER =================
  {
    id: "story-1",
    title: "Kiko the Little Cassowary",
    category: "Animals",
    level: "Beginner",
    grade: "Grade 1-2",
    cover: "/images/stories/story-1.png",
    duration: 2,
    text: [
    "In the lush green forest of Papua, Kiko the little Cassowary is searching for sweet berries.",
    "Edgar and Kevia walk carefully along the jungle path under the warm morning sun.",
    "Suddenly, Kevia spots Kiko resting under a leafy banana tree.",
    "\"Look Edgar, it is Kiko!\" whispers Kevia with a big happy smile.",
    "Edgar nods softly and watches the colorful bird step gracefully across the grass.",
    "Kiko tilts his head, eats a ripe berry, and chirps a friendly morning greeting.",
    "Edgar and Kevia wave goodbye as Kiko runs happily deeper into the peaceful forest."
],
    vocabulary: [
      { word: "cassowary", meaning: "A large bird with strong legs", example: "Kiko is a cassowary." },
      { word: "forest", meaning: "A place with many trees", example: "Animals live in the forest." },
      { word: "feathers", meaning: "The soft cover of a bird", example: "The bird has black feathers." },
      { word: "legs", meaning: "Body parts used for walking", example: "Kiko has strong legs." },
      { word: "butterfly", meaning: "A colorful flying insect", example: "The butterfly flies near the tree." },
      { word: "fruit", meaning: "Sweet food growing on plants", example: "Kiko eats a red fruit." }
    ],
    quiz: [
      { question: "Where does Kiko live?", options: ["In the Papuan forest", "In the ocean", "In a city house"], answer: 0 },
      { question: "What color are Kiko's feathers?", options: ["White", "Black", "Yellow"], answer: 1 },
      { question: "What does Kiko find on the ground?", options: ["A toy", "A stone", "A sweet red fruit"], answer: 2 }
    ]
  },
  {
    id: "story-2",
    title: "My Beautiful Noken",
    category: "Culture",
    level: "Beginner",
    grade: "Grade 1-2",
    cover: "/images/stories/story-2.png",
    duration: 2,
    text: [
    "Aldrick and Elea visit their grandmother in the peaceful highland village.",
    "Grandmother sits on the woven mat making a traditional Papuan Noken.",
    "She weaves strong wood fibers into colorful patterns with patient care.",
    "\"A Noken is not just a bag; it holds our hard work and love,\" explains Grandmother.",
    "Elea learns how to interlace the natural fibers alongside her brother Aldrick.",
    "Aldrick proudly carries the finished Noken on his forehead filled with sweet potatoes.",
    "Elea smiles brightly, knowing their Papuan heritage will always live in their hearts."
],
    vocabulary: [
      { word: "noken", meaning: "A traditional woven bag from Papua", example: "Aldrick carries a noken." },
      { word: "beautiful", meaning: "Very nice to look at", example: "The bag is beautiful." },
      { word: "brown", meaning: "A natural earth color", example: "The noken is brown and red." },
      { word: "book", meaning: "Pages bound together for reading", example: "I put my book in the noken." },
      { word: "pencil", meaning: "A tool used for writing", example: "My pencil is inside the bag." },
      { word: "carry", meaning: "To hold and take somewhere", example: "I carry my bag to school." }
    ],
    quiz: [
      { question: "What is this story about?", options: ["Aldrick's beautiful noken", "A new bicycle", "A football match"], answer: 0 },
      { question: "Who gave the noken to Aldrick?", options: ["His teacher", "His mother", "His friend"], answer: 1 },
      { question: "What does Aldrick put inside his noken?", options: ["His book and pencil", "A big drum", "A fish"], answer: 0 }
    ]
  },
  {
    id: "story-3",
    title: "Tifa Goes Boom Boom",
    category: "Arts & Music",
    level: "Beginner",
    grade: "Grade 1-2",
    cover: "/images/stories/story-3.png",
    duration: 2,
    text: [
    "Raphael's father plays the traditional Tifa drum in the sunny village square.",
    "The carved wooden Tifa produces a deep, rhythmic Boom Boom sound.",
    "Raphael and Kyra clap their hands and dance merrily to the lively beat.",
    "\"The sound of Tifa brings our community together in joy!\" exclaims Raphael.",
    "Kyra leaps gracefully, wearing a colorful feather headband.",
    "The drum music echoes across the green hills, filling everyone with happiness."
],
    vocabulary: [
      { word: "tifa", meaning: "A traditional wooden drum from Papua", example: "Edgar plays the tifa." },
      { word: "drum", meaning: "A musical instrument played by beating", example: "The drum makes a loud sound." },
      { word: "hands", meaning: "Body parts at the end of arms", example: "He taps the drum with his hands." },
      { word: "rhythm", meaning: "A regular repeating pattern of sound", example: "They dance to the rhythm." },
      { word: "joyful", meaning: "Feeling very happy", example: "Everyone feels joyful." }
    ],
    quiz: [
      { question: "What instrument does Edgar hold?", options: ["A guitar", "A wooden tifa drum", "A piano"], answer: 1 },
      { question: "What sound does the tifa make?", options: ["Boom, boom, boom!", "Tick, tack, tick!", "Ring, ring, ring!"], answer: 0 },
      { question: "How do Edgar and Aldrick feel when the tifa plays?", options: ["Sad", "Sleepy", "Joyful and happy"], answer: 2 }
    ]
  },
  {
    id: "story-4",
    title: "Good Morning from Papua",
    category: "Daily Life",
    level: "Beginner",
    grade: "Grade 1-2",
    cover: "/images/stories/story-4.png",
    duration: 2,
    text: [
    "Good morning from Papua! The sun rises bright and warm over the tall green mountains.",
    "Prince, Sylvia, and Jovanka gather near Sentani Lake to start their day.",
    "Prince carries his school bag while Sylvia holds a fresh tropical fruit.",
    "Jovanka greets the fishermen rowing their wooden canoes on the quiet lake.",
    "\"We love reading aloud so we can share our Papuan stories with the world,\" says Prince.",
    "Sylvia and Jovanka laugh together, ready for a fun day of learning at school."
],
    vocabulary: [
      { word: "sunrise", meaning: "The time when the sun comes up", example: "The sunrise lights the sky." },
      { word: "hills", meaning: "Raised areas of land", example: "Green hills surround the village." },
      { word: "family", meaning: "Parents and children together", example: "I love my family." },
      { word: "breakfast", meaning: "The first meal of the day", example: "We eat breakfast in the morning." },
      { word: "school", meaning: "A place where children learn", example: "We walk to school together." }
    ],
    quiz: [
      { question: "What rises over the green hills?", options: ["The bright sun", "The moon", "Dark clouds"], answer: 0 },
      { question: "Who do Edgar and Aldrick greet in the morning?", options: ["A police officer", "Their family", "A shopkeeper"], answer: 1 },
      { question: "Where do Edgar and Aldrick walk after breakfast?", options: ["To the market", "To the river", "To school"], answer: 2 }
    ]
  },
  {
    id: "story-5",
    title: "Papeda for Lunch",
    category: "Food",
    level: "Beginner",
    grade: "Grade 1-2",
    cover: "/images/stories/story-5.png",
    duration: 2,
    text: [
    "Today, Adelino and Sylvia's family enjoys a delicious Papeda lunch.",
    "Papeda is a traditional Papuan porridge made from natural sago starch.",
    "It is soft, smooth, and sticky, served alongside hot yellow fish soup.",
    "Adelino uses a pair of wooden sticks to roll the warm Papeda onto his plate.",
    "Sylvia tastes the savory soup and says, \"Papeda is our absolute favorite food!\"",
    "The family eats happily together, celebrating their rich culinary traditions."
],
    vocabulary: [
      { word: "papeda", meaning: "A traditional sago dish from Papua", example: "Papeda is served warm." },
      { word: "sago", meaning: "Starch made from sago palms", example: "Papeda comes from sago." },
      { word: "sticky", meaning: "Soft and clinging", example: "Papeda is soft and sticky." },
      { word: "soup", meaning: "A warm liquid food with fish", example: "The yellow soup is warm." },
      { word: "delicious", meaning: "Tasting very good", example: "The fish soup is delicious." }
    ],
    quiz: [
      { question: "What food does Edgar's family enjoy for lunch?", options: ["Papeda", "Fried noodles", "Pizza"], answer: 0 },
      { question: "What is papeda made from?", options: ["Wheat flour", "Sago starch", "Corn meal"], answer: 1 },
      { question: "What kind of soup does Aldrick dip papeda into?", options: ["Mushroom soup", "Tomato soup", "Yellow fish soup"], answer: 2 }
    ]
  },
  {
    id: "story-6",
    title: "The Colorful Bird",
    category: "Animals",
    level: "Beginner",
    grade: "Grade 1-2",
    cover: "/images/stories/story-6.png",
    duration: 2,
    text: [
    "Kyra and Enzo walk along a quiet forest trail in search of native wildlife.",
    "High up in the rainforest canopy, a gorgeous Bird of Paradise perches on a branch.",
    "Its brilliant yellow, red, and emerald feathers shine brightly in the sunlight.",
    "\"Look Enzo, it is the Cenderawasih, the proud bird of our homeland!\" whispers Kyra.",
    "Enzo gazes up in wonder as the majestic bird spreads its long, elegant tail feathers.",
    "Kyra and Enzo promise to protect the tropical forests so the birds stay safe forever."
],
    vocabulary: [
      { word: "bird", meaning: "A feathered creature with wings", example: "The bird flies in the sky." },
      { word: "wings", meaning: "Body parts used for flying", example: "The bird spreads its wings." },
      { word: "feathers", meaning: "Soft covering on a bird", example: "The feathers are yellow and blue." },
      { word: "tree", meaning: "A tall plant with a wooden trunk", example: "The bird perches on a tree." },
      { word: "forest", meaning: "A large wood filled with trees", example: "The forest is green." },
      { word: "beautiful", meaning: "Lovely and pleasing to see", example: "The Bird of Paradise is beautiful." }
    ],
    quiz: [
      { question: "Where is the bird sitting?", options: ["On the ground", "High up in a tree", "In a boat"], answer: 1 },
      { question: "What kind of bird does Aldrick see?", options: ["Bird of Paradise", "Duck", "Penguin"], answer: 0 },
      { question: "How does the bird fly across the forest?", options: ["Loudly", "Slowly", "Quietly"], answer: 2 }
    ]
  },

  // ================= LEVEL 2: GRADE 3-4 / ELEMENTARY =================
  {
    id: "story-7",
    title: "A Boat on Sentani Lake",
    category: "Nature",
    level: "Intermediate",
    grade: "Grade 3-4",
    cover: "/images/stories/story-7.png",
    duration: 3,
    text: [
    "Edgar and Aldrick board a small wooden motorboat on Sentani Lake.",
    "The calm water reflects the blue sky and surrounding emerald green hills.",
    "They see traditional stilt houses built neatly over the clear water.",
    "\"Sentani Lake is one of the most peaceful places in Papua,\" remarks Edgar.",
    "Aldrick points to local fishermen casting their fishing nets in the morning light.",
    "Both boys feel grateful to live near such a magnificent lake."
],
    vocabulary: [
      { word: "lake", meaning: "A large body of water surrounded by land", example: "Sentani Lake is peaceful." },
      { word: "boat", meaning: "A small vessel for travelling on water", example: "They row a wooden boat." },
      { word: "fish", meaning: "Animals that live and swim in water", example: "Small fish swim in the lake." },
      { word: "hills", meaning: "Raised land smaller than mountains", example: "Green hills surround the water." },
      { word: "clean", meaning: "Free from dirt or trash", example: "We must keep the water clean." },
      { word: "water", meaning: "Clear liquid in lakes and rivers", example: "The water is calm and clear." },
      { word: "peaceful", meaning: "Quiet, calm, and undisturbed", example: "The morning lake is peaceful." }
    ],
    quiz: [
      { question: "Who goes to Sentani Lake?", options: ["Edgar, his father, and Aldrick", "Only Edgar", "A doctor and a pilot"], answer: 0 },
      { question: "What do they travel in across the lake?", options: ["A big ship", "A wooden boat", "A surfboard"], answer: 1 },
      { question: "What surrounds Sentani Lake?", options: ["Tall skyscrapers", "Desert sand", "Green hills"], answer: 2 },
      { question: "Why does Edgar's father say we must care for the lake?", options: ["To keep it clean and beautiful", "To catch all the birds", "To sell the water"], answer: 0 }
    ]
  },
  {
    id: "story-8",
    title: "Kyra and the Red Fruit",
    category: "Food",
    level: "Intermediate",
    grade: "Grade 3-4",
    cover: "/images/stories/story-8.png",
    duration: 3,
    text: [
    "Kevia and Raphael explore their uncle's orchard behind the village.",
    "They discover a tall tree laden with long red fruits known as Buah Merah.",
    "Uncle explains that Buah Merah is rich in nutrients and good for health.",
    "\"Our ancestors have used this natural fruit for generations,\" says Raphael.",
    "Kevia gathers the harvest into her woven basket with a cheerful smile.",
    "Kevia and Raphael return home eager to share the healthy fruit with their family."
],
    vocabulary: [
      { word: "garden", meaning: "Ground used for growing plants", example: "Vegetables grow in the garden." },
      { word: "fruit", meaning: "Edible part of a plant containing seeds", example: "Buah Merah is a special fruit." },
      { word: "unique", meaning: "Special and one of a kind", example: "The fruit has a unique shape." },
      { word: "observe", meaning: "To watch carefully", example: "Aldrick observes the plant." },
      { word: "harvest", meaning: "To gather ripe crops or fruits", example: "They harvest vegetables." },
      { word: "traditional", meaning: "Belonging to long-standing customs", example: "They use traditional cooking." }
    ],
    quiz: [
      { question: "What special fruit do Kyra and Edgar see in the garden?", options: ["Buah Merah", "An apple", "A strawberry"], answer: 0 },
      { question: "What color is Buah Merah?", options: ["Bright green", "Deep red", "Dark purple"], answer: 1 },
      { question: "Who explains about Buah Merah?", options: ["A teacher", "A police officer", "Their uncle"], answer: 2 },
      { question: "What does Kyra learn about nature?", options: ["Nature gives many wonderful plants", "Plants do not need water", "Gardens are dark"], answer: 0 }
    ]
  },
  {
    id: "story-9",
    title: "Sago for Grandmother",
    category: "Food",
    level: "Intermediate",
    grade: "Grade 3-4",
    cover: "/images/stories/story-9.png",
    duration: 3,
    text: [
    "Prince and Elea join their grandparents to collect sago from the palm grove.",
    "Sago is a vital staple food for many communities across Papua.",
    "Grandfather carefully processes the sago palm trunk to extract pure starch.",
    "Prince helps carry the sago flour in a sturdy basket woven from leaves.",
    "Elea assists Grandmother in preparing warm sago cakes over the fire.",
    "Prince and Elea thank their grandparents for teaching them traditional food skills."
],
    vocabulary: [
      { word: "sago", meaning: "Starch extracted from sago palms", example: "Sago flour is kept in a box." },
      { word: "flour", meaning: "Powdered starch used in cooking", example: "Edgar gets the sago flour." },
      { word: "stir", meaning: "To mix using a spoon", example: "He stirs the sago slowly." },
      { word: "helpful", meaning: "Giving assistance and care", example: "The boys are very helpful." },
      { word: "dish", meaning: "Food prepared for a meal", example: "They prepare a warm dish." },
      { word: "meal", meaning: "Food eaten at one time", example: "They enjoy their meal together." }
    ],
    quiz: [
      { question: "What does Edgar want to make for his grandmother?", options: ["A chocolate cake", "A sago dish", "Fried rice"], answer: 1 },
      { question: "What step happens first in making the dish?", options: ["Edgar gets sago flour", "They clean the fish", "They go to sleep"], answer: 0 },
      { question: "How does Aldrick help in the kitchen?", options: ["He sets the table", "He buys bread", "He helps boil clean water"], answer: 2 },
      { question: "What sequence word describes the last step?", options: ["Finally", "First", "Never"], answer: 0 }
    ]
  },
  {
    id: "story-10",
    title: "My Day at Hamadi Market",
    category: "Daily Life",
    level: "Intermediate",
    grade: "Grade 3-4",
    cover: "/images/stories/story-10.png",
    duration: 3,
    text: [
    "Jovanka and Adelino wake up early in the scenic Baliem Valley.",
    "Fresh mountain mist drifts across the green fields and round Honai houses.",
    "Farmers tend to sweet potato gardens as the morning sun warms the valley.",
    "\"Baliem Valley is rich in culture and natural beauty,\" says Jovanka.",
    "Adelino helps carry fresh vegetables gathered from the farm.",
    "Jovanka and Adelino walk happily to school under the crisp highland sky."
],
    vocabulary: [
      { word: "market", meaning: "A place where goods are bought and sold", example: "Hamadi Market is busy." },
      { word: "seller", meaning: "A person who sells items", example: "The seller offers pineapples." },
      { word: "vegetables", meaning: "Plants used as food", example: "They buy fresh green vegetables." },
      { word: "pineapple", meaning: "A sweet tropical fruit", example: "They buy three pineapples." },
      { word: "politely", meaning: "In a respectful manner", example: "Aldrick replies politely." },
      { word: "community", meaning: "A group of people living together", example: "The market brings the community together." },
      { word: "display", meaning: "To show goods clearly", example: "Sellers display fresh produce." }
    ],
    quiz: [
      { question: "Where does Aldrick go on Saturday morning?", options: ["Hamadi Market in Jayapura", "A sports stadium", "A library"], answer: 0 },
      { question: "What does Aldrick carry on his shoulder?", options: ["A heavy trunk", "A woven noken bag", "A guitar case"], answer: 1 },
      { question: "What fruit does Aldrick buy from the seller?", options: ["Apples", "Grapes", "Pineapples"], answer: 2 },
      { question: "How does Aldrick feel about the market visit?", options: ["He enjoys seeing the community work together", "He feels bored", "He gets lost"], answer: 0 }
    ]
  },
  {
    id: "story-11",
    title: "The Little Bird in the Forest",
    category: "Animals",
    level: "Intermediate",
    grade: "Grade 3-4",
    cover: "/images/stories/story-11.png",
    duration: 3,
    text: [
    "Enzo and Sylvia take a boat excursion across the turquoise waters of Raja Ampat.",
    "Below the crystal-clear surface, colorful coral reefs and tropical fish swim by.",
    "\"Raja Ampat has some of the richest marine life on Earth!\" shouts Enzo excitedly.",
    "Sylvia peers into the water and watches a sea turtle glide past their boat.",
    "Enzo and Sylvia learn how important it is to keep the ocean clean and healthy.",
    "They wave to local divers exploring the paradise islands."
],
    vocabulary: [
      { word: "quietly", meaning: "With little or no noise", example: "Edgar walks quietly." },
      { word: "notebook", meaning: "A book of paper for drawing or writing", example: "He carries a small notebook." },
      { word: "chirping", meaning: "Short high-pitched sounds of a bird", example: "He hears chirping sounds." },
      { word: "perches", meaning: "Sits or rests on a branch", example: "The bird perches on a tree." },
      { word: "disturbing", meaning: "Bothering or interrupting animals", example: "Watch without disturbing animals." },
      { word: "branch", meaning: "A wooden part growing from a tree", example: "The bird perches on a branch." }
    ],
    quiz: [
      { question: "Why does Edgar carry a notebook in the forest?", options: ["To write math homework", "To draw wild animals", "To read comics"], answer: 1 },
      { question: "What sound does Edgar hear?", options: ["A soft chirping sound", "Loud thunder", "A barking dog"], answer: 0 },
      { question: "What advice does Aldrick give about wild birds?", options: ["Catch the bird", "Watch quietly without disturbing it", "Shout loudly"], answer: 2 },
      { question: "What does the bird do after perching?", options: ["Chirps happily and flies into the forest", "Falls asleep on the grass", "Swims in the lake"], answer: 0 }
    ]
  },
  {
    id: "story-12",
    title: "Playing Football by the Sea",
    category: "Daily Life",
    level: "Intermediate",
    grade: "Grade 3-4",
    cover: "/images/stories/story-12.png",
    duration: 3,
    text: [
    "Edgar and Kyra prepare for the annual cultural parade in town.",
    "They wear traditional Papuan crowns adorned with natural bird feathers.",
    "\"These crowns represent our heritage and respect for nature,\" explains Edgar.",
    "Kyra fastens her woven sash while adjusting her feather headdress.",
    "Edgar and Kyra march proudly alongside their classmates in the grand festival.",
    "The crowd cheers as children display the vibrant art of Papua."
],
    vocabulary: [
      { word: "beach", meaning: "A sandy shore by the ocean", example: "The sun shines on the beach." },
      { word: "football", meaning: "A game played by kicking a round ball", example: "They play football together." },
      { word: "excitement", meaning: "Great enthusiasm and happiness", example: "Aldrick shouts with excitement." },
      { word: "shore", meaning: "Land along the edge of the sea", example: "He kicks the ball along the shore." },
      { word: "teamwork", meaning: "Working together effectively as a group", example: "Sports build great teamwork." },
      { word: "sports", meaning: "Physical games played for fun", example: "Playing sports keeps us active." }
    ],
    quiz: [
      { question: "Where do Edgar and Aldrick play football?", options: ["On the sandy beach", "Inside a Honai", "In a classroom"], answer: 0 },
      { question: "What do the boys use as goal posts?", options: ["Metal gates", "Wooden posts on the sand", "School desks"], answer: 1 },
      { question: "What sound accompanies their game near the shore?", options: ["City traffic noise", "Heavy rain", "Waves splashing gently"], answer: 2 },
      { question: "What lesson is learned from playing sports together?", options: ["Teamwork and strong friendship", "How to win money", "How to fight"], answer: 0 }
    ]
  },

  // ================= LEVEL 3: GRADE 5-6 / INTERMEDIATE =================
  {
    id: "story-13",
    title: "The Noken from Grandmother",
    category: "Culture",
    level: "Advanced",
    grade: "Grade 5-6",
    cover: "/images/stories/story-13.png",
    duration: 4,
    text: [
    "Aldrick and Kevia visit Biak Island for a coastal adventure.",
    "Fishermen row out at dawn under a golden sunrise sky.",
    "Kevia collects shell treasures along the white sandy beach.",
    "\"Biak Island has cool sea breezes and rich maritime traditions,\" says Aldrick.",
    "Aldrick and Kevia listen to local elders tell stories of ancient sea journeys.",
    "They enjoy fresh coconut water while watching boats return to the shore."
],
    vocabulary: [
      { word: "delicate", meaning: "Finely detailed and carefully crafted", example: "The noken has delicate patterns." },
      { word: "patience", meaning: "The ability to wait or work without getting upset", example: "Weaving requires great patience." },
      { word: "fiber", meaning: "Plant thread used for weaving", example: "Bark fibers make strong bags." },
      { word: "braided", meaning: "Intertwined pattern of strands", example: "The handles are braided neatly." },
      { word: "memories", meaning: "Recollections of past experiences", example: "The noken carries family memories." },
      { word: "intent", meaning: "Paying close and eager attention", example: "Edgar listens with intent." },
      { word: "treasure", meaning: "To value highly and protect", example: "Aldrick promises to treasure the gift." }
    ],
    quiz: [
      { question: "Who gives the special noken to Aldrick?", options: ["His grandmother", "His teacher", "A shopkeeper"], answer: 0 },
      { question: "What materials were used to make the noken?", options: ["Plastic strings", "Bark fibers and natural plant dyes", "Steel wires"], answer: 1 },
      { question: "What do handmade objects carry according to Grandmother?", options: ["Heavy rocks", "Hard work, care, and family memories", "Secret maps"], answer: 2 },
      { question: "Who joins Aldrick to listen to Grandmother's story?", options: ["Edgar", "A police officer", "A fisherman"], answer: 0 },
      { question: "What promise does Aldrick make at the end of the story?", options: ["To sell the noken", "To treasure the noken and share its stories", "To throw it away"], answer: 1 }
    ]
  },
  {
    id: "story-14",
    title: "A Morning at Sentani Lake",
    category: "Environment",
    level: "Advanced",
    grade: "Grade 5-6",
    cover: "/images/stories/story-14.png",
    duration: 4,
    text: [
    "Raphael and Elea go hiking with their teacher in Lorentz National Park.",
    "The park stretches from snow-capped peaks down to tropical coastal wetlands.",
    "\"Lorentz National Park is a UNESCO World Heritage site,\" notes Raphael.",
    "Elea spots rare orchids blooming alongside the mountain river path.",
    "Raphael and Elea admire the vast wilderness protecting endemic Papuan animals.",
    "They promise to share environmental conservation lessons with their peers."
],
    vocabulary: [
      { word: "illuminates", meaning: "Lights up and brightens", example: "Sunlight illuminates the lake." },
      { word: "mist", meaning: "A thin cloud of tiny water droplets", example: "Mist hangs over the water." },
      { word: "surface", meaning: "The top layer of water or land", example: "Hills reflect on the lake surface." },
      { word: "harms", meaning: "Causes damage or hurt", example: "Plastic trash harms aquatic life." },
      { word: "generations", meaning: "Groups of people born in successive eras", example: "We protect the lake for future generations." },
      { word: "effort", meaning: "Determined work to achieve a goal", example: "Their cleaning effort makes a difference." },
      { word: "preserve", meaning: "To protect and keep in good condition", example: "We preserve Papua's clean environment." }
    ],
    quiz: [
      { question: "What time of day does the story take place?", options: ["Early morning at dawning sunlight", "Late at midnight", "In the middle of the night"], answer: 0 },
      { question: "What activity do Edgar and Aldrick do by the lake?", options: ["Build a hotel", "Clean the lakeside shore with classmates", "Swim across the sea"], answer: 1 },
      { question: "Why is plastic trash dangerous for the lake?", options: ["It makes the boat go faster", "It attracts big ships", "It harms fish and aquatic plants"], answer: 2 },
      { question: "What reflects on the surface of the lake?", options: ["Green tropical hills", "Tall neon lights", "Airplane wings"], answer: 0 },
      { question: "How do the boys feel after cleaning the lakeside?", options: ["Angry and tired", "Proud to protect the environment", "Bored"], answer: 1 }
    ]
  },
  {
    id: "story-15",
    title: "The Forest Is Our Home",
    category: "Environment",
    level: "Advanced",
    grade: "Grade 5-6",
    cover: "/images/stories/story-15.png",
    duration: 4,
    text: [
    "Prince and Jovanka listen to an elder narrate the legend of Cenderawasih.",
    "According to legend, the bird brought beauty and harmony to the Papuan forests.",
    "\"We must treasure nature just as the story teaches us,\" says Prince.",
    "Jovanka draws a picture of the bird of paradise with vibrant crayons.",
    "Prince and Jovanka present their artwork during storytime at school.",
    "Their classmates applaud the wonderful tale of Papuan folklore."
],
    vocabulary: [
      { word: "rainforest", meaning: "A dense tropical forest rich in plant and animal life", example: "Papua has vast rainforests." },
      { word: "absorb", meaning: "To soak up liquid or moisture", example: "Trees absorb rainwater." },
      { word: "erosion", meaning: "The gradual wearing away of soil by wind or water", example: "Roots prevent soil erosion." },
      { word: "rely", meaning: "To depend on for support or food", example: "Birds rely on forest fruits." },
      { word: "responsibility", meaning: "A duty or obligation to care for something", example: "Caring for nature is a shared responsibility." },
      { word: "commitment", meaning: "A pledge or promise to do something", example: "They make a commitment to plant trees." }
    ],
    quiz: [
      { question: "What do Papuan rainforests provide for wild animals?", options: ["A safe home with food and clean water", "No food", "Dark cages"], answer: 0 },
      { question: "What benefits do tall trees provide according to the teacher?", options: ["They make noise", "Absorb rainwater, prevent erosion, and provide fresh air", "They block rain completely"], answer: 1 },
      { question: "What birds do the students observe overhead?", options: ["Sea gulls", "Pigeons", "Colorful lorikeets and cassowaries"], answer: 2 },
      { question: "Who is responsible for taking care of nature?", options: ["Everyone in the community", "Only scientists", "Nobody"], answer: 0 },
      { question: "What project do Edgar and Aldrick plan to start at school?", options: ["Building a road", "Planting new trees", "Cutting down branches"], answer: 1 }
    ]
  },
  {
    id: "story-16",
    title: "Festival by the Lake",
    category: "Culture",
    level: "Advanced",
    grade: "Grade 5-6",
    cover: "/images/stories/story-16.png",
    duration: 4,
    text: [
    "Adelino, Enzo, Sylvia, and Kyra join hands for the energetic Yospan dance.",
    "Yospan is a traditional Papuan dance celebrating friendship and unity.",
    "The dancers leap, step, and clap to the fast tempo of Tifa drums.",
    "Adelino and Enzo lead the front line with enthusiastic dance moves.",
    "Sylvia and Kyra twirl happily, wearing colorful woven festival attire.",
    "Everyone in the village smiles and cheers during the joyful celebration."
],
    vocabulary: [
      { word: "vibrant", meaning: "Full of energy, excitement, and bright colors", example: "The festival is vibrant." },
      { word: "rhythmic", meaning: "Having a regular repeating beat", example: "Tifa drums produce rhythmic beats." },
      { word: "perform", meaning: "To present dance or music to an audience", example: "Dancers perform Yospan." },
      { word: "unity", meaning: "The state of being joined together in harmony", example: "They sing songs of unity." },
      { word: "document", meaning: "To record events in photos or writing", example: "Edgar takes photos to document the festival." },
      { word: "harmony", meaning: "Peaceful agreement and togetherness", example: "Arts bring people together in harmony." }
    ],
    quiz: [
      { question: "Where does the annual cultural festival take place?", options: ["Around Sentani Lake", "In an underground cave", "At a train station"], answer: 0 },
      { question: "What instrument creates rhythmic beats during the festival?", options: ["Violin", "Tifa drums", "Flute"], answer: 1 },
      { question: "What traditional dance do the performers dance?", options: ["Ballet", "Tap dance", "Yospan dance"], answer: 2 },
      { question: "What values are celebrated through the festival songs?", options: ["Friendship, unity, and celebration", "Anger and fighting", "Speed racing"], answer: 0 },
      { question: "What main message does the festival teach the boys?", options: ["Festivals are noisy", "Cultural arts bring people together in harmony", "Dancing is difficult"], answer: 1 }
    ]
  },
  {
    id: "story-17",
    title: "A Visit to the Papua Museum",
    category: "Daily Life",
    level: "Advanced",
    grade: "Grade 5-6",
    cover: "/images/stories/story-17.png",
    duration: 4,
    text: [
    "Edgar, Raphael, and Elea visit the Papua Museum in Jayapura on a field trip.",
    "They view historic wood carvings, ancient woven nokens, and traditional instruments.",
    "\"Papua has hundreds of distinct languages and local customs,\" explains the guide.",
    "Edgar takes notes while Raphael examines an old map of island settlements.",
    "Elea records a short audio summary of her favorite exhibit on her tablet.",
    "Edgar, Raphael, and Elea return to school inspired by their diverse heritage."
],
    vocabulary: [
      { word: "museum", meaning: "A place where historical or cultural items are kept", example: "They visit the Papua Museum." },
      { word: "exhibition", meaning: "A public display of art or historical items", example: "They see items in the exhibition hall." },
      { word: "distinct", meaning: "Recognizably different and unique", example: "Papua has distinct languages." },
      { word: "wisdom", meaning: "Knowledge gained through long experience", example: "They learn environmental wisdom." },
      { word: "examine", meaning: "To inspect or look at closely", example: "Aldrick examines an ancient map." },
      { word: "diversity", meaning: "A wide variety of different cultures and things", example: "Diversity makes our homeland rich." }
    ],
    quiz: [
      { question: "Where do Edgar and Aldrick go for their school field trip?", options: ["The Papua Museum in Jayapura", "A cinema", "An amusement park"], answer: 0 },
      { question: "What items do the students view inside the exhibition hall?", options: ["Space rockets", "Wood carvings, woven nokens, and tifa drums", "Automobiles"], answer: 1 },
      { question: "What does the museum guide explain about Papua?", options: ["Papua has no history", "Papua has only one song", "Papua has hundreds of distinct languages and traditions"], answer: 2 },
      { question: "What does Edgar realize about diversity?", options: ["Diversity makes their homeland rich and special", "Diversity causes confusion", "Diversity is scary"], answer: 0 },
      { question: "What do students record before leaving the museum?", options: ["Video games", "Audio summaries of their favorite exhibits", "Music singles"], answer: 1 }
    ]
  },
  {
    id: "story-18",
    title: "Our Beautiful Papua",
    category: "Nature",
    level: "Advanced",
    grade: "Grade 5-6",
    cover: "/images/stories/story-18.png",
    duration: 4,
    text: [
    "From tall green mountains to clear blue seas, Papua is a land of wonder.",
    "Aldrick, Prince, Jovanka, and Kevia stand on a high hill overlooking Sentani Lake.",
    "They reflect on all the stories they have read together in friendship.",
    "\"We learn English so we can share our Papuan culture with the world,\" says Prince.",
    "Jovanka nods happily, adding, \"Reading Aloud builds our confidence every day.\"",
    "Aldrick, Prince, Jovanka, and Kevia smile together under the bright Papuan sky."
],
    vocabulary: [
      { word: "wonder", meaning: "A feeling of amazement caused by something beautiful", example: "Papua is a land of wonder." },
      { word: "confidence", meaning: "A feeling of self-assurance in speaking", example: "Reading Aloud builds confidence." },
      { word: "respect", meaning: "Care and regard for traditions and nature", example: "We respect our forests and lakes." },
      { word: "share", meaning: "To communicate or give to others", example: "We share our stories with the world." },
      { word: "surrounding", meaning: "Located all around a place", example: "Green hills surrounding the lake." },
      { word: "traditions", meaning: "Customs passed down through generations", example: "We cherish rich cultural traditions." }
    ],
    quiz: [
      { question: "What landscapes make Papua a land of wonder?", options: ["Tall green mountains, clear blue seas, and lakes", "Only dry sand", "Concrete roads only"], answer: 0 },
      { question: "Where are Edgar and Aldrick standing at the beginning of the story?", options: ["On a high hill overlooking Sentani Lake", "Inside a submarine", "In a basement"], answer: 1 },
      { question: "Why does Edgar say they learn English?", options: ["To forget their home", "To buy toys", "To share the stories of their home with the world"], answer: 2 },
      { question: "What benefit does Reading Aloud give according to Aldrick?", options: ["Helps speak with confidence and joy", "Makes you tired", "Is boring"], answer: 0 },
      { question: "What is the final message of the story?", options: ["Leave the forest alone", "Papua is our home: we learn from it, care for it, and share its stories", "Do not read books"], answer: 1 }
    ]
  }
,
{
  "id": "story-19",
  "title": "My Honai",
  "category": "Traditional House",
  "level": "Beginner",
  "grade": "Grade 1-2",
  "cover": "/images/stories/story-19.png",
  "duration": 2,
  "text": [
    "This is Edgar's Honai.",
    "A Honai is a traditional house in Papua.",
    "It is small and round.",
    "The roof is made of grass.",
    "Edgar and his family stay warm inside the Honai."
],
  "vocabulary": [
    {
      "word": "Honai",
      "meaning": "A traditional house in Papua",
      "example": "This is a Honai."
    },
    {
      "word": "House",
      "meaning": "A building where people live",
      "example": "We stay inside the house."
    },
    {
      "word": "Roof",
      "meaning": "The top cover of a building",
      "example": "The roof keeps us dry."
    },
    {
      "word": "Grass",
      "meaning": "A green plant that covers the ground",
      "example": "The grass is soft."
    },
    {
      "word": "Family",
      "meaning": "A group of parents and children",
      "example": "I love my family."
    }
  ],
  "quiz": [
    {
      "question": "What is a Honai?",
      "options": [
        "A traditional house",
        "A traditional food",
        "A bird"
      ],
      "answer": 0
    },
    {
      "question": "What is the roof made of?",
      "options": [
        "Glass",
        "Grass",
        "Metal"
      ],
      "answer": 1
    },
    {
      "question": "Who stays inside the Honai?",
      "options": [
        "Edgar and his family",
        "Fish",
        "Birds"
      ],
      "answer": 0
    }
  ]
},
{
  "id": "story-20",
  "title": "Papeda Day",
  "category": "Food",
  "level": "Beginner",
  "grade": "Grade 1-2",
  "cover": "/images/stories/story-20.png",
  "duration": 2,
  "text": [
    "Today, Aldrick's family eats Papeda.",
    "Papeda is made from sago.",
    "It is soft and sticky.",
    "They eat Papeda with fish and yellow soup.",
    "Papeda is one of their favorite foods."
],
  "vocabulary": [
    {
      "word": "Papeda",
      "meaning": "A traditional sago porridge from Papua",
      "example": "I like eating Papeda."
    },
    {
      "word": "Sago",
      "meaning": "Starch from sago palm stems",
      "example": "We make porridge from sago."
    },
    {
      "word": "Fish",
      "meaning": "An animal that swims in water",
      "example": "Yellow fish soup is tasty."
    },
    {
      "word": "Soup",
      "meaning": "A hot liquid food",
      "example": "Yellow soup is delicious."
    },
    {
      "word": "Sticky",
      "meaning": "Tending to cling or glue",
      "example": "Papeda is soft and sticky."
    }
  ],
  "quiz": [
    {
      "question": "What is Papeda made from?",
      "options": [
        "Rice",
        "Sago",
        "Corn"
      ],
      "answer": 1
    },
    {
      "question": "What is the texture of Papeda?",
      "options": [
        "Hard and dry",
        "Soft and sticky",
        "Cold and sweet"
      ],
      "answer": 1
    },
    {
      "question": "What does Aldrick's family eat Papeda with?",
      "options": [
        "Chicken and rice",
        "Fish and yellow soup",
        "Bread and butter"
      ],
      "answer": 1
    }
  ]
},
{
  "id": "story-21",
  "title": "The Bird of Paradise",
  "category": "Animals",
  "level": "Beginner",
  "grade": "Grade 3-4",
  "cover": "/images/stories/story-21.png",
  "duration": 3,
  "text": [
    "The Bird of Paradise lives in Papua.",
    "It has beautiful feathers.",
    "Kyra sees the bird in the forest.",
    "It can fly high in the sky.",
    "Edgar and Kyra are proud of this beautiful bird."
],
  "vocabulary": [
    {
      "word": "Paradise",
      "meaning": "A very beautiful place or bird",
      "example": "This is a bird of paradise."
    },
    {
      "word": "Feather",
      "meaning": "One of the light things covering a bird",
      "example": "The feathers are colorful."
    },
    {
      "word": "Forest",
      "meaning": "A large area covered with trees",
      "example": "Wild animals live in the forest."
    },
    {
      "word": "Fly",
      "meaning": "To move through the air with wings",
      "example": "Birds can fly high."
    },
    {
      "word": "Proud",
      "meaning": "Feeling deep satisfaction",
      "example": "I am proud of my home."
    }
  ],
  "quiz": [
    {
      "question": "Where does the Bird of Paradise live?",
      "options": [
        "In the desert",
        "In the ocean",
        "In the forest"
      ],
      "answer": 2
    },
    {
      "question": "What makes this bird special?",
      "options": [
        "It can swim fast",
        "It has beautiful feathers",
        "It is very big"
      ],
      "answer": 1
    },
    {
      "question": "How do Edgar and Kyra feel about the bird?",
      "options": [
        "They are proud of it",
        "They are afraid of it",
        "They do not like it"
      ],
      "answer": 0
    }
  ]
},
{
  "id": "story-22",
  "title": "My Noken",
  "category": "Daily Life",
  "level": "Intermediate",
  "grade": "Grade 3-4",
  "cover": "/images/stories/story-22.png",
  "duration": 3,
  "text": [
    "Sylvia's mother makes a Noken.",
    "A Noken is a traditional woven bag.",
    "She weaves it using strong wood fiber.",
    "Her mother carries the Noken on her forehead.",
    "She fills it with fresh sweet potatoes and green vegetables.",
    "Sylvia loves her Noken because it is strong and beautiful."
],
  "vocabulary": [
    {
      "word": "Noken",
      "meaning": "Traditional woven bag from Papua",
      "example": "We carry goods in a Noken."
    },
    {
      "word": "Woven",
      "meaning": "Made by interlacing threads or fibers",
      "example": "A woven bag is strong."
    },
    {
      "word": "Weaves",
      "meaning": "Creates fabric or items by interlacing threads",
      "example": "She weaves a beautiful pattern."
    },
    {
      "word": "Fiber",
      "meaning": "Threadlike material from plants or trees",
      "example": "Wood fiber is used for weaving."
    },
    {
      "word": "Forehead",
      "meaning": "The part of the face above the eyebrows",
      "example": "She wears the bag strap on her forehead."
    }
  ],
  "quiz": [
    {
      "question": "What is a Noken?",
      "options": [
        "A woven bag",
        "A type of hat",
        "A sweet potato"
      ],
      "answer": 0
    },
    {
      "question": "Where is the Noken carried?",
      "options": [
        "On the shoulder",
        "On the forehead",
        "In the hand"
      ],
      "answer": 1
    },
    {
      "question": "What is inside the mother's Noken?",
      "options": [
        "Books and pens",
        "Sweet potatoes and vegetables",
        "Shells and fish"
      ],
      "answer": 1
    }
  ]
},
{
  "id": "story-23",
  "title": "A Day at Sentani Lake",
  "category": "Nature",
  "level": "Intermediate",
  "grade": "Grade 5-6",
  "cover": "/images/stories/story-23.png",
  "duration": 3,
  "text": [
    "Today, Raphael and Enzo visit Sentani Lake.",
    "The lake is big and very peaceful.",
    "Green hills surround the clear water.",
    "They see children playing happily near the water.",
    "Fishermen row wooden boats to catch fish.",
    "Raphael and Enzo watch the sunset over the mountains."
],
  "vocabulary": [
    {
      "word": "Lake",
      "meaning": "A large body of water surrounded by land",
      "example": "Sentani is a famous lake."
    },
    {
      "word": "Peaceful",
      "meaning": "Quiet and calm",
      "example": "The lake is quiet and peaceful."
    },
    {
      "word": "Fishermen",
      "meaning": "People who catch fish",
      "example": "Fishermen catch fish in the lake."
    },
    {
      "word": "Row",
      "meaning": "To propel a boat using oars",
      "example": "They row the boat to the shore."
    },
    {
      "word": "Sunset",
      "meaning": "The time when the sun disappears below the horizon",
      "example": "The sunset looks orange."
    }
  ],
  "quiz": [
    {
      "question": "What surrounds the water of Sentani Lake?",
      "options": [
        "Tall buildings",
        "Green hills",
        "Sandy deserts"
      ],
      "answer": 1
    },
    {
      "question": "What do the fishermen use to catch fish?",
      "options": [
        "Large ships",
        "Wooden boats",
        "Helicopters"
      ],
      "answer": 1
    },
    {
      "question": "What beautiful view do they watch at the end of the day?",
      "options": [
        "The sunrise",
        "The sunset",
        "The heavy rain"
      ],
      "answer": 1
    }
  ]
},
{
  "id": "story-24",
  "title": "Playing the Tifa",
  "category": "Arts & Music",
  "level": "Beginner",
  "grade": "Grade 3-4",
  "cover": "/images/stories/story-24.png",
  "duration": 2,
  "text": [
    "Adelino's father plays a Tifa.",
    "A Tifa is a traditional drum from Papua.",
    "It is made of wood.",
    "He hits the drum with his hands.",
    "The Tifa makes a loud and happy sound.",
    "Adelino and Kevia dance and smile when the Tifa plays."
],
  "vocabulary": [
    {
      "word": "Tifa",
      "meaning": "A traditional wooden drum from Papua",
      "example": "He plays the Tifa."
    },
    {
      "word": "Drum",
      "meaning": "A musical instrument played by beating",
      "example": "I like playing the drum."
    },
    {
      "word": "Hits",
      "meaning": "Beats or strikes with hands",
      "example": "He hits the drum softly."
    },
    {
      "word": "Loud",
      "meaning": "Making a lot of noise",
      "example": "The music is loud."
    },
    {
      "word": "Dance",
      "meaning": "To move your body to music",
      "example": "We dance together."
    }
  ],
  "quiz": [
    {
      "question": "What is a Tifa?",
      "options": [
        "A traditional drum",
        "A traditional dance",
        "A traditional house"
      ],
      "answer": 0
    },
    {
      "question": "How is the Tifa played?",
      "options": [
        "By blowing it",
        "By hitting it with hands",
        "By shaking it"
      ],
      "answer": 1
    },
    {
      "question": "What do Edgar and Kyra do when the Tifa plays?",
      "options": [
        "They sleep",
        "They cry",
        "They dance and smile"
      ],
      "answer": 2
    }
  ]
},
{
  "id": "story-25",
  "title": "Yospan Dance",
  "category": "Arts & Music",
  "level": "Intermediate",
  "grade": "Grade 5-6",
  "cover": "/images/stories/story-25.png",
  "duration": 3,
  "text": [
    "Today is the village festival.",
    "Prince, Elea, Jovanka, and Sylvia dance the Yospan dance together.",
    "Yospan is a traditional dance of friendship.",
    "They wear colorful sashes and feathers on their heads.",
    "They leap and clap their hands happily.",
    "The fast music of Tifa makes everyone feel excited and joyful."
],
  "vocabulary": [
    {
      "word": "Yospan",
      "meaning": "A traditional dance from Papua",
      "example": "Yospan is a joyful dance."
    },
    {
      "word": "Festival",
      "meaning": "A day or period of celebration",
      "example": "We celebrate the festival."
    },
    {
      "word": "Friendship",
      "meaning": "A relationship between friends",
      "example": "This is a dance of friendship."
    },
    {
      "word": "Leap",
      "meaning": "To jump high or forward",
      "example": "We leap and clap during the dance."
    },
    {
      "word": "Clap",
      "meaning": "To strike the palms of hands together",
      "example": "We clap to the beat."
    }
  ],
  "quiz": [
    {
      "question": "What kind of dance is Yospan?",
      "options": [
        "A dance of sadness",
        "A dance of friendship",
        "A slow dance"
      ],
      "answer": 1
    },
    {
      "question": "What do the dancers wear on their heads?",
      "options": [
        "Caps",
        "Feathers",
        "Helmets"
      ],
      "answer": 1
    },
    {
      "question": "How do the dancers move in Yospan?",
      "options": [
        "They sleep",
        "They leap and clap",
        "They run away"
      ],
      "answer": 1
    }
  ]
},
{
  "id": "story-26",
  "title": "My Village in Papua",
  "category": "Daily Life",
  "level": "Beginner",
  "grade": "Grade 1-2",
  "cover": "/images/stories/story-26.png",
  "duration": 2,
  "text": [
    "Welcome to Enzo and Kyra's beautiful village in Papua.",
    "Their village is green and quiet.",
    "They have many round Honai houses.",
    "Behind the houses, there are tall mountains.",
    "Enzo and Kyra play outside under the blue sky.",
    "They love their village very much."
],
  "vocabulary": [
    {
      "word": "Village",
      "meaning": "A small group of houses in the countryside",
      "example": "I live in a small village."
    },
    {
      "word": "Quiet",
      "meaning": "Making very little noise",
      "example": "My village is calm and quiet."
    },
    {
      "word": "Behind",
      "meaning": "At the back of something",
      "example": "The mountains are behind our houses."
    },
    {
      "word": "Mountain",
      "meaning": "A very high hill",
      "example": "The mountains are tall."
    },
    {
      "word": "Outside",
      "meaning": "Not inside a building",
      "example": "We play outside in the sun."
    }
  ],
  "quiz": [
    {
      "question": "How is the village described?",
      "options": [
        "Green and quiet",
        "Loud and busy",
        "Dirty and hot"
      ],
      "answer": 0
    },
    {
      "question": "What is behind the houses?",
      "options": [
        "A river",
        "Tall mountains",
        "A big school"
      ],
      "answer": 1
    },
    {
      "question": "What houses are in the village?",
      "options": [
        "Modern apartments",
        "Round Honai houses",
        "Stone castles"
      ],
      "answer": 1
    }
  ]
}
];
