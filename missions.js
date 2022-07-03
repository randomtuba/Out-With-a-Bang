function updateMissions(){
  for(let i in MISSIONS){
    if(!player.achievements.includes(i)&&MISSIONS[i].done()){
      player.achievements.push(i)
    }
  }
}
const MISSIONS = {
  11: {
    name: "You gotta start somewhere",
    desc: "Reach 100 energy",
    done(){return player.totalEnergy.gte(100)},
  },
  12: {
    name: "Energillionaire",
    desc: "Reach 1,000,000 energy",
    done(){return player.totalEnergy.gte(1e6)},
  },
  13: {
    name: "Scientific Notation",
    desc: "Reach 1e9 energy",
    done(){return player.totalEnergy.gte(1e9)},
  },
  14: {
    name: "Empowered",
    desc: "Reach 1e20 energy",
    done(){return player.totalEnergy.gte(1e20)},
  },
  15: {
    name: "Energized Googol",
    desc: "Reach 1e100 energy",
    done(){return player.totalEnergy.gte(1e100)},
  },
  16: {
    name: "To infinity!",
    desc: "Reach 1.79e308 energy",
    done(){return player.totalEnergy.gte(1.79e308)},
  },
  17: {
    name: "Charged Universe",
    desc: "Reach 1e2000 energy",
    done(){return player.totalEnergy.gte("1e2000")},
  },
  18: {
    name: "Gamma Ray Burst",
    desc: "Reach 1e10,000 energy",
    done(){return player.totalEnergy.gte("1e10000")},
  },
  19: {
    name: "The Ultimate Quasar",
    desc: "Reach 1e100,000 energy",
    done(){return player.totalEnergy.gte("1e100000")},
  },
  21: {
    name: "Game over",
    desc: "Die once",
    done(){return player.timesDied>=1},
  },
  22: {
    name: "Try, try again",
    desc: "Die twice",
    done(){return player.timesDied>=2},
  },
  23: {
    name: "Kitten supervisor",
    desc: "Die 9 times",
    done(){return player.timesDied>=9},
  },
  24: {
    name: "Reincarnation",
    desc: "Die 50 times",
    done(){return player.timesDied>=50},
  },
  25: {
    name: "Endless cycle",
    desc: "Die 200 times",
    done(){return player.timesDied>=200},
  },
  26: {
    name: "The grind is real",
    desc: "Die 500 times",
    done(){return player.timesDied>=500},
  },
  27: {
    name: "This isn’t a challenge, it’s a tragedy",
    desc: "Die 1,000 times",
    done(){return player.timesDied>=1000},
  },
  28: {
    name: "Overcompensation",
    desc: "Die 10,000 times",
    done(){return player.timesDied>=10000},
  },
  29: {
    name: "Dying trying",
    desc: "Die 100,000 times",
    done(){return player.timesDied>=100000},
  },
  31: {
    name: "Button intern",
    desc: "Press 100 buttons in total",
    done(){return player.totalButtonPresses>=100},
  },
  32: {
    name: "Avid presser",
    desc: "Press 1,000 buttons in total",
    done(){return player.totalButtonPresses>=1000},
  },
  33: {
    name: "Button manager",
    desc: "Press 10,000 buttons in total",
    done(){return player.totalButtonPresses>=1e4},
  },
  34: {
    name: "The Button Boss",
    desc: "Press 1,000,000 buttons in total",
    done(){return player.totalButtonPresses>=1e6},
  },
  35: {
    name: "Arthritis",
    desc: "Press 1e9 buttons in total",
    done(){return player.totalButtonPresses>=1e9},
  },
  36: {
    name: "Hehe I like pressing things",
    desc: "Press 1e15 buttons in total",
    done(){return player.totalButtonPresses>=1e15},
  },
  37: {
    name: "Button heaven",
    desc: "Press 1e30 buttons in total",
    done(){return player.totalButtonPresses>=1e30},
  },
  38: {
    name: "The God of Buttons",
    desc: "Press 1e60 buttons in total",
    done(){return player.totalButtonPresses>=1e60},
  },
  39: {
    name: "Go touch grass",
    desc: "Press 1e200 buttons in total",
    done(){return player.totalButtonPresses>=1e200},
  },
  41: {
    name: "Finally!",
    desc: "Escape once",
    done(){return player.timesEscaped>=1},
  },
  42: {
    name: "Replaying the game",
    desc: "Escape twice",
    done(){return player.timesEscaped>=2},
  },
  43: {
    name: "Nuclear fallout",
    desc: "Escape 5 times",
    done(){return player.timesEscaped>=5},
  },
  44: {
    name: "One for each Dimension",
    desc: "Escape 8 times",
    done(){return player.timesEscaped>=8},
  },
  45: {
    name: "Here’s the door",
    desc: "Escape 20 times",
    done(){return player.extraTimesEscaped>=12},
  },
  46: {
    name: "40x Escape",
    desc: "Escape 40 times",
    done(){return player.extraTimesEscaped>=32},
  },
  47: {
    name: "The Centurion",
    desc: "Escape 100 times",
    done(){return player.extraTimesEscaped>=92},
  },
  48: {
    name: "Bicentennial",
    desc: "Escape 200 times",
    done(){return player.extraTimesEscaped>=192},
  },
  49: {
    name: "The Escapists",
    desc: "Escape 500 times",
    done(){return player.extraTimesEscaped>=492},
  },
  51: {
    name: "Half the fun",
    desc: "Reach a time speed of 0.5x",
    done(){return timeSpeed()<=0.5},
  },
  52: {
    name: "Decompression",
    desc: "Reach a time speed of 0.25x",
    done(){return timeSpeed()<=0.25},
  },
  53: {
    name: "Decomposition",
    desc: "Reach a time speed of 0.1x",
    done(){return timeSpeed()<=0.1},
  },
  54: {
    name: "Time crunch",
    desc: "Reach a time speed of 0.01x",
    done(){return timeSpeed()<=0.01},
  },
  55: {
    name: "Time dilation",
    desc: "Reach a time speed of 0.001x",
    done(){return timeSpeed()<=0.001},
  },
  56: {
    name: "Time isn’t real",
    desc: "Reach a time speed of 1e-7x",
    done(){return timeSpeed()<=1e-7},
  },
  57: {
    name: "Slowed to a crawl",
    desc: "Reach a time speed of 1e-10x",
    done(){return timeSpeed()<=1e-10},
  },
  58: {
    name: "Reloading…",
    desc: "Reach a time speed of 1e-15x",
    done(){return timeSpeed()<=1e-15},
  },
  59: {
    name: "Way to go, Albert",
    desc: "Reach a time speed of 1e-75x",
    done(){return timeSpeed()<=1e-75},
  },
  61: {
    name: "You gotta start somewhere…again",
    desc: "Reach 10 super-energy",
    done(){return player.superEnergy.gte(10)},
  },
  62: {
    name: "Incremenergy",
    desc: "Reach 1,000,000 super-energy",
    done(){return player.superEnergy.gte(1e6)},
  },
  63: {
    name: "Boosted Up",
    desc: "Reach 1e9 super-energy",
    done(){return player.superEnergy.gte(1e9)},
  },
  64: {
    name: "Super Speed",
    desc: "Reach 1e15 super-energy",
    done(){return player.superEnergy.gte(1e15)},
  },
  65: {
    name: "Insane multipliers",
    desc: "Reach 1e30 super-energy",
    done(){return player.superEnergy.gte(1e30)},
  },
  66: {
    name: "Power abundance",
    desc: "Reach 1e60 super-energy",
    done(){return player.superEnergy.gte(1e60)},
  },
  67: {
    name: "Up, up, and away",
    desc: "Reach 1e100 super-energy",
    done(){return player.superEnergy.gte(1e100)},
  },
  68: {
    name: "Feedback loop",
    desc: "Reach 1e250 super-energy",
    done(){return player.superEnergy.gte("1e250")},
  },
  69: {
    name: "this achievement id is 69 lol nice",
    desc: "Reach 6.9e420 super-energy",
    done(){return player.superEnergy.gte("6.9e420")},
  },
  71: {
    name: "Infinitesimal",
    desc: "Epsilon once",
    done(){return player.epsilons>=1},
  },
  72: {
    name: "Very very very tiny",
    desc: "Epsilon twice",
    done(){return player.epsilons>=2},
  },
  73: {
    name: "More milestones",
    desc: "Epsilon 5 times",
    done(){return player.epsilons>=5},
  },
  74: {
    name: "MORE milestones!!",
    desc: "Epsilon 10 times",
    done(){return player.epsilons>=10},
  },
  75: {
    name: "Full automation",
    desc: "Epsilon 20 times",
    done(){return player.epsilons>=20},
  },
  76: {
    name: "No, not the ordinal",
    desc: "Epsilon 50 times",
    done(){return player.epsilons>=50},
  },
  77: {
    name: "Hyperreality",
    desc: "Epsilon 100 times",
    done(){return player.epsilons>=100},
  },
  78: {
    name: "Center of a fractal",
    desc: "Epsilon 200 times",
    done(){return player.epsilons>=200},
  },
  79: {
    name: "Epsilon^Epsilon",
    desc: "Epsilon 300 times",
    done(){return player.epsilons>=300},
  },
  81: {
    name: "Slow and steady",
    desc: "Obtain an SCT of 35 minutes or less.",
    done(){return summativeChallengeTime() <= 2100},
  },
  82: {
    name: "New Milestones??",
    desc: "Obtain an SCT of 30 minutes or less.",
    done(){return summativeChallengeTime() <= 1800},
  },
  83: {
    name: "Personal best",
    desc: "Obtain an SCT of 25 minutes or less.",
    done(){return summativeChallengeTime() <= 1500},
  },
  84: {
    name: "Roman conqueror",
    desc: "Obtain an SCT of 20 minutes or less.",
    done(){return summativeChallengeTime() <= 1200},
  },
  85: {
    name: "Not-so-challenging",
    desc: "Obtain an SCT of 15 minutes or less.",
    done(){return summativeChallengeTime() <= 900},
  },
  86: {
    name: "Sweaty Speedrunner",
    desc: "Obtain an SCT of 10 minutes or less.",
    done(){return summativeChallengeTime() <= 600},
  },
  87: {
    name: "Super Sonic Racing",
    desc: "Obtain an SCT of 5 minutes or less.",
    done(){return summativeChallengeTime() <= 300},
  },
  88: {
    name: "Down to the second",
    desc: "Obtain an SCT of 1 minute or less.",
    done(){return summativeChallengeTime() <= 60},
  },
  89: {
    name: "Challenge Mastery",
    desc: "Obtain an SCT of 0 seconds.",
    done(){return summativeChallengeTime() == 0},
  },
  91: {
    name: "The Fabric of Reality",
    desc: "Reach 100 spacetime.",
    done(){return player.spacetime[3].gte(100)},
  },
  92: {
    name: "Matter Dimensions",
    desc: "Reach 10,000 spacetime.",
    done(){return player.spacetime[3].gte(10000)},
  },
  93: {
    name: "Spacetime Vacuum",
    desc: "Reach 1,000,000 spacetime.",
    done(){return player.spacetime[3].gte(1e6)},
  },
  94: {
    name: "Spacetime Entanglement",
    desc: "Reach 1e9 spacetime.",
    done(){return player.spacetime[3].gte(1e9)},
  },
  95: {
    name: "Spacetime Continuum",
    desc: "Reach 1e12 spacetime.",
    done(){return player.spacetime[3].gte(1e12)},
  },
  96: {
    name: "String Theory",
    desc: "Reach 1e15 spacetime.",
    done(){return player.spacetime[3].gte(1e15)},
  },
  97: {
    name: "Time Layers",
    desc: "Reach 1e20 spacetime.",
    done(){return player.spacetime[3].gte(1e20)},
  },
  98: {
    name: "Full of Time",
    desc: "Reach 1e25 spacetime.",
    done(){return player.spacetime[3].gte(1e25)},
  },
  99: {
    name: "SPAAAAAACE",
    desc: "Reach 1e30 spacetime.",
    done(){return player.spacetime[3].gte(1e30)},
  },
}