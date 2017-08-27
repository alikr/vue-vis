<template>
 <svg :width="width" :height="height">
  <g shape-rendering="crispEdges" class="axis">
    <g class="xAxis">
      <g v-for="(item,index) in xaxis">
        <line
          :x1="item.x1"
          :y1="item.y1"
          :x2="item.x2"
          :y2="item.y2"
          :stroke="tickColor" stroke-width="1"></line>
        <line
          :x1="item.x1"
          :y1="item.y2"
          :x2="item.x2"
          :y2="item.y2 + tickLineWidth"
          stroke="rgba(0,0,0,1)" stroke-width="1"></line>
        <text
          :x="item.x1"
          :y="item.y2 + tickLineWidth"
          dy="10"
          :text-anchor="
            index==0 ? 'start'
            :index==(xaxis.length-1) ? 'end'
            :'middle'
            "
          fill="#000" font-size="12">{{item.key}}</text>
      </g>
    </g>
    <g class="yAxis">
      <g v-for="(item,index) in yaxis">
        <line
          :x1="item.x1"
          :y1="item.y1"
          :x2="item.x2"
          :y2="item.y2"
          :stroke="tickColor" stroke-width="1"></line>
        <line
          :x1="item.x1 - tickLineWidth"
          :y1="item.y1"
          :x2="item.x1"
          :y2="item.y2"
          stroke="rgba(0,0,0,1)" stroke-width="1"></line>
        <text
          :x="item.x1 - tickLineWidth"
          :y="item.y2"
          :dy="
            index==0 ? -4
            :index==(yaxis.length-1) ? 10
            :4
            "
          dx="-2" text-anchor="end" fill="#000" font-size="12">{{item.key}}</text>
      </g>
    </g>
  </g>
  <path :d="paths" fill="none" stroke-width="1" stroke="#4682B4"></path>
	<slot>
    <g></g>
  </slot>
 </svg>
</template>
<script>
	const d3 = Object.assign({},
	  require("d3-scale"),
    require("d3-array"),
    require("d3-shape"),
	  require("d3-collection"),
	);
  export default {
  	props:{
  		width:{
  			default: 300
  		},
      height:{
        default: 300
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
      isMultiLine(){
        return Array.isArray(this.data[0]);
      },
      hasNaN(){
        return this.data.some((d) => isNaN(+d.key));
      }
    },
  	data(){
  		return {
        paths: [],
        xaxis: [],
        yaxis: [],
        xTicks: 5,
        yTicks: 5,
        tickLineWidth: 6,
        axisLineWidth: 1,
        xAxisBottom: 14,
        xAxisLeft: 20,
        tickColor:'rgba(0,0,0,0.1)',
  		}
  	},
  	created(){
  		this.draw();
  	},
  	mounted(){
  	},
  	methods:{
  		draw(){
        this.setPath();
  		},
      setXAxis(){
        let vm = this;
        let width = vm.width;
        let height = vm.height;
        let data = vm.data;
        let tickLineWidth = vm.tickLineWidth;
        let maxVal = d3.max(data, (d) => d.value);
        vm.xAxisLeft = d3.max([maxVal.toString().length * 10 + tickLineWidth, vm.xAxisLeft]);
        let xAxisDomain = data.map((d) => {
          return d.key;
        });
        let xAxisWidth = width - vm.xAxisLeft;

        let x = d3.scaleLinear()
          .domain(d3.extent(data, (d) => +d.key))
          .range([vm.xAxisLeft, width]);
        if (vm.hasNaN) {
          let xAxisWidthPer = xAxisWidth / (xAxisDomain.length - 1);
          let xAxisRange = xAxisDomain.map((d, i) => {
            return vm.xAxisLeft + i * xAxisWidthPer - vm.axisLineWidth / 2;
          });
          x = d3.scaleOrdinal()
            .domain(xAxisDomain)
            .range(xAxisRange);
        } else {
          xAxisDomain = x.ticks(vm.xTicks);
        }
        vm.xaxis = xAxisDomain.map((d) => {
          let px = x(d);
          return {
            key:d,
            x1:px,
            y1:0,
            x2:px,
            y2:height - vm.xAxisBottom - vm.axisLineWidth * 2,
          }
        });
        return x;
      },
      setYAxis(){
        let vm = this;
        let width = vm.width;
        let height = vm.height;
        let data = vm.data;
        let maxVal = d3.max(data, (d) => d.value);
        let y = d3.scaleLinear()
          .domain([0, maxVal])
          .range([height - vm.xAxisBottom - vm.axisLineWidth * 2, 0]);

        vm.yaxis = d3.ticks(0, maxVal, vm.yTicks).map((d) => {
          return {
            key:d,
            x1:vm.xAxisLeft,
            y1:y(d),
            x2:width - vm.axisLineWidth,
            y2:y(d),
          }
        });
        return y;
      },
      setPath(){
        let vm = this;
        let data = vm.data;
        let x = vm.setXAxis();
        let y = vm.setYAxis();

        let line = d3.line()
          .x((d) => x(d.key))
          .y((d) => y(d.value));
        vm.paths = line(data);
      }
  	}
  }
</script>