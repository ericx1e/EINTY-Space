function setup() {
    img = loadImage('assets/milkyway.jpg');
    img1 = loadImage('assets/earth.jpg');
    img2 = loadImage('assets/sun.jpg');
    img3 = loadImage('assets/moon.jpg');
    canvas = createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    canvas.position(0, 0);
    rover = createRoverCam();
    rover.usePointerLock();
    rover.setState({position: [-400,-0,-200], rotation: [0.4,0.3,0], sensitivity: 0.025, speed: 1.0});
}

let orbit = 0;
let rotation = 0;

function draw() {
    background(0);
    push();
    // translate(width/2, height/2);
    // orbitControl();
    // rotateY(rotation);
    texture(img)
    noStroke();
    // box(200);
    sphere(500)
    // fill(100);
    // box(50);
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
    rotation+=0.05;
    orbit += 0.01;
}