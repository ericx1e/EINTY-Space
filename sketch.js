let _text;
let helventicaFont
function setup() {
    backgroundImg = loadImage('assets/milkyway.jpg');
    helventicaFont = loadFont('assets/Helvetica 400.ttf');
    img1 = loadImage('assets/earth.jpg');
    img2 = loadImage('assets/sun.jpg');
    img3 = loadImage('assets/moon.jpg');
    canvas = createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    canvas.position(0, 0);
    rover = createRoverCam();
    rover.usePointerLock();
    // rover.setState({position: [-400,-0,-200], rotation: [0.4,0.3,0], sensitivity: 0.025, speed: 1.0});
    defaultView();
}


let orbit = 0;
let rotation = 0;
let scene = 0;


function draw() {
    background(0);
    push();
    translate(0, 0, 0);
    texture(backgroundImg);
    noStroke();
    sphere(500);

    // fill(255);
    push();
    translate(0, -75, 0);
    rotateY(-PI / 2 - rover.pan);
    rotateX(+ rover.tilt);
    textFont(helventicaFont);
    textAlign(CENTER, CENTER);
    text('HELLO', 0, 0);
    pop();
    lights();
    lightFalloff(0.5, 0, 0);
    pointLight(255, 255, 255, 0, 0, 0);
    // lights();
    texture(img2);
    sphere(50);
    push();
    rotateY(orbit);
    translate(150, 0, 0);
    rotateY(rotation);
    texture(img1);
    rotateY(rotation);
    sphere(25);
    translate(50, 0, 0);
    texture(img3);
    sphere(10);
    // box(100);
    pop();
    rotation += 0.05;
    orbit += 0.01;
}

function keyPressed() {
    if (key == ' ') {
        defaultView();
    }
}

function defaultView() {
    rover.setState({ position: [-350, -300, 0], rotation: [0, 0.7, 0], sensitivity: 0.025, speed: 1.0 });
}