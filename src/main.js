import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios'

axios.interceptors.request.use(config => {
  if(store.state.token && store.state.autorizacao) {
  config.headers.Authorization = store.state.token;
  config.headers.autorizacao =store.state.autorizacao;
  }
  return config
  })
  axios.interceptors.response.use(res => {
  return res
  }, error => {
  if(error.response.status === 403) {
  alert('Não autorizado!Faça o login');
  router.push('/');
  }
  if(error.response.status === 404) {
    alert(error.response.data.titulo)
    }
  if(error.response.status === 400) {
    alert(error.response.data.titulo)
    }
    
  else if (error.response.status === 401) {
  store.commit('logout')
  router.push('/')
  }
  throw error
  })
axios.defaults.baseURL = 'http://localhost:8082/co_condominio'
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
