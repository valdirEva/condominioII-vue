<template >
<body>
<div class="card-body" >
    <div class="col-lg-12" v-if = "autorizacao === '[ROLE_ADMIN]' || autorizacao === '[ROLE_USER]'">
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


    <p class="h2" style ='font-size: 400%; font-family:Comic Sans MS, Comic Sans, cursive' face='Arial'>Moradores</p>
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
                    <option>Apartamento</option>
                    <option>Nome</option>
                    <option>RG</option>
                    <option>Todos Moradores</option>
                </select>
            </div>
            <div class="form-group col-md-4">
                <label for="conteudoTxt" style ='font-size: 200%; font-family:Comic Sans MS, Comic Sans, cursive'>Informações para busca</label>
                <input type="text"  id="conteudoTxt"
                    class="form-control" required
                v-model="conteudoTxt"  placeholder="Ex: Nome, RG ou Apartamento" style ='font-size: 150%; font-family:Comic Sans MS, Comic Sans, cursive; height: 50px;'>
            </div>
            
            <div class="form-group col-md-1" style ='font-size: 110%;margin-top: 25px'>
                <label for="conteudoTxt" ></label>
                <button type="button"  style ='font-size: 150%; font-family:Comic Sans MS, Comic Sans, cursive' class="btn btn-primary  mb-2" v-on:click="busca(conteudoTxt)">
                    Buscar
                </button>   
            </div>
                
        </form>
        
    </div>
    <table id="pessoa" class="table table-striped" v-if="showPessoas">
        <thead>
            <br>
            <br>
            <tr style ='font-size: 150%; font-family:Comic Sans MS, Comic Sans, cursive'>
            <th id="cabecalho">ID</th>
            <th id="cabecalho">Nome</th>
            <th id="cabecalho">Data de nascimento</th>
            <th id="cabecalho">RG</th>
            <th id="cabecalho">Email</th>
            <th id="cabecalho">Celular</th>
            <th id="cabecalho">Apartamento</th>
            <th id="cabecalho" scope="col">Ações</th>
            </tr>
        </thead>
        <tbody style ='font-size: 120%; font-family:Comic Sans MS, Comic Sans, cursive'>
            <tr v-for="pessoa in pessoas" :key="pessoa.idPessoa">
                 <td>{{ pessoa.idPessoa}}</td>
                <td>{{ pessoa.nome }}</td>
                <td>{{ moment(pessoa.dtNascimento).add(1, "day").format('DD/MM/YYYY')}}</td>
                <td>{{ pessoa.rg }}</td>
                <td>{{ pessoa.email }}</td>
                <td>{{ pessoa.celular }}</td>
                <td>{{ pessoa.apartamento.numeroApartamento }}</td>
                
                
                <button id="glyphicon2"  class=" glyphicon glyphicon-trash mr-1" type="submit" style="color:red"  
                v-on:click="excluir( pessoa.idPessoa)" > </button>
               
                <button id="glyphicon2" type="button" class="glyphicon glyphicon-pencil mr-1"   v-on:click="open(pessoa)" style="color:blue">
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
                <label for="rg">RG</label>
                <input type="text"  id="rg"
                    class="form-control" required
                v-model="rg">
            </div>
            <div class="form-group col-md-12">
                <label for="dtNascimento">Data de nascimento></label>
                <input type="text"  id="dtNascimento"
                    class="form-control" required
                v-model="dtNascimento" placeholder="Ex: 21-10-1987">
            </div>
            <div class="form-group col-md-12">
                <label for="email">Email</label>
                <input type="text"  id="email"
                    class="form-control" required
                v-model="email">
            </div>
            <div class="form-group col-md-12">
                <label for="celular">Celular</label>
                <input type="number"  id="celular"
                    class="form-control" required
                v-model="celular">
            </div>
            <div class="form-group col-md-12">
                <label for="numeroApartamento">Numero do Apartamento</label>
                <input type="number"  id="numeroApartamento"
                    class="form-control" required
                v-model="numeroApartamento">
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
    showPessoas: false,
    showPessoa: false,
    showId: false,
    idPessoa:null,
    nome: '',
    rg: '',
    dtNascimento:'',
    numeroApartamento:'',
    email:'',
    celular:'',
    pessoa:'',
    pessoas:[],
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
    this.showPessoas = false;
    this.pessoas=[];
    if(this.tipoDeBusca == 'Todos Moradores' )
        {
            this.buscarTodos();
            conteudoTxt='';
        }
    if(this.tipoDeBusca == 'Nome')
        {
            
            if(conteudoTxt == null)
            {
                alert("Digite um nome");
            }
            else if (conteudoTxt.length > 50)
            {
                alert('Nome muito grande')
            }
            
            else 
            {
                this.buscarNome(conteudoTxt);
            }
        }
    if(this.tipoDeBusca == 'RG')
        {
            if(conteudoTxt == null)
            {
                alert("Digite um RG");
            }
            else if (conteudoTxt.length > 30)
            {
                alert('RG muito grande')
            }
            else
            this.buscarRg(conteudoTxt);
        }
    if(this.tipoDeBusca == 'Apartamento')
        {
            if(conteudoTxt == null)
            {
                alert("Digite um numero de apartamento");
            }
            
            if(this.isNumber(conteudoTxt) == false)
            {
                alert("Digite apenas o numero do apartamento");
            }
            else
            this.buscarApartamento(conteudoTxt);
        }
    if(this.tipoDeBusca == null)
        {
            alert("Escolha um filtro para pesquisa");
        }
    },

   

    buscarTodos () {
        axios.get('/pessoas/all',
            { headers: { Accept: 'application/json' } })
        .then(res => {
            this.showPessoas = true;
            console.log(res);
            this.pessoas= res.data;
            this.total = this.pessoas.count();
        })
        .catch(error => console.log(error))
    },

    buscarRg(rg) {
        axios.get('/pessoas/rg/'+rg,
            { headers: { Accept: 'application/json' } })
        .then(res => {
            this.showPessoas = true;
            console.log(res);
            this.pessoa= res.data;
            this.pessoas.push(this.pessoa);
        })
        .catch(error => console.log(error))
    },

    buscarNome(nome) {
        
        axios.get('/pessoas/nome/'+nome,
            { headers: { Accept: 'application/json' } })
        .then(res => {
            this.showPessoas = true;
            console.log(res);
            this.pessoas = res.data;
        })
        .catch(error => console.log(error))
    },
    buscarApartamento(ap) {
        axios.get('/pessoas/ap/'+ap,
            { headers: { Accept: 'application/json' } })
        .then(res => {
            this.showPessoas = true;
            console.log(res);
            this.pessoas = res.data;
        })
        .catch(error => console.log(error))
    },

    excluir (id) {
        var resposta = confirm("Deseja remover esse registro?");
        if (resposta == true) {
            axios.delete('/pessoas/delete/'+id)
            .then(response => {
            this.pessoas=[];
            this.showPessoas = false;
            alert('Deletado com sucesso !');

            console.log(response)
           
            })
            .catch(error => console.log(error))
        }
    },
   
    open (pessoa) {
        this.$vm2.open('modal-1')
        if(pessoa.idPessoa  != null)
        {
            this.idPessoa = pessoa.idPessoa ;
            this.nome = pessoa.nome;
            this.rg = pessoa.rg;
            this.dtNascimento = moment(pessoa.dtNascimento).format('DD-MM-YYYY');
            this.email = pessoa.email;
            this.celular = pessoa.celular;
            this.numeroApartamento =  pessoa.apartamento.numeroApartamento;
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
        this.idPessoa = null;
        this.nome = '';
        this.rg = '';
        this.dtNascimento = '';
        this.email = '';
        this.celular = '';
        this.numeroApartamento =  '';
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
        else if (this.rg.length > 30)
        {
            alert('RG muito grande')
        }
        else if (this.email.length > 30)
        {
            alert('Email muito grande')
        }

         else if(this.idPessoa == null)
        {
            var dt = this.dtNascimento[6]+this.dtNascimento[7]+this.dtNascimento[8]+this.dtNascimento[9]+
            this.dtNascimento[2]+this.dtNascimento[3]+this.dtNascimento[4]+this.dtNascimento[5]+this.dtNascimento[0]+
            this.dtNascimento[1];

            const pessoaDTO = {
                nome: this.nome, rg: this.rg,dtNascimento:new Date(dt),email:this.email,
                celular:this.celular,numeroApartamento: this.numeroApartamento
                };
            axios.post('/pessoas/create',pessoaDTO)

            .then(res => {
                
                console.log(res);
                this.close();
                alert("Cadastro efetuado  com sucesso!!!");
                this.pessoas=[];
                this.showPessoas = false;
            
                 })
         .catch(error => console.log(error))
        }
        else 
        {
            this.atualizar();
        }
        
        
    },


    atualizar() { 

            var dt = this.dtNascimento[6]+this.dtNascimento[7]+this.dtNascimento[8]+this.dtNascimento[9]+
            this.dtNascimento[2]+this.dtNascimento[3]+this.dtNascimento[4]+this.dtNascimento[5]+this.dtNascimento[0]+
            this.dtNascimento[1];
            const pessoaDTO = {
                 nome: this.nome, rg: this.rg, dtNascimento:new Date(dt),email:this.email,
                celular:this.celular,numeroApartamento: this.numeroApartamento

                };
            
            axios.put('/pessoas/put/'+this.idPessoa,pessoaDTO)

            .then(res => {  
                console.log(res);   
                this.close();
                
                alert("Cadastro atualizado com sucesso!!!");
                this.pessoas=[];
                this.showPessoas = false;
            
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

