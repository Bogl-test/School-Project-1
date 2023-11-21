function menuScreen() {
    frameRate(60)
    menuX = 0
    while (menuX < width) { // keeps drawing the same gif to fill the menu screen
        image(gif_loadImg, menuX, 0);
        image(gif_loadImg, menuX, 240)
        image(gif_loadImg, menuX, 480)
        image(gif_loadImg, menuX, 720)
        menuX += 400
    }
    push()
    stroke(0)
    strokeWeight(9)
    textSize(30)
    textAlign(CENTER)
    fill(123, 255, 0)
    text("PRESS ENTER TO PLAY", width / 2, innerHeight / 2 + height / 6)
    textSize(90)
    text("IMORTAL MATRIX", innerWidth / 2, innerHeight / 4)
    pop()
    // Buttons (Place Holder    )
    push();
    fill(0, 255, 0);
    strokeWeight(0)
    rectMode(CENTER);
    rect(width / 2, height / 2, 300, 50)
    fill(0, 0, 0)
    textSize(30)
    text("EASY", width / 2 - 150, height / 2 + 10)
    pop();

    // menu_Music.loop()
    if (keyIsDown(13) && music == false) {
        Screen = 2
        menu_Music.stop()
        // lvl1_Music.loop()
        // lvl2_Music.loop()
        //lvl3_Music.loop()
        music = true
    }
}

function play_screen() {
    noCursor()
    image(School_Project_BG, 0, 0)
    for (let i = 0; i < enemyCount.length; i++) {
        enemyCount[i].draw();
    }
    for (let i = 0; i < bulletCount.length; i++) {
        bulletCount[i].bulletDraw();
        bulletCount[i].hit()
    }
    strokeWeight(0)
    player();
    push();
    stroke(0, 255, 0)
    push();
    noFill()
    strokeWeight(3)
    textSize(20)
    fill(255)
    text("Enemies Killed : " + enemies_Killed, 20, 0 + 40)
    text("Health : " + playerHealth, 20, 0 + 90)
    text("XP to level up: " + (xp_to_level_up - xp_count), 20, 0 + 140)
    level_up();
    pop();
}

function death_screen() {
    push()
    background(255, 0, 0)
    textSize(50)
    textAlign(CENTER)
    fill(0, 0, 0)
    text("You Have Been Corrupted by the Matrix", width / 2, height / 2 - height / 5)
    text("You Killed: " + enemies_Killed + " Enemies Along the Way.", width / 2, height / 2)
    text("Press R to Restart", width / 2, height / 2 + 90)
    attack = false
    music = false
    frameRate(0)
    lvl1_Music.stop()
    lvl2_Music.stop()
    lvl3_Music.stop()
    pop()
    if (enemies_Killed > high_score) {
        high_score = enemies_Killed
    }
    enemies_Killed = 0
    playerHealth = 5
    for (enemy of enemyCount) {
        enemyCount.splice(enemyCount.indexOf(enemy), 20)
    }
    for (let i = 0; i < 20; i++) {
        enemyCount.push(new Enemy());
    }
    playerPos.x = width / 2
    playerPos.y = height / 2
    xp_count = 0
    xp_to_level_up = 12
    playerSpeed = 2
}
