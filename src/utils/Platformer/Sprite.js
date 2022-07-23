class Tile{
    constructor(img, sx, sy){
        this.img = img;
        this.sx = sx;
        this.sy = sy;
    }

    render(ctx, x, y, scale){
        // Render the tile on the specified context, on the specified (x, y) position
        // under the specified scale.

        ctx.drawImage(
            topSprite,  // img - HtmlImageElement
            this.sx*scale,      // sx - Subrectangle X
            this.sy*scale,          // sy - Subrectangle Y
            scale,      // sWidth - Subrectangle Width
            scale,      // sHeight - Subrectangle Height
            Math.round(scale * x),  // dx - Canvas Position
            Math.round(scale * y),  // dy - Canvas Position
            scale,      // dWidth - Canvas Rendering Width
            scale       // dHeight - Canvas Rendering Height
        )
    }
}