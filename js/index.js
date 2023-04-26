window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const context = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  class Particle {
    constructor() {}
    draw() {}
    update() {}
  }

  class Effect {
    constructor(context, canvasWidth, canvasHeight) {
      this.context = context;
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.textX = this.canvasWidth / 2;
      this.textY = this.canvasHeight / 2;
      this.fontSize = 80;
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
        redius: 20000,
        x: 0,
        y: 0,
      };

      window.addEventListener("mousemove", (event) => {
        this.mouse.x = event.x;
        this.mouse.y = event.y;
        console.log(this.mouse.x, this.mouse.y);
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
        this.particles = []
        const pixels = this.context.getImageData(0,0, this.canvasWidth, this.canvasHeight)
    }
    render() {}
  }

  const effect = new Effect(context, canvas.width, canvas.height);
  console.log(effect);
  effect.wrapText(
    "Hallo! Type something... and swipe the mouse through the letters "
  );

  //
  //   context.beginPath();
  //   context.moveTo(canvas.width / 2, 0);
  //   context.lineTo(canvas.width / 2, canvas.height);
  //   context.stroke();

  //   context.strokeStyle = "green";
  //   context.beginPath();
  //   context.moveTo(0, canvas.height / 2);
  //   context.lineTo(canvas.width, canvas.height / 2);
  //   context.stroke();

  //
  //   context.strokeStyle = "#caec0dff";
  //
  //   context.font = "80px sans-serif";

  //   const maxTextWidth = canvas.width * 0.4;
  //   const lineHeight = 80;

  //   function wrapText(text) {
  //     let linesArray = [];
  //     let lineCounter = 0;
  //     let line = "";
  //     let words = text.split(" ");

  //     for (let i = 0; i < words.length; i++) {
  //       let testLine = line + words[i] + " ";
  //       if (context.measureText(testLine).width > maxTextWidth) {
  //         line = words[i] + " ";
  //         lineCounter++;
  //       } else {
  //         line = testLine;
  //       }
  //       linesArray[lineCounter] = line;
  //     }
  //     let textHeight = lineHeight * lineCounter;
  //     let textY = canvas.height / 2 - textHeight / 2;
  //     linesArray.forEach((el, index) => {
  //       context.fillText(el, canvas.width / 2, textY + index * lineHeight);
  //     });
  //     console.log(linesArray);
  //   }

  //   textInput.addEventListener("keyup", (event) => {
  //     context.clearRect(0, 0, canvas.width, canvas.height);
  //     wrapText(event.target.value);
  //   });
});
