let _text;
let font;
var rover;
let planets = [];

let totalScenes = 3;

function setup() {
    font = loadFont('assets/fonts/Titillium-Light.otf');
    backgroundTex = loadImage('assets/milkyway2.jpg');
    earthTex = loadImage('assets/earth.jpg');
    sunTex = loadImage('assets/sun.jpg');
    icyTex = loadImage('assets/icyplanet.jpg');
    moonTex = loadImage('assets/moon.jpg');
    neptuneTex = loadImage('assets/neptune.jpg');
    greenTex = loadImage('assets/greenplanet.jpg');
    canvas = createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    canvas.position(0, 0);
    rover = createRoverCam();
    rover.usePointerLock();
    // rover.setState({position: [-400,-0,-200], rotation: [0.4,0.3,0], sensitivity: 0.025, speed: 1.0});
    defaultView();

    reset();

}

let scene = 0;
let startingFrame = 0;

function draw() {
    background(0);
    texture(backgroundTex);
    noStroke();
    sphere(700);
    push();
    translate(rover.position.x, rover.position.y, rover.position.z);
    rotateY(-PI / 2 - rover.pan);
    rotateX(rover.tilt);
    // rotateY(PI / 2);
    textFont(font);
    textSize(9);
    textAlign(CENTER, CENTER);
    fill(255);
    translate(0, 0, -100);
    text("Scene: " + (scene + 1), 0, -height / 20);

    textSize(3);
    textAlign(CORNER, CORNER);
    text("‣ Click to toggle camera control\n‣ Use WASD or Q E to control the camera\n‣ Use 1 and 2 for preset camera angles\n‣ Use left and right arrow keys to switch scenes and R to restart scenes", -width / 18, -height / 20);
    pop();

    if (scene == 0) {
        planets[scene].forEach(planet => {
            planet.update();
        });
    }
    if (scene == 1) {
        frame = frameCount - startingFrame;
        planets[scene].forEach(planet => {
            planet.update();
            if (frame < 100) {
                if (planet.distance > 0) {
                    planet.distance += 0.5;
                }
            }
        });
    }
}

function keyPressed() {
    if (key == '1') {
        defaultView();
    }

    if (key == '2') {
        overheadView();
    }

    if (key == 'r') {
        reset();
    }

    if (keyCode == RIGHT_ARROW) {
        if (scene < 2) {
            scene++;
            startingFrame = frameCount;
            // defaultView();
        }
    }

    if (keyCode == LEFT_ARROW) {
        if (scene > 0) {
            scene--;
            startingFrame = frameCount;
            // defaultView();
        }
    }
}

function defaultView() {
    rover.setState({ position: [-490, -490, 0], rotation: [0, 0.7, 0], sensitivity: 0.025, speed: 1.0 });
}

function overheadView() {

    rover.setState({ position: [0, -600, 0], rotation: [0, PI / 2, 0], sensitivity: 0.025, speed: 1.0 });
}

function reset() {
    planets = [];

    startingFrame = frameCount;
    for (let i = 0; i < totalScenes; i++) {
        planets.push([]);
    }

    planets[0].push(new Planet(sunTex, 'Lydia', 0, 50, 0, 0, 0, 0.003, 0, 0));
    planets[0].push(new Planet(greenTex, 'Jack', 100, 25, 0, 0, 0, 0.01, 0.01, 0));
    planets[0].push(new Planet(icyTex, 'Marilyn', 200, 30, 0, 0, 0, 0.01, 0.02, 0));
    planets[0].push(new Planet(icyTex, 'James', 280, 30, 0, 0, 0, 0.01, 0.015, PI));
    planets[0].push(new Planet(neptuneTex, 'Hannah', 600, 25, 0, 0, 0, 0.01, 0.001, 0));


    planets[1].push(new Planet(sunTex, 'Lydia', 0, 50, 0, 0, 0, 0, 0, 0));
    planets[1].push(new Planet(greenTex, 'Jack', 100, 25, 0, 0, 0, 0.01, 0.01, 0));
    planets[1].push(new Planet(icyTex, 'Marilyn', 200, 30, 0, 0, 0, 0.01, 0.03, 0));
    planets[1].push(new Planet(icyTex, 'James', 280, 30, 0, 0, 0, 0.01, 0.02, PI));
    planets[1].push(new Planet(moonTex, 'Moon', 50, 25, 0, 0, 200, 0.01, 0.01, 0));
    planets[1].push(new Planet(moonTex, 'Moon', 50, 25, 0, 0, 200, 0.01, 0.01, PI));

}

function Planet(tex, tx, d, size, ox, oy, oz, rs, os, io) {
    this.tex = tex;
    this.text = tx;
    this.distance = d;
    this.size = size;
    this.orbitX = ox;
    this.orbitY = oy;
    this.orbitZ = oz;
    this.rotationSpeed = rs;
    this.orbitSpeed = os;
    this.orbit = io;
    this.rotation = 0;

    this.update = function () {
        push();
        translate(this.orbitX, this.orbitY, this.orbitZ);
        rotateY(this.orbit);
        translate(this.distance, 0, 0);
        push();
        rotateY(this.rotation);
        texture(this.tex);
        noStroke();
        sphere(this.size);
        if (this.text == 'Lydia' && scene == 1) {
            fill(0, 200);
            sphere(this.size + 5);
        }

        pop();
        translate(0, -1.5 * this.size, 0);
        textFont(font);
        textAlign(CENTER, CENTER);
        rotateY(-this.orbit - PI / 2 - rover.pan);
        rotateX(+ rover.tilt);
        text(this.text, 0, 0);
        pop();
        this.rotation += this.rotationSpeed;
        this.orbit += this.orbitSpeed;
    }
}