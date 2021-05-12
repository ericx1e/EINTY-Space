let _text;
let helventicaFont;
var rover;
let planets = [];

let totalScenes = 3;

function setup() {
    helventicaFont = loadFont('assets/Helvetica 400.ttf');
    backgroundTex = loadImage('assets/milkyway2.jpg');
    earthTex = loadImage('assets/earth.jpg');
    sunTex = loadImage('assets/sun.jpg');
    moonTex = loadImage('assets/moon.jpg');
    neptuneTex = loadImage('assets/neptune.jpg');
    canvas = createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    canvas.position(0, 0);
    rover = createRoverCam();
    rover.usePointerLock();
    // rover.setState({position: [-400,-0,-200], rotation: [0.4,0.3,0], sensitivity: 0.025, speed: 1.0});
    defaultView();

    for (let i = 0; i < totalScenes; i++) {
        planets.push([]);
    }

    planets[0].push(new Planet(sunTex, 'Lydia Drown and stuff xdxdxd', 0, 50, 0, 0, 0, 0.001, 0, 0));
    planets[0].push(new Planet(earthTex, 'Earth', 200, 25, 0, 0, 0, 0.01, 0.01, 0));
    planets[0].push(new Planet(neptuneTex, 'Hannah :(', 600, 25, 0, 0, 0, 0.01, 0.001, 0));
    planets[0].push(new Planet(moonTex, 'Moon', 50, 25, 0, 0, 200, 0.01, 0.01, 0));
    planets[0].push(new Planet(moonTex, 'Moon', 50, 25, 0, 0, 200, 0.01, 0.01, PI));

}

let scene = 0;


function draw() {
    background(0);
    texture(backgroundTex);
    noStroke();
    sphere(700);
    push();
    translate(rover.position.x+100, rover.position.y, rover.position.z);
    rotate(-PI/2);
    textFont(helventicaFont);
    textAlign(CENTER, CENTER);
    fill(255);
    rect(width/2, height/2, 100, 100);
    text("Scene: " + (scene+1), 0, 0);
    pop();

    planets[scene].forEach(planet => {
        planet.update();
    });

}

function keyPressed() {
    if (key == '1') {
        defaultView();
    }

    if(key == '2') {
        overheadView();
    }
}

function defaultView() {
    rover.setState({ position: [-490, -490, 0], rotation: [0, 0.7, 0], sensitivity: 0.025, speed: 1.0 });
}

function overheadView() {
    
    rover.setState({ position: [0, -600, 0], rotation: [0, PI/2, 0], sensitivity: 0.025, speed: 1.0 });
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

        pop();
        translate(0, -1.5 * this.size, 0);
        textFont(helventicaFont);
        textAlign(CENTER, CENTER);
        rotateY(-this.orbit - PI / 2 - rover.pan);
        rotateX(+ rover.tilt);
        text(this.text, 0, 0);
        pop();
        this.rotation += this.rotationSpeed;
        this.orbit += this.orbitSpeed;
    }
}