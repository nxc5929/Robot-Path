import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Robot-Path';
  inchesPerPixel = (319/630)/12;
  startPosition = {x: null, y: null};
  lastPoint = [];
  lines = [];
  lastLine = {};
  totalDistance: number = 0;
  totalRotation: number = 0;
  totalDistanceStr: string;
  totalRotationStr: string;
  totalTimeStr: string;
  robotSpeed: number = 7.5;
  rotationSpeed: number = 90;


  addOnClick(event){
    var x = event.clientX;
    var y = event.clientY;
    if(this.startPosition.x == null){
      this.startPosition.x = x - 25;
      this.startPosition.y = y - 25;
    }else{
      this.addLine(this.lastPoint["x"], this.lastPoint["y"], x, y);
    }
    this.lastPoint["x"] = x;
    this.lastPoint["y"] = y;
  }

  addLine(x1: number, y1: number, x2: number, y2: number){
    var line = {x1: x1, y1: y1, x2: x2, y2: y2};
    this.lines.push(line);
    this.totalDistance += this.distanceOfLine(line);
    if(this.lastLine["x1"] != null){
      this.totalRotation += Math.abs(this.angleOfLine(this.lastLine, line));
    }
    this.lastLine = line;
    this.round();
  }

  distanceOfLine(line){
    var a = line.x1 - line.x2;
    var b = line.y1 - line.y2;
    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)) * this.inchesPerPixel;
  }

  angleOfLine(line1, line2){
    var x1 = line1.x1 - line1.x2;
    var y1 = line1.y1 - line1.y2;
    var slope1 = y1/x1;

    var x2 = line2.x1 - line2.x2;
    var y2 = line2.y1 - line2.y2;
    var slope2 = y2/x2;

    var angle = (slope1 - slope2)/(1+slope1*slope2);
    
    console.log(slope1 + " | " + slope2);

    return this.radians_to_degrees(Math.atan(angle));
  }

  radians_to_degrees(radians){
    var pi = Math.PI;
    return radians * (180/pi);
  }

  setRobotSpeed(speed){
    this.robotSpeed = speed;
  }

  setRotationSpeed(speed){
    this.rotationSpeed = speed;
  }

  update(){
    this.round();
  }

  round(){
    this.totalDistanceStr = this.totalDistance.toFixed(2);
    this.totalRotationStr = this.totalRotation.toFixed(2);
    this.totalTimeStr = ((this.totalDistance/this.robotSpeed) + (this.totalRotation/this.rotationSpeed)).toFixed(2);
  }
}
