function menuScreen() {
    end_screen_start_time = undefined
    ammo_crate_start_time = undefined
    arrowY = height - height / 6
    menuX = 0
    while (menuX < width) { // keeps drawing the same gif to fill the menu screen
        image(gif_loadImg, menuX, 0);
        image(gif_loadImg, menuX, 240)
        image(gif_loadImg, menuX, 480)
        image(gif_loadImg, menuX, 720)
        menuX += 400
    }
    push()
    strokeWeight(0)
    textSize(200)
    textAlign(CENTER, CENTER)
    rectMode(CENTER)
    fill(0, 0, 0, 190)
    rect(width / 2, height - height / 3, 700, 100)
    rect(width / 2, height - height / 3 + 70, 150, 25)
    fill(0, 255, 0)
    textStyle(ITALIC);
    text("TITLE TBD", innerWidth / 2, innerHeight / 5)
    textSize(70)
    text("Press ENTER to Play", width / 2, height - height / 3)
    textSize(20)
    text("Press H for Help", width / 2, height - height / 3 + 70)

    textSize(80)
    if (easy_mode) {
        rect(width / 2, height - height / 6 + 20, 600, 150)
        fill(0, 0, 0, 230)
        text("EASY MODE", width / 2, height - height / 6 + 20)
    }
    else if (medium_mode) {
        fill("orange")
        rect(width / 2, height - height / 6 + 20, 600, 150)
        fill(0, 0, 0, 230)
        text("MEDIUM MODE", width / 2, height - height / 6 + 20)
    }
    else if (hard_mode) {
        fill(255, 0, 0)
        rect(width / 2, height - height / 6 + 20, 600, 150)
        fill(0, 0, 0, 230)
        text("HARD MODE", width / 2, height - height / 6 + 20)
    }
    pop()
    push()
    rectMode(CENTER)
    noStroke()
    angleMode(DEGREES);
    fill(255, 255, 255, 230)
    translate(width / 2 + 320, arrowY + 25)
    rotate(45)
    rect(0, -60, 130, 10)
    rotate(-90)
    rect(0, 60, 130, 10)
    pop()

    push()
    rectMode(CENTER)
    noStroke()
    angleMode(DEGREES);
    fill(255, 255, 255)
    translate(width / 2 - 320, arrowY + 25)
    rotate(-45)
    rect(0, -60, 130, 10)
    rotate(90)
    rect(0, 60, 130, 10)
    pop()
    push()
    if (width / 2 - 310 > mouseX && mouseX > width / 2 - 415 && mouseY < arrowY + 120 && mouseY > arrowY - 70 ||
        width / 2 + 310 < mouseX && mouseX < width / 2 + 415 && mouseY < arrowY + 120 && mouseY > arrowY - 70) {
        cursor(HAND)
    }
    pop()

    if (keyIsDown(72)) {
        Screen = 1.1
    }
    if (gameStartTime === undefined) {
        gameStartTime = millis()
    }

    if (keyIsDown(13) && controls == true && millis() - gameStartTime > gameTime) {
        Screen = 2
        if (easy_mode) {
            enemySpeed *= 1
        }
        else if (medium_mode) {
            enemySpeed *= 1.5
        }
        else if (hard_mode) {
            enemySpeed *= 2
        }
    }

    else if (keyIsDown(13) && controls == false && millis() - gameStartTime > gameTime) {
        Screen = 1.5
        controls = true
        //deciding speed of enemy
        if (easy_mode) {
            enemySpeed *= easyEnemySpeed
        }
        else if (medium_mode) {
            enemySpeed *= mediumEnemySpeed
        }
        else if (hard_mode) {
            enemySpeed *= hardEnemySpeed
        }
    }
}

function helpScreen() {
    push()
    gameStartTime = undefined
    image(School_Project_BG, 0, 0)
    fill(255, 255, 255)
    // stamina cost
    textSize(40)
    textAlign(CENTER, CENTER)
    text("Stamina Costs", 140, 60)
    textSize(30)
    text("Dodging: " + roll_cost, 105, 100)
    text("Shooting: " + bullet_cost, 100, 140)

    text("Stamina Regen: " + stamina_regen_amount * stamina_regen_time / 10 + "/s", 150, 260)
    strokeWeight(2)
    stroke(255, 255, 255)
    noFill()
    rect(0, 300, 350, 110)
    rect(0, 0, 300)
    noStroke()
    rectMode(CENTER)
    fill(0, 0, 255)
    rect(40, 360, ammo_crate_size)
    fill(255, 255, 255)
    text("Collect TBD to", 190, 340)
    text("Replenish Stamina", 210, 380)
    pop()
    if (keyIsDown(13)) {
        Screen = 1
    }
}

function controls_screen() {
    gameStartTime = undefined
    image(School_Project_BG, 0, 0)
    push()
    noStroke()
    fill(255, 255, 255)
    textAlign(CENTER, CENTER)
    textSize(90)
    text("Controls", width / 2, height / 5)
    push()
    noFill()
    strokeWeight(5)
    stroke(255, 255, 255)
    rectMode(CENTER);
    rect(width / 2, height / 2 + height / 2.5, 1050, 100)
    pop()
    push()
    fill(0, 255, 0)
    if (typeof loading_meter_intervals == "undefined") {
        loading_meter_intervals = millis()
    }
    if (millis() - loading_meter_intervals > 1) {
        if (loading_meter < 1050) {
            loading_meter += 1050 / 105
            loading_meter_intervals = undefined
        }
    }
    rect(width / 2 - 525, height / 2 + height / 2.5 - 50, loading_meter, 100)

    pop()
    if (loading_meter === 1050) {
        push()
        fill(0, 0, 0)
        text("Press ENTER to Continue", width / 2, height / 2 + height / 2.5)
        pop()
    }
    textSize(30)
    text("WASD or Arrow Keys to Move", width / 2, height / 3)
    text("LMB to Shoot", width / 2, height / 2 - height / 8)
    text("P to Pause Game", width / 2, height / 2 - height / 12)
    text("Space to Dash", width / 2, height / 2 - height / 25)
    text("ENTER to Continue Game", width / 2, height / 2)
    if (keyIsDown(13) && loading_meter === 1050) {
        Screen = 2
    }
    pop()
}

function play_screen() {
    gameStartTime = undefined
    image(School_Project_BG, 0, 0)
    noCursor()
    if (typeof stamina_regen_start_time === "undefined") {
        stamina_regen_start_time = millis()
    }
    else if (millis() - stamina_regen_start_time > stamina_regen_time) {
        if (stamina_amount !== 100) {
            stamina_amount += stamina_regen_amount
        }
        stamina_regen_start_time = undefined

    }

    if (typeof ammo_crate_start_time === 'undefined') { // if ammo_crate_start_time doesn't have a value then it runs ammo_crate_start_time.
        ammo_crate_x = random(0 + ammo_crate_size, width - ammo_crate_size);
        ammo_crate_y = random(0 + ammo_crate_size, height - ammo_crate_size);
        ammo_crate_start_time = millis();
    }
    Ammo_Crate();

    // Checks if the amount of enemies killed matches
    // up with when the boss should spawn
    if (!bossSpawnValues.includes(score / waveLenght)) {
        for (let i = 0; i < enemyCount.length; i++) {
            enemyCount[i].draw();
            enemyCount[i].over_lapping()
        }
    }

    // Boss warning and spawning
    else if (bossSpawnValues.includes(score / waveLenght)) {
        enemyCount.splice(enemyCount)

        if (typeof boss_indication_start_time === "undefined" && warningCycle < warningCycleCount) {
            boss_indication_start_time = millis()
        }
        if (millis() - boss_indication_start_time < boss_indication_time && millis() - boss_indication_start_time > boss_indication_time / 2 && warningCycle < warningCycleCount) {
            push()
            fill(255, 0, 0, 160)
            ellipse(width / 2, height / 2, enemySize * 12)
            pop()

        }
        else if (millis() - boss_indication_start_time > boss_indication_time) {
            boss_indication_start_time = undefined
            warningCycle++
        }
        if (warningCycle == warningCycleCount && BossHealth > 0) {
            for (let i = 0; i < boss_count.length; i++) {
                boss_count[i].draw()
                boss_count[i].collision()
                push()
                noFill()
                stroke(255, 255, 255)
                strokeWeight(5)
                rect(width / 2 - 500, height - 50, 1000, 30)
                fill(255, 0, 0)
                strokeWeight(0)
                rect(width / 2 - 500, height - 50, BossHealth / BH * 1000, 30)
                pop()
            }
        }
        else if (BossHealth <= 0) {
            boss_count.splice(boss_count.indexOf(1), 1)
            bossesKilled++
            score++
            xp_count += 50
            for (let i = 0; i < 20; i++) {
                enemyCount.push(new Enemy());
            }
            for (let i = 0; i < 1; i++) {
                boss_count.push(new Boss())
            }
            BossHealth = BH + bossesKilled * 5
            BH = BossHealth
            enemySpeed *= 1.1
            warningCycle = 0
        }
    }
    for (let i = 0; i < bulletCount.length; i++) {
        bulletCount[i].bulletDraw();
        bulletCount[i].hit()
    }
    player();
    noStroke
    push();
    textSize(20)
    fill(49, 113, 63, 230)
    text("Enemies Killed : " + score, 20, 40)
    text("Health : " + playerHealth, 20, 90)
    text("XP to level up: " + (xp_to_level_up - xp_count), 20, 140)
    text("Stamina: " + stamina_amount, 20, 190)
    level_up();
    pop();
}


function death_screen() {
    attack = false
    playerPos.x = width / 2
    playerPos.y = height / 2
    xp_count = 0
    xp_to_level_up = 12
    playerSpeed = 2
    enemySpeed = 1
    bulletDamage = 1
    playerHealth = 5
    stamina_amount = 100
    easy_mode = true
    medium_mode = false
    hard_mode = false
    warningCycle = 0
    BossHealth = 100

    for (enemy of enemyCount) {
        enemyCount.splice(enemyCount.indexOf(enemy), 20)
    }
    for (bullet of bulletCount) {
        bulletCount.splice(bulletCount.indexOf(bullet), 100)
    }
    for (let i = 0; i < 20; i++) {
        enemyCount.push(new Enemy());
    }
    if (typeof end_screen_start_time === 'undefined') {
        end_screen_start_time = millis()
    }
    if (millis() - end_screen_start_time < end_screen_time) {
        push()
        background(0, 0, 0)
        frameRate(7)
        image.x = random(0, width - 400)
        image.y = random(0, height - 240)
        image(gif_loadImg, image.x, image.y)
        image(gif_loadImg, random(0, width - 400), random(0, height - 240))
        pop()
    }
    else {
        push()
        frameRate(0)
        background(255, 0, 0)
        textSize(70)
        textAlign(CENTER, CENTER)
        fill(0, 0, 0)

        text("You have Been Corrupted by the Matrix", width / 2, height / 7)
        textSize(60)
        text("You Killed: " + score + " Enemies Along the Way", width / 2, height / 7 + height / 8)
        if (bossesKilled == 1) {
            text("And " + bossesKilled + " Boss", width / 2, height / 7 + height / 4)
        }
        else if (bossesKilled > 1) {
            text("And " + bossesKilled + " Bosses", width / 2, height / 7 + height / 4)

        }
        score += bossesKilled * 100
        if (score > high_score) {
            high_score = score
        }
        text("Your score is: " + score, width / 2, height / 2)
        text("Your highscore is: " + high_score, width / 2, height / 2 + height / 10)
        text("Press R to Restart", width / 2, height - height / 7)
        score = 0
        bossesKilled = 0
        pop()
    }
}
