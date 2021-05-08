function setup() {
    img = loadImage('assets/space.jpg');
    canvas = createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    canvas.position(0, 0);
    rover = createRoverCam();
    rover.usePointerLock();
    rover.setState({position: [-400,-0,-200], rotation: [0.4,0.3,0], sensitivity: 0.025, speed: 1.0});
}

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
    pointLight(255, 255, 255, 0, 200, 0);
    fill(0);
    sphere(100);
    // box(100);
    pop();
    rotation+=0.05;
}