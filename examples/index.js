import Vue from 'vue';
Vue.config.debug = true;
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import VueVis from 'vue-vis';
Vue.use(VueVis);
import App from './app.vue';
import routes from './router.js';
const router = new VueRouter({
  routes,
  linkActiveClass:'link-actived'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});