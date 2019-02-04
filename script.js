'use strict';
const randomInteger = (min, max) => {
    const result = Math.round(min - 0.5 + Math.random() * (max - min + 1));
    return result === 0 ? randomInteger(min, max) : result;
};

const selectColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const drawingWindow = document.getElementById('figures');
const context = drawingWindow.getContext('2d');
const arrCircles = [];
const arrSquare = [];


const fillArr = (arr, obj) => {
    if (arr.length < 10) arr.push(obj);
};

function Circle() {
    this.radius = randomInteger(5, 40);
    this.centerX = 0 + this.radius;
    this.centerY = 0 + this.radius;
    this.color = selectColor();
    this.dx = randomInteger(-4, 4);
    this.dy = randomInteger(-2, 2);
    this.area = Math.PI * Math.pow(this.radius, 2);
};

const drawCircle = (circle) => {
    context.beginPath();
    context.arc(circle.centerX, circle.centerY, circle.radius, 0, 2 * Math.PI);
    context.fillStyle = circle.color;
    context.fill();
    context.closePath();
};

const animationCircle = (circle) => {
    drawCircle(circle);
    if (circle.centerX + circle.dx > drawingWindow.width - circle.radius || circle.centerX + circle.dx < circle.radius) {
        circle.dx = -circle.dx;
    }
    if (circle.centerY + circle.dy > drawingWindow.height - circle.radius || circle.centerY + circle.dy < circle.radius) {
        circle.dy = -circle.dy;
    }
    circle.centerX += circle.dx;
    circle.centerY += circle.dy;
};

function Square() {
    this.side = randomInteger(5, 40);
    this.x = 0;
    this.y = 0;
    this.color = selectColor();
    this.dx = randomInteger(-4, 4);
    this.dy = randomInteger(-2, 2);
    this.area = Math.pow(this.side, 2);
}

const drawSquare = (square) => {
    context.beginPath();
    context.rect(square.x, square.y, square.side, square.side);
    context.fillStyle = square.color;
    context.fill();
};
const animationSquare = (square) => {
    drawSquare(square);
    if (square.x + square.dx > drawingWindow.width - square.side || square.x + square.dx < 0) {
        square.dx = -square.dx;
    }
    if (square.y + square.dy > drawingWindow.height - square.side || square.y + square.dy < 0) {
        square.dy = -square.dy;
    }
    square.x += square.dx;
    square.y += square.dy;
};

const startDraw = () => {
    context.clearRect(0, 0, drawingWindow.width, drawingWindow.height);
    arrCircles.forEach((item) => animationCircle(item));
    arrSquare.forEach((item) => animationSquare(item));
};

window.onload = () => {
    setInterval(() => fillArr(arrCircles, new Circle()), 5000);
    setTimeout(() => setInterval(() => fillArr(arrSquare, new Square()), 5000), 55000);
    setInterval(() => startDraw(), 10);
    setTimeout(() => console.log(arrCircles.map((item) => item.area)), 50000); //show array of circle`s areas
    setTimeout(() => console.log(arrSquare.map((item) => item.area)), 110000); //show array of square`s areas
};