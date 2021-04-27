<template >
<body>
<div class="card-body" v-if = "autorizacao === '[ROLE_ADMIN]' || autorizacao === '[ROLE_USER]'" >
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


    <p class="h2" style ='font-size: 300%; font-family:Comic Sans MS, Comic Sans, cursive' face='Arial'>Visitantes / Prestadores de Serviço</p>

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
                    
                    <option>Tipo</option>
                     <option>Tipo e data</option>
                    <option>Todo Histórico</option>
                </select>
            </div>
            <div class="form-group col-md-4">
                <label for="conteudoTxt" style ='font-size: 200%; font-family:Comic Sans MS, Comic Sans, cursive'>Tipo</label>
                <select type="text"  id="conteudoTxt"
                    class="form-control" 
                    v-model="conteudoTxt"   style ='font-size: 150%; font-family:Comic Sans MS, Comic Sans, cursive; height: 50px;'>
                    <option>VISITANTE</option>
                    <option>SERVIÇO</option>
                </select>
            </div>

            <div class="form-group col-md-3">
                <label for="dataEnt" style ='font-size: 200%; font-family:Comic Sans MS, Comic Sans, cursive'>Data</label>
                <input type="date"  id="dataEnt"
                    class="form-control" 
                v-model="dataEnt"  style ='font-size: 150%; font-family:Comic Sans MS, Comic Sans, cursive; height: 50px;'>
            </div>
            
            <div class="form-group col-md-1" style ='font-size: 110%;margin-top: 25px'>
                <label for="conteudoTxt" ></label>
                <button type="button"  style ='font-size: 150%; font-family:Comic Sans MS, Comic Sans, cursive' class="btn btn-primary  mb-2" v-on:click="busca(conteudoTxt,dataEnt)">
                    Buscar
                </button>   
            </div>
                
        </form>
        
    </div>
    <table id="pessoa" class="table table-striped" v-if="showhistoricos">
        <thead>
            <br>
            <br>
            <tr style ='font-size: 150%; font-family:Comic Sans MS, Comic Sans, cursive'>
            <th id="cabecalho">ID</th>
            <th id="cabecalho">Nome</th>
            <th id="cabecalho">RG</th>
            <th id="cabecalho">Tipo</th>
            <th id="cabecalho">Apartamento</th>
            <th id="cabecalho">Data</th>
            <th id="cabecalho" scope="col">Ações</th>
            </tr>
        </thead>
        <tbody style ='font-size: 120%; font-family:Comic Sans MS, Comic Sans, cursive'>
            <tr v-for="historico in historicos" :key="historico.idHistorico">
                 <td>{{ historico.idHistorico}}</td>
                <td>{{ historico.pessoa.nome }}</td>
                <td>{{ historico.pessoa.rg }}</td>
                <td>{{ historico.tipo }}</td>
                <td>{{ historico.apartamento.numeroApartamento }}</td>
                <td>{{ moment(historico.dtEntrada).add(1, "day").format('DD/MM/YYYY')}}</td>
                
                
                <button id="glyphicon2" v-if = "autorizacao === '[ROLE_ADMIN]'" class=" glyphicon glyphicon-trash mr-1" type="submit" style="color:red"  
                v-on:click="excluir( historico.idHistorico)" > </button>
               
                <button id="glyphicon2" v-if = "autorizacao === '[ROLE_ADMIN]'" type="button" class="glyphicon glyphicon-pencil mr-1"   v-on:click="open(historico)" style="color:blue">
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
                <label for="idHistorico">id</label>
                <input type="number" id="idHistorico"
                    class="form-control" required autofocus
                v-model="idHistorico"  readonly>
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
                <label for="tipo">Tipo</label>
                <select type="text"  id="tipo"
                    class="form-control" required
                v-model="tipo" >
                <option>VISITANTE</option>
                <option>SERVIÇO</option>
                </select>
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
    showhistoricos: false,
    showPessoa: false,
    showId: false,
    idHistorico:null,
    nome: '',
    rg: '',
    tipo:'',
    numeroApartamento:'',
    conteudoTxt:'',
    dataEnt:'',
    historicos:[],
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
    

    busca(conteudoTxt,dataEnt) {
    this.showhistoricos = false;
    this.pessoas=[];
    if(this.tipoDeBusca == 'Todo Histórico' )
        {
            this.buscarTodos();
            conteudoTxt='';
        }
    if(this.tipoDeBusca == 'Tipo')
        {
            
            if(conteudoTxt == null)
            {
                alert("Selecione um tipo");
            }
            
            else 
            {
                this.buscarTipo(conteudoTxt);
            }
        }
    if(this.tipoDeBusca == 'Tipo e data')
        {
            if(this.conteudoTxt == null)
            {
                alert("Selecione um tipo");
            }
            else if (dataEnt == null)
            {
                alert('Selecione uma data')
            }
            else
            this.buscarTipoData(conteudoTxt,dataEnt);
        }
    
    if(this.tipoDeBusca == null)
        {
            alert("Escolha um filtro para pesquisa");
        }
    },

   

    buscarTodos () {
        axios.get('/historicos/all',
            { headers: { Accept: 'application/json' } })
        .then(res => {
            this.showhistoricos = true;
            console.log(res);
            this.historicos= res.data;
            this.total = this.pessoas.count();
        })
        .catch(error => console.log(error))
    },

    buscarTipo(tipo) {
       
        
        axios.get('/historicos/tipo/'+tipo,
            { headers: { Accept: 'application/json' } })
        .then(res => {
            this.showhistoricos = true;
            console.log(res);
            this.historicos = res.data;
        })
        .catch(error => console.log(error))
    },
    buscarTipoData(conteudoTxt,dataEnt) {
       
        const historicoDTO = {
                tipo: conteudoTxt, dtEntrada:dataEnt
                };
        axios.post('/historicos/td/',historicoDTO,
        { headers: { Accept: 'application/json' } })
        .then(res => {
            this.showhistoricos = true;
            console.log(res);
            this.historicos = res.data;
        })
        .catch(error => console.log(error))
    },
    

    excluir (id) {
        var resposta = confirm("Deseja remover esse registro?");
        if (resposta == true) {
            axios.delete('/historicos/delete/'+id)
            .then(response => {
            this.historicos=[];
            this.showhistoricos = false;
            alert('Deletado com sucesso !');

            console.log(response)
           
            })
            .catch(error => console.log(error))
        }
    },
   
    open (historico) {
        this.$vm2.open('modal-1')
        if(historico.idHistorico  != null)
        {
            this.idHistorico = historico.idHistorico ;
            this.nome = historico.pessoa.nome;
            this.rg = historico.pessoa.rg;
            this.tipo = historico.tipo;
            this.numeroApartamento =  historico.apartamento.numeroApartamento;
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
        this.idHistorico = null;
        this.nome = '';
        this.rg = '';
        this.tipo = '';
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

         else if(this.idHistorico == null)
        {
            

            const historicoDTO = {
                nome: this.nome, rg: this.rg,tipo:this.tipo,numeroApartamento: this.numeroApartamento
                };
            axios.post('/historicos/create',historicoDTO)

            .then(res => {
                
                console.log(res);
                this.close();
                alert("Cadastro efetuado  com sucesso!!!");
                this.histricos=[];
                this.showhistoricos = false;
            
                 })
         .catch(error => console.log(error))
        }
        else 
        {
            this.atualizar();
        }
        
        
    },


    atualizar() { 

           const historicoDTO = {
                nome: this.nome, rg: this.rg,tipo:this.tipo,numeroApartamento: this.numeroApartamento
                };
            
            axios.put('/historicos/put/'+this.idHistorico,historicoDTO)

            .then(res => {  
                console.log(res);   
                this.close();
                
                alert("Cadastro atualizado com sucesso!!!");
                this.historicos=[];
                this.showhistoricos = false;
            
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

