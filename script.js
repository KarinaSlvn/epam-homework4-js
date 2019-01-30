'use strict';
const randomInteger = (min, max) => {
    const result = Math.round(min - 0.5 + Math.random() * (max - min + 1));
    return result === 0 ? randomInteger : result;
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
const arrCircles = new Array(10).fill('').map(() => new Circle());
const arrSquare = new Array(10).fill('').map(() => new Square());

function Circle() {
    this.centerX = drawingWindow.width / 2;
    this.centerY = drawingWindow.height / 2;
    this.radius = randomInteger(5, 40);
    this.color = selectColor();
    this.dx = randomInteger(-4, 4);
    this.dy = randomInteger(-2, 2);
}

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
    this.x = drawingWindow.width / 2 - this.side / 2;
    this.y = drawingWindow.height / 2 - this.side / 2;
    this.color = selectColor();
    this.dx = randomInteger(-4, 4);
    this.dy = randomInteger(-2, 2);
}

const drawSquare = (square) => {
    context.beginPath();
    context.rect(square.x, square.y, square.side, square.side);
    context.fillStyle = square.color;
    context.fill();
};
const animationSquare = (square) => {
    drawSquare(square);
    if (square.x + square.dx > drawingWindow.width -square.side || square.x + square.dx < 0) {
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
    setInterval(() => startDraw(), 10);
};