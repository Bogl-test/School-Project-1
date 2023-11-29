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
    fill(0, 255, 0)
    textStyle(ITALIC);
    text("TITLE TBD", innerWidth / 2, innerHeight / 5)
    textSize(70)
    text("Press ENTER to Play", width / 2, height - height / 3)


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
    if (keyIsDown(13) && controls == true) {
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

    else if (keyIsDown(13) && controls == false) {
        Screen = 1.5
        controls = true
        //deciding speed of enemy
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

}

function controls_screen() {
    if (typeof timer == "undefined") {
        timer = millis()
    }
    push()
    noStroke()
    fill(0,0,0)
    background(70)
    textAlign(CENTER, CENTER)
    textSize(90)
    text("Controls", width / 2, height / 5)
    if (millis() / 1000 > 1) {
        text("Press ENTER to Continue", width / 2, height / 2 + height / 2.5)
    }
    textSize(30)
    text("WASD or Arrow Keys to Move", width / 2, height / 3)
    text("LMB to Shoot", width / 2, height / 2 - height / 8)
    text("P to Pause Game", width / 2, height / 2 - height / 12)
    text("ENTER to Continue Game", width / 2, height / 2 - height / 25)
    if (keyIsDown(13) && millis() - timer > 1000) {
        Screen = 2
        timer = undefined
    }
    pop()
}

function play_screen() {
    image(School_Project_BG, 0, 0)
    noCursor()
    if (typeof ammo_crate_start_time === 'undefined') { // if ammo_crate_start_time doesn't have a value then it runs ammo_crate_start_time.
        ammo_crate_x = random(0 + ammo_crate_size, width - ammo_crate_size);
        ammo_crate_y = random(0 + ammo_crate_size, height - ammo_crate_size);
        ammo_crate_start_time = millis();
    }
    Ammo_Crate();
    for (let i = 0; i < enemyCount.length; i++) {
        enemyCount[i].draw();
        enemyCount[i].over_lapping()
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
    text("Enemies Killed : " + enemies_Killed, 20, 40)
    text("Health : " + playerHealth, 20, 90)
    text("XP to level up: " + (xp_to_level_up - xp_count), 20, 140)
    text("Bullets remaining: " + bullet_amount, 20, 190)
    level_up();
    pop();
}


function death_screen() {
    attack = false
    music = false
    lvl1_Music.stop()
    lvl2_Music.stop()
    lvl3_Music.stop()
    for (enemy of enemyCount) {
        enemyCount.splice(enemyCount.indexOf(enemy), 20)
    }
    for (bullet of bulletCount) {
        bulletCount.splice(bulletCount.indexOf(bullet), 5)
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
        background(255, 0, 0)
        textSize(50)
        textAlign(CENTER)
        fill(0, 0, 0)
        if (enemies_Killed > high_score) {
            high_score = enemies_Killed
        }
        text("You Have Been Corrupted by the Matrix", width / 2, height / 2 - height / 5)
        text("You Killed: " + enemies_Killed + " Enemies Along the Way.", width / 2, height / 2)
        text("Press R to Restart", width / 2, height / 2 + 90)
        text("Your Highscore: " + high_score, width / 2, height / 2 + 140)
        frameRate(0)
        pop()
        playerPos.x = width / 2
        playerPos.y = height / 2
        xp_count = 0
        xp_to_level_up = 12
        playerSpeed = 2
        enemySpeed = 1
        enemies_Killed = 0
        playerHealth = 5
        bullet_amount = 30
        easy_mode = true
        medium_mode = false
        hard_mode = false
    }
}
