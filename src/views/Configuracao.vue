<template >
<body>
<div class="card-body"  v-if = "autorizacao === '[ROLE_ADMIN]'">
    <div class="col-lg-12" >
    <div class="col-lg-6" style="text-align: left;" >
        <button type="button"  class="btn btn-primary  ico-user mb-2"   v-on:click="inicio" style ='font-size: 150%; font-family:Comic Sans MS, Comic Sans, cursive'> 
            Início
        </button>
        
    </div>
    <div class="col-lg-6" style="text-align: right;">
        <button type="button"  class="btn btn-primary mb-2"   v-on:click="sair" style ='font-size: 150%; font-family:Comic Sans MS, Comic Sans, cursive'> 
            Sair
        </button>
    </div>
    </div>


    <p class="h2" style ='font-size: 400%; font-family:Comic Sans MS, Comic Sans, cursive' face='Arial'>Configurações</p>
    <div class="col-lg-12" style="text-align: right;" >
        <button type="submit"  class="btn btn-primary  ico-user mb-2"   v-on:click="open" style ='font-size: 150%; font-family:Comic Sans MS, Comic Sans, cursive'> 
            Adicionar
        </button>
    </div>
    <div >
        <form   >
            <div class="form-group col-md-4" >
                <label for="conteudoTxt" style ='font-size: 200%; font-family:Comic Sans MS, Comic Sans, cursive' >Filtro de pesquisa</label>
                <select class="form-control" v-model="tipoDeBusca" style ='font-size: 150%; font-family:Comic Sans MS, Comic Sans, cursive; height: 50px'  >
                    <option>Nome ou Email</option>
                    <option>Todos Usuários</option>
                </select>
            </div>
            <div class="form-group col-md-4">
                <label for="conteudoTxt" style ='font-size: 200%; font-family:Comic Sans MS, Comic Sans, cursive'>Informações para busca</label>
                <input type="text"  id="conteudoTxt"
                    class="form-control" required
                v-model="conteudoTxt"  placeholder="Ex: Nome ou email" style ='font-size: 150%; font-family:Comic Sans MS, Comic Sans, cursive; height: 50px;'>
            </div>
            
            <div class="form-group col-md-1" style ='font-size: 110%;margin-top: 25px'>
                <label for="conteudoTxt" ></label>
                <button type="button"  style ='font-size: 150%; font-family:Comic Sans MS, Comic Sans, cursive' class="btn btn-primary  mb-2" v-on:click="busca(conteudoTxt)">
                    Buscar
                </button>   
            </div>
                
        </form>
        
    </div>
    <table id="pessoa" class="table table-striped" v-if="showUsuarios">
        <thead>
            <br>
            <br>
            <tr style ='font-size: 150%; font-family:Comic Sans MS, Comic Sans, cursive'>
            <th id="cabecalho">ID</th>
            <th id="cabecalho">Nome</th>
            <th id="cabecalho">Email</th>
            <th id="cabecalho">Tipo de usuario</th>
            <th id="cabecalho" scope="col">Ações</th>
            </tr>
        </thead>
        <tbody style ='font-size: 120%; font-family:Comic Sans MS, Comic Sans, cursive'>
            <tr v-for="usuario in usuarios" :key="usuario.id">
                 <td>{{ usuario.id}}</td>
                <td>{{ usuario.nome }}</td>
                <td>{{ usuario.email }}</td>
                <td v-for="autorizacao in usuario.autorizacoes" v-bind:key="autorizacao.id"> 
                    {{ autorizacao.nome == 'ROLE_ADMIN'?'ADMINISTRADOR':'USUARIO'}}
                </td>
                
                
                <button id="glyphicon2" class=" glyphicon glyphicon-trash mr-1" type="submit" style="color:red"  
                v-on:click="excluir( usuario.id)" > </button>
               
                <button id="glyphicon2" type="button" class="glyphicon glyphicon-pencil mr-1"   v-on:click="open(usuario)" style="color:blue">
                    <span class="glyphicon glyphicon" aria-hidden="true"></span> </button>
            </tr>
        </tbody>
    </table>
    
   <vue-modal-2 name="modal-1" @on-close="close" noHeader noFooter class="modal-dialog modal-lg" > 
       <header>
            <br>  
       </header>
        <form  @submit.prevent="cadastrar" style ='font-size: 120%; font-family:Comic Sans MS, Comic Sans, cursive'>
            <div class="form-group row" v-if="showId">
                <label for="idPessoa">id</label>
                <input type="number" id="idPessoa"
                    class="form-control" required autofocus
                v-model="idPessoa"  readonly>
            </div>
           <div class="form-group col-md-12">
                <label for="nome">Nome</label>
                <input type="text" id="nome"
                    class="form-control" required autofocus
                v-model="nome">
            </div>
        
            <div class="form-group col-md-12">
                <label for="email">Email</label>
                <input type="text"  id="email"
                    class="form-control" required
                v-model="email">
            </div>
            <div class="form-group col-md-12">
                <label for="senha">Senha</label>
                <input type="text"  id="senha"
                    class="form-control" required
                v-model="senha" >
            </div>
            <div class="form-group col-md-12">
                <label for="autorizacao2">Tipo de usuário</label>
                <select type="text"  id="autorizacao2"
                    class="form-control" required
                v-model="autorizacao2" >
                <option>ADMINISTRADOR</option>
                <option>USUARIO</option>
                </select>
            </div>
            <div class="btn-group" >
                <button  style="margin: 0 15px;" type="button" class="btn btn-danger" v-on:click="close">Cancelar</button>
            
                <button style="margin: 0 15px;" class="btn btn btn-primary" type="submit">Salvar</button>
            </div>
        </form>
       <footer>
          <br>
        </footer>
    </vue-modal-2>
</div>
</body>
</template>
<script>
import Vue from "vue"
import axios from 'axios'
import { mapState } from 'vuex'
import Modal from "@burhanahmeed/vue-modal-2"
import moment from 'moment'


Vue.prototype.moment = moment
Vue.component("modal", {
        template: "#modal-template"
      });
Vue.config.productionTip = false
Vue.use(Modal);
export default {
    data() {
    return {
    showUsuarios: false,
    showPessoa: false,
    showId: false,
    id:null,
    nome: '',
    email: '',
    senha:'',
    autorizacao2:'',
    usuario:'',
    usuarios:[],
    tipoDeBusca:null,
  
    }
    
    

},
computed: {
    ...mapState([
        'usuario',
        'autorizacao'
    ])
},
methods: {
    

    busca(conteudoTxt) {
    this.showUsuarios = false;
    this.usuarios=[];
    if(this.tipoDeBusca == 'Todos Usuários' )
        {
            this.buscarTodos();
            conteudoTxt='';
        }
    if(this.tipoDeBusca == 'Nome ou Email')
        {
            
            if(conteudoTxt == null)
            {
                alert("Digite um nome ou email");
            }
            else if (conteudoTxt.length > 50)
            {
                alert('Nome ou email muito grande')
            }
            
            else 
            {
                this.buscarNome(conteudoTxt);
            }
        }
    
    
    if(this.tipoDeBusca == null)
        {
            alert("Escolha um filtro para pesquisa");
        }
    },

   

    buscarTodos () {
        alert(this.autorizacao)
        axios.get('/usuario',
            { headers: { Accept: 'application/json' } })
        .then(res => {
            this.showUsuarios = true;
            console.log(res);
            this.usuarios= res.data;
        })
        .catch(error => console.log(error))
    },

    buscarNome(nome) {
        
        const usuarioDTO = {
                nome: nome, email: nome
                };
            axios.post('/usuario/nome',usuarioDTO)
        .then(res => {
            this.showUsuarios = true;
            console.log(res);
            this.usuarios = res.data;
        })
        .catch(error => console.log(error))
    },
    

    excluir (id) {
        var resposta = confirm("Deseja remover esse registro?");
        if (resposta == true) {
            axios.delete('/usuario/delete/'+id)
            .then(response => {
            this.usuarios=[];
            this.showUsuarios = false;
            alert('Deletado com sucesso !');

            console.log(response)
           
            })
            .catch(error => console.log(error))
        }
    },
   
    open (usuario) {
        this.$vm2.open('modal-1')
        if(usuario.id  != null)
        {
            this.id = usuario.id ;
            this.nome = usuario.nome;
            this.email = usuario.email;
            this.senha = '';
        }
    
    },

    inicio () {
        this.$router.push('/home');
    },

    sair () {
        this.$store.commit('logout');
        this.$router.push('/');
    },
    close () {
        this.$vm2.close('modal-1');
        this.id = null;
        this.nome = '';
        this.email = '';
        this.senha = '';
        this.autorizacao2 = '';
    },

    cadastrar() { 
        
        if (this.nome.length <=3)
        {
            alert('Nome muito pequeno')
        }
        else if (this.nome.length > 50)
        {
            alert('Nome muito grande')
        }
        else if (this.email.length > 100)
        {
            alert('Email muito grande')
        }
        else if (this.senha.length > 100)
        {
            alert('Senha muito grande')
        }

         else if(this.id == null)
        {
            
               
            const usuarioDTO = {
                nome: this.nome, email: this.email,
                senha:this.senha,autorizacao: this.autorizacao2 == 'ADMINISTRADOR'?'ROLE_ADMIN':'ROLE_USER'
                };
            axios.post('/usuario/novo',usuarioDTO)

            .then(res => {
                
                console.log(res);
                this.close();
                alert("Cadastro efetuado  com sucesso!!!");
                this.usuarios=[];
                this.showUsuarios = false;
            
                 })
         .catch(error => console.log(error))
        }
        else 
        {
            this.atualizar();
        }
        
        
    },


    atualizar() { 

            const usuarioDTO = {
                nome: this.nome, email: this.email,
                senha:this.senha,autorizacao:  this.autorizacao2 == 'ADMINISTRADOR'?'ROLE_ADMIN':'ROLE_USER'
                };
            axios.put('/usuario/put/'+this.id,usuarioDTO)

            .then(res => {  
                console.log(res);   
                this.close();
                
                alert("Cadastro atualizado com sucesso!!!");
                this.usuarios=[];
                this.showUsuarios = false;
            
                 })
         .catch(error => console.log(error))    
    },
    isNumber(n)
    {
        return !isNaN(parseInt(n)) & isFinite(n);
    }
},


   
   


    

}
</script>
<style>
#cabecalho {text-align: center}

#glyphicon2{font-size:20px}

body {background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);}

</style>

