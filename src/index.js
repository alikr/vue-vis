import vMap from './components/map/index'
import vLine from './components/line/index'

const view = {
	vMap,
	vLine,
}

const install = function (Vue) {
  Object.keys(view).forEach((key) => {
      Vue.component(key, view[key]);
  });
}

if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue);
}

export default Object.assign(view, {install});
