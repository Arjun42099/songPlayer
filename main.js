song1 = "";
song2 = "";

song1status = "";
song2status = "";

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
leftWristX = 0;

rightWristY = 0;
leftWristY = 0;

function preload() {
    song1 = loadSound("ilikemebetter.mp3");
    song2 = loadSound("meanit.mp3");
}

function setup() { 
    canvas = createCanvas(600, 500);
     canvas.center();
     
      video = createCapture(VIDEO);
       video.hide();

        poseNet = ml5.poseNet(video, modelLoaded);
         poseNet.on('pose', gotPoses); 
        }

function modelLoaded() {
    console.log("poseNet is initialized");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist= " + scoreRightWrist + "scoreLeftWrist= " + scoreLeftWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX= " + rightWristX + "rightWristY= " + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX= " + leftWristX + "leftWristY= " + leftWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);

    song1status = song1.isPlaying();
    song2status = song2.isPlaying();

    fill("#782fed");
    stroke("#782fed");

    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        if (song1status == false) {
            song1.play();
            document.getElementById("play_button").innerHTML = "Playing: I like me better";
        }
    }
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        if (song2status == false) {
            song2.play();
            document.getElementById("play_button").innerHTML = "Playing: Mean it";
        }
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}