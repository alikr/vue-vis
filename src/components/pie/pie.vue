<template>
 <svg :width="width" :height="height">
  <g :transform="`translate(${width/2},${height/2})`">
    <g v-for="item in paths">
      <path :d="item.path" :fill="item.color" stroke="none"></path>
    </g>
    <g v-for="item in paths">
      <polyline
        fill="none"
        stroke="#ccc"
        :points="item.points"
        ></polyline>
      <text
        :x="item.endPos[0]"
        :y="item.endPos[1]"
        :text-anchor="item.midAngle < Math.PI ? 'start':'end'"
        >{{item.data.key}}</text>
    </g>
  </g>
	<slot></slot>
 </svg>
</template>
<script>
	const d3 = Object.assign({},
	  require("d3-scale"),
    require("d3-array"),
    require("d3-shape"),
	);
  export default {
  	props:{
  		width:{
  			default: 300
  		},
      height:{
        default: 300
      },
      radius:{
        default: 1
      },
  		data:{
        type: Array,
  			default: []
  		},
  	},
    watch:{
      data:'draw'
    },
    computed:{
    },
  	data(){
  		return {
        paths: [],
  		}
  	},
  	created(){
  		this.draw();
  	},
  	mounted(){
  	},
  	methods:{
  		draw(){
        let {width, height, data} = this;
        let radius = Math.min(width, height) / 2 * this.radius;
        let pie = d3.pie()
          .sort(null)
          .value(function(d) {
            return d.value;
          });
        let arc = d3.arc()
          .outerRadius(radius)
          .innerRadius(radius * 0.6);
        let radiusArc = d3.arc()
          .outerRadius(radius)
          .innerRadius(radius);
        let outArc = d3.arc()
          .outerRadius(radius + 10)
          .innerRadius(radius + 10);
        let pieData = pie(data);
        let keys = data.map((d) => d.key);
        let colorScale = d3.scaleOrdinal().range(d3.schemeCategory10).domain(keys);
        this.paths = pieData.map((d) => {
          d.path = arc(d);
          d.color = colorScale(d.data.key);
          d.outerCentroid = outArc.centroid(d);
          d.innterCentroid = arc.centroid(d);
          d.radiusCentroid = radiusArc.centroid(d);
          d.midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          let endPos = [...d.outerCentroid];
          let flag = d.midAngle < Math.PI ? 1 : -1;
          endPos[0] = (flag === -1 ? radius * 0.2 - endPos[0] : radius * 0.2 + endPos[0]) * flag;
          d.endPos = endPos;
          d.points = [...d.radiusCentroid, ...d.outerCentroid, ...endPos].join(',');
          return d;
        })
  		},
  	}
  }
</script>