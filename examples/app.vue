<template>
  <div class="body">
    <nav>
      <ul>
        <li><router-link to="/map">Map</router-link></li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>
<style lang="css">
	html,body{
		margin: 0;
		padding: 0;
		font-size: 14px;
	}
</style>