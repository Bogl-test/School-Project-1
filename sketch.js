// GAME VARIABLES:
let matrixGif;  // BG
let Screen = 1  // Screen that the player starts on
let arrowY;   // var

let xp_count = 0 // how much xp the player has
let xp_to_level_up = 20
let high_score = 0
let bossesKilled = 0;
let score = 0; // Enemies killed

let gameTime = 100  // time before player can start the game
let gameStartTime;  // timer


// ammo crate
let ammo_crate_drop = false   // var
let ammo_crate_spawn_time = 10000   // time to spawn ammo crate (10 secs)
let ammo_crate_start_time;          // timer for ammo crate
let ammo_crate_x; // var
let ammo_crate_y; // var
let ammo_crate_size = 32  // ammo crate size

let end_screen_time = 800 // matrix glitch effect lenght when killed
let end_screen_start_time;  // timer

// controls screen
let loading_meter = 0 // var 
let loading_meter_intervals;

//difficulty
let easy_mode = true
let medium_mode = false
let hard_mode = false

// Game features
let attack = false // letting the player shoot
let controls = false // letting the player move
let locked = false // disabling the mouse movement

// list of symbols used for the bullet
let matrixSymbols =
  ["日", "ﾊ", "ﾐ", "ﾋ", "ｰ", "ｳ", "ｼ", "ﾅ", "ﾓ", "ﾆ", "ｻ", "ﾜ", "ﾂ", "ｵ",
    "ﾘ", "ｱ", "ﾎ", "ﾃ", "ﾏ", "ｹ", "ﾒ", "ｴ", "ｶ", "ｷ", "ﾑ", "ﾕ", "ﾗ", "ｾ", "ﾈ",
    "ｽ", "ﾀ", "ﾇ", "ﾍ", "ｦ", "ｲ", "ｸ", "ｺ", "ｿ", "ﾁ", "ﾄ", "ﾉ", "ﾌ", "ﾔ", "ﾖ",
    "ﾙ", "ﾚ", "ﾛ", "ﾝ", "0", "1", "2", "3", "4", "5", "7", "8", "9", "Z", ":",
    "・", ".", "=", "*", "+", "-", "<", ">", "¦", "╌", "ç", "ﾘ", "ｸ"];

// PLAYER VARIABLES:
let playerSize = 40;
let playerSpeed = 2
let playerPos;
let show_Player_2 = false   // player shooting sprite
let player2_Display_Time = 100; // how long the shooting sprite shows
let player2_Display_Start_Time; // timer for shooting sprite
let playerHealth = 5

let stamina_amount = 100 // starting stamina
let stamina_regen_amount = 1  // amount of stamina the player gets every tick
let stamina_regen_time = 100  // how long there goes inbetween every tick
let stamina_regen_start_time; // timer for stamina regen
let max_stamina = 100

let roll_time = 300 // downtime for rolling
let roll_start_time;  // timer to keep track of time since last roll
let roll_distance = 65;
let bullet_cost = 3 // how much stamina shooting costs
let roll_cost = 10  // how much stamina rolling costs

let bulletDamage = 1  // damage done to bosses
let bulletCount = []; // keeps track of every bullet on screen
let bulletSpeed = 12;
let bulletSize = 6;

// ENEMY VARIABLES:
let enemyCount = [];  // keeps track of every enemy
let enemySpeed = 1;
let enemySize = 30;
let enemyTarget;  // var
let easyEnemySpeed = 1
let mediumEnemySpeed = 1.5
let hardEnemySpeed = 2
let waveLenght = 100 // lenght of enemy waves

let boss_indication_time = 1500 // time that boos spawn location indication stays on screen (1.5 sec)
let boss_indication_start_time; // timer
let boss_count = [] // keeps track of bosses
let warningCycle = 0  // var
let warningCycleCount = 5 // amount of warning indications
let bossSize = enemySize * 12
// BH = BossHealth
let BH = 30
let BossHealth = BH

// Determines at what point count the boss should spawn at (1 = 100). measurment is score.
const bossSpawnValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];


// Loads a gif used for the menu screen. 
// Also loads the music, images and sfx.
function preload() {
  gif_loadImg = loadImage("assets/matrix.gif");
  School_Project_BG = loadImage("assets/BG.png")
  player_1 = loadImage("assets/player_1.png ");
  player_2 = loadImage("assets/player_2.png ");

  menu_Music = loadSound("assets/Menu.mp3")
  lvl1_Music = loadSound("assets/lvl1.mp3")
  lvl2_Music = loadSound("assets/lvl2.mp3")
  lvl3_Music = loadSound("assets/lvl3.mp3")
  enemy_death = loadSound("assets/death.mp3")
  glock19_shoot = loadSound("assets/glock19-shoot.mp3");
}

// Level up
function level_up() {
  if (xp_count >= xp_to_level_up) {
    playerSpeed = playerSpeed * 1.2
    bulletDamage = bulletDamage * 1.1
    xp_to_level_up = floor(xp_to_level_up * 1.5)
    xp_count = 0
    if (playerHealth < 5)
      playerHealth++
  }
}

function Ammo_Crate() {
  if (!ammo_crate_drop && millis() - ammo_crate_start_time > ammo_crate_spawn_time) {
    push()
    rectMode(CENTER)
    fill(0, 0, 255)
    rect(ammo_crate_x, ammo_crate_y, ammo_crate_size)
    pop()
  }
  if (dist(playerPos.x, playerPos.y, ammo_crate_x, ammo_crate_y) < (playerSize + ammo_crate_size) / 2) {
    ammo_crate_start_time = undefined;
    stamina_amount += floor(random(20, 50))
  }
}

//Player Healthbar
function healthBar() {
  push()
  rectMode(CENTER)
  fill(208, 57, 57)
  rect(0, playerSize / 2 - 1, playerSize, 4)
  if (playerHealth == 5) {
    fill(34, 180, 76)
    rect(0, playerSize / 2 - 1, playerSize, 4)
  } else if (playerHealth == 4) {
    fill(34, 180, 76)
    rect(0, playerSize / 2 - 1, playerSize / 5 * 4, 4)
  } else if (playerHealth == 3) {
    fill(34, 180, 76)
    rect(0, playerSize / 2 - 1, playerSize / 5 * 3, 4)
  } else if (playerHealth == 2) {
    fill(34, 180, 76)
    rect(0, playerSize / 2 - 1, playerSize / 5 * 2, 4)
  } else if (playerHealth == 1) {
    fill(34, 180, 76)
    rect(0, playerSize / 2 - 1, playerSize / 5, 4)
  }
  pop()
}

// Stamina Bar
function stamina_bar() {
  push()
  fill(0, 255, 0)
  rect(-25, 30, stamina_amount / 2, 5)
  noFill()
  strokeWeight(2)
  stroke(49, 113, 63, 230)
  rect(-25, 30, 50, 5)
  pop()
}

// Crosshair for Player
function cross_hair() {
  push()
  translate(mouseX, mouseY)
  fill(0, 100, 255)
  noStroke()
  rectMode(CENTER)
  rect(0, 0, 2, 2)
  rect(0, -13, 3, 6)
  rect(0, 13, 3, 6)
  rect(-13, 0, 6, 3)
  rect(13, 0, 6, 3)
  pop()
}

// PLAYER STRUCTURE:
function player() {
  if (playerHealth <= 0) {
    Screen = 3
  }
  cross_hair();
  push();
  angleMode(DEGREES);
  let v0 = createVector(playerPos.x, 0);
  let v1 = createVector(mouseX - playerPos.x, mouseY - playerPos.y);
  rotation = v0.angleBetween(v1);
  translate(playerPos.x, playerPos.y);
  rotate(rotation + 90);
  stamina_bar()


  // PLAYER APPEARANCE:
  if (show_Player_2 && millis() - player2_Display_Start_Time < player2_Display_Time) {
    image(player_2, -50, -75);
  } else {
    image(player_1, -50, -75);
  }
  healthBar();
  if (stamina_amount > max_stamina) {
    stamina_amount = max_stamina
  }
  pop();

  // PLAYER MOVEMENT:
  if (typeof roll_start_time == "undefined") {
    roll_start_time = millis()
  }
  if (keyIsDown(65) && keyIsDown(87) || keyIsDown(LEFT_ARROW) && keyIsDown(UP_ARROW)) {
    playerPos.x -= (playerSpeed / sqrt(50) * 5);
    playerPos.y -= (playerSpeed / sqrt(50) * 5);
    if (keyIsDown(32) && stamina_amount >= 10 && millis() - roll_start_time > roll_time) {
      playerPos.x -= (playerSpeed / sqrt(50) * 5) * roll_distance;
      playerPos.y -= (playerSpeed / sqrt(50) * 5) * roll_distance;
      stamina_amount -= roll_cost
      roll_start_time = undefined
    }
  }
  else if (keyIsDown(65) && keyIsDown(83) || keyIsDown(LEFT_ARROW) && keyIsDown(DOWN_ARROW)) {
    playerPos.x -= (playerSpeed / sqrt(50) * 5);
    playerPos.y += (playerSpeed / sqrt(50) * 5);
    if (keyIsDown(32) && stamina_amount >= 10 && millis() - roll_start_time > roll_time) {
      playerPos.x -= (playerSpeed / sqrt(50) * 5) * roll_distance;
      playerPos.y += (playerSpeed / sqrt(50) * 5) * roll_distance;
      stamina_amount -= roll_cost
      roll_start_time = undefined
    }
  }
  else if (keyIsDown(68) && keyIsDown(87) || keyIsDown(RIGHT_ARROW) && keyIsDown(UP_ARROW)) {
    playerPos.x += (playerSpeed / sqrt(50) * 5);
    playerPos.y -= (playerSpeed / sqrt(50) * 5);
    if (keyIsDown(32) && stamina_amount >= 10 && millis() - roll_start_time > roll_time) {
      playerPos.x += (playerSpeed / sqrt(50) * 5) * roll_distance;
      playerPos.y -= (playerSpeed / sqrt(50) * 5) * roll_distance;
      stamina_amount -= roll_cost
      roll_start_time = undefined
    }
  }
  else if (keyIsDown(68) && keyIsDown(83) || keyIsDown(RIGHT_ARROW) && keyIsDown(DOWN_ARROW)) {
    playerPos.x += (playerSpeed / sqrt(50) * 5);
    playerPos.y += (playerSpeed / sqrt(50) * 5);
    if (keyIsDown(32) && stamina_amount >= 10 && millis() - roll_start_time > roll_time) {
      playerPos.x += (playerSpeed / sqrt(50) * 5) * roll_distance;
      playerPos.y += (playerSpeed / sqrt(50) * 5) * roll_distance;
      stamina_amount -= roll_cost
      roll_start_time = undefined
    }
  }
  else {
    if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
      // Move left:
      playerPos.x -= playerSpeed;
      if (keyIsDown(32) && stamina_amount >= 10 && millis() - roll_start_time > roll_time) {
        playerPos.x -= playerSpeed * roll_distance;
        stamina_amount -= roll_cost
        roll_start_time = undefined
      }
    }

    if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
      // Move right:
      playerPos.x += playerSpeed;
      if (keyIsDown(32) && stamina_amount >= 10 && millis() - roll_start_time > roll_time) {
        playerPos.x += playerSpeed * roll_distance;
        stamina_amount -= roll_cost
        roll_start_time = undefined
      }
    }
    if (keyIsDown(87) || keyIsDown(UP_ARROW)) {
      // Move up:
      playerPos.y -= playerSpeed;
      if (keyIsDown(32) && stamina_amount >= 10 && millis() - roll_start_time > roll_time) {
        playerPos.y -= playerSpeed * roll_distance;
        stamina_amount -= roll_cost
        roll_start_time = undefined
      }
    }
    if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) {
      // Move down:
      playerPos.y += playerSpeed;
      if (keyIsDown(32) && stamina_amount >= 10 && millis() - roll_start_time > roll_time) {
        playerPos.y += playerSpeed * roll_distance;
        stamina_amount -= roll_cost
        roll_start_time = undefined
      }
    }
  }

  // PLAYER COLLISIONS:
  if (playerPos.y < 0 + playerSize / 2) {
    playerPos.y = 0 + playerSize / 2;
  }
  if (playerPos.x < 0 + playerSize / 2) {
    playerPos.x = 0 + playerSize / 2;
  }
  if (playerPos.y > height - playerSize / 2) {
    playerPos.y = height - playerSize / 2;
  }
  if (playerPos.x > width - playerSize / 2) {
    playerPos.x = width - playerSize / 2;
  }

  // Collision between enemies and player
  for (let i = 0; i < enemyCount.length; i++) {
    const e = enemyCount[i];
    if (dist(e.enemyPos.x, e.enemyPos.y, playerPos.x, playerPos.y) <= (playerSize + 3) / 2 + enemySize / 2) {
      enemyCount.splice(i, 1)
      enemyCount.push(new Enemy());
      playerHealth--
    }
  }
}

// ENEMY STRUCTURE:
class Enemy {
  constructor() {
    // ENEMY SPAWN LOCATION:
    let side = round(random(1));
    if (side == 1) {
      if (playerPos.x > (width / 3) * 2) {
        // If player is in the right side, then spawn from the left wall:
        this.enemyPos = createVector(0 - enemySize, random(height));
      } else if (playerPos.x >= width / 3) {
        // If player is in the midle, then spawn from [...]
        side = round(random(1));
        if (side == 1) {
          // [...] the left wall:
          this.enemyPos = createVector(0 - enemySize, random(height));
        } else if (side == 0) {
          // [...] the right wall:
          this.enemyPos = createVector(width + enemySize, random(height));
        }
      } else if (playerPos.x < width / 3) {
        // If player is in the left side, then spawn from the right wall
        this.enemyPos = createVector(width + enemySize, random(height));
      }
    } else if (side == 0) {
      if (playerPos.y > (height / 3) * 2) {
        // If player is in the bottom canvas, then spawn from the top wall:
        this.enemyPos = createVector(random(width), 0 - enemySize);
      } else if (playerPos.y >= height / 3) {
        // If player is in the midle, then spawn from [...]
        side = round(random(1));
        if (side == 1) {
          // [...] the top wall:
          this.enemyPos = createVector(random(width), 0 - enemySize);
        } else if (side == 0) {
          // [...] the bottom wall:
          this.enemyPos = createVector(random(width), height + enemySize);
        }
      } else if (playerPos.y < height / 3) {
        // If player is in the top canvas, then spawn from the bottom wall
        this.enemyPos = createVector(random(width), height + enemySize);
      }
    }
  }

  draw() {
    // ENEMY TARGETING:
    enemyTarget = playerPos;
    this.targeting = p5.Vector.sub(enemyTarget, this.enemyPos);
    this.targeting.normalize();
    this.targeting.mult(enemySpeed);
    this.enemyPos.add(this.targeting);

    // ENEMY APPEARANCE:
    fill("red");
    circle(this.enemyPos.x, this.enemyPos.y, enemySize);
  }

  over_lapping() {
    for (let i = 0; i < enemyCount.length; i++) {
      const currentEnemy = enemyCount[i]; // First enemy

      for (let j = 0; j < enemyCount.length; j++) {
        if (i !== j) { // takes the index of enemies that are not apart of the first array
          const otherEnemy = enemyCount[j]; // Second enemy
          const distance = dist(currentEnemy.enemyPos.x, currentEnemy.enemyPos.y, otherEnemy.enemyPos.x, otherEnemy.enemyPos.y);
          if (distance <= enemySize) {
            const awayVector = p5.Vector.sub(currentEnemy.enemyPos, otherEnemy.enemyPos).normalize();
            const moveDistance = (enemySize - distance);
            currentEnemy.enemyPos.add(awayVector.mult(moveDistance));
          }
        }
      }
    }
  }
}

class Boss {
  constructor() {
    this.size = bossSize;
    this.Boss_Pos = createVector(width / 2, height / 2)
  }

  draw() {
    push()
    enemyTarget = playerPos;
    this.targeting = p5.Vector.sub(enemyTarget, this.Boss_Pos);
    this.targeting.normalize();
    this.targeting.mult(enemySpeed);
    this.Boss_Pos.add(this.targeting);

    fill(123, 200, 30)
    circle(this.Boss_Pos.x, this.Boss_Pos.y, this.size)
    pop()
  }

  collision() {
    for (let i = 0; i < boss_count.length; i++) {
      const boss = boss_count[i];
      if (dist(boss.Boss_Pos.x, boss.Boss_Pos.y, playerPos.x, playerPos.y) <= (playerSize + enemySize * 12) / 2) {
        playerHealth -= playerHealth
      }
    }
  }
}


// Player Projectiles
class Bullet {
  constructor(x, y) {
    this.pos = createVector(x, y)
    let mouse = createVector(mouseX, mouseY)
    this.direction = p5.Vector.sub(mouse, this.pos)
    this.direction.normalize();
    this.direction.mult(bulletSpeed);
    this.rotation = rotation
  }

  // Drawing Bullet
  bulletDraw() {
    this.pos.add(this.direction)
    push()
    translate(this.pos)
    textSize(bulletSize * 2)
    textAlign(CENTER, CENTER)
    angleMode(DEGREES)
    rotate(this.rotation + 90)
    fill(248, 240, 0)
    text(random(matrixSymbols), 0, bulletSize / 3)
    fill(255, 120, 0)
    text("日", 0, bulletSize / 3)
    pop()
  }

  // Collision between projectiles and enemies
  hit() {
    for (let i = 0; i < enemyCount.length; i++) {
      const e = enemyCount[i];
      if (dist(e.enemyPos.x, e.enemyPos.y, this.pos.x, this.pos.y) <= enemySize / 2 + bulletSize / 2) {
        enemyCount.splice(i, 1);
        enemyCount.push(new Enemy());
        bulletCount.splice(bulletCount.indexOf(this), 1);
        score++;
        enemy_death.play();
        xp_count += 1;
      }
    }
    for (let i = 0; i < boss_count.length; i++) {
      const b = boss_count[i];
      if (dist(b.Boss_Pos.x, b.Boss_Pos.y, this.pos.x, this.pos.y) <= (bossSize + bulletSize) / 2 && warningCycle == warningCycleCount && BossHealth > 0) {
        bulletCount.splice(bulletCount.indexOf(this), 1);
        BossHealth -= bulletDamage
      }
    }
    
    if (this.pos.x < 0 || this.pos.x > innerWidth || this.pos.y > innerHeight || this.pos.y < 0) {
      bulletCount.splice(bulletCount.indexOf(this), 1)
    }
  }
}


function setup() {
  createCanvas(innerWidth, innerHeight);
  playerPos = createVector(width / 2, height / 2);
  for (let i = 0; i < 20; i++) {
    enemyCount.push(new Enemy());
  }
  for (let i = 0; i < 1; i++) {
    boss_count.push(new Boss())
  }
  arrowY = height - height / 6
}

function keyPressed() {
  if (Screen == 2 && keyCode === (80) && !locked) {
    attack = false
    frameRate(0)
    locked = true
    requestPointerLock()
    push()
    fill(49, 113, 63, 140)
    textAlign(CENTER, CENTER)
    textSize(40)
    text("Game Paused", width / 2, height / 3)
    text("Press ENTER or ESC to continue", width / 2, height / 3 + 60)
    pop()
  }
  if (keyCode === (13) && Screen == 2 && locked || keyCode === (27) && Screen == 2 && locked) {
    attack = true
    frameRate(60)
    exitPointerLock();
    locked = false;
  }
  if (keyCode == (82) && Screen == 3) {
    Screen = 1
    frameRate(60)
  }


  //Difficulty cycling
  if (keyCode == (65) && Screen == 1 || keyCode == (LEFT_ARROW) && Screen == 1) {
    // Cycle difficulty to the left:
    if (easy_mode) {
      easy_mode = false
      hard_mode = true
    }
    else if (hard_mode) {
      hard_mode = false
      medium_mode = true
    }
    else if (medium_mode) {
      medium_mode = false
      easy_mode = true
    }

  }
  if (keyCode == (68) && Screen == 1 || keyCode == (RIGHT_ARROW) && Screen == 1) {
    //  Cycle difficulty to the right:
    if (easy_mode) {
      easy_mode = false
      medium_mode = true
    }
    else if (medium_mode) {
      medium_mode = false
      hard_mode = true
    }
    else if (hard_mode) {
      hard_mode = false
      easy_mode = true
    }
  }
}

function mousePressed() {
  if (mouseButton == LEFT && attack == true && stamina_amount >= bullet_cost) {
    for (let i = 0; i < 1; i++) {
      bulletCount.push(new Bullet(playerPos.x, playerPos.y));
    }
    show_Player_2 = true;
    player2_Display_Start_Time = millis();
    glock19_shoot.play()
    stamina_amount -= bullet_cost
  }
  //left button
  if (mouseX <= width / 2 - 310 && mouseX >= width / 2 - 415 && mouseY < arrowY + 120 && mouseY > arrowY - 70 && easy_mode == true && mouseButton == LEFT && Screen == 1) {
    easy_mode = false
    hard_mode = true
  }
  else if (mouseX <= width / 2 - 310 && mouseX >= width / 2 - 415 && mouseY < arrowY + 120 && mouseY > arrowY - 70 && hard_mode == true && mouseButton == LEFT && Screen == 1) {
    medium_mode = true
    hard_mode = false
  }
  else if (mouseX <= width / 2 - 310 && mouseX >= width / 2 - 415 && mouseY < arrowY + 120 && mouseY > arrowY - 70 && medium_mode == true && mouseButton == LEFT && Screen == 1) {
    easy_mode = true
    medium_mode = false
  }

  //right button
  else if (mouseX >= width / 2 + 310 && mouseX <= width / 2 + 415 && mouseY < arrowY + 120 && mouseY > arrowY - 70 && easy_mode == true && mouseButton == LEFT && Screen == 1) {
    easy_mode = false
    medium_mode = true
  }
  else if (mouseX >= width / 2 + 310 && mouseX <= width / 2 + 415 && mouseY < arrowY + 120 && mouseY > arrowY - 70 && medium_mode == true && mouseButton == LEFT && Screen == 1) {
    medium_mode = false
    hard_mode = true
  }
  else if (mouseX >= width / 2 + 310 && mouseX <= width / 2 + 415 && mouseY < arrowY + 120 && mouseY > arrowY - 70 && hard_mode == true && mouseButton == LEFT && Screen == 1) {
    easy_mode = true
    hard_mode = false
  }
}

function draw() {
  // Start Screen
  if (Screen == 1) {
    cursor(ARROW)
    menuScreen()
  }
  // Help screen
  else if (Screen == 1.1) {
    helpScreen()
  }
  // Play Screen
  else if (Screen == 1.5) {
    controls_screen();
    noCursor()
  }
  else if (Screen == 2) {
    play_screen()
    attack = true
    // Death Screen
  } else if (Screen == 3) {
    death_screen()
  }
}

