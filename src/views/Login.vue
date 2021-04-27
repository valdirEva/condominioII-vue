<template >
  <form @submit.prevent="auth">
    <h2>Login</h2>
    <div class="form-group col-md-4" style ='font-size: 120%; font-family:Comic Sans MS, Comic Sans, cursive;margin-top: 25px; 
    margin-left: 380px'>
      <label for="username">Usuário</label>
      <input type="text" id="username" class="form-control"
        required autofocus v-model="nome"  placeholder="Email ou nome" >
    </div>
    <div class="form-group col-md-4" style ='font-size: 120%; font-family:Comic Sans MS, Comic Sans, cursive;margin-top: 25px; 
    margin-left: 380px'>
      <label for="inputPassword">Senha</label>
      <input type="password" id="inputPassword" class="form-control"
        required v-model="senha">
    </div>
    <div class="form-group col-md-4" style ='font-size: 120%; font-family:Comic Sans MS, Comic Sans, cursive;margin-top: 25px; 
    margin-left: 380px'>
    <button  class="btn btn btn-primary"
      type="submit">Ok</button>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "login",
  data() {
    return {
      nome: "",
      senha: ""
    };
  },
methods: {
  ...mapActions(["login"]),
  auth() {
  this.login({ usuario: this.nome, senha: this.senha });

  }
}
};
</script>
<style>
.blue {
  background-color: rgba(228, 240, 241, 0.788);
  color: white;
}
</style>

