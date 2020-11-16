import {Text} from "./text.js";
import {Particle} from "./particle.js";
import {hslToHex} from "./utils.js";

// export const RANDOM_TEXT = '안녕하세요';

export class Visual {
    constructor() {
        this.text = new Text();
        this.particles = [];
        this.mouse = {
            x: 0,
            y: 0,
            radius: 100
        };

        document.addEventListener("pointermove", this.onMove.bind(this), false);
    }

    show(stageWidth, stageHeight) {
        // const str = this.textArr[Math.round(Math.random() * (this.textArr.length - 1))];
        // this.pos = this.text.setText(str, 26, stageWidth, stageHeight);
        // this.particles = [];
        // for (let i = 0; i < this.pos.length; i++) {
        //     const item = new Particle(this.pos[i]);
        //     this.particles.push(item);
        // }

        this.pos = this.text.setText("W", 20, stageWidth, stageHeight);
        this.posTotal = this.pos.length - 1;
    }

    aniamte(ctx) {
        if (!this.pos) {
            return;
        }

        for (let i = 0; i < 10; i++) {
            const myPos = this.pos[(Math.random() * this.posTotal) | 0];
            this.particles.push(new Particle(myPos, this.getColor()));
        }

        for (let i = 0; i < this.particles.length; i++) {
            const item = this.particles[i];
            if (item.radius <= 1) {
                this.particles.splice(i, 1);
            }

            const dx = this.mouse.x - item.x;
            const dy = this.mouse.y - item.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = item.radius + this.mouse.radius;

            if (dist < minDist) {
                item.progress += 100;
            }
            item.draw(ctx);
        }
    }

    getColor() {
        const minHue = 80;
        const maxHue = 340;
        const hue = (maxHue - minHue) * Math.random() + minHue;
        return hslToHex(hue, 84, 50);
    }

    onMove(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    }
}