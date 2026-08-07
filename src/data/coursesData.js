export const COURSES = [
  {
    id: 1,
    title: 'Sustainable Farming Basics',
    description: 'Learn the fundamentals of modern eco-friendly agriculture.',
    lessons: [
      {
        id: 1,
        title: 'Introduction to Sustainability',
        requiredFarmLevel: 1, // You reach this lesson when Farm Level 1 XP is full
        content: [
          { title: "What is Sustainable Farming?", text: "Sustainable farming means growing food in a way that protects the environment, aids public health, and benefits communities." },
          { title: "Why it Matters", text: "Traditional farming can deplete soil and waste water. Sustainable practices ensure we can farm for generations to come." },
          { title: "The Three Pillars", text: "1. Environmental Conservation\n2. Social Equity\n3. Economic Viability" }
        ],
        quiz: [
          { q: "What is the main goal of sustainable farming?", options: ["Maximum short-term profit", "Protecting the environment for future generations", "Using more chemicals", "Depleting soil nutrients"], correct: 1, explanation: "Sustainable farming focuses on long-term environmental health rather than short-term gains." },
          { q: "Which of the following is NOT a pillar of sustainability?", options: ["Environmental Conservation", "Social Equity", "Unlimited Exploitation", "Economic Viability"], correct: 2, explanation: "Exploiting resources goes against the core philosophy of sustainability." },
          { q: "How does sustainable farming benefit communities?", options: ["It provides safe, healthy food", "It pollutes local water", "It bankrupts local farms", "It removes local jobs"], correct: 0, explanation: "Sustainable farming protects public health and provides safer, chemical-free food." },
          { q: "Why is traditional farming sometimes harmful?", options: ["It grows too many plants", "It can deplete soil and waste water", "It creates too many jobs", "It focuses on the long-term"], correct: 1, explanation: "Industrial agriculture often degrades soil health and overuses water resources." },
          { q: "Can sustainable farming be economically viable?", options: ["Yes, it aims to be profitable while protecting nature", "No, it always loses money", "Yes, but only for massive corporations", "No, it's just a hobby"], correct: 0, explanation: "Economic viability is one of the three core pillars of sustainability." }
        ]
      },
      {
        id: 2,
        title: 'The Ecosystem of a Farm',
        requiredFarmLevel: 2,
        content: [
          { title: "The Living Farm", text: "A farm is not just a factory; it's a living ecosystem of plants, animals, insects, and microorganisms." },
          { title: "Biodiversity", text: "Planting different types of crops (polyculture) is better than planting just one (monoculture). It prevents diseases from wiping out the whole farm." },
          { title: "Beneficial Insects", text: "Not all bugs are bad! Ladybugs and bees are essential for pollination and natural pest control." }
        ],
        quiz: [
          { q: "What is biodiversity?", options: ["Having only one crop", "Having many different living things", "Killing all insects", "A type of fertilizer"], correct: 1, explanation: "Biodiversity refers to the variety of life in a particular habitat or ecosystem." },
          { q: "Why is polyculture better than monoculture?", options: ["It looks prettier", "It's easier to harvest", "It prevents a single disease from destroying everything", "It uses more water"], correct: 2, explanation: "Diverse crops prevent diseases from spreading easily across the entire farm." },
          { q: "Are all insects pests?", options: ["Yes, kill them all", "No, many are beneficial like bees and ladybugs", "Only the flying ones are pests", "Only the crawling ones are pests"], correct: 1, explanation: "Bees pollinate crops, and ladybugs eat harmful aphids. They are farmers' friends!" },
          { q: "How should a sustainable farm be viewed?", options: ["As a machine", "As a sterile factory", "As a living ecosystem", "As a temporary project"], correct: 2, explanation: "A sustainable farm works WITH nature as an integrated ecosystem." },
          { q: "What role do bees play?", options: ["They eat crops", "They pollinate plants", "They scare away birds", "They dig up roots"], correct: 1, explanation: "Bees are crucial pollinators that help plants produce fruits and seeds." }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Soil & Crop Management',
    description: 'Learn how to nurture the earth and maximize your yields sustainably.',
    lessons: [
      {
        id: 1,
        title: 'Soil Health',
        requiredFarmLevel: 3,
        content: [
          { title: "The Foundation", text: "Healthy soil equals healthy plants. Soil is alive with billions of bacteria and fungi." },
          { title: "Composting", text: "Recycling organic waste into compost creates a natural, nutrient-rich fertilizer that improves soil structure." },
          { title: "Cover Crops", text: "Planting crops like clover in the off-season prevents soil erosion and adds nitrogen back into the earth." }
        ],
        quiz: [
          { q: "What makes soil healthy?", options: ["Chemical fertilizers", "Billions of living microbes", "Plastic waste", "Pesticides"], correct: 1, explanation: "Soil is a living ecosystem full of beneficial microbes that feed plants." },
          { q: "What is compost?", options: ["Recycled organic waste used as fertilizer", "A type of tractor", "A chemical spray", "A weed"], correct: 0, explanation: "Compost turns food scraps and plant waste into rich, dark fertilizer." },
          { q: "What is the purpose of a cover crop?", options: ["To sell for a high price", "To hide the dirt", "To prevent erosion and add nutrients", "To attract pests"], correct: 2, explanation: "Cover crops protect the soil from washing away and naturally replenish nutrients like nitrogen." },
          { q: "Which of these is a common cover crop?", options: ["Clover", "Plastic tarp", "Concrete", "Roses"], correct: 0, explanation: "Clover is an excellent cover crop that fixes nitrogen in the soil." },
          { q: "Why should you avoid leaving soil bare?", options: ["It gets cold", "It washes or blows away (erosion)", "Weeds can't grow", "It looks messy"], correct: 1, explanation: "Bare soil is highly vulnerable to wind and water erosion." }
        ]
      },
      {
        id: 2,
        title: 'Crop Rotation',
        requiredFarmLevel: 4,
        content: [
          { title: "Don't Repeat", text: "Crop rotation means changing the type of crop grown in a plot each season." },
          { title: "Nutrient Balancing", text: "Corn takes a lot of nitrogen. Beans put nitrogen back. Rotating them keeps the soil balanced." },
          { title: "Pest Cycle Breaking", text: "Pests that love potatoes will die off if you plant wheat there the next year." }
        ],
        quiz: [
          { q: "What is crop rotation?", options: ["Spinning plants in circles", "Changing the crop grown in a plot each season", "Moving the farm to a new location", "Harvesting early"], correct: 1, explanation: "Rotating crops prevents soil depletion and pest buildup." },
          { q: "How does rotating corn and beans help?", options: ["It looks nice", "Corn takes nitrogen, beans replace it", "They taste good together", "It uses the same pests"], correct: 1, explanation: "Legumes like beans fix nitrogen, replenishing what heavy feeders like corn consume." },
          { q: "How does crop rotation affect pests?", options: ["It makes them stronger", "It gives them a steady food source", "It breaks their life cycle", "It turns them into beneficial insects"], correct: 2, explanation: "By removing a pest's preferred food source, their population crashes." },
          { q: "If you plant potatoes in a plot this year, what should you plant next year?", options: ["Potatoes again", "More potatoes", "A different crop like wheat", "Nothing ever again"], correct: 2, explanation: "Planting a different crop prevents potato-specific pests and diseases from establishing." },
          { q: "Why is planting the same crop repeatedly bad?", options: ["It depletes specific nutrients", "It's too easy", "It confuses the farmer", "It makes the plants dizzy"], correct: 0, explanation: "Growing the same crop drains the soil of the specific nutrients that crop needs." }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Water & Pest Management',
    description: 'Discover efficient irrigation and natural pest control.',
    lessons: [
      {
        id: 1,
        title: 'Water Conservation',
        requiredFarmLevel: 5,
        content: [
          { title: "Water is Precious", text: "Agriculture uses 70% of the world's freshwater. Conserving it is critical." },
          { title: "Drip Irrigation", text: "Drip lines deliver water directly to the plant's roots, reducing evaporation and saving massive amounts of water." },
          { title: "Rainwater Harvesting", text: "Collecting rain in barrels or ponds during wet seasons ensures a free, natural water supply during droughts." }
        ],
        quiz: [
          { q: "How much of the world's freshwater is used by agriculture?", options: ["10%", "30%", "70%", "90%"], correct: 2, explanation: "Farming is the largest consumer of freshwater globally." },
          { q: "What is drip irrigation?", options: ["Flooding the entire field", "Delivering water directly to roots", "Spraying water into the air", "Waiting for rain"], correct: 1, explanation: "Drip irrigation minimizes evaporation and puts water exactly where the plant needs it." },
          { q: "Why is drip irrigation better than sprinklers?", options: ["It's louder", "It reduces water lost to evaporation", "It washes the leaves better", "It creates rainbows"], correct: 1, explanation: "Sprinklers lose a lot of water to wind and evaporation before it hits the ground." },
          { q: "What is rainwater harvesting?", options: ["Catching rain in barrels or ponds", "Dancing in the rain", "Making it rain", "Selling rain"], correct: 0, explanation: "Storing rainwater during wet seasons provides a crucial backup during dry spells." },
          { q: "How does water conservation help the farm?", options: ["It makes the soil dusty", "It ensures crop survival during droughts", "It drowns the plants", "It attracts pests"], correct: 1, explanation: "Saving and storing water makes the farm resilient against dry seasons." }
        ]
      },
      {
        id: 2,
        title: 'Integrated Pest Management',
        requiredFarmLevel: 6,
        content: [
          { title: "What is IPM?", text: "Integrated Pest Management uses natural methods first, reserving chemicals only as an absolute last resort." },
          { title: "Biological Control", text: "Introducing natural predators (like ladybugs to eat aphids) solves pest problems without toxic sprays." },
          { title: "Companion Planting", text: "Planting marigolds next to tomatoes naturally repels harmful nematodes and insects." }
        ],
        quiz: [
          { q: "What is the core philosophy of IPM?", options: ["Spray chemicals immediately", "Use natural methods first", "Ignore pests entirely", "Pave the farm"], correct: 1, explanation: "IPM prioritizes biological and cultural controls over chemical pesticides." },
          { q: "What is an example of biological control?", options: ["Using ladybugs to eat aphids", "Using a bug zapper", "Spraying poison", "Building a fence"], correct: 0, explanation: "Biological control uses natural predators to manage pest populations." },
          { q: "What is companion planting?", options: ["Planting crops that mutually benefit each other", "Farming with a friend", "Planting weeds", "Listening to music while farming"], correct: 0, explanation: "Certain plants, like marigolds and tomatoes, naturally protect each other when planted together." },
          { q: "When should chemical pesticides be used in IPM?", options: ["Every day", "As a first resort", "Only as an absolute last resort", "Never"], correct: 2, explanation: "Chemicals are only used when all natural, preventative methods have failed." },
          { q: "How do marigolds help tomatoes?", options: ["They provide shade", "They naturally repel harmful insects", "They share water", "They talk to them"], correct: 1, explanation: "Marigolds release compounds that repel nematodes and other pests." }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Smart Sustainable Agriculture',
    description: 'Merge technology with ecology for the ultimate modern farm.',
    lessons: [
      {
        id: 1,
        title: 'Precision Farming',
        requiredFarmLevel: 7,
        content: [
          { title: "Data-Driven Farming", text: "Using sensors, drones, and AI to monitor crop health and soil moisture exactly." },
          { title: "No Waste", text: "By knowing exactly what a plant needs, we only apply water and nutrients where required, eliminating waste." },
          { title: "Smart Tech", text: "Automated systems can predict weather and adjust irrigation without human intervention." }
        ],
        quiz: [
          { q: "What is precision farming?", options: ["Farming randomly", "Using data and sensors to farm accurately", "Farming with scissors", "Only planting one seed"], correct: 1, explanation: "Precision farming uses technology to optimize every aspect of crop management." },
          { q: "How do sensors help eliminate waste?", options: ["They eat waste", "They tell you exactly what the plant needs", "They scare birds", "They make loud noises"], correct: 1, explanation: "Sensors prevent over-watering and over-fertilizing." },
          { q: "What role can drones play?", options: ["Delivering pizza", "Monitoring crop health from above", "Scaring away clouds", "Harvesting apples"], correct: 1, explanation: "Drones can quickly survey massive fields to spot diseases or dry patches." },
          { q: "What is a benefit of automated irrigation?", options: ["It ignores the weather", "It adjusts based on real-time data", "It runs constantly", "It uses more water"], correct: 1, explanation: "Smart irrigation systems save water by reacting to actual soil moisture and weather forecasts." },
          { q: "Does technology replace the need for sustainable practices?", options: ["Yes, robots do everything", "No, it enhances and optimizes sustainable practices", "Yes, nature is obsolete", "No, technology is bad"], correct: 1, explanation: "Technology is a tool that makes sustainable practices more efficient and effective." }
        ]
      },
      {
        id: 2,
        title: 'Agroforestry & The Future',
        requiredFarmLevel: 8,
        content: [
          { title: "Agroforestry", text: "Integrating trees and shrubs into crop and animal farming systems. Trees provide shade, prevent erosion, and yield fruit/nuts." },
          { title: "Carbon Sequestration", text: "Sustainable farms actually pull carbon out of the atmosphere and lock it in the soil, fighting climate change." },
          { title: "The Ultimate Goal", text: "A farm that produces abundant food while healing the planet, rather than harming it." }
        ],
        quiz: [
          { q: "What is agroforestry?", options: ["Farming only in forests", "Integrating trees into farming systems", "Cutting down forests to farm", "Making wooden tools"], correct: 1, explanation: "Agroforestry combines agriculture and forestry for mutual benefit." },
          { q: "How do trees help a farm?", options: ["They block all sunlight", "They provide shade and prevent erosion", "They eat crops", "They dry out the soil"], correct: 1, explanation: "Tree roots stabilize soil, while their canopy provides micro-climates for crops and animals." },
          { q: "What is carbon sequestration?", options: ["Releasing carbon into the air", "Pulling carbon out of the air and storing it in soil", "Burning coal", "A type of tractor"], correct: 1, explanation: "Healthy, living soil acts as a massive carbon sink, helping to fight climate change." },
          { q: "Can a farm help fight climate change?", options: ["No, farming only pollutes", "Yes, through carbon sequestration and sustainable practices", "Only if it shuts down", "Yes, by burning more fuel"], correct: 1, explanation: "Regenerative agriculture actively heals the planet by storing carbon." },
          { q: "What is the ultimate goal of sustainable agriculture?", options: ["Produce food while healing the planet", "Maximum profit at all costs", "Destroying the ecosystem", "Farming on Mars"], correct: 0, explanation: "The true goal is harmony: abundant food production that regenerates the Earth." }
        ]
      }
    ]
  }
];
