console.log("gwa")

var tmp = {
  text: "",
  lastTick: Date.now()
};

function tab(x) {
  player.currentTab = x;
}

function subtab(x) {
  player.currentSubtab = x;
}

function eps() {
  let eps = new Decimal(0);
  if(hasUpgrade(1)) eps = eps.add(10)
  if(hasUpgrade(2)) eps = eps.mul(UPGRADES[2].effect())
  if(hasUpgrade(3)) eps = eps.mul(UPGRADES[3].effect())
  if(hasUpgrade(4)) eps = eps.mul(UPGRADES[4].effect())
  if(hasUpgrade(5)) eps = eps.mul(UPGRADES[5].effect())
  if(hasUpgrade(6)) eps = eps.mul(UPGRADES[6].effect())
  if(hasUpgrade(7)) eps = eps.mul(UPGRADES[7].effect())
  if(hasUpgrade(8)) eps = eps.mul(UPGRADES[8].effect())
  if(hasEscUpgrade(16)) eps = eps.mul(ESC_UPGRADES[16].effect())
  if(hasEscUpgrade(3)) eps = eps.mul(ESC_UPGRADES[3].effect())
  if(hasEpsUpgrade(15)) eps = eps.mul(EPS_UPGRADES[15].effect())
  if(hasEpsUpgrade(16)) eps = eps.mul(EPS_UPGRADES[16].effect())
  eps = eps.mul(BUYABLES[1].effect())
  eps = eps.mul(Decimal.pow(2,player.buyables[4]))
  eps = eps.mul(player.purpleMult)
  eps = eps.mul(DECEL_BUYABLES[3].effect())
  eps = eps.mul(seMult(1))
  if(hasEpsUpgrade(9)) eps = eps.max(0).pow(1.05)
  if(player.challenge == 1) eps = eps.max(0).pow(0.9)
  eps = eps.max(0).pow(CHALLENGES[1].effect())
  if(player.dilated) eps = eps.max(0).pow(0.6)
  return eps
}

function dpps() {
  let dpps = new Decimal(1);
  dpps = dpps.mul(DECEL_BUYABLES[1].effect())
  if(hasEscUpgrade(9)) dpps = dpps.mul(ESC_UPGRADES[9].effect())
  if(hasEscUpgrade(11)) dpps = dpps.mul(ESC_UPGRADES[11].effect2())
  if(hasEpsUpgrade(16)) dpps = dpps.mul(seMult(4))
  if(hasMilestone(1)) dpps = dpps.mul(10)
  if(player.dilated && player.deceleratePower.gt(0)) dpps = dpps.pow(0.1)
  return dpps
}

function cpGain() {
  let cpGain = player.energy.max(1).log10().div(8).mul(BUYABLES[3].effect())
  if(hasEscUpgrade(11)) cpGain = cpGain.mul(ESC_UPGRADES[11].effect())
  if(player.buyables[10] >= 1) cpGain = cpGain.mul(seMult(2))
  if(hasMilestone(1)) cpGain = cpGain.mul(10)
  if(hasEpsUpgrade(7)) cpGain = cpGain.mul(EPS_UPGRADES[7].effect())
  if(player.dilated && player.countdownPoints.gt(0)) cpGain = cpGain.pow(0.1)
  return cpGain
}

function totalCPGain() {
  let cpGain = player.totalEnergy.max(1).log10().div(8).mul(BUYABLES[3].effect())
  if(hasEscUpgrade(11)) cpGain = cpGain.mul(ESC_UPGRADES[11].effect())
  if(player.buyables[10] >= 1) cpGain = cpGain.mul(seMult(2))
  if(hasMilestone(1)) cpGain = cpGain.mul(10)
  if(hasEpsUpgrade(7)) cpGain = cpGain.mul(EPS_UPGRADES[7].effect())
  if(player.dilated && player.countdownPoints.gt(0)) cpGain = cpGain.pow(0.1)
  return cpGain
}

function escapeReq() {
  let req = new Decimal(1e8).pow(1+((player.timesEscaped+player.extraTimesEscaped)/4)).pow(1+(player.extraTimesEscaped/25))
  if(player.extraTimesEscaped>=17){
    req=req.pow((player.extraTimesEscaped-16)**0.2)
  }
  req = req.pow(CHALLENGES[4].effect())
  if(hasEscUpgrade(2)) req = req.div(ESC_UPGRADES[2].effect())
  return req
}

function energyBuyableCost() {
  if(player.buyables[4] < 10){
    return new Decimal(1e12).mul(new Decimal(4).pow(player.buyables[4]))
  }else{
    return new Decimal(1048576000000000000).mul(new Decimal(4).pow(player.buyables[4]-10).pow(2))
  }
}

function timeSpeed() {
  if(hasEscUpgrade(12)){
    let tspeed = player.decelerated ? Decimal.div(1,player.deceleratePower.max(1).log(DECEL_BUYABLES[2].effect()).add(1).mul(player.buyables[6]**2)).toNumber() : 1
    if(player.buyables[10] >= 2 && player.decelerated) tspeed = tspeed / seMult(3)
    if(hasEscUpgrade(14) && player.decelerated) tspeed = tspeed / ESC_UPGRADES[14].effect()
    if(hasEpsUpgrade(15) && player.decelerated) tspeed = tspeed / EPS_UPGRADES[15].effect2()
    if(hasEpsUpgrade(4) && player.decelerated) tspeed = tspeed / 1e50
    if(player.decelerated) tspeed = new Decimal(tspeed).div(player.dilatedTime.add(1)).toNumber()
    return tspeed
  }else{
    let tspeed = player.decelerated ? Decimal.div(1,player.deceleratePower.max(1).log(DECEL_BUYABLES[2].effect()).add(1)).toNumber() : 1
    if(player.buyables[10] >= 2 && player.decelerated) tspeed = tspeed / seMult(3)
    if(hasEscUpgrade(14) && player.decelerated) tspeed = tspeed / ESC_UPGRADES[14].effect()
    if(hasEpsUpgrade(15) && player.decelerated) tspeed = tspeed / EPS_UPGRADES[15].effect2()
    if(hasEpsUpgrade(4) && player.decelerated) tspeed = tspeed / 1e50
    if(player.decelerated) tspeed = new Decimal(tspeed).div(player.dilatedTime.add(1)).toNumber()
    return tspeed
  }
}

function seMult(x) {
  switch(x) {
    case 1:
      return player.superEnergy.max(0).pow(5+SUPER_BUYABLES[2].effect()).add(1)
    break;
    case 2:
      return player.superEnergy.max(0).pow(0.2).add(1)
    break;
    case 3:
      return player.superEnergy.max(1).log(8).add(1).toNumber()
    break;
    case 4:
      return player.superEnergy.max(0).pow(0.05).add(1)
    break;
  }
}

function summativeGeneratorMult() {
  let sgm = Decimal.pow(1.25,player.generators[1].add(player.generators[2]).add(player.generators[3]).add(player.generators[4]).add(player.generators[5]).add(player.generators[6]))
  if(hasEscUpgrade(15) && sgm.gt(9e15)){
    sgm = sgm.pow(0.6).mul(new Decimal(9e15).pow(0.4))
  }else{
    sgm=sgm.min(9e15)
  }
  return sgm
}

function producedGenerator(x) {
  switch (x){
    case 1:
      return player.generators[7]
    break;
    case 2:
      return player.generators[8]
    break;
    case 5:
      return player.generators[9]
    break;
  }
}

function buttonPress(x) {
  switch (x) {
    case 1:
      switch (player.timesEscaped+1){
        case 1:
        case 3:
        case 6:
        case 7:
        case 8:
          buttonEffect(1)
        break;
        case 2:
        case 5:
        case 9:
          buttonEffect(4)
        break;
      }
    break;
    case 2:
      switch (player.timesEscaped+1){
        case 1:
        case 3:
        case 8:
          buttonEffect(2)
        break;
        case 4:
          buttonEffect(4)
        break;
        case 9:
          buttonEffect(5)
        break;
      }
    break;
    case 3:
      switch (player.timesEscaped+1){
        case 4:
          buttonEffect(1)
        break;
        case 2:
        case 5:
        case 9:
          buttonEffect(2)
        break;
        case 6:
        case 7:
          buttonEffect(4)
        break;
      }
    break;
    case 4:
      switch (player.timesEscaped+1){
        case 2:
        case 5:
        case 9:
          buttonEffect(1)
        break;
        case 4:
        case 6:
        case 7:
          buttonEffect(2)
        break;
        case 1:
        case 3:
        case 8:
          buttonEffect(4)
        break;
      }
    break;
    case 5:
      switch (player.timesEscaped+1){
        case 9:
          buttonEffect(3)
        break;
        case 6:
        case 7:
          buttonEffect(5)
        break;
      }
    break;
    case 6:
      player.code = player.code + "1"
    break;
    case 7:
      player.code = player.code + "2"
    break;
    case 8:
      player.code = player.code + "3"
    break;
    case 9:
      player.code = player.code + "4"
    break;
    case 10:
      player.code = player.code + "5"
    break;
  }
  player.buttonPresses[x] += BUYABLES[2].effect() ** (player.dilated?0.1:1);
  player.totalButtonPresses += BUYABLES[2].effect() ** (player.dilated?0.1:1);
}

function buttonEffect(x) {
  switch (x) {
    case 1:
      if(!hasEscUpgrade(7)) player.energy = player.energy.sub(10)
    break;
    case 2:
      player.energy = player.energy.add(hasEscUpgrade(1)?5:1)
    break;
    case 4:
      if(!hasEscUpgrade(7)) player.energy = new Decimal(0)
    break;
    case 5:
      if(player.cooldown.eq(0)){
        player.purpleMult = player.purpleMult.mul(Math.random()*1.5+0.5).min(50)
        player.cooldown = new Decimal(0.250)
      }
    break;
  }
}

function rgb(r,g,b){
  return "#"+((r<16?"0":"")+r.toString(16)+(g<16?"0":"")+g.toString(16)+(b<16?"0":"")+b.toString(16))
}

function mainLoop(){
  if(!window["player"]||!player.energy)return;
  
  let time = Date.now()
  let diff = (time-tmp.lastTick)/1000
  tmp.lastTick = time
  if(!hasEpsUpgrade(1) || player.gameWon) player.timePlayed += diff*(player.challenge == 4 ? 100 : 1)
  if(player.challenge != 0 && player.extraTimesEscaped < 92) player.timeInChallenge += diff*(player.challenge == 4 ? 100 : 1)
  if(player.gameBegun) player.energy = player.energy.add(eps().times(diff*(player.challenge == 4 ? 100 : 1)));
  if(player.gameBegun) player.totalEnergy = player.totalEnergy.add(eps().times(diff*(player.challenge == 4 ? 100 : 1)));
  if(player.gameBegun) player.countdown = player.countdown - (diff*(player.challenge == 4 ? 100 : 1) * timeSpeed());
  let maxTime = 120*(0.75**(player.timesEscaped+player.extraTimesEscaped))
  player.cooldown = player.cooldown.sub(diff*(player.challenge == 4 ? 100 : 1)).max(0)
  if(player.code.length >= 3 && player.codeState <3){
    if(player.code === "524"){
      player.codeState = 2
      player.code = ""
      setTimeout(()=>{player.codeState=3}, 1000)
    }else{
      player.codeState = 1
      player.code = ""
      setTimeout(()=>{player.codeState=0}, 1000)
    }
  }
  if(player.countdown < 0&&player.gameBegun){
    die(maxTime)
  }
  if(hasChalMilestone(6)){
player.challengeTimes[1] = 0
player.challengeTimes[2] = 0
player.challengeTimes[3] = 0
player.challengeTimes[4] = 0
}
  if((player.timeInChallenge >= player.challengeTimes[player.challenge]) && player.challenge != 0) exitChallenge()
  if(player.extraTimesEscaped >= 92 && player.challenge != 0){
      player.challengeTimes[player.challenge] = player.timeInChallenge
      player.challenge = 0
      player.timeInChallenge = 0
    }
  if(player.dilated && player.extraTimesEscaped >= 92){
    player.dilatedTime = player.dilatedTime.add(Decimal.pow(2,player.extraTimesEscaped-92).mul(diff))
  }
  updateDeceleration(diff)
  autobuyStuff(diff)
  if(player.challenge != 3) updateSE(diff)
  if(hasMilestone(10) && (player.challenge == 0||hasChalMilestone(5))) passiveGeneration(diff)
  updateHTML(maxTime)
  updateMissions()
  if(hasEpsUpgrade(14)) updateST(diff)
  if(isNaN(player.energy)) {
    exportSave()
    alert("WARNING: NaN Detected! You will see a message that will ask you to confirm a Hard Reset. Please select OK to solve the NaN. Sorry but your save will be lost :(")
    hardReset()
  }
}

setInterval(mainLoop, 40);
function updateDeceleration(diff){
  if((hasEscUpgrade(6) && !player.decelerated) || hasMilestone(10)){player.deceleratePower = player.deceleratePower.add(dpps().times(diff*(player.challenge == 4 ? 100 : 1)))}else if (player.decelerated && !hasMilestone(10)){player.deceleratePower = player.deceleratePower.sub(dpps().times(diff*(player.challenge == 4 ? 100 : 1)).div(hasMilestone(1) ? 10 : 1)).max(0)}
  if((hasEscUpgrade(6) && !player.decelerated) || hasMilestone(10)){player.totalDP = player.totalDP.add(dpps().times(diff*(player.challenge == 4 ? 100 : 1)))}
  
  if(player.deceleratePower.lte(0)) player.decelerated = false
}
function updateHTML(maxTime){
  if(player.gameBegun){
    if(!player.antiEpilepsy){
      if(player.decelerated){
        if(document.getElementById("countdown"))document.getElementById("countdown").style.color = rgb(Math.floor((player.countdown/maxTime)*255),Math.floor((player.countdown/maxTime)*255),255)
      }else{
        if(document.getElementById("countdown"))document.getElementById("countdown").style.color = rgb(255,Math.floor((player.countdown/maxTime)*255),Math.floor((player.countdown/maxTime)*255))
      }
    }else{
      if(document.getElementById("countdown"))document.getElementById("countdown").style.color = "#E6756B"
    }
  }
  if(player.countdownPoints.gt(0) && !player.loreChangeDetect&&!player.gameBegun){
    if(document.getElementById("lore2"))document.getElementById("lore2").innerHTML = "When the timer hits zero, a white light surrounds you, and in a single visceral instant, your body is obliterated, as your bones burn to a crisp in the vast expanse of light.<br>The darkness comes to you, and it is quick and total."
  }else if (player.timesEscaped > 0){
    if(document.getElementById("lore2"))document.getElementById("lore2").innerHTML = "Finally! You have won. Upon generating enough energy, you step out of the door, and run as far as you can.<br>Months later, a new facility is built, with tighter security. Maybe you can blow up their building again..."
  }
  if(document.getElementById("decelerate")){
    document.getElementById("decelerate").innerHTML = (player.decelerated ? "Disable Decelerator" : "Enable Decelerator")
  }
  if(document.getElementById("startGameButton")){
    document.getElementById("startGameButton").innerHTML = (player.countdownPoints.gt(0) || player.timesEscaped > 0 ? "Begin the game again" : "Begin the game")
  }
  if(document.getElementById("auto1") && player.currentTab == 'escape' && player.currentSubtab == 'auto') document.getElementById("auto1").innerHTML = "Red Button Autoclicker: " + (player.autobuyers[1] ? "ON" : "OFF")
  if(document.getElementById("auto2") && player.currentTab == 'escape' && player.currentSubtab == 'auto') document.getElementById("auto2").innerHTML = "Blue Button Autoclicker: " + (player.autobuyers[2] ? "ON" : "OFF")
  if(document.getElementById("auto3") && player.currentTab == 'escape' && player.currentSubtab == 'auto') document.getElementById("auto3").innerHTML = "Purple Button Autoclicker: " + (player.autobuyers[3] ? "ON" : "OFF")
  if(document.getElementById("auto4") && player.currentTab == 'escape' && player.currentSubtab == 'auto') document.getElementById("auto4").innerHTML = "Energy Buyable Autobuyer: " + (player.autobuyers[4] ? "ON" : "OFF")
  if(document.getElementById("auto5") && player.currentTab == 'escape' && player.currentSubtab == 'auto') document.getElementById("auto5").innerHTML = "Begin Game Autoclicker: " + (player.autobuyers[5] ? "ON" : "OFF")
  if(document.getElementById("auto6") && player.currentTab == 'escape' && player.currentSubtab == 'auto') document.getElementById("auto6").innerHTML = "Escape Autoclicker: " + (player.autobuyers[6] ? "ON" : "OFF")
}
function die(maxTime){
  player.countdownPoints = player.countdownPoints.add(cpGain())
  player.totalCP = player.totalCP.add(cpGain())
    player.gameBegun = false
    player.countdown = maxTime
    player.energy = new Decimal(0)
    if(!hasEscUpgrade(8) && !hasMilestone(3)) player.upgrades = []
    player.buttonPresses = [null,0,0,0,0,0]
    player.timesDied += 1
    if(!hasMilestone(1)) player.purpleMult = new Decimal(1)
    player.buyables[4] = 0
    player.loreChangeDetect = false
    if(document.getElementById("countdown"))document.getElementById("countdown").style.color = "#FFFFFF"
}
function superGen() {
  let gen = new Decimal(0);
  gen = gen.add(GENERATORS[1].effect().mul(player.challenge == 4 ? 100 : 1).max(0).pow(player.dilated?0.1:1).mul(player.challenge == 3 ? 0 : 1))
  gen = gen.add(GENERATORS[2].effect().mul(player.challenge == 4 ? 100 : 1).max(0).pow(player.dilated?0.1:1).mul(player.challenge == 3 ? 0 : 1))
  gen = gen.add(GENERATORS[3].effect().mul(player.challenge == 4 ? 100 : 1).max(0).pow(player.dilated?0.1:1).mul(player.challenge == 3 ? 0 : 1))
  gen = gen.add(GENERATORS[4].effect().mul(player.challenge == 4 ? 100 : 1).max(0).pow(player.dilated?0.1:1).mul(player.challenge == 3 ? 0 : 1))
  return gen
}
function updateSE(diff){
  player.superEnergy = player.superEnergy.add(superGen().mul(diff))
  player.totalSE = player.totalSE.add(superGen().mul(diff))
  player.generators[7] = player.generators[7].add(GENERATORS[4].effect().mul(diff*(player.challenge == 4 ? 100 : 1)).max(0).pow(player.dilated?0.1:1)).mul(player.challenge == 3 ? 0 : 1)
  player.generators[8] = player.generators[8].add(GENERATORS[6].effect().mul(diff*(player.challenge == 4 ? 100 : 1)).max(0).pow(player.dilated?0.1:1)).mul(player.challenge == 3 ? 0 : 1)
  player.generators[9] = player.generators[9].add(GENERATORS[6].effect().mul(diff*(player.challenge == 4 ? 100 : 1)).max(0).pow(player.dilated?0.1:1)).mul(player.challenge == 3 ? 0 : 1)
}
function spacetimeMults() {
  let mult = new Decimal(1)
  if(hasEpsUpgrade(5)) mult = mult.mul(EPS_UPGRADES[5].effect())
  mult = mult.mul(dtEffect())
  return mult
}
function updateST(diff){
  player.spacetime[1] = player.spacetime[1].add(player.countdownPoints.max(0).pow(0.0025).add(1).mul(CONDENSERS[1].effect()).mul(spacetimeMults()).mul(diff))
  player.spacetime[2] = player.spacetime[2].add(player.deceleratePower.max(0).pow(0.02).add(1).mul(CONDENSERS[2].effect()).mul(spacetimeMults()).mul(diff))
  player.spacetime[3] = player.spacetime[3].add(player.spacetime[1].mul(player.spacetime[2]).pow(0.25).mul(CONDENSERS[3].effect()).mul(spacetimeMults()).mul(diff))
}

function autobuyStuff(diff){
  if(player.autobuyers[1] && player.gameBegun){
    buttonPress(1)
  }
  if(player.autobuyers[2] && player.gameBegun){
    buttonPress(4)
  }
  if(player.autobuyers[3] && player.gameBegun){
    buttonPress(5)
  }
  if(player.autobuyers[4] && player.gameBegun){
    if(player.buyables[4] >= 10){
      player.buyables[4] = player.energy.div(1048576000000000000).max(1).sqrt().log(4).add(10).floor().add(1).toNumber()
    }else{
      player.buyables[4] = player.energy.div(1e12).max(1).log(4).add(1).floor().min(10).toNumber()
    }
  }
  if(player.autobuyers[5] && !player.gameBegun){
    player.gameBegun = true;
  }
  if(player.autobuyers[6] && player.gameBegun && player.energy.gte(escapeReq())){
    escape1()
    if(hasEpsUpgrade(8)){
      while(player.energy.gte(escapeReq())){
        escape1()
      }
    }
  }
  if(player.epsilonAutobuyers[1]){
    player.buyables[5] = player.deceleratePower.div(10).max(1).log(5).add(1).floor().toNumber()
    player.buyables[6] = player.deceleratePower.div(100).max(1).log(7).add(1).floor().toNumber()
    player.buyables[7] = player.deceleratePower.div(1000).max(1).log(10).add(1).floor().toNumber()
  }
  if(player.epsilonAutobuyers[2]){
    while(player.countdownPoints.gte(BUYABLES[1].cost()))buyBuyable(1)
    player.buyables[2] = player.countdownPoints.div(2).max(1).log(3).add(1).floor().toNumber()
    player.buyables[3] = player.countdownPoints.div(10).max(1).log(4).add(1).floor().toNumber()
  }
  if(player.epsilonAutobuyers[3]){
    while(player.superEnergy.gte(SUPER_BUYABLES[1].cost()))buySuperBuyable(1)
    while(player.superEnergy.gte(SUPER_BUYABLES[2].cost()))buySuperBuyable(2)
    while(player.superEnergy.gte(SUPER_BUYABLES[3].cost()))buySuperBuyable(3)
  }
  if(player.epsilonAutobuyers[4]){
    player.generators[1] = player.escapePoints.div(1e7).max(1).log(1.5).add(1).floor()
    player.generators[2] = player.escapePoints.div(1e9).max(1).log(1.65).add(1).floor()
    player.generators[3] = player.escapePoints.div(5e9).max(1).log(2).add(1).floor()
    player.generators[4] = player.escapePoints.div(1e10).max(1).log(3).add(1).floor()
    player.generators[5] = player.escapePoints.div(2e11).max(1).log(5).add(1).floor()
    player.generators[6] = player.escapePoints.div(1e13).max(1).log(8).add(1).floor()
  }
}

function passiveGeneration(diff) {
  player.countdownPoints = player.countdownPoints.add(totalCPGain().mul(diff*(player.challenge == 4 ? 100 : 1)))
  player.totalCP = player.totalCP.add(totalCPGain().mul(diff*(player.challenge == 4 ? 100 : 1)))
  player.escapePoints = player.escapePoints.add(Decimal.pow(2,player.timesEscaped+player.extraTimesEscaped).mul(diff*(player.challenge == 4 ? 100 : 1)))
  player.totalEP = player.totalEP.add(Decimal.pow(2,player.timesEscaped+player.extraTimesEscaped).mul(diff*(player.challenge == 4 ? 100 : 1)))
}
const UPGRADES = {
  1: {
    title: "You found an energy generator!",
    desc: "Generate 10 energy per second.",
    cost: new Decimal(100),
    effectDisplay() {return null},
    pair: 0,
  },
  2: {
    title: "One",
    desc: "Gain more energy based on Red Button presses. (You won't be able to buy the other upgrade)",
    cost: new Decimal(200),
    effect() {
      switch (player.timesEscaped+1){
        case 1:
        case 2:
        case 3:
        case 5:
        case 6:
        case 7:
        case 8:
          return new Decimal(player.buttonPresses[1]).pow(0.75).add(1)
        break;
        case 4:
        case 9:
          return new Decimal(player.buttonPresses[1]).gte(50) ? new Decimal(player.buttonPresses[1]).pow(0.4).add(1) : new Decimal(player.buttonPresses[1]).pow(0.75).add(1)
        break;
      }
    },
    effectDisplay() {return `${format(UPGRADES[2].effect())}x energy/second`},
    pair: 3,
  },
  3: {
    title: "Two",
    desc: "Gain more energy based on Red Button presses. (You won't be able to buy the other upgrade)",
    cost: new Decimal(200),
    effect() {
      switch (player.timesEscaped+1){
        case 1:
        case 2:
        case 3:
        case 5:
        case 6:
        case 7:
        case 8:
          return new Decimal(player.buttonPresses[1]).gte(50) ? new Decimal(player.buttonPresses[1]).pow(0.4).add(1) : new Decimal(player.buttonPresses[1]).pow(0.75).add(1)
        break;
        case 4:
        case 9:
          return new Decimal(player.buttonPresses[1]).pow(0.75).add(1)
        break;
      }
    },
    effectDisplay() {return `${format(UPGRADES[3].effect())}x energy/second`},
    pair: 2,
  },
  4: {
    title: "Three",
    desc: "Gain more energy based on Blue Button presses. (You won't be able to buy the other upgrade)",
    cost: new Decimal(5000),
    effect() {
      switch (player.timesEscaped+1){
        case 1:
        case 3:
        case 4:
        case 8:
        case 9:
          return new Decimal(player.buttonPresses[4]).pow(2).add(1).min(500)
        break;
        case 2:
        case 5:
        case 6:
        case 7:
          return new Decimal(player.buttonPresses[4]).pow(2).add(1)
        break;
      }
    },
    effectDisplay() {return `${format(UPGRADES[4].effect())}x energy/second`},
    pair: 5,
  },
  5: {
    title: "Four",
    desc: "Gain more energy based on Blue Button presses. (You won't be able to buy the other upgrade)",
    cost: new Decimal(5000),
    effect() {
      switch (player.timesEscaped+1){
        case 1:
        case 3:
        case 4:
        case 8:
        case 9:
          return new Decimal(player.buttonPresses[4]).pow(2).add(1)
        break;
        case 2:
        case 5:
        case 6:
        case 7:
          return new Decimal(player.buttonPresses[4]).pow(2).add(1).min(500)
        break;
      }
    },
    effectDisplay() {return `${format(UPGRADES[5].effect())}x energy/second`},
    pair: 4,
  },
  6: {
    title: "Five",
    desc: "Gain more energy based on Yellow Button presses. (You won't be able to buy the other upgrade)",
    cost: new Decimal(1e10),
    effect() {
      return new Decimal(player.buttonPresses[2]).pow(0.8).add(1)
    },
    effectDisplay() {return `${format(UPGRADES[6].effect())}x energy/second`},
    pair: 7,
  },
  7: {
    title: "Six",
    desc: "Gain more energy based on unspent Countdown Points. (You won't be able to buy the other upgrade)",
    cost: new Decimal(1e10),
    effect() {
      return player.countdownPoints.add(1).pow(3)
    },
    effectDisplay() {return `${format(UPGRADES[7].effect())}x energy/second`},
    pair: 6,
  },
  8: {
    title: "Omega",
    desc: "Gain more energy based on energy.",
    cost: new Decimal(1e18),
    effect() {
      return player.energy.max(1).pow(0.05).add(1)
    },
    effectDisplay() {return `${format(UPGRADES[8].effect())}x energy/second`},
  },
};

function buyUpgrade(x) {
  if(player.energy.gte(UPGRADES[x].cost) && (!player.upgrades.includes(UPGRADES[x].pair)||hasEpsUpgrade(11)) && !player.upgrades.includes(x)){
    player.energy = player.energy.sub(UPGRADES[x].cost)
    player.upgrades.push(x)
  }
}

function hasUpgrade(x) {
  return player.upgrades.includes(x);
}

function upgAmt(){
  let buttonType = 0
  switch (player.timesEscaped+1) {
    case 4:
      buttonType = 1
    break;
    case 2:
    case 5:
    case 6:
    case 7:
      buttonType = 2
    break;
    case 1:
    case 3:
    case 8:
      buttonType = 3
    break;
    case 9:
      buttonType = 5
    break;
  }
  let amt = 0
  if(player.buttonPresses[buttonType] >= 5) amt++
  if(player.buttonPresses[buttonType] >= 10) amt += 2
  if(player.buttonPresses[buttonType] >= 25) amt += 2
  if(player.buttonPresses[buttonType] >= 50 && player.timesEscaped >= 3) amt += 2
  if(player.codeState === 3 && player.timesEscaped >= 8) amt++
  return amt
}

function escape1(){
    player.escapePoints = player.escapePoints.add(Decimal.pow(2,player.timesEscaped+player.extraTimesEscaped))
    player.totalEP = player.totalEP.add(Decimal.pow(2,player.timesEscaped+player.extraTimesEscaped))
    if(player.timesEscaped < 8){
      player.timesEscaped++
    }else{
      player.extraTimesEscaped++
    }
    player.gameBegun = false
    player.countdown = 120*(0.75**(player.timesEscaped+player.extraTimesEscaped))
    if(!hasMilestone(11)){
      player.energy = new Decimal(0)
      if(!hasEscUpgrade(8) && !hasMilestone(3)) player.upgrades = []
      player.buttonPresses = [null,0,0,0,0,0]
      if(!hasMilestone(1)) player.purpleMult = new Decimal(1)
      player.buyables[4] = 0
    }
    player.loreChangeDetect = true
    if(document.getElementById("countdown")) document.getElementById("countdown").style.color = "#FFFFFF"
}

const BUYABLES = {
  1: {
    desc: "Triple energy gain per purchase",
    cost() {
      return player.buyables[1] >= 10 ? new Decimal(2048).mul(Decimal.pow(2,(player.buyables[1]-10)**1.5)).div(hasEpsUpgrade(2)?EPS_UPGRADES[2].effect():1) : new Decimal(2).mul(Decimal.pow(2,player.buyables[1])).div(hasEpsUpgrade(2)?EPS_UPGRADES[2].effect():1)
    },
    effect() {
      return player.challenge == 2 ? new Decimal(1) : Decimal.pow(hasEscUpgrade(5) ? new Decimal(3).add(ESC_UPGRADES[5].effect()) : 3,player.buyables[1] + CHALLENGES[2].effect())
    },
    effectDisplay() {
      return format(BUYABLES[1].effect()) + "x energy";
    },
  },
  2: {
    desc: "Double button presses per purchase",
    cost() {
      return new Decimal(2).mul(Decimal.pow(3,player.buyables[2]))
    },
    effect() {
      return player.challenge == 2 ? 1 : new Decimal(2).pow(player.buyables[2]).min(1e300).toNumber()
    },
    effectDisplay() {
      return format(BUYABLES[2].effect()) + "x button presses";
    },
  },
  3: {
    desc: "Double CP gain per purchase",
    cost() {
      return new Decimal(10).mul(Decimal.pow(4,player.buyables[3]))
    },
    effect() {
      return player.challenge == 2 ? new Decimal(1) : Decimal.pow(hasEpsUpgrade(6)?2.2:2,player.buyables[3])
    },
    effectDisplay() {
      return format(BUYABLES[3].effect()) + "x Countdown Points";
    },
  },
}

const DECEL_BUYABLES = {
  1: {
    desc: "Double DP gain per purchase",
    cost() {
      return new Decimal(10).mul(Decimal.pow(5,player.buyables[5]))
    },
    effect() {
      return player.challenge == 2 ? new Decimal(1) : Decimal.pow(2,player.buyables[5])
    },
    effectDisplay() {
      return format(DECEL_BUYABLES[1].effect()) + "x Deceleration Power";
    },
  },
  2: {
    desc: "Make the time speed formula better",
    cost() {
      return new Decimal(100).mul(Decimal.pow(7,player.buyables[6]))
    },
    effect() {
      return player.challenge == 2 ? 10 : Math.max(10**(0.9**player.buyables[6]),1+2**-52)
    },
    effectDisplay() {
      return "Time Speed Logarithm base " + format(DECEL_BUYABLES[2].effect());
    },
  },
  3: {
    desc: "Multiply energy gain by 10 per purchase",
    cost() {
      return new Decimal(1000).mul(Decimal.pow(10,player.buyables[7]))
    },
    effect() {
      return player.challenge == 2 ? new Decimal(1) : Decimal.pow(new Decimal(10).mul(CONDENSERS[2].effect2()),player.buyables[7])
    },
    effectDisplay() {
      return format(DECEL_BUYABLES[3].effect()) + "x energy/second";
    },
  },
}

const SUPER_BUYABLES = {
  1: {
    desc: "Double generator production per purchase",
    cost() {
      return new Decimal(1e9).mul(Decimal.pow(10**(1+player.buyables[8]/3),player.buyables[8]))
    },
    effect() {
      return hasEscUpgrade(16) ? Decimal.pow(2,player.buyables[8]+player.buyables[9]) : Decimal.pow(2,player.buyables[8])
    },
    effectDisplay() {
      return format(SUPER_BUYABLES[1].effect()) + "x production";
    },
  },
  2: {
    desc: "Add 0.5 to the Super-Energy effect exponent per purchase",
    cost() {
      return new Decimal(5e9).mul(Decimal.pow(100**(1+player.buyables[9]/3),player.buyables[9]))
    },
    effect() {
      return ((player.buyables[9] + CHALLENGES[3].effect()) / 2)
    },
    effectDisplay() {
      return "+" + format(SUPER_BUYABLES[2].effect()) + " Super-Energy effect exponent";
    },
  },
  3: {
    desc: "Unlock a new Super-Energy boost per purchase",
    cost() {
      return player.buyables[10] >= 2 ? Infinity : new Decimal(1e10).mul(Decimal.pow(10**(player.buyables[10]+3),player.buyables[10]))
    },
    effectDisplay() {
      return player.buyables[10] + " new Super-Energy boosts";
    },
  },
}

function buyBuyable(x) {
  if(player.countdownPoints.gte(BUYABLES[x].cost())){
    if(!hasMilestone(5)) player.countdownPoints = player.countdownPoints.sub(BUYABLES[x].cost())
    player.buyables[x] += 1
  }
}

function buyEnergyBuyable() {
  if(player.energy.gte(energyBuyableCost())){
    player.energy = player.energy.sub(energyBuyableCost())
    player.buyables[4] += 1
  }
}

function buyDecelBuyable(x) {
  if(player.deceleratePower.gte(DECEL_BUYABLES[x].cost())){
    player.deceleratePower = player.deceleratePower.sub(DECEL_BUYABLES[x].cost())
    player.buyables[x+4] += 1
  }
}

function buySuperBuyable(x) {
  if(player.superEnergy.gte(SUPER_BUYABLES[x].cost())){
    player.superEnergy = player.superEnergy.sub(SUPER_BUYABLES[x].cost())
    player.buyables[x+7] += 1
  }
}

const ESC_UPGRADES = {
  1: {
    title: "Click Boost",
    desc: "Gain 5x more energy from clicking.",
    cost: new Decimal(1),
    effectDisplay() {null},
  },
  2: {
    title: "Potent Energy",
    desc: "Lower the Escape requirement based on Energy.",
    cost: new Decimal(2),
    effect() {return player.energy.max(1).log10().mul(2).add(1)},
    effectDisplay() {return "/" + format(ESC_UPGRADES[2].effect()) + " Escape Requirement"},
  },
  3: {
    title: "Past Experience",
    desc: "Gain more energy based on times Escaped.",
    cost: new Decimal(6),
    effect() {return new Decimal(player.timesEscaped+player.extraTimesEscaped).pow(2)},
    effectDisplay() {return format(ESC_UPGRADES[3].effect()) + "x energy/second"},
  },
  4: {
    title: "Generator Booster?",
    desc: "Unlock an Energy Buyable. (its amount resets when you die or escape)",
    cost: new Decimal(50),
    effectDisplay() {return null},
  },
  5: {
    title: "Buyable Augmentation",
    desc: "The base of the 1st Countdown Buyable is increased based on unspent CP.",
    cost: new Decimal(64),
    effect() {return player.countdownPoints.max(0).pow(0.4)},
    effectDisplay() {return "+" + format(ESC_UPGRADES[5].effect()) + " C. Buyable 1 base"},
  },
  6: {
    title: "Temporal Slowdown",
    desc: "Unlock the Decelerator.",
    cost: new Decimal(320),
    effectDisplay() {return null},
  },
  7: {
    title: "Optimism",
    desc: "All negative effects from buttons are nullified (except for the purple button multiplier randomness).",
    cost: new Decimal(512),
    effectDisplay() {return null},
  },
  8: {
    title: "Quality of Life",
    desc: "Keep Energy Upgrades on Death and Escape, and unlock Automation.",
    cost: new Decimal(1000),
    effectDisplay() {return null},
  },
  9: {
    title: "Art of Time",
    desc: "Multiply DP gain based on total Energy.",
    cost: new Decimal(30000),
    effect() {return player.totalEnergy.max(1).log10().div(4)},
    effectDisplay() {return format(ESC_UPGRADES[9].effect()) + "x DP gain"},
  },
  10: {
    title: "More Tools",
    desc: "Unlock the Energy Buyable Autobuyer and the Begin Game Autoclicker.",
    cost: new Decimal(200000),
    effectDisplay() {return null},
  },
  11: {
    title: "Synergism (wrong game)",
    desc: "Unlock Auto-Escape and CP and DP boost each other.",
    cost: new Decimal(6e7),
    effect() {return player.deceleratePower.max(1).log(10).add(1)},
    effect2() {return player.countdownPoints.max(1).log(5).add(1)},
    effectDisplay() {return format(ESC_UPGRADES[11].effect2()) + "x CP, " + format(ESC_UPGRADES[11].effect()) + "x DP"},
  },
  12: {
    title: "Art of Time II",
    desc: "The Time Speed formula is significantly better.",
    cost: new Decimal(2e8),
    effectDisplay() {return null},
  },
  13: {
    title: "Dilmod Energize",
    desc: "Unlock Super-Energy.",
    cost: new Decimal(8e8),
    effectDisplay() {return null},
  },
  14: {
    title: "Planck Time",
    desc: "Time Speed while Decelerated is divided based on your unspent EP.",
    cost: new Decimal(6e19),
    effect() {return player.escapePoints.max(0).pow(0.25).add(1).toNumber()},
    effectDisplay() {return "/" + format(ESC_UPGRADES[14].effect()) + " Time Speed"},
  },
  15: {
    title: "Unshackled",
    desc: "The summative generator multiplier hardcap is now a softcap.",
    cost: new Decimal(3e23),
    effectDisplay() {return null},
  },
  16: {
    title: "Finale",
    desc: "The 2nd SE buyable gives free levels to the 1st SE buyable, and multiply energy gain by escapes per upgrade.",
    cost: new Decimal(5e25),
    effect() {return new Decimal(player.timesEscaped+player.extraTimesEscaped).pow(player.escapeUpgrades.length)},
    effectDisplay() {return format(ESC_UPGRADES[16].effect()) + "x energy/second"},
  },
};

function buyEscUpgrade(x) {
  if(player.escapePoints.gte(ESC_UPGRADES[x].cost) && !player.escapeUpgrades.includes(x)){
    player.escapePoints = player.escapePoints.sub(ESC_UPGRADES[x].cost)
    player.escapeUpgrades.push(x)
  }
}

function hasEscUpgrade(x) {
  return player.escapeUpgrades.includes(x);
}

const GENERATORS = {
  1: {
    cost() {
      return new Decimal(1e7).mul(new Decimal(1.5).pow(player.generators[1]))
    },
    effect() {
      return player.generators[1].add(player.generators[7]).mul(summativeGeneratorMult()).mul(SUPER_BUYABLES[1].effect()).mul(hasMilestone(1)?10:1).mul(hasEpsUpgrade(10)?EPS_UPGRADES[10].effect():1).mul(CONDENSERS[1].effect2())
    },
    unl() {
      return true;
    },
  },
  2: {
    cost() {
      return new Decimal(1e9).mul(new Decimal(1.65).pow(player.generators[2]))
    },
    effect() {
      return player.generators[2].add(player.generators[8]).mul(5).mul(summativeGeneratorMult()).mul(SUPER_BUYABLES[1].effect()).mul(hasMilestone(1)?10:1).mul(hasEpsUpgrade(10)?EPS_UPGRADES[10].effect():1).mul(CONDENSERS[1].effect2())
    },
    unl() {
      return player.generators[1].gte(1) || player.generators[2].gte(1) || player.generators[3].gte(1) || player.generators[4].gte(1) || player.generators[5].gte(1) || player.generators[6].gte(1);
    },
  },
  3: {
    cost() {
      return new Decimal(5e9).mul(new Decimal(2).pow(player.generators[3]))
    },
    effect() {
      return player.generators[3].div(2).mul(summativeGeneratorMult()).mul(SUPER_BUYABLES[1].effect()).mul(hasMilestone(1)?10:1).mul(hasEpsUpgrade(10)?EPS_UPGRADES[10].effect():1).mul(CONDENSERS[1].effect2())
    },
    unl() {
      return player.generators[2].gte(1) || player.generators[3].gte(1) || player.generators[4].gte(1) || player.generators[5].gte(1) || player.generators[6].gte(1)
    },
  },
  4: {
    cost() {
      return new Decimal(1e10).mul(new Decimal(3).pow(player.generators[4]))
    },
    effect() {
      return player.generators[4].div(10).mul(summativeGeneratorMult()).mul(SUPER_BUYABLES[1].effect()).mul(hasMilestone(1)?10:1).mul(CONDENSERS[1].effect2())
    },
    unl() {
      return player.generators[3].gte(1) || player.generators[4].gte(1) || player.generators[5].gte(1) || player.generators[6].gte(1)
    },
  },
  5: {
    cost() {
      return new Decimal(2e11).mul(new Decimal(5).pow(player.generators[5]))
    },
    effect() {
      return player.generators[5].add(player.generators[9]).mul(30000).mul(summativeGeneratorMult()).mul(SUPER_BUYABLES[1].effect()).mul(hasMilestone(1)?10:1).mul(hasEpsUpgrade(10)?EPS_UPGRADES[10].effect():1).mul(CONDENSERS[1].effect2())
    },
    unl() {
      return player.generators[4].gte(1) || player.generators[5].gte(1) || player.generators[6].gte(1)
    },
  },
  6: {
    cost() {
      return new Decimal(1e13).mul(new Decimal(8).pow(player.generators[6]))
    },
    effect() {
      return player.generators[6].div(100).mul(summativeGeneratorMult()).mul(SUPER_BUYABLES[1].effect()).mul(hasMilestone(1)?10:1).mul(hasEpsUpgrade(10)?EPS_UPGRADES[10].effect():1).mul(CONDENSERS[1].effect2())
    },
    unl() {
      return player.generators[5].gte(1) || player.generators[6].gte(1)
    },
  },
}

function buyGenerator(x) {
  if(player.escapePoints.gte(GENERATORS[x].cost())){
    if(!hasMilestone(7)) player.escapePoints = player.escapePoints.sub(GENERATORS[x].cost())
    player.generators[x] = player.generators[x].add(1)
  }
}

function sellOne(x) {
  if(player.generators[x].gt(0)){
    player.generators[x] = player.generators[x].sub(1)
    if(!hasMilestone(7)
      ) player.escapePoints = player.escapePoints.add(GENERATORS[x].cost())
  }
}

function rowAmt() {
  let rows = 1
  if(player.escapeUpgrades.length >= 4) rows++
  if(player.escapeUpgrades.length >= 8) rows++
  if(player.escapeUpgrades.length >= 12) rows++
  return rows
}

document.addEventListener("keydown", function onEvent(event) {
  switch (event.key) {
    case "b":
      if(!player.gameBegun) player.gameBegun = true
    break;
    case "e":
      if(player.energy.gte(escapeReq())) escape1()
    break;
    case "d":
      if(hasEscUpgrade(6)) player.decelerated = !player.decelerated
    break;
    case "i":
      if(player.extraTimesEscaped >= 92) ε()
    break;
  }
});