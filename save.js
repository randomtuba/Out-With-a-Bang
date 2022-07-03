var player = {};

function start() {
  let a = {
    energy: new Decimal(0),
    totalEnergy: new Decimal(0),
    buttonPresses: [
      null,0,0,0,0,0,
    ],
    currentTab: 'dashboard',
    countdown: 120,
    gameBegun: false,
    upgrades: [],
    countdownPoints: new Decimal(0),
    timesDied: 0,
    ehehe: 0,
    escapePoints: new Decimal(0),
    timesEscaped: 0,
    extraTimesEscaped: 0,
    escapeUpgrades: [],
    totalButtonPresses: 0,
    loreChangeDetect: false,
    buyables: [null,0,0,0,0,0,0,0,0,0,0,0],
    purpleMult: new Decimal(1),
    cooldown: new Decimal(0),
    code: "",
    codeState: 0,
    currentSubtab: 'upgrades',
    deceleratePower: new Decimal(0),
    decelerated: false,
    autobuyers: [null,false,false,false,false,false,false],
    epsilonAutobuyers: [null,false,false,false,false],
    superEnergy: new Decimal(0),
    generators: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
    epsilons: 0,
    instantPoints: new Decimal(0),
    achievements: [],
    epsilonTab: 'milestones',
    epsilonUpgrades: [],
    antiEpilepsy: false,
    timePlayed: 0,
    challengeTimes: [null,600,600,600,600],
    timeInChallenge: 0,
    challenge: 0,
    spacetime: [null,new Decimal(0),new Decimal(0),new Decimal(0),0,0,0],
    dilated: false,
    dilatedTime: new Decimal(0),
    gameWon: false,
  };
  return a;
}
function save() {
  localStorage.setItem("saveSlot", btoa(JSON.stringify(player)));
}
function fixSave() {
  let defaultData = start();

  fixData(defaultData, player);
}

function fixData(defaultData, newData) {
  for (item in defaultData) {
    if (defaultData[item] == null) {
      if (newData[item] === undefined) newData[item] = null;
    } else if (Array.isArray(defaultData[item])) {
      if (newData[item] === undefined) newData[item] = defaultData[item];
      else fixData(defaultData[item], newData[item]);
    } else if (defaultData[item] instanceof Decimal) {
      // Convert to Decimal
      if (newData[item] === undefined) newData[item] = defaultData[item];
      else newData[item] = new Decimal(newData[item]);
    } else if (!!defaultData[item] && typeof defaultData[item] === "object") {
      if (newData[item] === undefined || typeof defaultData[item] !== "object")
        newData[item] = defaultData[item];
      else fixData(defaultData[item], newData[item]);
    } else {
      if (newData[item] === undefined) newData[item] = defaultData[item];
    }
  }
}
function load() {
  let get = localStorage.getItem("saveSlot");

  if (get === null || get === undefined) {
    player = start();
  } else {
    player = Object.assign(
      start(),
      JSON.parse(decodeURIComponent(escape(atob(get))))
    );
    fixSave();
  }
  app = new Vue({
    el: "#app",
    data: {
      player,
      Decimal,
      format,
      tmp,
      upgAmt,
    },
  });
}
setInterval(function () {
  save();
}, 5000);
window.onload = function () {
  load();
};

function exportSave() {
  let str = btoa(JSON.stringify(player));
  const el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  el.setSelectionRange(0, 99999);
  document.execCommand("copy");
  document.body.removeChild(el);
  alert("Save successfully copied to clipboard!");
}

function importSave(imported = undefined) {
  if (imported === undefined) imported = prompt("Paste your save here");
  player = JSON.parse(atob(imported));
  save();
  window.location.reload();
}
function hardReset() {
  if (
    confirm(
      "Are you sure??? It will reset EVERYTHING and you will not get any reward!!!"
    )
  ) {
    player = start();
    window.location.reload();
    save();
  }
}