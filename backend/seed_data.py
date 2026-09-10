def student_profile(uid, name, username):
    return {
        "id": uid,
        "name": name,
        "username": username,
        "role": "student",
        "grade": "Grade 4",
        "avatar": f"https://api.dicebear.com/7.x/adventurer/svg?seed={name}",
        "storiesCompleted": 0,
        "readingPractices": 0,
        "avgReading": 0,
        "avgQuiz": 0
    }

CULTURE = [
    {
        "id": "honai",
        "name": "Honai",
        "en": "Honai is a traditional house in Papua. It is round with a grass roof that keeps the family warm inside.",
        "id_text": "Honai adalah rumah adat Papua. Berbentuk bulat dengan atap jerami yang menjaga keluarga tetap hangat di dalamnya.",
        "image": "https://static.prod-images.emergentagent.com/jobs/22cefb94-57bb-4740-925f-65da674e47de/images/c1e66f54d4db6f44b1bc376ad105bcce2b5f1d203673dcd6564c78f2adcf5593.jpeg",
        "story": "story-1"
    },
    {
        "id": "noken",
        "name": "Noken",
        "en": "Noken is a traditional woven bag made from wood fiber or leaves. It is carried on the head or shoulder.",
        "id_text": "Noken adalah tas rajut tradisional yang terbuat dari serat kayu atau dedaunan. Noken dibawa di atas kepala atau bahu.",
        "image": "https://static.prod-images.emergentagent.com/jobs/22cefb94-57bb-4740-925f-65da674e47de/images/a0dc5415c426d82d003c40bccf0fbc4db25f90bcb6e2b924eea955d6901f1ffc.jpeg",
        "story": "story-2"
    },
    {
        "id": "papeda",
        "name": "Papeda",
        "en": "Papeda is a traditional sago porridge. It is soft, sticky, and served with yellow fish soup.",
        "id_text": "Papeda adalah bubur sagu tradisional. Bertekstur lembut, lengket, dan biasanya disajikan dengan kuah ikan kuning.",
        "image": "https://static.prod-images.emergentagent.com/jobs/22cefb94-57bb-4740-925f-65da674e47de/images/d25d2b8b2cd9666fb76b8eb79c335fa6fd9ac8e0d9907148d2f60e85fb6ede12.jpeg",
        "story": "story-5"
    },
    {
        "id": "bird_of_paradise",
        "name": "Bird of Paradise",
        "en": "The Bird of Paradise (Cendrawasih) is a beautiful bird with colorful feathers found in the tropical forests of Papua.",
        "id_text": "Burung Cendrawasih adalah burung yang sangat indah dengan bulu berwarna-warni yang ditemukan di hutan tropis Papua.",
        "image": "https://static.prod-images.emergentagent.com/jobs/22cefb94-57bb-4740-925f-65da674e47de/images/82d27ef8022c37254a10b23a00948376b6b7a2e9301a9f6357600c2692758c9c.jpeg",
        "story": "story-6"
    },
    {
        "id": "tifa",
        "name": "Tifa",
        "en": "Tifa is a traditional Papuan drum made of wood with beautiful carvings and covered with animal skin.",
        "id_text": "Tifa adalah gendang tradisional Papua yang terbuat dari kayu dengan ukiran indah dan dilapisi kulit hewan.",
        "image": "https://static.prod-images.emergentagent.com/jobs/22cefb94-57bb-4740-925f-65da674e47de/images/33a5d55853f5eb34a57f7ae2fc19f9ea7342e2d199f111fd5b686d04efbcd682.jpeg",
        "story": "story-3"
    },
    {
        "id": "sentani_lake",
        "name": "Sentani Lake",
        "en": "Sentani Lake is a large and peaceful lake near Jayapura. It is surrounded by green hills and village communities.",
        "id_text": "Danau Sentani adalah danau besar yang damai di dekat Jayapura. Dikelilingi bukit-bukit hijau dan komunitas desa.",
        "image": "https://static.prod-images.emergentagent.com/jobs/22cefb94-57bb-4740-925f-65da674e47de/images/bad7a933915ecdc240ce7c09c9334942ca55e2caaaeea9694edbeed8fb3545be.jpeg",
        "story": "story-7"
    }
]

STORIES = [
    # LEVEL 1: GRADE 1-2 / BEGINNER
    {
        "id": "story-1",
        "title": "Kiko the Little Cassowary",
        "category": "Animals",
        "level": "Beginner",
        "grade": "Grade 1-2",
        "cover": "/images/stories/story-1.png",
        "duration": 2,
        "text": [
            "Kiko is a little cassowary.",
            "He lives in the Papuan forest.",
            "Kiko has black feathers and strong legs.",
            "Edgar sees Kiko walking under a tall tree.",
            "\"Good morning, Kiko!\" says Edgar.",
            "Kiko finds a sweet red fruit on the ground.",
            "He loves his beautiful forest home."
        ],
        "vocabulary": [
            {"word": "cassowary", "meaning": "A large bird with strong legs", "example": "Kiko is a cassowary."},
            {"word": "forest", "meaning": "A place with many trees", "example": "Animals live in the forest."},
            {"word": "feathers", "meaning": "The soft cover of a bird", "example": "The bird has black feathers."},
            {"word": "legs", "meaning": "Body parts used for walking", "example": "Kiko has strong legs."},
            {"word": "butterfly", "meaning": "A colorful flying insect", "example": "The butterfly flies near the tree."},
            {"word": "fruit", "meaning": "Sweet food growing on plants", "example": "Kiko eats a red fruit."}
        ],
        "quiz": [
            {"question": "Where does Kiko live?", "options": ["In the Papuan forest", "In the ocean", "In a city house"], "answer": 0},
            {"question": "What color are Kiko's feathers?", "options": ["White", "Black", "Yellow"], "answer": 1},
            {"question": "What does Kiko find on the ground?", "options": ["A toy", "A stone", "A sweet red fruit"], "answer": 2}
        ]
    },
    {
        "id": "story-2",
        "title": "My Beautiful Noken",
        "category": "Culture",
        "level": "Beginner",
        "grade": "Grade 1-2",
        "cover": "/images/stories/story-2.png",
        "duration": 2,
        "text": [
            "This is Aldrick's noken.",
            "The noken is woven and very beautiful.",
            "It is colored brown and red.",
            "Aldrick's mother gave it to him.",
            "He puts his English book in his noken.",
            "He also puts his pencil inside.",
            "Aldrick carries his noken to school happily."
        ],
        "vocabulary": [
            {"word": "noken", "meaning": "A traditional woven bag from Papua", "example": "Aldrick carries a noken."},
            {"word": "beautiful", "meaning": "Very nice to look at", "example": "The bag is beautiful."},
            {"word": "brown", "meaning": "A natural earth color", "example": "The noken is brown and red."},
            {"word": "book", "meaning": "Pages bound together for reading", "example": "I put my book in the noken."},
            {"word": "pencil", "meaning": "A tool used for writing", "example": "My pencil is inside the bag."},
            {"word": "carry", "meaning": "To hold and take somewhere", "example": "I carry my bag to school."}
        ],
        "quiz": [
            {"question": "What is this story about?", "options": ["Aldrick's beautiful noken", "A new bicycle", "A football match"], "answer": 0},
            {"question": "Who gave the noken to Aldrick?", "options": ["His teacher", "His mother", "His friend"], "answer": 1},
            {"question": "What does Aldrick put inside his noken?", "options": ["His book and pencil", "A big drum", "A fish"], "answer": 0}
        ]
    },
    {
        "id": "story-3",
        "title": "Tifa Goes Boom Boom",
        "category": "Arts & Music",
        "level": "Beginner",
        "grade": "Grade 1-2",
        "cover": "/images/stories/story-3.png",
        "duration": 2,
        "text": [
            "Edgar holds a wooden tifa drum.",
            "He taps the drum softly with his hands.",
            "Boom, boom, boom! goes the tifa.",
            "Kyra listens to the happy music.",
            "They smile and dance to the rhythm.",
            "Boom, boom, boom! Everyone feels joyful."
        ],
        "vocabulary": [
            {"word": "tifa", "meaning": "A traditional wooden drum from Papua", "example": "Edgar plays the tifa."},
            {"word": "drum", "meaning": "A musical instrument played by beating", "example": "The drum makes a loud sound."},
            {"word": "hands", "meaning": "Body parts at the end of arms", "example": "He taps the drum with his hands."},
            {"word": "rhythm", "meaning": "A regular repeating pattern of sound", "example": "They dance to the rhythm."},
            {"word": "joyful", "meaning": "Feeling very happy", "example": "Everyone feels joyful."}
        ],
        "quiz": [
            {"question": "What instrument does Edgar hold?", "options": ["A guitar", "A wooden tifa drum", "A piano"], "answer": 1},
            {"question": "What sound does the tifa make?", "options": ["Boom, boom, boom!", "Tick, tack, tick!", "Ring, ring, ring!"], "answer": 0},
            {"question": "How do Edgar and Aldrick feel when the tifa plays?", "options": ["Sad", "Sleepy", "Joyful and happy"], "answer": 2}
        ]
    },
    {
        "id": "story-4",
        "title": "Good Morning from Papua",
        "category": "Daily Life",
        "level": "Beginner",
        "grade": "Grade 1-2",
        "cover": "/images/stories/story-4.png",
        "duration": 2,
        "text": [
            "Good morning from Papua!",
            "The bright sun rises over the green hills.",
            "Edgar hears birds singing in the trees.",
            "\"Good morning, family!\" says Aldrick.",
            "They eat warm breakfast together.",
            "Now, Edgar, Kyra, and Sylvia walk to school happily."
        ],
        "vocabulary": [
            {"word": "sunrise", "meaning": "The time when the sun comes up", "example": "The sunrise lights the sky."},
            {"word": "hills", "meaning": "Raised areas of land", "example": "Green hills surround the village."},
            {"word": "family", "meaning": "Parents and children together", "example": "I love my family."},
            {"word": "breakfast", "meaning": "The first meal of the day", "example": "We eat breakfast in the morning."},
            {"word": "school", "meaning": "A place where children learn", "example": "We walk to school together."}
        ],
        "quiz": [
            {"question": "What rises over the green hills?", "options": ["The bright sun", "The moon", "Dark clouds"], "answer": 0},
            {"question": "Who do Edgar and Aldrick greet in the morning?", "options": ["A police officer", "Their family", "A shopkeeper"], "answer": 1},
            {"question": "Where do Edgar and Aldrick walk after breakfast?", "options": ["To the market", "To the river", "To school"], "answer": 2}
        ]
    },
    {
        "id": "story-5",
        "title": "Papeda for Lunch",
        "category": "Food",
        "level": "Beginner",
        "grade": "Grade 1-2",
        "cover": "/images/stories/story-5.png",
        "duration": 2,
        "text": [
            "Today, Edgar's family enjoys papeda for lunch.",
            "Papeda is made from sago starch.",
            "It is soft and sticky.",
            "Sylvia dips papeda into yellow fish soup.",
            "\"This soup is so delicious!\" says Aldrick.",
            "Eating together makes the family happy."
        ],
        "vocabulary": [
            {"word": "papeda", "meaning": "A traditional sago dish from Papua", "example": "Papeda is served warm."},
            {"word": "sago", "meaning": "Starch made from sago palms", "example": "Papeda comes from sago."},
            {"word": "sticky", "meaning": "Soft and clinging", "example": "Papeda is soft and sticky."},
            {"word": "soup", "meaning": "A warm liquid food with fish", "example": "The yellow soup is warm."},
            {"word": "delicious", "meaning": "Tasting very good", "example": "The fish soup is delicious."}
        ],
        "quiz": [
            {"question": "What food does Edgar's family enjoy for lunch?", "options": ["Papeda", "Fried noodles", "Pizza"], "answer": 0},
            {"question": "What is papeda made from?", "options": ["Wheat flour", "Sago starch", "Corn meal"], "answer": 1},
            {"question": "What kind of soup does Aldrick dip papeda into?", "options": ["Mushroom soup", "Tomato soup", "Yellow fish soup"], "answer": 2}
        ]
    },
    {
        "id": "story-6",
        "title": "The Colorful Bird",
        "category": "Animals",
        "level": "Beginner",
        "grade": "Grade 1-2",
        "cover": "/images/stories/story-6.png",
        "duration": 2,
        "text": [
            "Kyra sees a bird high up in a tree.",
            "It is a colorful Bird of Paradise.",
            "The bird has bright yellow and blue feathers.",
            "It spreads its wings gracefully.",
            "\"Look, Edgar! It is so beautiful!\" whispers Aldrick.",
            "The bird flies quietly across the Papuan forest."
        ],
        "vocabulary": [
            {"word": "bird", "meaning": "A feathered creature with wings", "example": "The bird flies in the sky."},
            {"word": "wings", "meaning": "Body parts used for flying", "example": "The bird spreads its wings."},
            {"word": "feathers", "meaning": "Soft covering on a bird", "example": "The feathers are yellow and blue."},
            {"word": "tree", "meaning": "A tall plant with a wooden trunk", "example": "The bird perches on a tree."},
            {"word": "forest", "meaning": "A large wood filled with trees", "example": "The forest is green."},
            {"word": "beautiful", "meaning": "Lovely and pleasing to see", "example": "The Bird of Paradise is beautiful."}
        ],
        "quiz": [
            {"question": "Where is the bird sitting?", "options": ["On the ground", "High up in a tree", "In a boat"], "answer": 1},
            {"question": "What kind of bird does Aldrick see?", "options": ["Bird of Paradise", "Duck", "Penguin"], "answer": 0},
            {"question": "How does the bird fly across the forest?", "options": ["Loudly", "Slowly", "Quietly"], "answer": 2}
        ]
    },

    # LEVEL 2: GRADE 3-4 / ELEMENTARY
    {
        "id": "story-7",
        "title": "A Boat on Sentani Lake",
        "category": "Nature",
        "level": "Intermediate",
        "grade": "Grade 3-4",
        "cover": "/images/stories/story-7.png",
        "duration": 3,
        "text": [
            "It is a beautiful morning at Sentani Lake.",
            "Edgar goes to the lake with his father and Aldrick.",
            "The water is calm and the sky is bright blue.",
            "\"Look, Dad! There are small fish swimming near the boat!\" says Edgar.",
            "They step carefully into a wooden canoe.",
            "His father slowly rows the boat across the water.",
            "Aldrick points to the green hills surrounding the lake.",
            "\"This lake is so peaceful,\" says Aldrick.",
            "\"Yes,\" answers Edgar's father. \"We must keep our lake clean.\"",
            "Edgar and Aldrick smile, wanting Sentani Lake to stay beautiful forever."
        ],
        "vocabulary": [
            {"word": "lake", "meaning": "A large body of water surrounded by land", "example": "Sentani Lake is peaceful."},
            {"word": "boat", "meaning": "A small vessel for travelling on water", "example": "They row a wooden boat."},
            {"word": "fish", "meaning": "Animals that live and swim in water", "example": "Small fish swim in the lake."},
            {"word": "hills", "meaning": "Raised land smaller than mountains", "example": "Green hills surround the water."},
            {"word": "clean", "meaning": "Free from dirt or trash", "example": "We must keep the water clean."},
            {"word": "water", "meaning": "Clear liquid in lakes and rivers", "example": "The water is calm and clear."},
            {"word": "peaceful", "meaning": "Quiet, calm, and undisturbed", "example": "The morning lake is peaceful."}
        ],
        "quiz": [
            {"question": "Who goes to Sentani Lake?", "options": ["Edgar, his father, and Aldrick", "Only Edgar", "A doctor and a pilot"], "answer": 0},
            {"question": "What do they travel in across the lake?", "options": ["A big ship", "A wooden boat", "A surfboard"], "answer": 1},
            {"question": "What surrounds Sentani Lake?", "options": ["Tall skyscrapers", "Desert sand", "Green hills"], "answer": 2},
            {"question": "Why does Edgar's father say we must care for the lake?", "options": ["To keep it clean and beautiful", "To catch all the birds", "To sell the water"], "answer": 0}
        ]
    },
    {
        "id": "story-8",
        "title": "Kyra and the Red Fruit",
        "category": "Food",
        "level": "Intermediate",
        "grade": "Grade 3-4",
        "cover": "/images/stories/story-8.png",
        "duration": 3,
        "text": [
            "Kyra and Edgar walk through the garden with their uncle.",
            "They spot a long red fruit hanging from a tall plant.",
            "\"That is Buah Merah, a special fruit from Papua,\" explains Uncle.",
            "Sylvia comes closer to observe its unique shape.",
            "The fruit has a deep red color and bumpy skin.",
            "Their family uses Buah Merah in traditional cooking.",
            "\"Nature gives us so many wonderful plants,\" says Kyra.",
            "Edgar agrees and helps harvest vegetables for dinner."
        ],
        "vocabulary": [
            {"word": "garden", "meaning": "Ground used for growing plants", "example": "Vegetables grow in the garden."},
            {"word": "fruit", "meaning": "Edible part of a plant containing seeds", "example": "Buah Merah is a special fruit."},
            {"word": "unique", "meaning": "Special and one of a kind", "example": "The fruit has a unique shape."},
            {"word": "observe", "meaning": "To watch carefully", "example": "Sylvia observes the plant."},
            {"word": "harvest", "meaning": "To gather ripe crops or fruits", "example": "They harvest vegetables."},
            {"word": "traditional", "meaning": "Belonging to long-standing customs", "example": "They use traditional cooking."}
        ],
        "quiz": [
            {"question": "What special fruit do Kyra and Edgar see in the garden?", "options": ["Buah Merah", "An apple", "A strawberry"], "answer": 0},
            {"question": "What color is Buah Merah?", "options": ["Bright green", "Deep red", "Dark purple"], "answer": 1},
            {"question": "Who explains about Buah Merah?", "options": ["A teacher", "A police officer", "Their uncle"], "answer": 2},
            {"question": "What does Kyra learn about nature?", "options": ["Nature gives many wonderful plants", "Plants do not need water", "Gardens are dark"], "answer": 0}
        ]
    },
    {
        "id": "story-9",
        "title": "Sago for Grandmother",
        "category": "Food",
        "level": "Intermediate",
        "grade": "Grade 3-4",
        "cover": "/images/stories/story-9.png",
        "duration": 3,
        "text": [
            "Edgar wants to make a warm dish for his grandmother.",
            "First, he gets fresh sago flour from the wooden box.",
            "Next, Aldrick helps him boil clean water in a pot.",
            "Then, Edgar stirs the sago slowly until it turns clear and soft.",
            "Finally, Grandmother pours hot yellow fish soup over the papeda.",
            "\"Thank you, Edgar and Aldrick! You are helpful grandsons,\" says Grandmother.",
            "They all sit together in the Honai and enjoy their meal."
        ],
        "vocabulary": [
            {"word": "sago", "meaning": "Starch extracted from sago palms", "example": "Sago flour is kept in a box."},
            {"word": "flour", "meaning": "Powdered starch used in cooking", "example": "Edgar gets the sago flour."},
            {"word": "stir", "meaning": "To mix using a spoon", "example": "He stirs the sago slowly."},
            {"word": "helpful", "meaning": "Giving assistance and care", "example": "The boys are very helpful."},
            {"word": "dish", "meaning": "Food prepared for a meal", "example": "They prepare a warm dish."},
            {"word": "meal", "meaning": "Food eaten at one time", "example": "They enjoy their meal together."}
        ],
        "quiz": [
            {"question": "What does Edgar want to make for his grandmother?", "options": ["A chocolate cake", "A sago dish", "Fried rice"], "answer": 1},
            {"question": "What step happens first in making the dish?", "options": ["Edgar gets sago flour", "They clean the fish", "They go to sleep"], "answer": 0},
            {"question": "How does Aldrick help in the kitchen?", "options": ["He sets the table", "He buys bread", "He helps boil clean water"], "answer": 2},
            {"question": "What sequence word describes the last step?", "options": ["Finally", "First", "Never"], "answer": 0}
        ]
    },
    {
        "id": "story-10",
        "title": "My Day at Hamadi Market",
        "category": "Daily Life",
        "level": "Intermediate",
        "grade": "Grade 3-4",
        "cover": "/images/stories/story-10.png",
        "duration": 3,
        "text": [
            "On Saturday morning, Sylvia visits Hamadi Market in Jayapura with her aunt.",
            "The market is busy and full of bright colors.",
            "Friendly sellers display fresh fish, green vegetables, and sweet bananas.",
            "Sylvia carries a large woven noken bag on her shoulder.",
            "\"Hello, young man! Would you like fresh pineapples?\" asks a smiling seller.",
            "\"Yes, please! We will buy three pineapples,\" replies Aldrick politely.",
            "Her aunt buys sweet potatoes and fresh fish for dinner.",
            "Sylvia enjoys seeing the community work together at the market."
        ],
        "vocabulary": [
            {"word": "market", "meaning": "A place where goods are bought and sold", "example": "Hamadi Market is busy."},
            {"word": "seller", "meaning": "A person who sells items", "example": "The seller offers pineapples."},
            {"word": "vegetables", "meaning": "Plants used as food", "example": "They buy fresh green vegetables."},
            {"word": "pineapple", "meaning": "A sweet tropical fruit", "example": "They buy three pineapples."},
            {"word": "politely", "meaning": "In a respectful manner", "example": "Aldrick replies politely."},
            {"word": "community", "meaning": "A group of people living together", "example": "The market brings the community together."},
            {"word": "display", "meaning": "To show goods clearly", "example": "Sellers display fresh produce."}
        ],
        "quiz": [
            {"question": "Where does Aldrick go on Saturday morning?", "options": ["Hamadi Market in Jayapura", "A sports stadium", "A library"], "answer": 0},
            {"question": "What does Aldrick carry on his shoulder?", "options": ["A heavy trunk", "A woven noken bag", "A guitar case"], "answer": 1},
            {"question": "What fruit does Aldrick buy from the seller?", "options": ["Apples", "Grapes", "Pineapples"], "answer": 2},
            {"question": "How does Aldrick feel about the market visit?", "options": ["He enjoys seeing the community work together", "He feels bored", "He gets lost"], "answer": 0}
        ]
    },
    {
        "id": "story-11",
        "title": "The Little Bird in the Forest",
        "category": "Animals",
        "level": "Intermediate",
        "grade": "Grade 3-4",
        "cover": "/images/stories/story-11.png",
        "duration": 3,
        "text": [
            "Edgar walks quietly through the tall forest trees.",
            "He carries a small notebook to draw wild animals.",
            "Suddenly, he hears a soft chirping sound above a fern branch.",
            "Edgar stops walking and stays very still.",
            "A tiny colorful bird with a long tail perches on a branch.",
            "Aldrick joins him and whispers, \"We should watch quietly without disturbing it.\"",
            "Edgar draws the bird carefully in his notebook.",
            "The little bird chirps happily and flies deeper into the green forest."
        ],
        "vocabulary": [
            {"word": "quietly", "meaning": "With little or no noise", "example": "Edgar walks quietly."},
            {"word": "notebook", "meaning": "A book of paper for drawing or writing", "example": "He carries a small notebook."},
            {"word": "chirping", "meaning": "Short high-pitched sounds of a bird", "example": "He hears chirping sounds."},
            {"word": "perches", "meaning": "Sits or rests on a branch", "example": "The bird perches on a tree."},
            {"word": "disturbing", "meaning": "Bothering or interrupting animals", "example": "Watch without disturbing animals."},
            {"word": "branch", "meaning": "A wooden part growing from a tree", "example": "The bird perches on a branch."}
        ],
        "quiz": [
            {"question": "Why does Edgar carry a notebook in the forest?", "options": ["To write math homework", "To draw wild animals", "To read comics"], "answer": 1},
            {"question": "What sound does Edgar hear?", "options": ["A soft chirping sound", "Loud thunder", "A barking dog"], "answer": 0},
            {"question": "What advice does Aldrick give about wild birds?", "options": ["Catch the bird", "Watch quietly without disturbing it", "Shout loudly"], "answer": 2},
            {"question": "What does the bird do after perching?", "options": ["Chirps happily and flies into the forest", "Falls asleep on the grass", "Swims in the lake"], "answer": 0}
        ]
    },
    {
        "id": "story-12",
        "title": "Playing Football by the Sea",
        "category": "Daily Life",
        "level": "Intermediate",
        "grade": "Grade 3-4",
        "cover": "/images/stories/story-12.png",
        "duration": 3,
        "text": [
            "The afternoon sun shines over the sandy beach.",
            "Edgar and Aldrick meet their friends after school to play football.",
            "They set up two wooden posts as goals on the sand.",
            "\"Pass the ball to me, Edgar!\" shouts Aldrick with excitement.",
            "Edgar kicks the ball smoothly across the shore.",
            "The waves splash gently against the sand as the boys run and score.",
            "Everyone cheers and high-fives each other.",
            "Playing sports together builds strong friendship and teamwork."
        ],
        "vocabulary": [
            {"word": "beach", "meaning": "A sandy shore by the ocean", "example": "The sun shines on the beach."},
            {"word": "football", "meaning": "A game played by kicking a round ball", "example": "They play football together."},
            {"word": "excitement", "meaning": "Great enthusiasm and happiness", "example": "Aldrick shouts with excitement."},
            {"word": "shore", "meaning": "Land along the edge of the sea", "example": "He kicks the ball along the shore."},
            {"word": "teamwork", "meaning": "Working together effectively as a group", "example": "Sports build great teamwork."},
            {"word": "sports", "meaning": "Physical games played for fun", "example": "Playing sports keeps us active."}
        ],
        "quiz": [
            {"question": "Where do Edgar and Aldrick play football?", "options": ["On the sandy beach", "Inside a Honai", "In a classroom"], "answer": 0},
            {"question": "What do the boys use as goal posts?", "options": ["Metal gates", "Wooden posts on the sand", "School desks"], "answer": 1},
            {"question": "What sound accompanies their game near the shore?", "options": ["City traffic noise", "Heavy rain", "Waves splashing gently"], "answer": 2},
            {"question": "What lesson is learned from playing sports together?", "options": ["Teamwork and strong friendship", "How to win money", "How to fight"], "answer": 0}
        ]
    },

    # LEVEL 3: GRADE 5-6 / INTERMEDIATE
    {
        "id": "story-13",
        "title": "The Noken from Grandmother",
        "category": "Culture",
        "level": "Advanced",
        "grade": "Grade 5-6",
        "cover": "/images/stories/story-13.png",
        "duration": 4,
        "text": [
            "On a peaceful Sunday afternoon, Sylvia sits with her grandmother outside their Honai.",
            "Grandmother holds a beautiful woven noken with delicate patterns.",
            "\"Grandmother, how long did it take to weave this noken?\" asks Aldrick curiously.",
            "\"It took many days of patience, my child,\" replies Grandmother with a warm smile.",
            "\"I selected strong bark fibers from the forest and dyed them using natural plant leaves.\"",
            "She hands the noken to Sylvia, who touches the carefully braided handles.",
            "\"Handmade objects carry our family's hard work, care, and memories,\" Grandmother explains.",
            "Edgar joins them and listens intently to the story behind each woven pattern.",
            "Sylvia promises to treasure the noken and pass down these valuable stories."
        ],
        "vocabulary": [
            {"word": "delicate", "meaning": "Finely detailed and carefully crafted", "example": "The noken has delicate patterns."},
            {"word": "patience", "meaning": "The ability to wait or work without getting upset", "example": "Weaving requires great patience."},
            {"word": "fiber", "meaning": "Plant thread used for weaving", "example": "Bark fibers make strong bags."},
            {"word": "braided", "meaning": "Intertwined pattern of strands", "example": "The handles are braided neatly."},
            {"word": "memories", "meaning": "Recollections of past experiences", "example": "The noken carries family memories."},
            {"word": "intent", "meaning": "Paying close and eager attention", "example": "Edgar listens with intent."},
            {"word": "treasure", "meaning": "To value highly and protect", "example": "Aldrick promises to treasure the gift."}
        ],
        "quiz": [
            {"question": "Who gives the special noken to Aldrick?", "options": ["His grandmother", "His teacher", "A shopkeeper"], "answer": 0},
            {"question": "What materials were used to make the noken?", "options": ["Plastic strings", "Bark fibers and natural plant dyes", "Steel wires"], "answer": 1},
            {"question": "What do handmade objects carry according to Grandmother?", "options": ["Heavy rocks", "Hard work, care, and family memories", "Secret maps"], "answer": 2},
            {"question": "Who joins Aldrick to listen to Grandmother's story?", "options": ["Edgar", "A police officer", "A fisherman"], "answer": 0},
            {"question": "What promise does Aldrick make at the end of the story?", "options": ["To sell the noken", "To treasure the noken and share its stories", "To throw it away"], "answer": 1}
        ]
    },
    {
        "id": "story-14",
        "title": "A Morning at Sentani Lake",
        "category": "Environment",
        "level": "Advanced",
        "grade": "Grade 5-6",
        "cover": "/images/stories/story-14.png",
        "duration": 4,
        "text": [
            "As dawn breaks over Sentani Lake, golden sunlight illuminates the mist above the calm water.",
            "Edgar and Aldrick wake up early to help their community clean the lakeside shore.",
            "Green tropical hills reflect clearly on the glass-like surface of the lake.",
            "Local fishermen row traditional canoes toward the center of the lake to begin their day.",
            "\"If plastic trash enters the water, it harms the fish and plants,\" explains Edgar.",
            "Together with their classmates, they pick up stray plastic bottles and food wrappers.",
            "\"Keeping nature clean protects our lake for generations to come,\" says Aldrick thoughtfully.",
            "By mid-morning, the lakeside is spotless, and birds sing happily in the nearby trees.",
            "Both boys feel proud that their small effort helps preserve Papua's natural environment."
        ],
        "vocabulary": [
            {"word": "illuminates", "meaning": "Lights up and brightens", "example": "Sunlight illuminates the lake."},
            {"word": "mist", "meaning": "A thin cloud of tiny water droplets", "example": "Mist hangs over the water."},
            {"word": "surface", "meaning": "The top layer of water or land", "example": "Hills reflect on the lake surface."},
            {"word": "harms", "meaning": "Causes damage or hurt", "example": "Plastic trash harms aquatic life."},
            {"word": "generations", "meaning": "Groups of people born in successive eras", "example": "We protect the lake for future generations."},
            {"word": "effort", "meaning": "Determined work to achieve a goal", "example": "Their cleaning effort makes a difference."},
            {"word": "preserve", "meaning": "To protect and keep in good condition", "example": "We preserve Papua's clean environment."}
        ],
        "quiz": [
            {"question": "What time of day does the story take place?", "options": ["Early morning at dawning sunlight", "Late at midnight", "In the middle of the night"], "answer": 0},
            {"question": "What activity do Edgar and Aldrick do by the lake?", "options": ["Build a hotel", "Clean the lakeside shore with classmates", "Swim across the sea"], "answer": 1},
            {"question": "Why is plastic trash dangerous for the lake?", "options": ["It makes the boat go faster", "It attracts big ships", "It harms fish and aquatic plants"], "answer": 2},
            {"question": "What reflects on the surface of the lake?", "options": ["Green tropical hills", "Tall neon lights", "Airplane wings"], "answer": 0},
            {"question": "How do the boys feel after cleaning the lakeside?", "options": ["Angry and tired", "Proud to protect the environment", "Bored"], "answer": 1}
        ]
    },
    {
        "id": "story-15",
        "title": "The Forest Is Our Home",
        "category": "Environment",
        "level": "Advanced",
        "grade": "Grade 5-6",
        "cover": "/images/stories/story-15.png",
        "duration": 4,
        "text": [
            "The rainforests of Papua are home to thousands of unique plants and wild animals.",
            "During an outdoor science class, Edgar and Aldrick walk along a shaded forest trail.",
            "Their teacher points to tall ironwood trees that have grown for over fifty years.",
            "\"Trees absorb rainwater, prevent soil erosion, and provide fresh air,\" explains Teacher.",
            "Overhead, colorful lorikeets and cassowaries rely on forest fruits for their daily food.",
            "\"When we protect the forest, we protect clean water and air for everyone,\" says Aldrick.",
            "Edgar writes down observations in his science journal to share with his school.",
            "The students learn that taking care of nature is a shared responsibility for all.",
            "They leave the forest with a renewed commitment to plant new trees at school."
        ],
        "vocabulary": [
            {"word": "rainforest", "meaning": "A dense tropical forest rich in plant and animal life", "example": "Papua has vast rainforests."},
            {"word": "absorb", "meaning": "To soak up liquid or moisture", "example": "Trees absorb rainwater."},
            {"word": "erosion", "meaning": "The gradual wearing away of soil by wind or water", "example": "Roots prevent soil erosion."},
            {"word": "rely", "meaning": "To depend on for support or food", "example": "Birds rely on forest fruits."},
            {"word": "responsibility", "meaning": "A duty or obligation to care for something", "example": "Caring for nature is a shared responsibility."},
            {"word": "commitment", "meaning": "A pledge or promise to do something", "example": "They make a commitment to plant trees."}
        ],
        "quiz": [
            {"question": "What do Papuan rainforests provide for wild animals?", "options": ["A safe home with food and clean water", "No food", "Dark cages"], "answer": 0},
            {"question": "What benefits do tall trees provide according to the teacher?", "options": ["They make noise", "Absorb rainwater, prevent erosion, and provide fresh air", "They block rain completely"], "answer": 1},
            {"question": "What birds do the students observe overhead?", "options": ["Sea gulls", "Pigeons", "Colorful lorikeets and cassowaries"], "answer": 2},
            {"question": "Who is responsible for taking care of nature?", "options": ["Everyone in the community", "Only scientists", "Nobody"], "answer": 0},
            {"question": "What project do Edgar and Aldrick plan to start at school?", "options": ["Building a road", "Planting new trees", "Cutting down branches"], "answer": 1}
        ]
    },
    {
        "id": "story-16",
        "title": "Festival by the Lake",
        "category": "Culture",
        "level": "Advanced",
        "grade": "Grade 5-6",
        "cover": "/images/stories/story-16.png",
        "duration": 4,
        "text": [
            "Every year, the community gathers at Sentani Lake for a vibrant cultural festival.",
            "Edgar and Aldrick dress in traditional woven sashes and colorful headbands.",
            "The sound of tifa drums fills the air with rhythmic and energetic beats.",
            "Dancers perform the Yospan dance, leaping gracefully to the beat of the music.",
            "\"Look at the colorful decorations on the wooden boats!\" exclaims Aldrick happily.",
            "Families share traditional dishes like papeda, grilled fish, and fresh fruits.",
            "People from different villages sing songs of friendship, unity, and celebration.",
            "Edgar takes photographs to document the joyful cultural traditions.",
            "The festival reminds everyone that cultural arts bring people together in harmony."
        ],
        "vocabulary": [
            {"word": "vibrant", "meaning": "Full of energy, excitement, and bright colors", "example": "The festival is vibrant."},
            {"word": "rhythmic", "meaning": "Having a regular repeating beat", "example": "Tifa drums produce rhythmic beats."},
            {"word": "perform", "meaning": "To present dance or music to an audience", "example": "Dancers perform Yospan."},
            {"word": "unity", "meaning": "The state of being joined together in harmony", "example": "They sing songs of unity."},
            {"word": "document", "meaning": "To record events in photos or writing", "example": "Edgar takes photos to document the festival."},
            {"word": "harmony", "meaning": "Peaceful agreement and togetherness", "example": "Arts bring people together in harmony."}
        ],
        "quiz": [
            {"question": "Where does the annual cultural festival take place?", "options": ["Around Sentani Lake", "In an underground cave", "At a train station"], "answer": 0},
            {"question": "What instrument creates rhythmic beats during the festival?", "options": ["Violin", "Tifa drums", "Flute"], "answer": 1},
            {"question": "What traditional dance do the performers dance?", "options": ["Ballet", "Tap dance", "Yospan dance"], "answer": 2},
            {"question": "What values are celebrated through the festival songs?", "options": ["Friendship, unity, and celebration", "Anger and fighting", "Speed racing"], "answer": 0},
            {"question": "What main message does the festival teach the boys?", "options": ["Festivals are noisy", "Cultural arts bring people together in harmony", "Dancing is difficult"], "answer": 1}
        ]
    },
    {
        "id": "story-17",
        "title": "A Visit to the Papua Museum",
        "category": "Daily Life",
        "level": "Advanced",
        "grade": "Grade 5-6",
        "cover": "/images/stories/story-17.png",
        "duration": 4,
        "text": [
            "Today, Edgar and Aldrick join a school field trip to the Papua Museum in Jayapura.",
            "Inside the exhibition hall, they view historical wood carvings, woven nokens, and tifa drums.",
            "A museum guide explains that Papua has hundreds of distinct languages and local traditions.",
            "\"Each region has its own unique arts, stories, and environmental wisdom,\" says the guide.",
            "Aldrick examines an ancient map showing coastal villages, highland valleys, and islands.",
            "Edgar takes notes on how historical items were crafted using natural materials.",
            "\"Diversity makes our homeland rich and special,\" remarks Edgar to his classmate.",
            "Before leaving, the students record short audio summaries of their favorite museum exhibits.",
            "They return to school inspired to learn more about the diverse heritage of Indonesia."
        ],
        "vocabulary": [
            {"word": "museum", "meaning": "A place where historical or cultural items are kept", "example": "They visit the Papua Museum."},
            {"word": "exhibition", "meaning": "A public display of art or historical items", "example": "They see items in the exhibition hall."},
            {"word": "distinct", "meaning": "Recognizably different and unique", "example": "Papua has distinct languages."},
            {"word": "wisdom", "meaning": "Knowledge gained through long experience", "example": "They learn environmental wisdom."},
            {"word": "examine", "meaning": "To inspect or look at closely", "example": "Aldrick examines an ancient map."},
            {"word": "diversity", "meaning": "A wide variety of different cultures and things", "example": "Diversity makes our homeland rich."}
        ],
        "quiz": [
            {"question": "Where do Edgar and Aldrick go for their school field trip?", "options": ["The Papua Museum in Jayapura", "A cinema", "An amusement park"], "answer": 0},
            {"question": "What items do the students view inside the exhibition hall?", "options": ["Space rockets", "Wood carvings, woven nokens, and tifa drums", "Automobiles"], "answer": 1},
            {"question": "What does the museum guide explain about Papua?", "options": ["Papua has no history", "Papua has only one song", "Papua has hundreds of distinct languages and traditions"], "answer": 2},
            {"question": "What does Edgar realize about diversity?", "options": ["Diversity makes their homeland rich and special", "Diversity causes confusion", "Diversity is scary"], "answer": 0},
            {"question": "What do students record before leaving the museum?", "options": ["Video games", "Audio summaries of their favorite exhibits", "Music singles"], "answer": 1}
        ]
    },
    {
        "id": "story-18",
        "title": "Our Beautiful Papua",
        "category": "Nature",
        "level": "Advanced",
        "grade": "Grade 5-6",
        "cover": "/images/stories/story-18.png",
        "duration": 4,
        "text": [
            "From tall green mountains to clear blue seas, Papua is a land of wonder and beauty.",
            "Edgar and Aldrick stand on a high hill overlooking Sentani Lake as the sun warms the morning air.",
            "They remember all the stories they have read: Kiko the Cassowary, Honai houses, Nokens, and Tifa drums.",
            "\"We learn English so we can share the stories of our home with the world,\" says Edgar.",
            "Aldrick nods happily and adds, \"Reading Aloud helps us speak with confidence and joy.\"",
            "Children across Papua read, listen, and practice together in friendship.",
            "They respect the forests, lakes, animals, and rich cultural traditions surrounding them.",
            "Papua is our home: we learn from it, care for it, and share its stories with everyone."
        ],
        "vocabulary": [
            {"word": "wonder", "meaning": "A feeling of amazement caused by something beautiful", "example": "Papua is a land of wonder."},
            {"word": "confidence", "meaning": "A feeling of self-assurance in speaking", "example": "Reading Aloud builds confidence."},
            {"word": "respect", "meaning": "Care and regard for traditions and nature", "example": "We respect our forests and lakes."},
            {"word": "share", "meaning": "To communicate or give to others", "example": "We share our stories with the world."},
            {"word": "surrounding", "meaning": "Located all around a place", "example": "Green hills surrounding the lake."},
            {"word": "traditions", "meaning": "Customs passed down through generations", "example": "We cherish rich cultural traditions."}
        ],
        "quiz": [
            {"question": "What landscapes make Papua a land of wonder?", "options": ["Tall green mountains, clear blue seas, and lakes", "Only dry sand", "Concrete roads only"], "answer": 0},
            {"question": "Where are Edgar and Aldrick standing at the beginning of the story?", "options": ["On a high hill overlooking Sentani Lake", "Inside a submarine", "In a basement"], "answer": 1},
            {"question": "Why does Edgar say they learn English?", "options": ["To forget their home", "To buy toys", "To share the stories of their home with the world"], "answer": 2},
            {"question": "What benefit does Reading Aloud give according to Aldrick?", "options": ["Helps speak with confidence and joy", "Makes you tired", "Is boring"], "answer": 0},
            {"question": "What is the final message of the story?", "options": ["Leave the forest alone", "Papua is our home: we learn from it, care for it, and share its stories", "Do not read books"], "answer": 1}
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
        "Today, Edgar and Aldrick visit Sentani Lake.",
        "The lake is big and very peaceful.",
        "Green hills surround the clear water.",
        "They see children playing happily near the water.",
        "Fishermen row wooden boats to catch fish.",
        "They enjoy the cool wind and watch the beautiful sunset over the mountains."
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
        "Edgar's father plays a Tifa.",
        "A Tifa is a traditional drum from Papua.",
        "It is made of wood.",
        "He hits the drum with his hands.",
        "The Tifa makes a loud and happy sound.",
        "Edgar and Kyra dance and smile when the Tifa plays."
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
        "Edgar, Aldrick, Kyra, and Sylvia dance the Yospan dance together.",
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
        "Welcome to Edgar and Kyra's beautiful village in Papua.",
        "Their village is green and quiet.",
        "They have many round Honai houses.",
        "Behind the houses, there are tall mountains.",
        "Edgar and Kyra play outside under the blue sky.",
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
]
