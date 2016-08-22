import getRotateDeg from './getRotateDeg';
import startDeg from './startDeg';
import {default as coverSize, coverRadius} from "./coverSize";
import menuSize from "./menuSize";
import clickZoneSize from "./clickZoneSize";
import listSize from "./listSize";
import textTop from "./textTop";
import extend from "../extend";

const DefaultConfig = {
    totalAngle: 360,//deg,
    spaceDeg: 0,//deg
    background: "#323232",
    backgroundHover: "#515151",
    pageBackground: "transparent",
    diameter: 300,//px
    position: 'top',
    horizontal: true,
    animation: "into",
    hideAfterClick: true
};

const sizeRatio = [1, 5/3, 25/9];
const percents = [0.32, 0.45, 0.45];
const centralDegRatio = [1, 0.618, 0.618];


export default function Config(config, level) {
    this.level = level;

    config = extend(DefaultConfig, config);
    for (var k in config) {
        this[k] = config[k];
    }

    this.diameter = this.diameter * sizeRatio[level];
    this.percent = percents[level];


    
    var itemsNum = this.menus.length,
        spaceNumber = this.totalAngle === 360 ? itemsNum : itemsNum - 1;
    
    this.radius = this.diameter / 2;
    this.coverRadius = coverRadius(this.radius, this.percent);
    this.clickZoneRadius = this.radius - this.coverRadius;
    
    
    this.listSize = listSize(this.diameter);
    this.clickZoneSize = clickZoneSize(this.diameter);
    this.menuSize = menuSize(this.diameter);
    this.coverSize = coverSize(this.coverRadius, this.percent);
    this.startDeg = startDeg(this.start, this.totalAngle, this.position);
    this.centralDeg = (this.totalAngle - (this.spaceDeg * spaceNumber)) / itemsNum;
    this.rotateUnit = this.centralDeg + this.spaceDeg;
    this.skewDeg = 90 - this.centralDeg;
    this.unskewDeg = -(90 - this.centralDeg / 2);
    this.textTop = textTop(this.clickZoneRadius);

    if(level > 0){
        this.totalAngle = this.centralDeg * centralDegRatio[level] * this.menus.length;
        //this.startDeg = this._calc.rotateDeg(index) - totalAngle / 2 + this._calc.centralDeg / 2;
    }
}

Config.prototype = {
    constructor: Config,
    getRotateDeg: getRotateDeg
};