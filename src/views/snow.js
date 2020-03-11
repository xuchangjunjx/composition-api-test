/* eslint-disable no-debugger */
class flakeMove {
  constructor({ canvasWidth, canvasHeight, flakeSize, fallSpeed }) {
    // eslint-disable-next-line no-console
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = Math.floor(Math.random() * canvasWidth); //x坐标
    this.y = Math.floor(Math.random() * canvasHeight); //y坐标
    this.size = Math.random() * flakeSize + 2; //形状
    this.masSize = flakeSize; //最大形状
    this.speed = Math.random() * 1 + fallSpeed; //坠落速度
    this.fallSpeed = fallSpeed; //坠落速度
    this.velY = this.speed; //y方向速度
    this.velX = 0; //x方向速度
    this.stepSize = Math.random() / 30; //步长
    this.step = 0; //步数
  }
  update = () => {
    this.velX *= 0.98;
    if (this.velY <= this.speed) {
      this.velY = this.speed;
    }
    this.velX += Math.random((this.step += 0.05)) * this.stepSize;

    this.y += this.velY;
    this.x += this.velX;
    //飞出边界处理
    if (
      this.x >= this.canvasWidth ||
      this.x <= 0 ||
      this.y >= this.canvasHeight ||
      this.y <= 0
    ) {
      this.reset(this.canvasWidth, this.canvasHeight);
    }
  };
  //飞出边界--放置最顶端继续坠落
  reset = width => {
    this.x = Math.floor(Math.random() * width);
    this.y = 0;
    this.size = Math.random() * this.masSize + 2;
    this.speed = Math.random() * 1 + this.fallSpeed;
    this.velY = this.speed;
    this.velX = 0;
  };
  //渲染雪花--随机形状
  render = ctx => {
    var snowFlake = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.size
    );
    snowFlake.addColorStop(0, "rgba(255,255,255,0.9)");
    snowFlake.addColorStop(0.5, "rgba(255,255,255,0.9)");
    snowFlake.addColorStop(1, "rgba(255,255,255,0)");
    ctx.save();
    ctx.fillStyle = snowFlake;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };
}

export default class snowFall {
  constructor({ id = "snow", max = 200, size = 4, speed = 2 }) {
    this.maxFlake = max; // 数量
    this.flakeSize = size; // 形状
    this.fallSpeed = speed; // 速度
    this.containerId = id;
  }
  createCanvas = () => {
    //添加Dom节点
    var snowcanvas = document.createElement("canvas");
    snowcanvas.id = "snowfall";
    this.height = document.body.clientHeight;
    this.width = document.body.clientWidth;
    snowcanvas.width = document.body.clientWidth;
    snowcanvas.height = document.body.clientHeight;
    snowcanvas.setAttribute(
      "style",
      "position:fixed;top:0;left:0;z-index:2999;pointer-events:none;"
    );

    // document.body.appendChild(snowcanvas);
    document.getElementById(this.containerId).appendChild(snowcanvas);
    this.canvas = snowcanvas;
    this.ctx = snowcanvas.getContext("2d");
    //窗口大小改变处理
    window.onresize = function() {
      snowcanvas.width = window.innerWidth;
      snowcanvas.height = window.innerHeight;
    };
  };
  createFlakes = () => {
    var maxFlake = this.maxFlake,
      flakes = (this.flakes = []);
    for (var i = 0; i < maxFlake; i++) {
      flakes.push(
        new flakeMove({
          canvasWidth: this.width,
          canvasHeight: this.height,
          flakeSize: this.flakeSize,
          fallSpeed: this.fallSpeed
        })
      );
    }
  };
  drawSnow = () => {
    const { maxFlake, flakes, canvas, ctx } = this;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < maxFlake; i++) {
      flakes[i].update();
      flakes[i].render(ctx);
    }
    //一折一帧的画
    // requestAnimationFrame(this.drawSnow);

    requestAnimationFrame(
      function() {
        this.drawSnow();
      }.bind(this)
    );
  };
  start = () => {
    this.status = 1;
    //创建画布
    this.createCanvas();
    //创建雪花形状
    this.createFlakes();
    //画学
    this.drawSnow();
  };
}
