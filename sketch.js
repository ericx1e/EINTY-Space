let _text;
let helventicaFont;
var rover;
let planets = [];

function setup() {
    helventicaFont = loadFont('assets/Helvetica 400.ttf');
    backgroundTex = loadImage('assets/milkyway2.jpg');
    earthTex = loadImage('assets/earth.jpg');
    sunTex = loadImage('assets/sun.jpg');
    moonTex = loadImage('assets/moon.jpg');
    canvas = createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    canvas.position(0, 0);
    rover = createRoverCam();
    rover.usePointerLock();
    // rover.setState({position: [-400,-0,-200], rotation: [0.4,0.3,0], sensitivity: 0.025, speed: 1.0});
    defaultView();

    planets.push(new Planet(sunTex, 'Sun', 0, 50, 0, 0, 0, 0.001, 0));
    planets.push(new Planet(earthTex, 'Earth', 200, 25, 0, 0, 0, 0.01, 0.01));
}

let scene = 0;


function draw() {
    background(0);
    push();
    translate(0, 0, 0);
    texture(backgroundTex);
    noStroke();
    sphere(500);

    planets.forEach(planet => {
        planet.update();
    });

}

function keyPressed() {
    if (key == ' ') {
        defaultView();
    }
}

function defaultView() {
    rover.setState({ position: [-350, -300, 0], rotation: [0, 0.7, 0], sensitivity: 0.025, speed: 1.0 });
}

function Planet(tex, tx, d, size, ox, oy, oz, rs, os) {
    this.tex = tex;
    this.text = tx;
    this.distance = d;
    this.size = size;
    this.orbitX = ox;
    this.orbitY = oy;
    this.orbitZ = oz;
    this.rotationSpeed = rs;
    this.orbitSpeed = os;
    this.orbit = 0;
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