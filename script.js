const balls = [];

class Ball {
    static #numberOfBalls = 0;

    #ball;
    #speedX;
    #speedY;

    constructor() {
        Ball.#numberOfBalls++;
        this.#speedX = Math.random() * 5 + 5;
        this.#speedY = Math.random() * 5 + 5;
        this.#ball = document.createElement("img");
        this.#ball.classList.add("ball");
        this.#ball.src = "ball.png";
        document.body.appendChild(this.#ball);
        this.#ball.style.transform = `translate(${Math.random() * (window.innerWidth - this.#ball.width)}px, ${Math.random() * (window.innerHeight - this.#ball.height)}px)`;
        balls.push(this);
        this.moveAround();
    }

    static get numberOfBalls() {
        return Ball.#numberOfBalls;
    }

    get ball() {
        return this.#ball;
    }

    locationX() {
        return this.#ball.getBoundingClientRect().x;
    }

    locationY() {
        return this.#ball.getBoundingClientRect().y;
    }

    moveAround() {
        const move = () => {
            if (this.locationX() + this.#ball.width >= window.innerWidth || this.locationX() < 0) {
                this.#speedX *= -1;
            }
            if (this.locationY() + this.#ball.height >= window.innerHeight || this.locationY() < 0) {
                this.#speedY *= -1;
            }

            this.#ball.style.transform = `translate(${this.locationX() + this.#speedX}px, ${this.locationY() + this.#speedY}px)`;

            this.handleCollisions();

            requestAnimationFrame(move);
        };

        move();
    }

    handleCollisions() {
        for (let i = 0; i < balls.length; i++) {
            const otherBall = balls[i];
            if (otherBall !== this) {
                const dx = this.locationX() - otherBall.locationX();
                const dy = this.locationY() - otherBall.locationY();
                const squaredDistance = dx * dx + dy * dy;
                const combinedRadius = this.#ball.width * this.#ball.width; // Assuming all balls have the same radius

                if (squaredDistance < combinedRadius) {
                    this.handleCollisionWith(otherBall, dx, dy);
                }
            }
        }
    }

    handleCollisionWith(otherBall, dx, dy) {
        const angle = Math.atan2(dy, dx);
        const thisSpeed = Math.sqrt(this.#speedX * this.#speedX + this.#speedY * this.#speedY);
        const otherSpeed = Math.sqrt(otherBall.#speedX * otherBall.#speedX + otherBall.#speedY * otherBall.#speedY);

        const newThisSpeedX = otherSpeed * Math.cos(angle);
        const newThisSpeedY = otherSpeed * Math.sin(angle);
        const newOtherSpeedX = thisSpeed * Math.cos(angle + Math.PI);
        const newOtherSpeedY = thisSpeed * Math.sin(angle + Math.PI);

        this.#speedX = newThisSpeedX;
        this.#speedY = newThisSpeedY;
        otherBall.#speedX = newOtherSpeedX;
        otherBall.#speedY = newOtherSpeedY;
    }
}

window.addEventListener('load', () => {
    window.addEventListener('keydown', () => {
        setBallCounter();
        balls.push(new Ball());
    });

    window.addEventListener('touchstart', () => {
        setBallCounter();
        balls.push(new Ball());
    });

    setBallCounter();
});

function setBallCounter() {
    document.querySelector("#number").innerText = Ball.numberOfBalls;
}
