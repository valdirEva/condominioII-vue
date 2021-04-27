<template >
<body>
<div class="card-body" v-if = "autorizacao === '[ROLE_ADMIN]' || autorizacao === '[ROLE_USER]'">
    
    <div class="col-lg-12" style="text-align: right;">
      <button type="button"  class="btn btn-primary mb-2"   v-on:click="sair" style ='font-size: 150%; font-family:Comic Sans MS, Comic Sans, cursive'> 
          Sair
        </button>
    </div>
    <p class="h2" style ='font-size: 400%; font-family:Comic Sans MS, Comic Sans, cursive' face='Arial'>Village Marie</p>
  
  <div class="col-lg-16" style ='font-size: 110%;margin-top: 100px; margin-left: 300px' >
    <div class="col-lg-2">
      <button  class=" glyphicon glyphicon-user mb-8 btn-primary " 
      type="button" style="color:Black; border-radius: 20px;" v-on:click="moradores" ></button>
      
    </div>
    <div class="col-lg-2">
      <button  class=" glyphicon glyphicon-bed mb-8 btn-primary " 
      type="button" style="color:Black; border-radius: 20px;" v-on:click="veiculos" ></button>
      
    </div>

    <div class="col-lg-2">
      <button  class=" glyphicon glyphicon-lock mb-8 btn-primary " 
      type="button" style="color:Black; border-radius: 20px;" v-on:click="visitantes" ></button>
      
    </div>

    <div class="col-lg-2">
      <button  v-if = "autorizacao === '[ROLE_ADMIN]'" class=" glyphicon glyphicon-cog mb-8 btn-primary " 
      type="button" style="color:Black; border-radius: 20px;" v-on:click="configuracoes" ></button>
      
    </div>
    
  </div>
</div>
</body>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {
    return {
    
  
    }
    
    

},
computed: {
    ...mapState([
        'usuario',
        'autorizacao'
    ])
},
methods: {
   
  sair () {
        this.$store.commit('logout');
        this.$router.push('/');
    },
  moradores () {
        this.$router.push('/moradores');
    },
  veiculos () {
    this.$router.push('/veiculo');
  },
  visitantes() {
    this.$router.push('/visitante');
  },
  configuracoes() {
    this.$router.push('/configuracao');
  },

    
},


   
   


    

}
</script>
<style>
#cabecalho {text-align: center}

body {background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);}

.glyphicon{font-size:100px}

</style>

