window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const context = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  class Particle {
    constructor(effect, x, y, color) {
      this.effect = effect;
      this.x = Math.random() * this.effect.canvasWidth;
      this.y = this.effect.canvasHeight;
      this.color = color;
      this.originX = x;
      this.originY = y;
      this.size = this.effect.gap;
      this.dx = 0;
      this.dy = 0;
      this.vx = 0;
      this.dy = 0;
      this.force = 0;
      this.angle = 0;
      this.distance = 0;
      this.friction = Math.random() * 0.6 + 0.15;
      this.ease = Math.random() * 0.1 + 0.005;
    }
    draw() {
      this.effect.context.fillStyle = this.color;
      this.effect.context.fillRect(
        this.originX,
        this.originY,
        this.size,
        this.size
      );
    }
    update() {
      this.dx = this.effect.mouse.x - this.x;
      this.dy = this.effect.mouse.y - this.y;
      this.distance = this.dx * this.dx + this.dy * this.dy;
      this.x += (this.originX - this.x) * this.ease;
      this.y += (this.originY - this.y) * this.ease;
    }
  }

  class Effect {
    constructor(context, canvasWidth, canvasHeight) {
      this.context = context;
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.textX = this.canvasWidth / 2;
      this.textY = this.canvasHeight / 2;
      this.fontSize = 130;
      this.lineHeight = this.fontSize * 0.9;
      this.maxTextWidth = this.canvasWidth * 0.8;
      this.textInput = document.getElementById("textInput");
      this.textInput.addEventListener("keyup", (event) => {
        if (event.key !== " ") {
          this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
          this.wrapText(event.target.value);
        }
      });
      this.particles = [];
      this.gap = 3;
      this.mouse = {
        radius: 20000,
        x: 0,
        y: 0,
      };

      window.addEventListener("mousemove", (event) => {
        this.mouse.x = event.x;
        this.mouse.y = event.y;
      });
    }

    wrapText(text) {
      const gradient = this.context.createLinearGradient(
        0,
        0,
        this.canvasWidth,
        this.canvasHeight
      );

      gradient.addColorStop(0.3, "red");
      gradient.addColorStop(0.5, "yellow");
      gradient.addColorStop(0.6, "blue");
      this.context.fillStyle = gradient;
      this.context.textAlign = "center";
      this.context.textBaseline = "middle";
      this.context.lineWidth = 3;
      this.context.strokeStyle = "red";
      this.context.font = this.fontSize + "px Helvetica";

      let linesArray = [];
      let words = text.split(" ");
      let lineCounter = 0;
      let line = "";

      for (let i = 0; i < words.length; i++) {
        let testLine = line + words[i] + " ";
        if (this.context.measureText(testLine).width > this.maxTextWidth) {
          line = words[i] + " ";
          lineCounter++;
        } else {
          line = testLine;
        }
        linesArray[lineCounter] = line;
      }

      let textHeight = this.lineHeight * lineCounter;
      let textY = this.canvasHeight / 2 - textHeight / 2;

      linesArray.forEach((element, index) => {
        this.context.fillText(
          element,
          this.textX,
          this.textY + index * this.lineHeight
        );
        this.context.strokeText(
          element,
          this.textX,
          this.textY + index * this.lineHeight
        );
      });
    }

    convertToParticles() {
      this.particles = [];
      const pixels = this.context.getImageData(
        0,
        0,
        this.canvasWidth,
        this.canvasHeight
      ).data;
      console.log(pixels);
      console.log(this.context);
      this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

      for (let y = 0; y < this.canvasHeight; y += this.gap) {
        for (let x = 0; x < this.canvasWidth; x += this.gap) {
          const index = (y * this.canvasWidth + x) * 4;
          const alpha = pixels[index + 3];
          if (alpha > 0) {
            const red = pixels[index];
            const green = pixels[index + 1];
            const blue = pixels[index + 2];
            const color = `rgb(${red},${green},${blue})`;
            this.particles.push(new Particle(this, x, y, color));
          }
        }
      }
      console.log(this.particles);
    }
    render() {
      this.particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
    }
  }

  const effect = new Effect(context, canvas.width, canvas.height);

  effect.wrapText(
    "Hallo! Type something... and swipe the mouse through the letters "
  );

  effect.render();

  function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    effect.render();
    requestAnimationFrame(animate);
  }
  animate();
});
