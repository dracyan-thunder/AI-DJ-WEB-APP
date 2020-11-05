song="";

rightwristX=0;
leftwristX=0;

rightwristY=0;
leftwristY=0;

function preload(){
    song=loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(400,400);
    canvas.position(475,215);
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPoses)
}


function draw(){
    image(video,0,0,400,400);
    no_leftwristY=Number(leftwristY);
    no_leftwristY=floor(no_leftwristY);
    volume=no_leftwristY/500;
    song.setVolume(volume);
    document.getElementById("Volume").innerHTML="Volume"+volume;
    if(rightwristY>0 && rightwristY<=100){
        song.rate(0.5);
        document.getElementById("Speed").innnerHTML="Speed=0.5x";
    }
    if(rightwristY>100 && rightwristY<200){
        song.rate(1);
        document.getElementById("Speed").innnerHTML="Speed=1x";
    }
    if(rightwristY>200 && rightwristY<300){
        song.rate(1.5);
        document.getElementById("Speed").innnerHTML="Speed=1.5x";
    }
    if(rightwristY>300 && rightwristY<400){
        song.rate(2);
        document.getElementById("Speed").innnerHTML="Speed=2x";
    }
}

function play(){
    song.play();
    song.setVolume(0.5);
    song.rate(1.5)
}

function modelLoaded(){
    console.log("Yes!!!!!!!!");
}

function gotPoses(result){
    if(result.length>0) {
            console.log(result);  
            leftwristX=result[0].pose.leftWrist.x;
            leftwristY=result[0].pose.leftWrist.y;
            rightwristX=result[0].pose.rightWrist.x;  
            rightwristY=result[0].pose.rightWrist.y;   
            
            console.log(leftwristX , leftwristY);
            console.log(rightwristX , rightwristY);
    }


}