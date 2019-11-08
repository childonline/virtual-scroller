import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

import axios from 'axios';
import moment from 'moment';

Vue.prototype.$axios = axios;
Vue.prototype.$moment = moment;

import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
Vue.use(VueVirtualScroller);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
