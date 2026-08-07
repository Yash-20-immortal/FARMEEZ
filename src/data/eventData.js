export const FARMING_EVENTS = {
  pest_attack: {
    id: 'pest_attack',
    title: 'Pest Attack!',
    description: 'A swarm of pests has descended upon your crops! They are rapidly damaging your plants.',
    icon: '🐛',
    color: 'bg-red-500',
    allowedSeasons: ['spring', 'summer', 'autumn'],
    choices: [
      {
        id: 'chemical',
        text: 'Use Chemical Pesticides',
        cost: 10,
        ecoChange: -10,
        takeaway: 'Chemical pesticides are cheap and fast, but they harm the soil microbiome and reduce your long-term Eco Score.'
      },
      {
        id: 'organic',
        text: 'Introduce Ladybugs (Organic)',
        cost: 30,
        ecoChange: +10,
        takeaway: 'Using natural predators like Ladybugs is an Integrated Pest Management (IPM) strategy. It protects your crops and boosts your Eco Score!'
      },
      {
        id: 'ignore',
        text: 'Do Nothing',
        cost: 0,
        ecoChange: -5,
        takeaway: 'Ignoring pests leads to crop loss and indicates poor farm management, lowering your Eco Score.'
      }
    ]
  },
  heavy_rain: {
    id: 'heavy_rain',
    title: 'Heavy Rain',
    description: 'A sudden downpour threatens to wash away your topsoil and flood your crops.',
    icon: '🌧',
    color: 'bg-blue-500',
    allowedSeasons: ['spring', 'summer', 'autumn'],
    choices: [
      {
        id: 'drainage',
        text: 'Dig Drainage Trenches',
        cost: 20,
        ecoChange: +5,
        takeaway: 'Proper drainage prevents root rot and soil erosion, a key practice in sustainable water management.'
      },
      {
        id: 'cover',
        text: 'Use Plastic Tarps',
        cost: 10,
        ecoChange: -5,
        takeaway: 'Plastic tarps protect crops temporarily but create non-biodegradable waste, slightly hurting your Eco Score.'
      },
      {
        id: 'ignore',
        text: 'Let it Flood',
        cost: 0,
        ecoChange: -10,
        takeaway: 'Flooding causes soil erosion and nutrient runoff, severely damaging the long-term health of your farm.'
      }
    ]
  },
  heat_wave: {
    id: 'heat_wave',
    title: 'Heat Wave',
    description: 'Scorching temperatures are drying out the soil and stressing your crops.',
    icon: '☀',
    color: 'bg-amber-500',
    allowedSeasons: ['summer'],
    choices: [
      {
        id: 'mulch',
        text: 'Apply Organic Mulch',
        cost: 25,
        ecoChange: +10,
        takeaway: 'Mulching retains soil moisture and regulates temperature naturally. It is a highly sustainable practice!'
      },
      {
        id: 'water_extra',
        text: 'Over-water (Pump heavily)',
        cost: 15,
        ecoChange: -5,
        takeaway: 'Excessive pumping wastes groundwater resources. Drip irrigation or mulching is preferred over flooding.'
      }
    ]
  },
  weed_growth: {
    id: 'weed_growth',
    title: 'Weed Invasion',
    description: 'Aggressive weeds are stealing nutrients and water from your crops.',
    icon: '🌱',
    color: 'bg-farm-green-dark',
    allowedSeasons: ['spring', 'summer'],
    choices: [
      {
        id: 'herbicide',
        text: 'Spray Herbicides',
        cost: 10,
        ecoChange: -10,
        takeaway: 'Chemical weed killers pollute groundwater and harm beneficial insects.'
      },
      {
        id: 'manual',
        text: 'Manual Weeding',
        cost: 30, // represents labor cost
        ecoChange: +10,
        takeaway: 'Manual weeding is labor-intensive but completely sustainable and keeps your soil toxic-free.'
      }
    ]
  },
  crop_disease: {
    id: 'crop_disease',
    title: 'Fungal Disease',
    description: 'A fungal infection is spreading rapidly across your farm plots.',
    icon: '🍄',
    color: 'bg-purple-500',
    allowedSeasons: ['spring', 'autumn'],
    choices: [
      {
        id: 'fungicide',
        text: 'Chemical Fungicide',
        cost: 15,
        ecoChange: -10,
        takeaway: 'Chemicals cure the disease quickly but leave toxic residues.'
      },
      {
        id: 'prune',
        text: 'Prune & Quarantine',
        cost: 20,
        ecoChange: +10,
        takeaway: 'Removing infected leaves prevents spread without using harsh chemicals, keeping your ecosystem balanced.'
      }
    ]
  },
  birds: {
    id: 'birds',
    title: 'Hungry Birds',
    description: 'A flock of birds is swooping down to eat your freshly planted seeds.',
    icon: '🐦',
    color: 'bg-blue-400',
    allowedSeasons: ['spring', 'summer', 'autumn'],
    choices: [
      {
        id: 'scarecrow',
        text: 'Build a Scarecrow',
        cost: 15,
        ecoChange: +5,
        takeaway: 'A non-lethal, sustainable way to protect crops while preserving local wildlife.'
      },
      {
        id: 'nets',
        text: 'Install Plastic Nets',
        cost: 25,
        ecoChange: -5,
        takeaway: 'Plastic nets can trap and injure birds, harming local biodiversity.'
      }
    ]
  },
  winter_frost: {
    id: 'winter_frost',
    title: 'Unexpected Frost',
    description: 'A severe cold snap is freezing the ground and threatening your winter crops.',
    icon: '❄',
    color: 'bg-cyan-500',
    allowedSeasons: ['winter'],
    choices: [
      {
        id: 'heaters',
        text: 'Use Diesel Heaters',
        cost: 30,
        ecoChange: -10,
        takeaway: 'Diesel heaters generate massive carbon emissions and are not sustainable.'
      },
      {
        id: 'row_covers',
        text: 'Install Fabric Row Covers',
        cost: 20,
        ecoChange: +10,
        takeaway: 'Reusable fabric covers insulate crops effectively without burning fossil fuels.'
      }
    ]
  }
};
