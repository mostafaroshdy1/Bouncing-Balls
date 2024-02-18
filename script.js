const balls = [];
class Ball {
    static #numberOfBalls = 1;
    #ball;
    #speedX;
    #speedY;



    constructor() {
        Ball.#numberOfBalls++;
        this.#speedX = Math.random() * 5 + 5;
        this.#speedY = Math.random() * 5 + 5;
        this.#ball = document.createElement("img")
        this.#ball.classList.add("ball");
        this.#ball.src = "ball.png"
        document.querySelector("body").appendChild(this.#ball);
        this.#ball.style.transform = `translate(${Math.random() * 100}vw, ${Math.random() * 100}vh)`;

        this.moveAround();
    }
    static get numberOfBalls() {
        return Ball.#numberOfBalls;
    }
    get ball() {
        return this.#ball;
    }
    locationX() {
        return this.ball.getBoundingClientRect().x;
    }
    locationY() {
        return this.ball.getBoundingClientRect().y;
    }

    moveAround() {
        setInterval(() => {

            // Reverse direction if the ball reaches the window edges
            if (this.locationX() + this.ball.width >= window.innerWidth || this.locationX() < 0) {
                this.#speedX *= -1;
            }
            if (this.locationY() + this.ball.height >= window.innerHeight || this.locationY() < 0) {
                this.#speedY *= -1;
            }

            // Update the ball's position
            this.ball.style.transform = `translate(${this.locationX() + this.#speedX}px, ${this.locationY() + this.#speedY}px)`;

            // Check for collisions with other balls
            for (let i = 0; i < balls.length; i++) {
                const otherBall = balls[i];
                if (otherBall !== this) {
                    const dx = this.locationX() - otherBall.locationX();
                    const dy = this.locationY() - otherBall.locationY();
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < this.ball.width) {
                        // Collision detected, reverse velocities in perpendicular direction
                        const angle = Math.atan2(dy, dx);
                        const thisSpeed = Math.sqrt(this.#speedX * this.#speedX + this.#speedY * this.#speedY);
                        const otherSpeed = Math.sqrt(otherBall.#speedX * otherBall.#speedX + otherBall.#speedY * otherBall.#speedY);

                        // Calculate new velocities
                        const newThisSpeedX = otherSpeed * Math.cos(angle);
                        const newThisSpeedY = otherSpeed * Math.sin(angle);
                        const newOtherSpeedX = thisSpeed * Math.cos(angle + Math.PI);
                        const newOtherSpeedY = thisSpeed * Math.sin(angle + Math.PI);

                        // Update velocities
                        this.#speedX = newThisSpeedX;
                        this.#speedY = newThisSpeedY;
                        otherBall.#speedX = newOtherSpeedX;
                        otherBall.#speedY = newOtherSpeedY;

                        break; // Exit the loop after handling the collision
                    }
                }
            }
        }, 16.67)
    }

}

document.addEventListener('keydown', function (event) {
    setBallCounter();
    balls.push(new Ball());
});

document.addEventListener('touchstart', function (event) {
    setBallCounter();
    balls.push(new Ball());
});

function setBallCounter() {
    document.querySelector("#number").innerText = Ball.numberOfBalls;

}
