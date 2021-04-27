import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    
    path: "/",
    name: "Login",
    component: () => import("../views/Login.vue")
    // path: "/login"  indicaa a rota do back end
    // name: "Login", é  o nome da pagina
    // component: () => import("../views/Login.vue")  é a rota do vue onde criamos a pagina.
    
  },

  {
    path: "/moradores",
    name: "Morador",
    component: () => import("../views/Morador.vue")
  },

  {
    path: "/veiculo",
    name: "Veiculo",
    component: () => import("../views/Veiculo.vue"),
    props: true
  },

  {
    path: "/visitante",
    name: "Visitante",
    component: () => import("../views/Visitante.vue"),
    props: true
  },

  {
    path: "/configuracao",
    name: "Configuracao",
    component: () => import("../views/Configuracao.vue"),
    props: true
  }


];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes
});

export default router;
