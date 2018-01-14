<template>
	<div class="pie-chart">
    <v-pie
      :width="600"
      :height="500"
      :radius="0.8"
      :data="data">
    </v-pie>
    <button type="button" class="btn" @click="setData">随机</button> 
  </div>
</template>
<script>
  const d3 = Object.assign({},
    require("d3-array"),
  );
  export default {
  	data(){
  		return {
  			data: []
  		}
  	},
    methods: {
      setData() {
        this.data = d3.range(10).map((d) => {
          return {
            key: 'key' + d,
            value: Math.random()
          }
        })
      },
    },
  	created(){
      this.setData();
  	}
  }
</script>
<style lang="css">
  .pie-chart{
    width:600px;
    position: relative;
  }
  .btn{
    position: absolute;
    right: 0;
    top:0;
  }
</style>