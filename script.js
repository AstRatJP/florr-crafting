const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");
let x = 400;
let y = 500;
let isCrafted = 0;
let particlesArray = [];
const numberOfParticles = 100;
let petalsArray = [];
let petalCrafted = 1;
let canPetalSpin = 0;

class Particle {
    constructor(size, vx, vy, va) {
        this.size = size;
        this.vx = vx;
        this.vy = vy;
        this.va = va;
        this.x = x;
        this.y = y;
        this.a = 0;
        this.alpha = 1;
        this.wait = 3;
    }
    update() {
        this.wait -= 1;
        if (this.wait<0) {
            this.vy -= 0.02;
            this.vx *= 0.975;
            this.vy *= 0.975;
            this.x += this.vx;
            this.y -= this.vy;
            this.a += this.va;
            this.alpha -= 0.01; 
        }
    }
    draw() {
        if (this.wait<0) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((Math.PI/180)*this.a);
            ctx.translate(-this.x, -this.y);
            ctx.fillStyle = `rgba(34, 218, 221, ${this.alpha})`;
            ctx.fillRect(this.x-this.size/2, this.y-this.size/2, this.size, this.size);
            ctx.restore()
        }
    }
}

class Petal {
    constructor(angle) {
        this.size = 1;
        this.angle = angle;
        this.alpha = 1;
        this.phase = 0.5;
        this.ease = 0;
        this.radius = 100 + Math.cos(this.phase)*42;
    }
    update() {
        if (canPetalSpin==1) {
            this.angle += (Math.PI*3)/180*(this.ease/0.06);
            if (this.ease<0.06) {
                this.ease += 0.001;
            }
            this.phase += this.ease;
            this.radius = 100 + Math.cos(this.phase)*42;
            if (this.phase>52.2) {
                this.alpha -= 0.05;
                this.size -= 0.05;
                this.radius -= 0.2;
                if (isCrafted == 0) {
                    petalCrafted = new PetalCrafted();
                    console.log("crafted");
                    isCrafted = 1;
                }
            }   
        }
    }
    draw() {
        if (this.size>0) {
        ctx.fillStyle = ctx.fillStyle = `rgba(222, 31, 31, ${this.alpha})`;
        ctx.fillRect(x+this.radius*Math.cos(this.angle)-38*this.size, y+this.radius*Math.sin(this.angle)-38*this.size, 76*this.size, 76*this.size);

        ctx.strokeStyle = `rgba(180, 25, 25, ${this.alpha})`;
        ctx.lineWidth = 6*this.size;
        ctx.beginPath();
        ctx.roundRect(x+this.radius*Math.cos(this.angle)-38*this.size, y+this.radius*Math.sin(this.angle)-38*this.size, 76*this.size, 76*this.size, 1*this.size);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x+this.radius*Math.cos(this.angle), y+this.radius*Math.sin(this.angle)-6*this.size, 14*this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(207, 207, 207, ${this.alpha})`;
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(x+this.radius*Math.cos(this.angle), y+this.radius*Math.sin(this.angle)-6*this.size, 10*this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.fill();
        ctx.closePath();

        ctx.strokeStyle = `rgba(34, 34, 34, ${this.alpha})`;
        ctx.font = `bold ${16*this.size}px Ubuntu, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = 'middle';
        ctx.lineWidth = 2*this.size;
        ctx.lineJoin = 'round';
        ctx.strokeText("Basic", x+this.radius*Math.cos(this.angle), y+this.radius*Math.sin(this.angle)+20*this.size);
        ctx.fillStyle = `rgba(238, 238, 238, ${this.alpha})`;
        ctx.font = `bold ${16*this.size}px Ubuntu, sans-serif`;
        ctx.fillText("Basic", x+this.radius*Math.cos(this.angle), y+this.radius*Math.sin(this.angle)+20*this.size);
        } else {
            pop();
            petalsArray.splice(0);
        }
    }
}

class PetalCrafted {
    constructor() {
        this.size = 0.05;
        this.vsize = 0.21;
        this.alpha = 0;
        this.angle = Math.PI;
        this.times = 1;
    }

    update() {
        if (this.times<36) {
            this.alpha += 0.05;
            this.size += this.vsize;
            this.vsize -= 0.01;
            this.times += 1;
        }
        this.angle *= 0.9;
    }

    draw() {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(this.angle);
        ctx.translate(-x, -y);
            ctx.fillStyle = ctx.fillStyle = `rgba(31, 219, 222, ${this.alpha})`;
            ctx.fillRect(x-38*this.size, y-38*this.size, 76*this.size, 76*this.size);
    
            ctx.strokeStyle = `rgba(25, 177, 180, ${this.alpha})`;
            ctx.lineWidth = 6*this.size;
            ctx.beginPath();
            ctx.roundRect(x-38*this.size, y-38*this.size, 76*this.size, 76*this.size, 1*this.size);
            ctx.stroke();
    
            ctx.beginPath();
            ctx.arc(x, y-6*this.size, 14*this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(207, 207, 207, ${this.alpha})`;
            ctx.fill();
            ctx.closePath();
    
            ctx.beginPath();
            ctx.arc(x, y-6*this.size, 10*this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
            ctx.fill();
            ctx.closePath();
    
            ctx.strokeStyle = `rgba(34, 34, 34, ${this.alpha})`;
            ctx.font = `bold ${16*this.size}px Ubuntu, sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = 'middle';
            ctx.lineWidth = 2*this.size;
            ctx.lineJoin = 'round';
            ctx.strokeText("Basic", x, y+20*this.size);
            ctx.fillStyle = `rgba(238, 238, 238, ${this.alpha})`;
            ctx.font = `bold ${16*this.size}px Ubuntu, sans-serif`;
            ctx.fillText("Basic", x, y+20*this.size);
            ctx.restore();
    }
}

cvs.addEventListener('click', e => {
    // x = e.clientX*window.devicePixelRatio;
    // y = e.clientY*window.devicePixelRatio;
    canPetalSpin = 1;
})

function pop() {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle(
            (Math.random()*4+1)*window.devicePixelRatio, 
            (Math.random()*6-3)*window.devicePixelRatio, 
            (Math.random()*4-1)*window.devicePixelRatio, 
            Math.random()*8-4
            ))
    }
}

function setPetals() {
    for (let i = 0; i < 5; i++) {
        petalsArray.push(new Petal(Math.PI*(2/5)*i));
    }
    console.log(petalsArray);
}

// リサイズ処理
window.onresize = function () {
    resize();
}

// canvasサイズの調整
function resize() {
    canvas.width = cvs.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = cvs.height = window.innerHeight * window.devicePixelRatio;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
}

function drawbg() {
    ctx.fillStyle = "#DB9D5A";
    ctx.fillRect(0, 0, cvs.width, cvs.height);
}


function mainloop() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    resize();
    drawbg();

    // particle
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        if (particlesArray[i].alpha<0) {
            particlesArray.splice(i, 1);
        }
    }

    // petal
    for (let i = 0; i < petalsArray.length; i++) {
        petalsArray[i].update();
        petalsArray[i].draw();
    }

    if (isCrafted==1) {
        console.log(petalCrafted);
        petalCrafted.update();
        petalCrafted.draw();
    }

    requestAnimationFrame(mainloop);
}
setPetals();
mainloop();