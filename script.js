class Ball {
    static #numberOfBalls = 0;
    #locationX;
    #locationY;
    #ball;
    #speedX = 10;
    #speedY = 10;



    constructor() {
        Ball.#numberOfBalls++;
        this.#ball = document.createElement("img")
        this.#ball.classList.add("ball");
        this.#ball.src = "ball.png"
        document.querySelector("body").append(this.#ball);
        this.moveAround();
    }
    static get numberOfBalls() {
        return Ball.#numberOfBalls;
    }
    get ball() {
        return this.#ball;
    }
    get locationX() {
        return this.ball.getBoundingClientRect().x;
    }
    get locationY() {
        return this.ball.getBoundingClientRect().y;
    }

    moveAround() {
        const move = () => {
            // Reverse direction if the ball reaches the window edges
            console.log(this.locationX);
            if (this.locationX + this.ball.width >= window.innerWidth || this.locationX < 0) {
                this.#speedX *= -1;
            }
            if (this.locationY + this.ball.height >= window.innerHeight || this.locationY < 0) {
                this.#speedY *= -1;
            }

            // Update the ball's position
            this.ball.style.transform = `translate(${this.locationX + this.#speedX}px, ${this.locationY + this.#speedY}px)`;

            // Request the next animation frame
            requestAnimationFrame(move);
        };

        // Start the animation loop
        move();
    }

}
const ball1 = new Ball();
