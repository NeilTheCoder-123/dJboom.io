song="";
leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;
scoreL = 0;
scoreR = 0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(/*450,350*/600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is on the service!");
}

function gotPoses(results){
    if (results.length > 0){
        //console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        scoreL = results[0].pose.keypoints[9].score;
        scoreR = results[0].pose.keypoints[10].score;
        //console.log("LWX-"+leftWristX+"LWY"+leftWristY+"RWX"+rightWristX+"RWY"+rightWristY);
        //console.log(scoreL);
    }
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("#03fce3");
    stroke("#027d71");
    //circle(leftWristX-10, leftWristY-20, 20);
    //circle(rightWristX, rightWristY, 20);

    if (scoreR > 0.2){
        circle(rightWristX, rightWristY,20);
        if (rightWristY > 0 && rightWristY <= 100){
            document.getElementById("speed").innerHTML = "SPEED = 0.5x";
            song.rate(0.5);
        } else if (rightWristY > 100 && rightWristY <= 200){
            document.getElementById("speed").innerHTML = "SPEED = 1.0x";
            song.rate(1.0);
        } else if (rightWristY > 200 && rightWristY <= 300){
            document.getElementById("speed").innerHTML = "SPEED = 1.5x";
            song.rate(1.5);
        } else if (rightWristY > 300 && rightWristY <= 400){
            document.getElementById("speed").innerHTML = "SPEED = 2.0x";
            song.rate(2.0);
        } else if (rightWristY > 400){
            document.getElementById("speed").innerHTML = "SPEED = 2.5x";
            song.rate(2.5);
        }
    }

    if (scoreL > 0.2){
        circle(leftWristX, leftWristY, 20);
        var numLeftY = Number(leftWristY);
        var floorLeftY = floor(numLeftY);
        var volume = floorLeftY/500;
        document.getElementById("volume").innerHTML = "VOLUME = "+volume;
        song.setVolume(volume);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}