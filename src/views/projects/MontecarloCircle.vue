<template>
  <main class="d-flex flex-column align-items-center p-4">
    <h3 class="mb-4">PI Calculation with <a href="https://en.wikipedia.org/wiki/Monte_Carlo_method" target="_blank" class="text-info">Montecarlo Method</a></h3>
    <canvas width="400" height="400" id="monte-carlo-circle-canvas" ref="canvas"></canvas>
    <section class="text-center text-white mt-4">
      <div><b>Inside:</b> {{this.inn}} - Outside: {{this.total - this.inn}}</div>
      <div><b>Total:</b> {{this.total}}</div>
      <div><b>Circle Area:</b> {{(Math.round(this.inn/this.total * 1000))/1000}}</div>
      <div><b>PI Value:</b> {{(Math.round(this.inn/this.total*4 * 1000))/1000}}</div>
      <button class="btn btn-primary btn-sm my-2" @click="start">Reset</button>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return{
      total: 0,
      inn: 0,
      canvasCtx: null,
      maxIteration: 100000,
      WIDTH: 400,
      HEIGHT: 400,
    }
  },
  mounted() {
    this.canvasCtx = this.$refs.canvas.getContext('2d');
    this.start();
  },
  methods: {
    iter(){
      if (this.total >= this.maxIteration) return;

      for (let i = 0; i < 100; i++){
        const x = Math.random() * 400;
        const y = Math.random() * 400;

        const dist = this.getDist(x, y, this.WIDTH/2, this.HEIGHT/2);
        if (dist <= this.WIDTH/2){
          this.inn++;
          this.canvasCtx.fillStyle = '#4ad04c';
        }else{
          this.canvasCtx.fillStyle = '#d04a72';
        }
        this.canvasCtx.fillRect(x, y, 1, 1);

        this.total++;
      }

      window.requestAnimationFrame(this.iter.bind(this));
    },
    getDist(x1, y1, x2, y2){
      const diffX = (x1-x2);
      const diffY = (y1-y2);

      return Math.sqrt(diffX*diffX + diffY*diffY);
    },
    start(){
      this.total = 0;
      this.inn = 0;

      this.canvasCtx.clearRect(0, 0, this.WIDTH, this.HEIGHT);

      const cx = this.WIDTH/2;
      const cy = this.HEIGHT/2;
      const cr = this.WIDTH/2;

      this.canvasCtx.strokeStyle = '#006fff';
      this.canvasCtx.lineWidth = 1;
      this.canvasCtx.beginPath();
      this.canvasCtx.arc(cx, cy, cr, 0, 2 * Math.PI);
      this.canvasCtx.stroke();

      this.iter();
    }
  }
}
</script>


<style>
#monte-carlo-circle-canvas{
  width: auto;
  background-color: transparent;
}
</style>
