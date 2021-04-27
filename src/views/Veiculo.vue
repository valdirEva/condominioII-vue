<template >
<body>
<div class="card-body" v-if = "autorizacao === '[ROLE_ADMIN]' || autorizacao === '[ROLE_USER]'">
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


    <p class="h2" style ='font-size: 400%; font-family:Comic Sans MS, Comic Sans, cursive' face='Arial'>Veículos</p>
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
                    <option>Placa</option>
                    <option>RG</option>
                    <option>Todos Veículos</option>
                </select>
            </div>
            <div class="form-group col-md-4">
                <label for="conteudoTxt" style ='font-size: 200%; font-family:Comic Sans MS, Comic Sans, cursive'>Informações para busca</label>
                <input type="text"  id="conteudoTxt"
                    class="form-control" required
                v-model="conteudoTxt"  placeholder="Ex: Placa, RG ou Apartamento" style ='font-size: 150%; font-family:Comic Sans MS, Comic Sans, cursive; height: 50px;'>
            </div>
            
            <div class="form-group col-md-1" style ='font-size: 110%;margin-top: 25px'>
                <label for="conteudoTxt" ></label>
                <button type="button"  style ='font-size: 150%; font-family:Comic Sans MS, Comic Sans, cursive' class="btn btn-primary  mb-2" v-on:click="busca(conteudoTxt)">
                    Buscar
                </button>   
            </div>
                
        </form>
        
    </div>
    <table id="pessoa" class="table table-striped" v-if="showVeiculos">
        <thead>
            <br>
            <br>
            <tr style ='font-size: 150%; font-family:Comic Sans MS, Comic Sans, cursive'>
            <th id="cabecalho">ID</th>
            <th id="cabecalho">Placa</th>
            <th id="cabecalho">Marca</th>
            <th id="cabecalho">Modelo</th>
            <th id="cabecalho">Apartamento</th>
            <th id="cabecalho" scope="col">Ações</th>
            </tr>
        </thead>
        <tbody style ='font-size: 120%; font-family:Comic Sans MS, Comic Sans, cursive'>
            <tr v-for="veiculo in veiculos" :key="veiculo.idVeiculo">
                 <td>{{ veiculo.idVeiculo}}</td>
                <td>{{ veiculo.placa }}</td>
                <td>{{ veiculo.marca }}</td>
                <td>{{ veiculo.modelo }}</td>
                <td>{{ veiculo.apartamento.numeroApartamento }}</td>
                
                
                <button id="glyphicon2" class=" glyphicon glyphicon-trash mr-1" type="submit" style="color:red"  
                v-on:click="excluir( veiculo.idVeiculo)" > </button>
               
                <button id="glyphicon2" type="button" class="glyphicon glyphicon-pencil mr-1"   v-on:click="open(veiculo)" style="color:blue">
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
                <label for="idVeiculo">id</label>
                <input type="number" id="idPessoa"
                    class="form-control" required autofocus
                v-model="idVeiculo"  readonly>
            </div>
           <div class="form-group col-md-12">
                <label for="placa">Placa</label>
                <input type="text" id="placa"
                    class="form-control" required autofocus
                v-model="placa" placeholder="Ex: Placa(WYK-0000 ou WYk-0A22)">
            </div>
        
            <div class="form-group col-md-12">
                <label for="marca">Marca</label>
                <input type="text"  id="marca"
                    class="form-control" required
                v-model="marca">
            </div>
            <div class="form-group col-md-12">
                <label for="modelo">Modelo</label>
                <input type="text"  id="modelo"
                    class="form-control" required
                v-model="modelo">
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
    showVeiculos: false,
    showId: false,
    idVeiculo:null,
    placa: '',
    marca: '',
    modelo:'',
    numeroApartamento:'',
    veiculo:'',
    veiculos:[],
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
    this.showVeiculos = false;
    this.veiculos=[];
    if(this.tipoDeBusca == 'Todos Veículos' )
        {
            this.buscarTodos();
            conteudoTxt='';
        }
    if(this.tipoDeBusca == 'Placa')
        {
            
            if(conteudoTxt == null)
            {
                alert("Digite uma placa");
            }
            else if (conteudoTxt.length > 8)
            {
                alert('Placa muito grande')
            }
            
            else 
            {
                this.buscarPlaca(conteudoTxt);
            }
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
        axios.get('/veiculos/all',
            { headers: { Accept: 'application/json' } })
        .then(res => {
            this.showVeiculos = true;
            console.log(res);
            this.veiculos= res.data;
            this.total = this.veiculos.count();
        })
        .catch(error => console.log(error))
    },

    buscarPlaca(placa) {
        
        axios.get('/veiculos/placa/'+placa,
            { headers: { Accept: 'application/json' } })
        .then(res => {
            this.showVeiculos = true;
            console.log(res);
            this.veiculos = res.data;
        })
        .catch(error => console.log(error))
    },
    buscarApartamento(ap) {
        axios.get('/veiculos/ap/'+ap,
            { headers: { Accept: 'application/json' } })
        .then(res => {
            this.showVeiculos = true;
            console.log(res);
            this.veiculos = res.data;
        })
        .catch(error => console.log(error))
    },

    excluir (id) {
        var resposta = confirm("Deseja remover esse registro?");
        if (resposta == true) {
            axios.delete('/veiculos/delete/'+id)
            .then(response => {
            this.veiculos=[];
            this.showVeiculos = false;
            alert('Deletado com sucesso !');

            console.log(response)
           
            })
            .catch(error => console.log(error))
        }
    },
   
    open (veiculo) {
        this.$vm2.open('modal-1')
        if(veiculo.idVeiculo  != null)
        {
            this.idVeiculo = veiculo.idVeiculo ;
            this.placa = veiculo.placa;
            this.marca = veiculo.marca;
            this.modelo = veiculo.modelo;
            this.numeroApartamento =  veiculo.apartamento.numeroApartamento;
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
        this.idVeiculo = null;
        this.placa = '';
        this.marca = '';
        this.modelo = '';
        this.numeroApartamento =  '';
    },

    cadastrar() { 
        if (this.placa.lengt >8 || this.placa.lengt <8 )
        {
            alert('Placa com formato inválido')
        }
        else if (this.marca.length > 20)
        {
            alert('RG muito grande')
        }
        else if (this.modelo.length > 20)
        {
            alert('Email muito grande')
        }

        else if(this.idVeiculo == null)
        {

            const pessoaDTO = {
                placa: this.placa, marca: this.marca,modelo:this.modelo,numeroApartamento: this.numeroApartamento
                };
            axios.post('/veiculos/create',pessoaDTO)

            .then(res => {
                
                console.log(res);
                this.close();
                alert("Cadastro efetuado  com sucesso!!!");
                this.veiculos=[];
                this.showVeiculos = false;
            
                 })
         .catch(error => console.log(error))
        }
        else 
        {
            this.atualizar();
        }
        
        
    },


    atualizar() { 
            const veiculoDTO = {
                 placa: this.placa, marca: this.marca, modelo:this.modelo,numeroApartamento: this.numeroApartamento

                };
            
            axios.put('/veiculos/put/'+this.idVeiculo,veiculoDTO)

            .then(res => {  
                console.log(res);   
                this.close();
                
                alert("Cadastro atualizado com sucesso!!!");
                this.veiculos=[];
                this.showVeiculos = false;
            
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

