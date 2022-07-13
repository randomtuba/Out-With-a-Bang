function ipFormula() {
  return player.extraTimesEscaped >= 92 ? Decimal.pow((1.05+(hasEpsUpgrade(12)?0.02:0)),player.extraTimesEscaped-92).mul(CONDENSERS[3].effect2()).floor() : new Decimal(0)
}
function ε() {
  if(player.extraTimesEscaped >= 92){
    if(player.buyables[5]==0&&player.buyables[6]==0&&player.buyables[7]==0&&!player.achievements.includes("105")){player.achievements.push("105")}
    if(player.superEnergy.eq(0)&&!player.achievements.includes("106")){player.achievements.push("106")}
    if(player.superEnergy.eq(0)&&player.buyables[5]==0&&player.buyables[6]==0&&player.buyables[7]==0&&!player.achievements.includes("107")){player.achievements.push("107")}
    if(player.buyables[1]==0&&player.buyables[2]==0&&player.buyables[3]==0&&!player.achievements.includes("108")){player.achievements.push("108")}
    if(player.buyables[11]==0&&player.buyables[8]==0&&player.buyables[9]==0&&player.buyables[10]==0&&player.buyables[5]==0&&player.buyables[6]==0&&player.buyables[7]==0&&player.buyables[4]==0&&player.buyables[1]==0&&player.buyables[2]==0&&player.buyables[3]==0&&!player.achievements.includes("109")){player.achievements.push("109")}
    player.epsilons++
    player.instantPoints = player.instantPoints.add(ipFormula())
    player.totalIP = player.totalIP.add(ipFormula())
    player.energy = new Decimal(0)
    player.buttonPresses = [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]
    player.gameBegun = false
    if(!hasMilestone(3)) player.upgrades = []
    player.countdownPoints = new Decimal(0)
    if(hasMilestone(2)){player.escapePoints = new Decimal(511)}else{player.escapePoints = new Decimal(0)}
    if(hasMilestone(2)){player.timesEscaped = 8}else{player.timesEscaped = 0}
    if(hasMilestone(2)){player.extraTimesEscaped=1}else{player.extraTimesEscaped = 0}
    if(!hasMilestone(8)) if(hasMilestone(3)){player.escapeUpgrades = [7,8]}else{player.escapeUpgrades = []}
    player.loreChangeDetect = false
    player.buyables = [null,0,0,0,0,0,0,0,0,0,0,0]
    if(player.epsilons < 2) player.purpleMult = new Decimal(1)
    if(!hasMilestone(8)) player.currentSubtab = 'upgrades'
    player.deceleratePower = new Decimal(0)
    if(!hasMilestone(10)){player.decelerated = false}
    if(!hasMilestone(3)) player.autobuyers = [null,false,false,false,false,false,false]
    player.superEnergy = new Decimal(0)
    player.generators = [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]
    player.countdown = new Decimal(120).mul(Decimal.pow(0.75,player.timesEscaped+player.extraTimesEscaped))
    player.hasDecelerated = false;
  }
}

function epsilontab(x) {
  player.epsilonTab = x;
}

const MILESTONES = {
  1: {
    title: "1 epsilon",
    desc: "Keep the Purple Button multiplier on Escape and Epsilon, and gain 10x more Countdown Points, Deceleration Power (does not boost the inverse gain), and Super-Energy.",
    requirement: 1,
  },
  2: {
    title: "2 epsilons",
    desc: "Start with 9 escapes at the beginning of an Epsilon.",
    requirement: 2,
  },
  3: {
    title: "3 epsilons",
    desc: "Keep all autoclickers and autobuyers unlocked from Escape Upgrades on Epsilon. Keep Escape Upgrades 7 and 8 and Energy Upgrades on Epsilonn.",
    requirement: 3,
  },
  4: {
    title: "4 epsilons",
    desc: "Unlock the Decelerator Buyables Autobuyer.",
    requirement: 4,
  },
  5: {
    title: "5 epsilons",
    desc: "Unlock the Countdown Buyables Autobuyer.",
    requirement: 5,
  },
  6: {
    title: "6 epsilons",
    desc: "Unlock the Super-Energy Buyables Autobuyer.",
    requirement: 6,
  },
  7: {
    title: "7 epsilons",
    desc: "Buying Generators no longer takes away your Escape Points.",
    requirement: 7,
  },
  8: {
    title: "8 epsilons",
    desc: "Keep Escape Upgrades on Epsilon.",
    requirement: 8,
  },
  9: {
    title: "10 epsilons",
    desc: "Unlock the Generators Autobuyer.",
    requirement: 10,
  },
  10: {
    title: "15 epsilons",
    desc: "Generate Countdown Points based on energy, and generate Escape Points based on times Escaped. You are no longer kicked out of Deceleration when you Epsilon. Deceleration no longer subtracts DP.",
    requirement: 15,
  },
  11: {
    title: "20 epsilons",
    desc: "Escaping resets nothing.",
    requirement: 20,
  },
}

function hasMilestone(x) {
  return player.epsilons >= MILESTONES[x].requirement
}

const EPS_UPGRADES = {
  1: {
    title: "???",
    desc: "Some things are better left unbought.",
    cost: new Decimal("1.9e84"),
    effectDisplay() {null},
  },
  2: {
    title: "Buyable Discount",
    desc: "Divide Countdown Buyable 1 cost based on unspent IP and Epsilons.",
    cost: new Decimal(6),
    effect() {return player.instantPoints.add(1).max(0).pow(10).mul(player.epsilons**10)},
    effectDisplay() {return "/" + format(EPS_UPGRADES[2].effect()) + " C. Buyable 1 Cost"},
  },
  3: {
    title: "Twins Paradox",
    desc: "Unlock Time Dilation.",
    cost: new Decimal(1e53),
    effectDisplay() {null},
  },
  4: {
    title: "Art of Time III",
    desc: "Time Speed is divided by 1e50.",
    cost: new Decimal(100000),
    effectDisplay() {null},
  },
  5: {
    title: "Temporal^Temporal",
    desc: "Gain more of the spacetime currencies based on unspent IP.",
    cost: new Decimal(1e32),
    effect() {return player.instantPoints.max(0).pow(0.1).add(1)},
    effectDisplay() {return format(EPS_UPGRADES[5].effect()) + "x spacetime currencies"},
  },
  6: {
    title: "CP Inflation",
    desc: "Change the Countdown Buyable 3 base (2x -> 2.2x).",
    cost: new Decimal(1e21),
    effectDisplay() {null},
  },
  7: {
    title: "Blast Resistance",
    desc: "Gain more CP based on your starting timer.",
    cost: new Decimal(1),
    effect() {return Decimal.div(1,new Decimal(120).mul(Decimal.pow(0.75,(player.timesEscaped+player.extraTimesEscaped)))).max(0).pow(0.5).add(1)},
    effectDisplay() {return format(EPS_UPGRADES[7].effect()) + "x CP gain"},
  },
  8: {
    title: "Bulked Up",
    desc: "You can now bulk Escape.",
    cost: new Decimal(2e11),
    effectDisplay() {null},
  },
  9: {
    title: "Energy Exponential",
    desc: "Energy ^1.05.",
    cost: new Decimal(200),
    effectDisplay() {null},
  },
  10: {
    title: "Mega-Energy",
    desc: "Gain more Super-Energy based on Super-Energy.",
    cost: new Decimal(2),
    effect() {return player.superEnergy.max(0).pow(0.05).add(1)},
    effectDisplay() {return format(EPS_UPGRADES[10].effect()) + "x SE gain"},
  },
  11: {
    title: "Two's Company",
    desc: "You can buy both upgrades in the 3 pairs of Energy Upgrades.",
    cost: new Decimal(1),
    effectDisplay() {null},
  },
  12: {
    title: "IP Booster",
    desc: "+0.02 IP gain base.",
    cost: new Decimal(5e14),
    effectDisplay() {null},
  },
  13: {
    title: "The Challenging Upgrade",
    desc: "Unlock Challenges.",
    cost: new Decimal(600),
    effectDisplay() {null},
  },
  14: {
    title: "Time Layers",
    desc: "Unlock Spacetime.",
    cost: new Decimal(3e23),
    effectDisplay() {null},
  },
  15: {
    title: "Synergism 2: The Sequel",
    desc: "Energy and Time Speed boost each other.",
    cost: new Decimal(15),
    effect(){return Decimal.div(1,new Decimal(timeSpeed()).max("1e-308")).pow(10)},
    effect2(){return player.energy.max(1).log10().add(1)},
    effectDisplay() {return format(EPS_UPGRADES[15].effect()) + "x energy, /" + format(EPS_UPGRADES[15].effect2()) + " Time Speed"},
  },
  16: {
    title: "Make DP Great Again!",
    desc: "Unlock a new Super-Energy boost, and DP boosts energy gain.",
    cost: new Decimal(5000),
    effect() {return player.deceleratePower.max(0).pow(10).add(1)},
    effectDisplay() {return format(EPS_UPGRADES[16].effect()) + "x energy/second"},
  },
};

function buyEpsUpgrade(x) {
  if(player.instantPoints.gte(EPS_UPGRADES[x].cost) && !player.epsilonUpgrades.includes(x)){
    player.instantPoints = player.instantPoints.sub(EPS_UPGRADES[x].cost)
    player.epsilonUpgrades.push(x)
  }
}

function hasEpsUpgrade(x) {
  return player.epsilonUpgrades.includes(x);
}

const CHALLENGES = {
  1: {
    title: "Power Outage",
    desc: "Energy gain is raised to the 0.75th.",
    rewardDesc: "Energy gain is exponentiated based on your fastest completion of this challenge.",
    effect() {return 1.3 - (player.challengeTimes[1] / 2000)},
    effectDisplay() {return "Energy ^" + format(CHALLENGES[1].effect())},
  },
  2: {
    title: "Out of Stock",
    desc: "Countdown Buyables and Decelerator Buyables do nothing.",
    rewardDesc: "Gain free levels of Countdown Buyables 1 and 3 and gain more DP based on your fastest completion of this challenge.",
    effect() {return Math.floor(30 - (player.challengeTimes[2] / 20))},
    effect2() {return new Decimal(600/player.challengeTimes[2]).min(6000).pow(5)},
    effectDisplay() {return "+" + format(CHALLENGES[2].effect()) + " C. Buyable levels, " + format(CHALLENGES[2].effect2()) + "x DP"},
  },
  3: {
    title: "Decremenergy",
    desc: "Super-Energy cannot be generated. Energy gain is raised to the 0.9th.",
    rewardDesc: "Gain free levels of Super-Energy Buyable 2 based on your fastest completion of this challenge.",
    effect() {return Math.floor((600-player.challengeTimes[3]) / 10)},
    effectDisplay() {return "+" + format(CHALLENGES[3].effect()) + " SE Buyable 2 levels"},
  },
  4: {
    title: "Out of Time",
    desc: "Game speed is 100x faster.",
    rewardDesc: "Exponentiate the Escape requirement based on your fastest completion of this challenge.",
    effect() {return 0.75+(player.challengeTimes[4]/2400)},
    effectDisplay() {return "^" + format(CHALLENGES[4].effect()) + " Escape requirement"},
  },
}

function enterChallenge(x) {
  player.challenge = x
  player.timeInChallenge = 0
  player.energy = new Decimal(0)
  player.buttonPresses = [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]
  player.gameBegun = false
  if(!hasChalMilestone(3)) player.upgrades = []
  player.countdownPoints = new Decimal(0)
  if(hasMilestone(2)){player.escapePoints = new Decimal(511)}else{player.escapePoints = new Decimal(0)}
  if(hasMilestone(2)){player.timesEscaped = 8}else{player.timesEscaped = 0}
  if(hasMilestone(2)){player.extraTimesEscaped=1}else{player.extraTimesEscaped = 0}
  if(!hasChalMilestone(3)) if(hasMilestone(3)){player.escapeUpgrades = [7,8]}else{player.escapeUpgrades = []}
  player.loreChangeDetect = false
  player.buyables = [null,0,0,0,0,0,0,0,0,0,0,0]
  if(player.epsilons < 2) player.purpleMult = new Decimal(1)
  if(!hasMilestone(8)) player.currentSubtab = 'upgrades'
  player.deceleratePower = new Decimal(0)
  if(!hasChalMilestone(5)) player.decelerated = false
  if(!hasMilestone(3)) player.autobuyers = [null,false,false,false,false,false,false]
  player.superEnergy = new Decimal(0)
  player.generators = [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]
  player.countdown = 120*(0.75**(player.timesEscaped+player.extraTimesEscaped))
  player.epsilonAutobuyers = [null,false,false,false,false]
  if(hasChalMilestone(1)) player.epsilonAutobuyers[1] = true
  if(hasChalMilestone(2)) player.epsilonAutobuyers[2] = true
  if(hasChalMilestone(3)) player.epsilonAutobuyers[3] = true
  if(hasChalMilestone(4)) player.epsilonAutobuyers[4] = true
}

function exitChallenge() {
  if(player.challenge != 0){
    player.challenge = 0
    player.timeInChallenge = 0
  }
}

function summativeChallengeTime() {
  return player.challengeTimes[1]+player.challengeTimes[2]+player.challengeTimes[3]+player.challengeTimes[4]
}

function hasChalMilestone(x) {
  switch (x) {
    case 1:
      if(summativeChallengeTime() <= 1500){
        return true
      }else{
        return false
      }
    break;
    case 2:
      if(summativeChallengeTime() <= 1200){
        return true
      }else{
        return false
      }
    break;
    case 3:
      if(summativeChallengeTime() <= 900){
        return true
      }else{
        return false
      }
    break;
    case 4:
      if(summativeChallengeTime() <= 600){
        return true
      }else{
        return false
      }
    break;
    case 5:
      if(summativeChallengeTime() <= 180){
        return true
      }else{
        return false
      }
    break;
    case 6:
      if(summativeChallengeTime() <= 60){
        return true
      }else{
        return false
      }
    break;
  }
}

const CONDENSERS = {
  1: {
    title: "Space Condenser",
    desc: "Triple space gain and multiply Super-Energy gain by 1e30x per purchase",
    cost() {
      return new Decimal(100).mul(Decimal.pow(100,player.spacetime[4]))
    },
    effect() {
      return Decimal.pow(3,player.spacetime[4]+(2*player.condensedST[4]))
    },
    effect2() {
      return Decimal.pow(1e30,player.spacetime[4]+(2*player.condensedST[4]))
    },
    effectDisplay() {
      return format(CONDENSERS[1].effect()) + "x space gain, " + format(CONDENSERS[1].effect2()) + "x super-energy gain";
    },
  },
  2: {
    title: "Time Condenser",
    desc: "Triple time gain and multiply the Decelerator Buyable 3 base by 100 per purchase",
    cost() {
      return new Decimal(100).mul(Decimal.pow(100,player.spacetime[5]))
    },
    effect() {
      return Decimal.pow(3,player.spacetime[5]+(2*player.condensedST[5]))
    },
    effect2() {
      return Decimal.pow(100,player.spacetime[5]+(2*player.condensedST[5]))
    },
    effectDisplay() {
      return format(CONDENSERS[2].effect()) + "x time gain, " + format(CONDENSERS[2].effect2()) + "x Decelerator Buyable 3 base";
    },
  },
  3: {
    title: "Spacetime Condenser",
    desc: "Quadruple spacetime gain and multiply IP gain by 1,000 per purchase",
    cost() {
      return new Decimal(1000).mul(Decimal.pow(1000,player.spacetime[6]))
    },
    effect() {
      return Decimal.pow(4,player.spacetime[6]+(2*player.condensedST[6]))
    },
    effect2() {
      return Decimal.pow(1000,player.spacetime[6]+(2*player.condensedST[6]))
    },
    effectDisplay() {
      return format(CONDENSERS[3].effect()) + "x spacetime gain, " + format(CONDENSERS[3].effect2()) + "x IP gain";
    },
  },
}

const CONDENSERS_2 = {
  1: {
    title: "Space Condenser^2",
    desc: "Multiply condensed space gain by 1.5 and add 2 free levels to the above Condenser",
    cost() {
      return new Decimal(1000).mul(Decimal.pow(1000,player.condensedST[4]))
    },
    effect() {
      return Decimal.pow(1.5,player.condensedST[4])
    },
    effectDisplay() {
      return format(CONDENSERS_2[1].effect()) + "x condensed space gain, +" + format(2*player.condensedST[4]) + " Space Condenser levels";
    },
  },
  2: {
    title: "Time Condenser^2",
    desc: "Multiply condensed time gain by 1.5 and add 2 free levels to the above Condenser",
    cost() {
      return new Decimal(1000).mul(Decimal.pow(1000,player.condensedST[5]))
    },
    effect() {
      return Decimal.pow(1.5,player.condensedST[5])
    },
    effectDisplay() {
      return format(CONDENSERS_2[2].effect()) + "x condensed time gain, +" + format(2*player.condensedST[5]) + " Time Condenser levels";
    },
  },
  3: {
    title: "Spacetime Condenser^2",
    desc: "Double condensed spacetime gain and add 2 free levels to the above Condenser",
    cost() {
      return new Decimal(10000).mul(Decimal.pow(100000,player.condensedST[6]))
    },
    effect() {
      return Decimal.pow(2,player.condensedST[6])
    },
    effectDisplay() {
      return format(CONDENSERS_2[3].effect()) + "x condensed spacetime gain, +" + format(2*player.condensedST[6]) + " Spacetime Condenser levels";
    },
  },
}

function buyCondenser(x) {
  if(player.spacetime[x].gte(CONDENSERS[x].cost())){
    player.spacetime[x] = player.spacetime[x].sub(CONDENSERS[x].cost())
    player.spacetime[x+3] += 1
  }
}

function buyCondenser2(x) {
  if(player.condensedST[x].gte(CONDENSERS_2[x].cost())){
    player.condensedST[x] = player.condensedST[x].sub(CONDENSERS_2[x].cost())
    player.condensedST[x+3] += 1
  }
}

function dilateTime() {
  player.dilated = !player.dilated
  if(player.dilated) player.timesDilated++
  ε()
}

function dtEffect() {
  return player.dilatedTime.max(0).pow(0.5).add(1)
}

function newContent() {
  if (
    confirm(
      "Toggling this option will unlock new content that is not part of the game jam version. This cannot be undone! Are you sure you want to do this?"
    )
  ) {
    player.newContent = true
  }
}