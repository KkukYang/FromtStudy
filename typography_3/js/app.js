import {Visual} from "./visual.js";

class App {
    constructor() {
        // this.setWebgl();
        this.canvas = document.createElement("canvas");
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");
        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        WebFont.load({
            google: {
                families: ["Hind:700"]
            },
            fontactive: () => {
                // this.text = new Text();
                // this.text.setText(
                //     "A", 2
                //     , document.body.clientWidth
                //     , document.body.clientHeight
                // );
                this.visual = new Visual();
                window.addEventListener("resize", this.resize.bind(this), false);
                this.resize();
                requestAnimationFrame(this.animate.bind(this));
            },
        });
    }

    // setWebgl() {
    //     this.renderer = new PIXI.Renderer({
    //         width: document.body.clientWidth,
    //         height: document.body.clientHeight,
    //         antialias: true,
    //         transparent: false,
    //         resolution: (window.devicePixelRatio > 1) ? 2 : 1,
    //         autoDensity: true,
    //         powerPreference: "high-performance",
    //         backgroundColor: 0xffffff,
    //     });
    //     document.body.appendChild(this.renderer.view);
    //
    //     this.stage = new PIXI.Container();
    // }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
        // this.renderer.resize(this.stageWidth, this.stageHeight);

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        this.visual.show(this.stageWidth, this.stageHeight, this.stage);
    }

    animate(t) {
        requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        this.visual.aniamte(this.ctx, t);
        // this.renderer.render(this.stage);

    }
}

window.onload = () => {
    new App();
}