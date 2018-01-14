import vmap from './comps/map.vue';
import vline from './comps/line.vue';
import vpie from './comps/pie.vue';

export default [
  {
    path: '/map',
    component: vmap
  },
  {
    path: '/line',
    component: vline
  },
  {
    path: '/pie',
    component: vpie
  },
]