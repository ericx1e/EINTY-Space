let _text;
let font;
var rover;
let planets = [];
let galaxy = true;
let instructions = true;

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
    redTex = loadImage('assets/redplanet.jpg');
    sun2Tex = loadImage('assets/sun2.jpg');
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
let collision = false;
let connected = false;
let frame;

function draw() {
    background(0);
    if (galaxy) {
        texture(backgroundTex);
        noStroke();
        sphere(700);
    }
    push();
    translate(rover.position.x, rover.position.y, rover.position.z);
    rotateY(-PI / 2 - rover.pan);
    rotateX(rover.tilt);
    // rotateY(PI / 2);
    textFont(font);
    textSize(9);
    textAlign(CENTER, CENTER);
    fill(255);
    translate(0, 0, - height / 9.5);
    text("Scene: " + (scene + 1), 0, - height / 20);

    if(instructions) {
        textSize(3);
        textAlign(CORNER, CORNER);
        text("‣ Click to toggle camera control\n‣ Use Space to toggle galaxy sphere\n‣ Use O to toggle instruction text\n‣ Use WASD or Q E to control the camera\n‣ Use 1 and 2 for preset camera angles\n‣ Use left and right arrow keys to switch scenes and R to restart scenes\n‣ Wait until the end of scenes for smooth transitions", -width / 18, -height / 20);
    }
    pop();

    if (scene == 0) {
        planets[scene].forEach(planet => {
            planet.update();
        });
    }

    let jOrbit;

    if (scene == 1) {
        frame = frameCount - startingFrame;
        planets[scene].forEach(planet => {
            planet.update();
            // planets[1].push(new Planet()
            if (frame == 0) { }

            if (planet.text == 'Jack') {
                if (collision) {
                    planet.orbitSpeed *= -1;
                    planet.orbit += 5 * planet.orbitSpeed;
                    collision = false;
                }
                jOrbit = planet.orbit;
            }

            if (planet.text == 'Nath') {
                planet.orbit %= (2 * PI);
                jOrbit %= (2 * PI);
                if (planet.orbit < 0) {
                    planet.orbit = 2 * PI;
                }
                if (jOrbit < 0) {
                    jOrbit = 2 * PI;
                }
                if (abs(planet.orbit - jOrbit) < 0.3) {
                    collision = true;
                    planet.orbitSpeed *= -1;
                    planet.orbit += 5 * planet.orbitSpeed;
                    // planet.rotationSpeed *= -1;
                }
            }

            if (frame <= 200) {
                if (planet.text == 'Lydia') {
                    planet.size -= 0.05;
                    planet.rotationSpeed /= 2;
                    return;
                }
                planet.distance += 0.5;
                planet.orbitSpeed *= 0.999;
                if (planet.text == 'Hannah') {
                    planet.distance -= 1.3;
                    planet.orbitSpeed += 0.00001;
                }
                // if (planet.text == 'James') {
                //     planet.orbitSpeed *= 0.999;
                // }
                if (planet.text == 'Louisa') {
                    planet.size += 30 / 200;
                }
                if (planet.text == 'Nath') {
                    planet.distance -= 130 / 200 + 0.5;
                    planet.orbitSpeed -= 0.0001;
                }
            } else {
                if (planet.text == 'James' && planet.orbitSpeed > 0) {
                    // console.log(planet.orbit%PI)
                    if (abs(planet.orbit % (2 * PI) - 1.5 * PI) < 0.1) {
                        planet.orbitZ = 480;
                        planet.distance = 100;
                        planet.orbit *= -1;
                        planet.orbitSpeed *= -1;
                        // planet.tex = earthTex;
                        planet.rotation *= -1;
                        // planets[1][planets[1].length - 1].orbitSpeed = planet.orbitSpeed;
                        // planets[1][planets[1].length-1].orbitZ = 480;
                        // planets[1][planets[1].length-1].distance = 100;
                    }
                }
            }
        });
    }

    if (scene == 2) {
        frame = frameCount - startingFrame;
        let jOS;
        if (planets[scene].length > 5 && frame > 200) {
            planets[scene].splice(planets[scene].length - 1, 1);
        }
        planets[scene].forEach(planet => {
            planet.update();
            if (planet.text == 'Jack') {
                jOrbit = planet.orbit;
                jOS = planet.orbitSpeed;
            }
            if (planet.text == 'Nath' && !connected) {
                planet.orbit %= (2 * PI);
                jOrbit %= (2 * PI);
                if (planet.orbit < 0) {
                    planet.orbit = 2 * PI;
                }
                if (jOrbit < 0) {
                    jOrbit = 2 * PI;
                }
                if (abs(planet.orbit - jOrbit) < 0.3) {
                    planet.orbitSpeed = jOS;
                    // planet.rotationSpeed *= -1;
                    connected = true;
                }
            }

            if (frame <= 200) {
                if (planet.text == 'Louisa') {
                    planet.size -= 30 / 200;
                }

                if(planet.text == 'Hannah') {
                    planet.distance -= 0.5;
                    planet.orbitSpeed += 0.00005;
                }
                if (planet.text == 'Nath') {
                    planet.orbitSpeed *= 0.99;
                }
            } else {
                if (planet.text == 'James' && planet.orbitSpeed < 0) {
                    if (abs(planet.orbit % (2 * PI) - 0.5 * PI) < 0.1) {
                        planet.orbitZ = 380;
                        planet.distance = 50;
                        planet.orbit *= -1;
                        planet.orbitSpeed *= -1;
                        planet.rotation *= -1;
                    }
                }
                if (planet.text == 'Marilyn' && planet.orbitSpeed > 0) {
                    if (abs(planet.orbit % (2 * PI) - 1.5 * PI) < 0.1) {
                        planet.orbitZ = 380;
                        planet.distance = 50;
                        planet.orbit *= -1;
                        planet.orbitSpeed *= -1;
                        planet.rotation *= -1;
                    }
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

    if (key == ' ') {
        galaxy = !galaxy;
    }

    if(key == 'o') {
        instructions = !instructions;
    }

    if (key == 'r') {
        reset();
    }

    if (keyCode == RIGHT_ARROW) {
        if (scene < 2) {
            scene++;
            // reset();
            startScene();
            // defaultView();
        }
    }

    if (keyCode == LEFT_ARROW) {
        if (scene > 0) {
            scene--;
            // reset();
            reset();
            // defaultView();
        }
    }
}

function startScene() {
    if (scene == 0) {
        planets[0] = [];

        planets[0].push(new Planet(sunTex, 'Lydia', 0, 50, 0, 0, 0, 0.003, 0, 0));
        planets[0].push(new Planet(greenTex, 'Jack', 100, 25, 0, 0, 0, 0.01, 0.01, 0));
        planets[0].push(new Planet(icyTex, 'Marilyn', 200, 30, 0, 0, 0, 0.01, 0.02, 0));
        planets[0].push(new Planet(moonTex, 'James', 280, 30, 0, 0, 0, 0.01, 0.015, PI));
        planets[0].push(new Planet(neptuneTex, 'Hannah', 550, 25, 0, 0, 0, 0.01, 0.001, 0));

    }
    if (scene == 1) {
        arrayCopy(planets[0], 0, planets[1], 0, planets[0].length);
        // planets[1] = planets[0];
        startingFrame = frameCount;
        planets[1].push(new Planet(sun2Tex, 'Louisa', -100, 0, 0, 0, 480, 0.01, 0, -PI / 2));
    }

    if (scene == 2) {
        if (frame > 200 && planets[1][4].orbitZ == 480) {
            arrayCopy(planets[1], 0, planets[2], 0, planets[1].length);
            // planets[2] = planets[1];
            planets[2].splice(0, 1);
        }
        startingFrame = frameCount;
    }
}

function defaultView() {
    rover.setState({ position: [-490, -490, 0], rotation: [0, 0.7, 0], sensitivity: 0.025, speed: 1.0 });
}

function overheadView() {

    rover.setState({ position: [0, -670, 0], rotation: [0, PI / 2, 0], sensitivity: 0.025, speed: 1.0 });
}

function reset() {
    planets = [];

    startingFrame = frameCount;
    for (let i = 0; i < totalScenes; i++) {
        planets.push([]);
    }

    planets[0].push(new Planet(sunTex, 'Lydia', 0, 50, 0, 0, 0, 0.003, 0, 0));
    planets[0].push(new Planet(greenTex, 'Jack', 100, 25, 0, 0, 0, 0.01, 0.01, 0));
    planets[0].push(new Planet(redTex, 'Nath', 330, 30, 0, 0, 0, 0.01, 0.01, PI));
    planets[0].push(new Planet(icyTex, 'Marilyn', 200, 30, 0, 0, 0, 0.01, 0.02, 0));
    planets[0].push(new Planet(moonTex, 'James', 280, 30, 0, 0, 0, 0.01, 0.02, PI));
    planets[0].push(new Planet(neptuneTex, 'Hannah', 550, 25, 0, 0, 0, 0.01, 0.001, 0));


    planets[1].push(new Planet(sunTex, 'Lydia', 0, 50, 0, 0, 0, 0, 0, 0));
    planets[1].push(new Planet(greenTex, 'Jack', 100, 25, 0, 0, 0, 0.02, 0.01, 0));
    planets[1].push(new Planet(redTex, 'Nath', 330, 30, 0, 0, 0, 0.02, 0.01, PI));
    planets[1].push(new Planet(icyTex, 'Marilyn', 200, 30, 0, 0, 0, 0.01, 0.02, 0));
    planets[1].push(new Planet(moonTex, 'James', 280, 30, 0, 0, 0, 0.01, 0.02, PI));
    planets[1].push(new Planet(neptuneTex, 'Hannah', 550, 25, 0, 0, 0, 0.01, 0.001, 0));
    planets[1].push(new Planet(sun2Tex, 'Louisa', -100, 0, 0, 0, 480, 0.01, 0, -PI / 2));


    planets[2].push(new Planet(greenTex, 'Jack', 200, 25, 0, 0, 0, 0.02, 0.008194682977764125, 0));
    planets[2].push(new Planet(redTex, 'Nath', 200, 30, 0, 0, 0, 0.02, -0.009858487244594663, PI));
    planets[2].push(new Planet(icyTex, 'Marilyn', 300, 30, 0, 0, 0, 0.01, 0.01638936595552825, 0));
    planets[2].push(new Planet(moonTex, 'James', 100, 30, 0, 0, 480, 0.01, -0.01638936595552825, PI));
    planets[2].push(new Planet(neptuneTex, 'Hannah', 390, 25, 0, 0, 0, 0.01, 0.002624785320012295, 0));
    planets[2].push(new Planet(sun2Tex, 'Louisa', 0, 30, 0, 0, 480, 0.01, 0, -PI / 2));

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
            fill(0, Math.min(210, frame));
            sphere(this.size + 5);
        }

        pop();
        fill(255);
        translate(0, -1.5 * this.size, 0);
        textFont(font);
        textAlign(CENTER, CENTER);
        rotateY(-this.orbit - PI / 2 - rover.pan);
        rotateX(+ rover.tilt);
        text(this.text, 0, 0);
        // text(this.orbit, 0, -100);
        pop();
        this.rotation += this.rotationSpeed;
        this.orbit += this.orbitSpeed;
    }
}