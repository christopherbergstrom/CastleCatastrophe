// var enemy;
// var lifeAmount;
// var image;

// upgrades
// click damage
// arrow damage
// bomb damage
// fire damage
// heal amount

var clickDamage = 10;
var arrowDamage = 20;
var bombDamage = 30;
var fireDamage = 40;
var pLifeAmount = 480;
var healAmount = 0;
var goldAmount;
var levelAmount;
var hasArrows = false;
var hasBombs = false;
var hasFires = false;
// var goldAmount = 0;

var level = 1;
var enemyArray = [];
var timerArray = [];
var timeOutArray = [];
var num = -1;
var count = -1;
var body;
var pLoseLife = 0;
var pLife;
var arrow;
var arrowCount = 0;
var arrowArray = [];
var bomb;
var bombCount = 0;
var bombArray = [];
var fire;
var fireCount = 0;
var fireArray = [];

window.onload = function()
{
  body = document.querySelector("body");
  var start = document.getElementById("start");
  start.addEventListener("click", function()
  {
    start.parentNode.removeChild(start);
    whichLevel();
  });
  player = document.getElementById("player");
  pLife = document.getElementById("pLife");
  pImage = document.getElementById("pImage");
  levelAmount = document.getElementById("levelAmount");
  levelAmount.innerHTML = 1;
  goldAmount = document.getElementById("goldAmount");
  goldAmount.innerHTML = 0;
  addEventListener("keydown", function(e)
  {
    if (e.keyCode === 67 && hasArrows)
    {
      if (arrowCount < 4)
      {
        if (arrowCount === 0)
        {
          arrowBtn.style.backgroundImage = "url(../images/arrowBtn2.png)";
        }
        if (arrowCount === 1)
        {
          arrowBtn.style.backgroundImage = "url(../images/arrowBtn3.png)";
        }
        if (arrowCount === 2)
        {
          arrowBtn.style.backgroundImage = "url(../images/arrowBtn4.png)";
        }
        if (arrowCount === 3)
        {
          arrowBtn.parentNode.removeChild(arrowBtn);
          c.parentNode.removeChild(c);
        }
        arrowCount++;
        arrows();
      }
    }
    if (e.keyCode === 88 && hasBombs)
    {
      if (bombCount < 2)
      {
        if (bombCount === 0)
        {
          bombBtn.style.backgroundImage = "url(../images/bombBtn2.png)";
        }
        if (bombCount === 1)
        {
          bombBtn.parentNode.removeChild(bombBtn);
          x.parentNode.removeChild(x);
        }
        bombCount++;
        bombs();
      }
    }
    if (e.keyCode === 90 && hasFires)
    {
      if (fireCount < 1)
      {
        if (fireCount === 0)
        {
          fireBtn.parentNode.removeChild(fireBtn);
          z.parentNode.removeChild(z);
        }
        fireCount++;
        fires();
      }
    }
  });
};
function whichLevel()
{
  var newEnemy = setInterval(function()
  {
    var whichEnemy = Math.floor(Math.random()*3);
    if (whichEnemy === 0)
    {
      makeSmall();
    }
    if (whichEnemy === 1)
    {
      makeSoldier();
    }
    if (whichEnemy === 2)
    {
      makeHorse();
    }
  }, 500);
  var timeOut = setTimeout(function()
  {
    window.clearInterval(newEnemy);
    var check = setInterval(function()
    {
      var deadCount = 0;
      for (var i = 0; i < enemyArray.length; i++)
      {
        if (enemyArray[i].dead)
        {
          deadCount++;
        }
      }
      if (deadCount === enemyArray.length)
      {
        level++;
        window.clearInterval(check);
        window.clearInterval(timeOut);
        // upgrades
        // click damage
        // arrow damage
        // bomb damage
        // fire damage
        // heal amount
        var arrowBtn = document.getElementById("arrowBtn");
        var bombBtn = document.getElementById("bombBtn");
        var fireBtn = document.getElementById("fireBtn");
        var c = document.getElementById("c");
        var x = document.getElementById("x");
        var z = document.getElementById("z");
        if (arrowBtn)
        {
          arrowBtn.parentNode.removeChild(arrowBtn);
        }
        if (bombBtn)
        {
          bombBtn.parentNode.removeChild(bombBtn);
        }
        if (fireBtn)
        {
          fireBtn.parentNode.removeChild(fireBtn);
        }
        if (c)
        {
          c.parentNode.removeChild(c);
        }
        if (x)
        {
          x.parentNode.removeChild(x);
        }
        if (z)
        {
          z.parentNode.removeChild(z);
        }
        makeUpgradeMenu();
      }
    }, 500);
  }, level*500);
}
function makeUpgradeMenu()
{
  var upgradeWindow = document.getElementById("upgradeWindow");
  if (upgradeWindow)
  {
    upgradeWindow.parentNode.removeChild(upgradeWindow);
  }
  var upgradeWindow = document.createElement("span");
  upgradeWindow.setAttribute("id", "upgradeWindow");
  var upgrades = document.createElement("div");
  upgrades.setAttribute("id", "upgrades");
  upgrades.innerHTML="Upgrades";
  var clickDamageSpan = document.createElement("div");
  clickDamageSpan.setAttribute("class", "menu");
  clickDamage += 2;
  clickDamageSpan.innerHTML="Click Damage "+clickDamage+": 50 Gold";
  clickDamage -= 2;
  clickDamageSpan.addEventListener("click", function()
  {
    var currentGold = goldAmount.innerHTML;
    if (currentGold - 50 >= 0)
    {
      clickDamage += 2;
      subractGold(50);
      makeUpgradeMenu();
    }
  });
  var arrowDamageSpan = document.createElement("div");
  arrowDamageSpan.setAttribute("class", "menu");
  if (hasArrows)
  {
    arrowDamage +=2;
    arrowDamageSpan.innerHTML="Arrow Damage "+arrowDamage+": 50 Gold";
    arrowDamage -=2;
    arrowDamageSpan.addEventListener("click", function()
    {
      var currentGold = goldAmount.innerHTML;
      if (currentGold - 50 >= 0)
      {
        arrowDamage += 2;
        subractGold(50);
        makeUpgradeMenu();
      }
    });
  }
  else
  {
    arrowDamageSpan.innerHTML="Arrows: 75 Gold";
    arrowDamageSpan.addEventListener("click", function()
    {
      var currentGold = goldAmount.innerHTML;
      if (currentGold - 75 >= 0)
      {
        subractGold(75);
        hasArrows = true;
        makeUpgradeMenu();
      }
    });
  }
  var bombDamageSpan = document.createElement("div");
  bombDamageSpan.setAttribute("class", "menu");
  if (hasBombs)
  {
    bombDamage +=2;
    bombDamageSpan.innerHTML="Bomb Damage "+bombDamage+": 50 Gold";
    bombDamage -=2;
    bombDamageSpan.addEventListener("click", function()
    {
      var currentGold = goldAmount.innerHTML;
      if (currentGold - 50 >= 0)
      {
        bombDamage += 2;
        subractGold(50);
        makeUpgradeMenu();
      }
    });
  }
  else
  {
    bombDamageSpan.innerHTML="Bombs: 75 Gold";
    bombDamageSpan.addEventListener("click", function()
    {
      var currentGold = goldAmount.innerHTML;
      if (currentGold - 75 >= 0)
      {
        subractGold(75);
        hasBombs = true;
        makeUpgradeMenu();
      }
    });
  }
  var fireDamageSpan = document.createElement("div");
  fireDamageSpan.setAttribute("class", "menu");
  if (hasFires)
  {
    fireDamage +=2;
    fireDamageSpan.innerHTML="Fire Damage "+fireDamage+": 50 Gold";
    fireDamage -=2;
    fireDamageSpan.addEventListener("click", function()
    {
      var currentGold = goldAmount.innerHTML;
      if (currentGold - 50 >= 0)
      {
        fireDamage += 2;
        subractGold(50);
        makeUpgradeMenu();
      }
    });
  }
  else
  {
    fireDamageSpan.innerHTML="Fire: 75 Gold";
    fireDamageSpan.addEventListener("click", function()
    {
      var currentGold = goldAmount.innerHTML;
      if (currentGold - 75 >= 0)
      {
        subractGold(75);
        hasFires = true;
        makeUpgradeMenu();
      }
    });
  }
  var lifeHealSpan = document.createElement("div");
  lifeHealSpan.setAttribute("class", "menu");
  lifeHealSpan.innerHTML="Life Heal 50: 50 Gold";
  lifeHealSpan.addEventListener("click", function()
  {
    var currentGold = goldAmount.innerHTML;
    if (currentGold - 50 >= 0)
    {
      subractGold(50);
      pLifeAmount += 50;
      pLife.style.width = pLifeAmount+"px";
    }
  });
  var next = document.createElement("div");
  next.setAttribute("class", "menu");
  next.innerHTML="Level "+level;
  next.addEventListener("click", function()
  {
    upgradeWindow.parentNode.removeChild(upgradeWindow);
    levelAmount.innerHTML++;
    if (hasArrows)
    {
      arrowCount = 0;
      for (var i = 0; i < 4; i++)
      {
        if (arrowArray[i])
        {
          arrowArray[i].parentNode.removeChild(arrowArray[i]);
        }
      }
      arrowArray = [];

      var arrowBtn = document.createElement("span");
      arrowBtn.setAttribute("id", "arrowBtn");
      var c = document.createElement("span");
      c.setAttribute("id", "c");
      c.innerHTML="C";
      body.appendChild(arrowBtn);
      body.appendChild(c);
    }
    if (hasBombs)
    {
      bombCount = 0;
      for (var i = 0; i < 2; i++)
      {
        if (bombArray[i])
        {
          bombArray[i].parentNode.removeChild(bombArray[i]);
        }
      }
      bombArray = [];

      var bombBtn = document.createElement("span");
      bombBtn.setAttribute("id", "bombBtn");
      var x = document.createElement("span");
      x.setAttribute("id", "x");
      x.innerHTML="X";
      body.appendChild(bombBtn);
      body.appendChild(x);
    }
    if (hasFires)
    {
      fireCount = 0;
      for (var i = 0; i < 1; i++)
      {
        if (fireArray[i])
        {
          fireArray[i].parentNode.removeChild(fireArray[i]);
        }
      }
      fireArray = [];

      var fireBtn = document.createElement("span");
      fireBtn.setAttribute("id", "fireBtn");
      var z = document.createElement("span");
      z.setAttribute("id", "z");
      z.innerHTML="Z";
      body.appendChild(fireBtn);
      body.appendChild(z);
    }
    whichLevel();
  });
  upgradeWindow.appendChild(upgrades);
  upgradeWindow.appendChild(clickDamageSpan);
  upgradeWindow.appendChild(arrowDamageSpan);
  upgradeWindow.appendChild(bombDamageSpan);
  upgradeWindow.appendChild(fireDamageSpan);
  upgradeWindow.appendChild(lifeHealSpan);
  upgradeWindow.appendChild(next);
  body.appendChild(upgradeWindow);
}
function makeSmall()
{
  num ++;
  var enemy = document.createElement("span");
  var life = document.createElement("div");
  var image = document.createElement("div");
  var lifeAmount = 30;
  var index = num;
  var madeIt = false;
  var timeNum = -1;
  var dead = false;
  enemy.setAttribute("class", "small");
  enemy.setAttribute("id", num);
  life.setAttribute("class", "smallLife");
  image.setAttribute("class", "smallImage");
  var enemyIndex = {enemy:enemy, life:life, image:image, lifeAmount:lifeAmount, index:index, madeIt:madeIt, timeNum:timeNum, dead:dead};

  image.addEventListener("mousedown", function()
  {
    down(life, index);
  });
  // image.addEventListener("mouseup", up);
  enemyArray.push(enemyIndex);
  enemy.appendChild(life);
  enemy.appendChild(image);
  body.appendChild(enemy);
  var pRect = pImage.getBoundingClientRect();
  moveSmall(index, pRect.right);
}
function makeSoldier()
{
  num ++;
  var enemy = document.createElement("span");
  var life = document.createElement("div");
  var image = document.createElement("div");
  var lifeAmount = 50;
  var index = num;
  var madeIt = false;
  var timeNum = -1;
  var dead = false;
  enemy.setAttribute("class", "soldier");
  enemy.setAttribute("id", num);
  life.setAttribute("class", "soldierLife");
  image.setAttribute("class", "soldierImage");
  var enemyIndex = {enemy:enemy, life:life, image:image, lifeAmount:lifeAmount, index:index, madeIt:madeIt, timeNum:timeNum, dead:dead};

  image.addEventListener("mousedown", function()
  {
    down(life, index);
  });
  // image.addEventListener("mouseup", up);
  enemyArray.push(enemyIndex);
  enemy.appendChild(life);
  enemy.appendChild(image);
  body.appendChild(enemy);
  var pRect = pImage.getBoundingClientRect();
  moveSoldier(index, pRect.right);
}
function makeHorse()
{
  num ++;
  var enemy = document.createElement("span");
  var life = document.createElement("div");
  var image = document.createElement("div");
  var lifeAmount = 120;
  var index = num;
  var madeIt = false;
  var timeNum = -1;
  var dead = false;
  enemy.setAttribute("class", "horse");
  enemy.setAttribute("id", num);
  life.setAttribute("class", "horseLife");
  image.setAttribute("class", "horseImage");
  var enemyIndex = {enemy:enemy, life:life, image:image, lifeAmount:lifeAmount, index:index, madeIt:madeIt, timeNum:timeNum, dead:dead};

  image.addEventListener("mousedown", function()
  {
    down(life, index);
  });
  // image.addEventListener("mouseup", up);
  enemyArray.push(enemyIndex);
  enemy.appendChild(life);
  enemy.appendChild(image);
  body.appendChild(enemy);
  var pRect = pImage.getBoundingClientRect();
  moveHorse(index, pRect.right);
}
function down(life, index)
{
  if (enemyArray[index].lifeAmount > 0)
  {
    enemyArray[index].lifeAmount -= clickDamage;
    enemyArray[index].life.style.width = enemyArray[index].lifeAmount + "px";
  }
  if (enemyArray[index].lifeAmount <= 0)
  {
    addGold(enemyArray[index].enemy.className);
    // console.log("noLife index: "+enemyArray[index].index);
    enemyArray[index].enemy.parentNode.removeChild(enemyArray[index].enemy);
    enemyArray[index].madeIt = false;
    enemyArray[index].dead = true;
    stopLoseLife(index);
    stopMove(index);
  }
}
function arrows()
{
  // console.log(arrowCount);
  arrow = document.createElement("div");
  arrow.setAttribute("class", "arrow");
  body.insertBefore(arrow, player);
  arrowArray.push(arrow);
  var wait = setTimeout(function()
  {
    arrow.style.transition = ".5s linear";
    arrow.style.left = screen.width * .75 + "px";
    arrow.style.top = screen.height * 0.75 + "px";
  }, 50);
  var shoot = setTimeout(function()
  {
    if (enemyArray.length > 0)
    {
      for (var i = 0; i < enemyArray.length; i++)
      {
        // console.log(enemyArray[i]);
        // console.log(screen.width * 0.75 + "px");
        // console.log("left: "+enemyArray[i].enemy.style.left);
        var enemyRect = enemyArray[i].enemy.getBoundingClientRect();
        // console.log(enemyRect.left + "px");
        if (enemyRect.right >= screen.width * 0.75)
        {
          // console.log("in if");
          if (enemyArray[i].lifeAmount > 0)
          {
            enemyArray[i].lifeAmount -= arrowDamage;
            enemyArray[i].life.style.width = enemyArray[i].lifeAmount + "px";
          }
          if (enemyArray[i].lifeAmount <= 0 && enemyArray[i].dead === false)
          {
            addGold(enemyArray[i].enemy.className);
            // console.log("noLife i: "+enemyArray[i].index);
            enemyArray[i].enemy.parentNode.removeChild(enemyArray[i].enemy);
            enemyArray[i].madeIt = false;
            enemyArray[i].dead = true;
            stopLoseLife(i);
            stopMove(i);
          }
        }
      }
    }
  }, 550);
}
function bombs()
{
  // console.log(bombCount);
  bomb = document.createElement("div");
  bomb.setAttribute("class", "bomb");
  body.insertBefore(bomb, player);
  bombArray.push(bomb);
  var wait = setTimeout(function()
  {
    bomb.style.transition = ".5s linear";
    bomb.style.left = screen.width * .55 + "px";
    bomb.style.top = screen.height * 0.65 + "px";
    var wait1 = setTimeout(function()
    {
      bomb.style.backgroundImage = "url(../images/bomb2.png)";
    }, 400);
    var wait2 = setTimeout(function()
    {
      bomb.style.backgroundImage = "url(../images/bomb3.png)";
    }, 600);
    var wait3 = setTimeout(function()
    {
      bomb.style.backgroundImage = "url(../images/blankSmall.png)";
    }, 700);
  }, 50);
  var shoot = setTimeout(function()
  {
    if (enemyArray.length > 0)
    {
      for (var i = 0; i < enemyArray.length; i++)
      {
        // console.log(enemyArray[i]);
        // console.log(screen.width * 0.75 + "px");
        // console.log("left: "+enemyArray[i].enemy.style.left);
        var enemyRect = enemyArray[i].enemy.getBoundingClientRect();
        // console.log(enemyRect.left + "px");
        if (enemyRect.right >= screen.width * 0.55 && enemyRect.left <= screen.width * 0.75)
        {
          // console.log("in if");
          if (enemyArray[i].lifeAmount > 0)
          {
            enemyArray[i].lifeAmount -= bombDamage;
            enemyArray[i].life.style.width = enemyArray[i].lifeAmount + "px";
          }
          if (enemyArray[i].lifeAmount <= 0 && enemyArray[i].dead === false)
          {
            addGold(enemyArray[i].enemy.className);
            // console.log("noLife i: "+enemyArray[i].index);
            enemyArray[i].enemy.parentNode.removeChild(enemyArray[i].enemy);
            enemyArray[i].madeIt = false;
            enemyArray[i].dead = true;
            stopLoseLife(i);
            stopMove(i);
          }
        }
      }
    }
  }, 550);
}
function fires()
{
  // console.log(fireCount);
  fire = document.createElement("div");
  fire.setAttribute("class", "fire");
  body.insertBefore(fire, player);
  fireArray.push(fire);
  var wait = setTimeout(function()
  {
    fire.style.transition = ".15s linear";
    fire.style.right = screen.width * .55 + "px";
    fire.style.top = screen.height * 0.65 + "px";
    var wait1 = setTimeout(function()
    {
      fire.style.backgroundImage = "url(../images/flame.png)";
    }, 200);
    var wait2 = setTimeout(function()
    {
      fire.style.backgroundImage = "url(../images/blankBig.png)";
    }, 400);
  }, 50);
  var shoot = setTimeout(function()
  {
    if (enemyArray.length > 0)
    {
      for (var i = 0; i < enemyArray.length; i++)
      {
        // console.log(enemyArray[i]);
        // console.log(screen.width * 0.75 + "px");
        // console.log("left: "+enemyArray[i].enemy.style.left);
        var enemyRect = enemyArray[i].enemy.getBoundingClientRect();
        // console.log(enemyRect.left + "px");
        if (enemyRect.left <= screen.width * 0.55)
        {
          // console.log("in if");
          if (enemyArray[i].lifeAmount > 0)
          {
            enemyArray[i].lifeAmount -= fireDamage;
            enemyArray[i].life.style.width = enemyArray[i].lifeAmount + "px";
          }
          if (enemyArray[i].lifeAmount <= 0 && enemyArray[i].dead === false)
          {
            addGold(enemyArray[i].enemy.className);
            // console.log("noLife i: "+enemyArray[i].index);
            enemyArray[i].enemy.parentNode.removeChild(enemyArray[i].enemy);
            enemyArray[i].madeIt = false;
            enemyArray[i].dead = true;
            stopLoseLife(i);
            stopMove(i);
          }
        }
      }
    }
  }, 550);
}
function moveSmall(index, playerX)
{
  var eRect;
  enemyArray[index].enemy.style.position = "absolute";
  enemyArray[index].enemy.style.transition = "8s linear";
  enemyArray[index].enemy.style.left = screen.width * 0.3301 + "px";
  var time = setTimeout(function()
  {
    // console.log(screen.width * 0.3301 + "px");
    // console.log(enemyArray[index].enemy.style.left);
    if (enemyArray[index].enemy.style.left == screen.width * 0.3301 + "px" && timeOutArray[index].test)
    {
      // console.log("made it: "+index);
      count ++;
      enemyArray[index].madeIt = true;
      enemyArray[index].timeNum = count;
      loseLifeSmall(index);
    }
  }, 8000);
  // console.log("after time declaration");
  var test = true;
  var timeOutIndex = {test:test};
  timeOutArray.push(timeOutIndex);
}
function moveSoldier(index, playerX)
{
  var eRect;
  enemyArray[index].enemy.style.position = "absolute";
  enemyArray[index].enemy.style.transition = "10s linear";
  enemyArray[index].enemy.style.left = screen.width * 0.3301 + "px";
  var time = setTimeout(function()
  {
    // console.log(screen.width * 0.3301 + "px");
    // console.log(enemyArray[index].enemy.style.left);
    if (enemyArray[index].enemy.style.left == screen.width * 0.3301 + "px" && timeOutArray[index].test)
    {
      // console.log("made it: "+index);
      count ++;
      enemyArray[index].madeIt = true;
      enemyArray[index].timeNum = count;
      loseLifeSoldier(index);
    }
  }, 10000);
  // console.log("after time declaration");
  var test = true;
  var timeOutIndex = {test:test};
  timeOutArray.push(timeOutIndex);
}
function moveHorse(index, playerX)
{
  var eRect;
  enemyArray[index].enemy.style.position = "absolute";
  enemyArray[index].enemy.style.transition = "12s linear";
  enemyArray[index].enemy.style.left = screen.width * 0.3301 + "px";
  var time = setTimeout(function()
  {
    // console.log(screen.width * 0.3301 + "px");
    // console.log(enemyArray[index].enemy.style.left);
    if (enemyArray[index].enemy.style.left == screen.width * 0.3301 + "px" && timeOutArray[index].test)
    {
      // console.log("made it: "+index);
      count ++;
      enemyArray[index].madeIt = true;
      enemyArray[index].timeNum = count;
      loseLifeHorse(index);
    }
  }, 12000);
  // console.log("after time declaration");
  var test = true;
  var timeOutIndex = {test:test};
  timeOutArray.push(timeOutIndex);
}
function loseLifeSmall(index)
{
  var pLoseLife = window.setInterval(function()
  {
    if (enemyArray[index].madeIt)
    {
      if (pLifeAmount > 0)
      {
        pLifeAmount -= 2;
        pLife.style.width = pLifeAmount + "px";
      }
      if (pLifeAmount <= 0)
      {
        // console.log("dead");
        dead();
      }
    }
  }, 1000);
  var test = false;
  var timerIndex = {timer:pLoseLife, test:test};
  timerArray.push(timerIndex);
}
function loseLifeSoldier(index)
{
  var pLoseLife = window.setInterval(function()
  {
    if (enemyArray[index].madeIt)
    {
      if (pLifeAmount > 0)
      {
        pLifeAmount -= 4;
        pLife.style.width = pLifeAmount + "px";
      }
      if (pLifeAmount <= 0)
      {
        // console.log("dead");
        dead();
      }
    }
  }, 1000);
  var timerIndex = {timer:pLoseLife};
  timerArray.push(timerIndex);
}
function loseLifeHorse(index)
{
  var pLoseLife = window.setInterval(function()
  {
    if (enemyArray[index].madeIt)
    {
      if (pLifeAmount > 0)
      {
        pLifeAmount -= 6;
        pLife.style.width = pLifeAmount + "px";
      }
      if (pLifeAmount <= 0)
      {
        // console.log("dead");
        dead();
      }
    }
  }, 1000);
  var timerIndex = {timer:pLoseLife};
  timerArray.push(timerIndex);
}
function dead()
{
  player.parentNode.removeChild(player);
  stopLoseLife();
}
function stopMove(index)
{
  // console.log("stopMove index: "+index);
  // console.log("test before: "+timeOutArray[index].test);
  if (index >= 0)
  {
    if (timeOutArray.length > 0)
    {
      timeOutArray[index].test = false;
      // console.log("test after: "+timeOutArray[index].test);
    }
  }
}
function stopLoseLife(index)
{
  // console.log("stopLoseLife index: "+index);
  if (index >= 0 && index)
  {
    if (timerArray.length > 0)
    {
      // console.log(enemyArray[index].timeNum);
      var x = enemyArray[index].timeNum;
      if (x >= 0)
      {
        window.clearInterval(timerArray[x].timer);
      }
    }
  }
  else
  {
    for (var i = 0; i < timerArray.length; i++)
    {
      window.clearInterval(timerArray[i].timer);
    }
  }
}
function addGold(kind)
{
  if (kind === "small")
  {
    for (var i = 0; i < 2; i++)
    {
      goldAmount.innerHTML ++;
    }
  }
  else if (kind === "soldier")
  {
    for (var i = 0; i < 4; i++)
    {
      goldAmount.innerHTML ++;
    }
  }
  else if (kind === "horse")
  {
    for (var i = 0; i < 6; i++)
    {
      goldAmount.innerHTML ++;
    }
  }
}
function subractGold(money)
{
  for (var i = 0; i < money; i++)
  {
    goldAmount.innerHTML --;
  }
}
