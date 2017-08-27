<template>
	<v-line
		:width="800"
		:height="500"
		:data="data">
	</v-line>
</template>
<script>
  export default {
  	data(){
  		return {
  			data: []
  		}
  	},
  	created(){
  		this.data = [
  			{
  				key: '1',
  				value: '9'
  			},
  			{
  				key: '2',
  				value: 4
  			},
  			{
  				key: '3',
  				value: 6
  			},
  			{
  				key: '4',
  				value: 20
  			},
  			{
  				key: '5',
  				value: 60
  			},
  			{
  				key: '6',
  				value: 70
  			},
  			{
  				key: '7',
  				value: 80
  			},
  		]
  	}
  }
</script>