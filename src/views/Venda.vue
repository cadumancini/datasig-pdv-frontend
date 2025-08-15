<template>
  <div class="pdv-tela">
    <Navbar title="Venda"/>
    <div class="pdv-frame mx-4">
      <div class="row">
        <div class="col-4">
          <span class="fw-bold title">Realizar Venda</span>
        </div>
        <div class="col">
          <div class="float-end">
            <button id="btnAtalhos" class="btn btn-secondary mx-2 disable-on-sale" data-bs-toggle="modal" data-bs-target="#atalhosModal">Atalhos Teclado</button>
          </div>
          <div class="float-end">
            <button id="btnRecarregar" class="btn btn-secondary disable-on-sale" @click="restartRecords">Recarregar Registros</button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <span class="fw-bold subtitle">Pedido</span>
          <div class="row margin-y-fields">
            <div class="input-group input-group-sm">
              <span class="input-group-text">Pedido</span>
              <input autocomplete="off" id="inputPedPrv" class="form-control input-sale disable-on-sale" type="text" v-on:keyup.enter="searchPedidos" v-model="idePedPrv"
                :disabled="!this.representantes.length || !this.clientes.length || !this.formasPagto.length || this.pedidoSelected || this.status === 'b_pedidos'"
                :placeholder="this.status === 'b_pedidos' ? 'Buscando pedidos ...' : ''">
              <button id="btnSearchPed" :disabled="idePedPrv !== '' || isOnVenda()" class="btn btn-secondary input-group-btn" @click="searchPedidos"><font-awesome-icon icon="fa-search"/></button>
              <button id="btnClearPed" :disabled="!this.pedidoSelected || isOnVenda()" class="btn btn-secondary input-group-btn" @click="clearPedido"><font-awesome-icon icon="fa-circle-xmark"/></button>
              <button id="btnBuscaPedidos" class="btn-busca" data-bs-toggle="modal" data-bs-target="#pedidosModal">...</button>
            </div>
          </div>
          <span class="fw-bold subtitle">Identificação</span>
          <div class="row margin-y-fields">
            <div class="input-group input-group-sm">
              <span class="input-group-text">Representante</span>
              <input autocomplete="off" id="inputIdeRep" class="form-control input-sale disable-on-sale" type="text" v-on:keyup.enter="searchRepresentantes" v-model="ideRep"
                :disabled="!this.representantes.length || this.codRep !== ''"
                :placeholder="!this.representantes.length ? 'Buscando representantes ...' : ''"
                :class="{searching: !this.representantes.length}">
              <button id="btnSearchRep" :disabled="ideRep !== '' || isOnVenda()" class="btn btn-secondary input-group-btn" @click="searchRepresentantes"><font-awesome-icon icon="fa-search"/></button>
              <button id="btnClearRep" :disabled="this.codRep === '' || isOnVenda() || isPedidoSelectedAndFechado()" class="btn btn-secondary input-group-btn" @click="beginRepresentante"><font-awesome-icon icon="fa-circle-xmark"/></button>
              <button id="btnBuscaRepresentantes" class="btn-busca" data-bs-toggle="modal" data-bs-target="#representantesModal">...</button>
            </div>
          </div>
          <div class="row margin-y-fields">
            <div class="input-group input-group-sm">
              <span class="input-group-text">Tabela de Preço</span> 
              <input :disabled="this.codTpr !== ''" autocomplete="off" id="inputIdeTpr" class="form-control input-sale disable-on-sale" 
                type="text" v-on:keyup.enter="searchTabelasPreco" v-model="ideTpr">
              <button id="btnSearchTpr" :disabled="ideTpr !== '' || isOnVenda()" class="btn btn-secondary input-group-btn" @click="searchTabelasPreco"><font-awesome-icon icon="fa-search"/></button>
              <button id="btnClearTpr" :disabled="this.codTpr === '' || isOnVenda() || isPedidoSelectedAndFechado()" class="btn btn-secondary input-group-btn" @click="beginTabelasPreco"><font-awesome-icon icon="fa-circle-xmark"/></button>
              <button id="btnBuscaTabelasPreco" class="btn-busca" data-bs-toggle="modal" data-bs-target="#tabelasPrecoModal">...</button>
            </div>
          </div>
          <div class="row margin-y-fields">
            <div class="input-group input-group-sm">
              <span class="input-group-text">Depósito</span>
              <input autocomplete="off" id="inputIdeDep" class="form-control input-sale disable-on-sale" type="text" v-on:keyup.enter="searchDepositos" v-model="ideDep"
                :disabled="!this.depositos.length || this.codDep !== ''" :placeholder="(!this.depositos.length && this.codDep === '') ? 'Buscando depósitos ...' : ''"
                :class="{searching: (!this.depositos.length && this.codDep === '')}">
              <button id="btnSearchDep" :disabled="ideDep !== '' || isOnVenda()" class="btn btn-secondary input-group-btn" @click="searchDepositos"><font-awesome-icon icon="fa-search"/></button>
              <button id="btnClearDep" :disabled="this.codDep === '' || isOnVenda() || isPedidoSelectedAndFechado()" class="btn btn-secondary input-group-btn" @click="beginDeposito"><font-awesome-icon icon="fa-circle-xmark"/></button>
              <button id="btnBuscaDepositos" class="btn-busca" data-bs-toggle="modal" data-bs-target="#depositosModal">...</button>
            </div>
          </div>
          <div class="row margin-y-fields">
            <div class="input-group input-group-sm">
              <span class="input-group-text">Cliente</span>
              <input autocomplete="off" id="inputIdeCli" class="form-control input-sale disable-on-sale" type="text" v-on:keyup.enter="searchClientes" v-model="ideCli"
                :disabled="!this.clientes.length || this.codCli !== ''" :placeholder="(!this.clientes.length && this.codCli === '') ? 'Buscando clientes ...' : ''"
                :class="{searching: (!this.clientes.length && this.codCli === '')}">
              <button id="btnSearchCli" :disabled="ideCli !== '' || isOnVenda()" class="btn btn-secondary input-group-btn" @click="searchClientes"><font-awesome-icon icon="fa-search"/></button>
              <button id="btnClearCli" :disabled="this.codCli === '' || isOnVenda() || isPedidoSelectedAndFechado()" class="btn btn-secondary input-group-btn" @click="beginCliente"><font-awesome-icon icon="fa-circle-xmark"/></button>
              <button id="btnBuscaClientes" class="btn-busca" data-bs-toggle="modal" data-bs-target="#clientesModal">...</button>
            </div>
          </div>
        </div>
        <div class="col-8">
          <span class="fw-bold subtitle">Carrinho</span>
          <div class="row margin-y-fields">
            <div class="input-group input-group-sm">
              <span class="input-group-text">Produto</span>
              <input autocomplete="off" id="inputProduto" class="form-control input-sale disable-on-sale" type="text" v-on:keyup.enter="searchProdutos" v-model="codBar"
                :disabled="this.codTpr === '' || !this.produtosTabelaPreco.length || this.codDep === '' || isPedidoSelectedAndFechado()" :class="{searching: !this.produtosTabelaPreco.length}" 
                :placeholder=" this.codTpr === '' ? 'Selecione a tabela de preço' : 
                              !this.produtosTabelaPreco.length ? 'Buscando produtos da tabela de preço ...' : 
                              this.codDep === '' ? 'Selecione um depósito' : ''">
              <button id="btnSearchProdutos" :disabled="codBar !== '' || isPedidoSelectedAndFechado()" class="btn btn-secondary input-group-btn disable-on-sale" @click="searchProdutos"><font-awesome-icon icon="fa-search"/></button>
              <button id="btnBuscaProdutos" class="btn-busca" data-bs-toggle="modal" data-bs-target="#produtosModal">...</button>
            </div>
          </div>
          <div class="row table-wrapper border">
            <table class="table table-striped table-hover table-sm table-responsive table-items">
              <thead>
                <tr id="cart-head">
                  <th class="sm-header" style="width: 48%;"><small>Produto</small></th>
                  <th class="sm-header" style="width: 10%;"><small>Qtde.</small></th>
                  <th class="sm-header" style="width: 6%;"><small>Obs.</small></th>
                  <th class="sm-header" style="width: 6%;"><small>Desc.</small></th>
                  <th class="sm-header" style="width: 6%;"><small>Dep.</small></th>
                  <th class="sm-header" style="width: 8%;"><small>Vlr. Unit.</small></th>
                  <th class="sm-header" style="width: 8%;"><small>Vlr. Total</small></th>
                  <th class="sm-header" style="width: 8%;"><small>Vlr. Líq.</small></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in itensCarrinho" :key="row.codPro + row.codDer">
                  <th :id="'tabCar' + row.tabIndex" :class="{active:row.tabIndex == this.tableIndexCar && this.editandoCarrinho}" class="fw-normal sm">
                    <button :id="'btnDelete' + row.tabIndex" @click="removerItem(row)" :disabled="isPedidoSelectedAndFechado()" class="btn btn-secondary btn-sm sm edit-cart disable-on-sale">
                      <font-awesome-icon class="icon-cart" icon="fa-trash"/>
                    </button>
                    <small>&nbsp;{{ row.codPro }} / {{ row.codDer }} - {{ row.desPro }}</small>
                  </th>
                  <th :class="{active:row.tabIndex == this.tableIndexCar && this.editandoCarrinho}" class="fw-normal sm align-middle">
                    <small>{{ row.qtdPed }}</small>
                    <button :id="'btnEdit' + row.tabIndex" @click="editarItem(row)" :disabled="isPedidoSelectedAndFechado()" data-bs-toggle="modal" data-bs-target="#editarItemModal" class="btn btn-secondary btn-sm sm edit-cart disable-on-sale">
                      <font-awesome-icon class="icon-cart" icon="fa-refresh"/>
                    </button>
                  </th>
                  <th :class="{active:row.tabIndex == this.tableIndexCar && this.editandoCarrinho}" class="fw-normal sm align-middle">
                    <button :id="'btnObs' + row.tabIndex" @click="editarObsItem(row)" :disabled="isPedidoSelectedAndFechado()"  data-bs-toggle="modal" data-bs-target="#obsItemModal" class="btn btn-secondary btn-sm sm edit-cart disable-on-sale">
                      <font-awesome-icon class="icon-cart" icon="fa-circle-info"/>
                    </button>
                  </th>
                  <th :class="{active:row.tabIndex == this.tableIndexCar && this.editandoCarrinho}" class="fw-normal sm align-middle">
                    <button :id="'btnDesc' + row.tabIndex" @click="editarDescItem(row)" :disabled="isPedidoSelectedAndFechado()"  data-bs-toggle="modal" data-bs-target="#descItemModal" class="btn btn-secondary btn-sm sm edit-cart disable-on-sale">
                      <font-awesome-icon class="icon-cart" icon="fa-dollar-sign"/>
                    </button>
                  </th>
                  <th :class="{active:row.tabIndex == this.tableIndexCar && this.editandoCarrinho}" class="fw-normal sm align-middle">
                    <button :id="'btnDep' + row.tabIndex" :disabled="isPedidoSelectedAndFechado()"  class="btn btn-secondary btn-sm sm edit-cart disable-on-sale" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <font-awesome-icon class="icon-cart" icon="fa-warehouse"/>
                    </button>
                    <div class="dropdown-menu">
                      <a v-for="dep in this.depositos" class="dropdown-item dep-item" :class="{'dep-active':row.codDep == dep.codDep}" @click="editDepItem(row, dep.codDep)">
                        <div class="custom-control custom-checkbox sm">
                          <small>{{ dep.codDep }} - {{ dep.desDep }}</small>
                        </div>
                      </a>
                    </div>
                  </th>
                  <th :class="{active:row.tabIndex == this.tableIndexCar && this.editandoCarrinho}" class="fw-normal sm align-middle"><small>{{ toMoneyString(Number(row.preBas)) }}</small></th>
                  <th :class="{active:row.tabIndex == this.tableIndexCar && this.editandoCarrinho}" class="fw-normal sm align-middle"><small>{{ toMoneyString(Number(row.vlrTot)) }}</small></th>
                  <th :class="{active:row.tabIndex == this.tableIndexCar && this.editandoCarrinho}" class="fw-normal sm align-middle"><small>{{ toMoneyString(Number(row.vlrLiq)) }}</small></th>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="row margin-y-fields">
            <div class="col-6">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Valor Itens</span>
                <input class="form-control" disabled v-model="vlrTot">
              </div>
            </div>
            <div class="col-6">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Qtde. Itens</span>
                <input class="form-control" disabled v-model="qtdTot">
              </div>
            </div>
          </div>
          <div class="row margin-y-fields">
            <div class="col-6">
              <div class="input-group input-group-sm">
                <!-- <select :disabled="!this.itensCarrinho.length" @change="vlrDesc=''; tipDesc=''" class="form-select disable-on-sale" v-model="tipOpeVlr" id="selectTipOpeVlr">
                  <option selected value="desconto">Desconto</option>
                  <option value="acrescimo">Acréscimo</option>
                </select> --> <!-- TODO: descomentar depois de resolver acrescimo -->
                <span class="input-group-text">Desconto</span> <!-- TODO: remover quando resolver acrescimo -->
                <select :disabled="!this.itensCarrinho.length || isPedidoSelectedAndFechado()" @change="vlrDesc=''; vlrDescPedido = 0; atualizarValorTotalCompra()" class="form-select disable-on-sale" v-model="tipDesc" id="selectTipDesc">
                  <option selected value="">Nenhum</option>
                  <option value="valor">Valor</option>
                  <option value="porcentagem">Porcentagem</option>
                </select>
                <span class="input-group-text" v-if="tipDesc === 'valor'">R$</span>
                <vue-mask :disabled="tipDesc === ''" v-if="tipDesc === 'valor'" class="form-control" mask="000.000.000,00" :raw="false" :options="options" v-model="vlrDesc"></vue-mask>
                <vue-mask :disabled="tipDesc === ''" v-else class="form-control" mask="00,00" :raw="false" :options="options" v-model="vlrDesc"></vue-mask>
                <span class="input-group-text" v-if="tipDesc === 'porcentagem'">%</span>
              </div>
            </div>
            <div class="col" v-if="tipDesc !== ''">
              <button id="btnAplicarDesconto" class="btn btn-secondary btn-sm mx-2 disable-on-sale" @click="aplicarDesconto(true)">Aplicar</button>  
              <button id="btnCancelarDesconto" :disabled="vlrComDesconto === ''" class="btn btn-secondary btn-sm mx-2 disable-on-sale" @click="limparDesconto(true)">Limpar</button>  
            </div>
          </div>
          <div class="row margin-y-fields" v-if="vlrDescPedido > 0">
            <div class="col-6">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Valor com {{ tipOpeVlr }}</span>
                <input class="form-control" disabled v-model="vlrComDesconto">
              </div>  
            </div>
          </div>
          <div class="row margin-y-fields">
            <div class="col-6">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Valor Final</span>
                <input class="form-control" disabled v-model="vlrFinal">
              </div>
            </div>
          </div>
          <div class="row margin-y-fields">
            <div class="col">
              <div class="float-end mx-2">
                <button id="btnFinalizarVenda" class="btn btn-secondary disable-on-sale" @click="triggerFinalizandoVenda(true, true, true)" 
                  :disabled="!this.itensCarrinho.length">Gerar NFC (F8)</button>
                <button id="btnOpenFinalizarVendaModal" class="btn-busca" data-bs-toggle="modal" data-bs-target="#confirmaVendaModal">.</button>
                <button id="btnOpenConfirmarImpressaoModal" class="btn-busca" data-bs-toggle="modal" data-bs-target="#confirmaImpressaoModal">.</button>
                <button id="btnOpenConfirmarNFCeModal" class="btn-busca" data-bs-toggle="modal" data-bs-target="#confirmaNFCeModal">.</button>
              </div>
              <div class="float-end mx-2">
                <button id="btnGerarPedido" class="btn btn-secondary disable-on-sale" @click="triggerFinalizandoVenda(true, false, true)"
                  :disabled="!this.itensCarrinho.length || isPedidoSelectedAndFechado()">Gerar Pedido (F9)</button>
              </div>
              <div class="float-end mx-2">
                <button id="btnInserirPedido" class="btn btn-secondary disable-on-sale" @click="triggerFinalizandoVenda(true, false, false)" v-if="!this.pedidoSelected"
                  :disabled="!this.itensCarrinho.length || isPedidoSelectedAndFechado()">Gerar Orçamento (F4)</button>
                <button id="btnOpenInserirPedidoModal" class="btn-busca" data-bs-toggle="modal" data-bs-target="#confirmaVendaModal">.</button>
              </div>
            </div>
          </div>
          <div class="row margin-y-fields" v-if="status !== ''">
            <div class="col">
              <div class="float-end">
                <span class="status" v-if="status === 'pedido'">Gerando/Atualizando pedido. Aguarde ...</span>
                <span class="status" v-else-if="status === 'nfce'">Gerando NFC-e. Aguarde ...</span>
                <span class="status" v-else-if="status === 'b_representantes'">Buscando representantes ...</span>
                <span class="status" v-else-if="status === 'b_clientes'">Buscando clientes ...</span>
                <span class="status" v-else-if="status === 'b_formas'">Buscando formas de pagamento ...</span>
                <span class="status" v-else-if="status === 'b_pedidos'">Buscando pedidos abertos ...</span>
                <span class="status" v-else-if="status === 'b_params'">Buscando parâmetros de integração ...</span>
                <span class="status" v-else-if="status === 'b_produtos'">Buscando produtos ...</span>
                <span class="status" v-else-if="status === 'd_item'">Removendo item do pedido ...</span>
                <span class="status" v-else-if="status === 'a_precos'">Atualizando preços dos produtos ...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Representantes -->
  <div class="modal fade" id="representantesModal" tabindex="-1" aria-labelledby="representantesModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="representantesModalLabel">Representantes</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalRepresentantes"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3" v-if="representantes != null">
            <input type="text" autocomplete="off" class="form-control mb-3" id="inputRepresentantesFiltro" v-on:keydown="navegarModalRepresentantes" v-on:keyup="filtrarModalRepresentantes" v-model="representantesFiltro" placeholder="Digite para buscar o representante abaixo">
            <table class="table table-striped table-hover table-bordered table-sm table-responsive">
              <thead>
                <tr>
                  <th class="sm-header" scope="col" style="width: 20%;">Código</th>
                  <th class="sm-header" scope="col" style="width: 40%;">Nome</th>
                  <th class="sm-header" scope="col" style="width: 40%;">Apelido</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in representantesFiltrados" :key="row.tabIndex" class="mouseHover row-modal" @click="selectRepresentante(row)">
                  <th :id="'tabRep' + row.tabIndex" :class="{active:row.tabIndex == this.tableIndexRep}" class="fw-normal sm" scope="row">{{ row.codRep }}</th>
                  <th :class="{active:row.tabIndex == this.tableIndexRep}" class="fw-normal sm">{{ row.nomRep }}</th>
                  <th :class="{active:row.tabIndex == this.tableIndexRep}" class="fw-normal sm">{{ row.apeRep }}</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else>
            <label>Buscando representantes ...</label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Fechar</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Clientes -->
  <div class="modal fade" id="clientesModal" tabindex="-1" aria-labelledby="clientesModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="clientesModalLabel">Clientes</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalClientes"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3" v-if="clientes != null">
            <input type="text" autocomplete="off" class="form-control mb-3" id="inputClientesFiltro" v-on:keydown="navegarModalClientes" v-on:keyup="filtrarModalClientes" v-model="clientesFiltro" placeholder="Digite para buscar o cliente abaixo">
            <div class="row">
              <table class="table table-striped table-hover table-bordered table-sm table-responsive">
                <thead>
                  <tr>
                    <th class="ssm-header" scope="col" style="width: 7%;">Código</th>
                    <th class="ssm-header" scope="col" style="width: 43%;">Nome</th>
                    <th class="ssm-header" scope="col" style="width: 20%;">Apelido</th>
                    <th class="ssm-header" scope="col" style="width: 20%;">CPF/CNPJ</th>
                    <th class="ssm-header" scope="col" style="width: 10%;">Dados</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="row in clientesFiltrados" :key="row.tabIndex">
                    <tr v-if="row.numPag === this.numPagCli" class="mouseHover row-modal">
                      <th :id="'tabCli' + row.tabIndex" :class="{active:row.tabIndex == this.tableIndexCli}" class="fw-normal ssm" scope="row" @click="selectCliente(row, true)">{{ row.codCli }}</th>
                      <th :class="{active:row.tabIndex == this.tableIndexCli}" class="fw-normal ssm" @click="selectCliente(row, true)">{{ row.nomCli }}</th>
                      <th :class="{active:row.tabIndex == this.tableIndexCli}" class="fw-normal ssm" @click="selectCliente(row, true)">{{ row.apeCli }}</th>
                      <th :class="{active:row.tabIndex == this.tableIndexCli}" class="fw-normal ssm" @click="selectCliente(row, true)">{{ row.cgcCpf }}</th>
                      <th :class="{active:row.tabIndex == this.tableIndexCli}" class="fw-normal ssm">
                        <button :id="'btnDados' + row.codCli" @click="abrirDadosCliente(row)" class="btn btn-secondary btn-sm sm edit-nota disable-on-sale">Dados</button>
                      </th>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
            <div class="row mb-2">
              <div class="col text-center">
                <button class="btn btn-secondary btn-sm" @click="changePageCli(-1)" :disabled="this.numPagCli === 1"> &lt; </button>
                <span class="mx-2">{{ this.numPagCli }} de {{ this.numPagCliMax }}</span>
                <button class="btn btn-secondary btn-sm"  @click="changePageCli(1)" :disabled="this.numPagCli === this.numPagCliMax"> &gt; </button>
              </div>
            </div>
          </div>
          <div v-else>
            <label>Buscando Clientes ...</label>
          </div>
        </div>
        <div class="modal-footer">
          <span v-if="buscandoDadosCliente" class="mandatory">Buscando informações do cliente...</span>
          <button type="button" class="btn btn-secondary btn-sm" @click="habilitarCadastroCliente">Novo</button>
          <button type="button" id="btnCadastrarNovoCliente" class="btn-busca" data-bs-toggle="modal" data-bs-target="#cadastroClientesModal">Novo</button>
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Fechar</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Cadastro Clientes -->
  <div class="modal fade" id="cadastroClientesModal" tabindex="-1" aria-labelledby="cadastroClientesModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="cadastroClientesModalLabel">Cadastro de Clientes</h5>
          <button type="button" class="btn-close cadastro-cliente" data-bs-dismiss="modal" aria-label="Close" id="closeModalCadastroClientes"></button>
        </div>
        <div class="modal-body">
          <div class="row mb-2">
            <div class="col-4">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Tipo</span>
                <select @change="cadCliCgcCpf=''" class="form-select cadastro-cliente" v-model="cadCliTipCli" id="selectTipCli">
                  <option selected disabled value="" >Selecione</option>
                  <option value="F">Física</option>
                  <option value="J">Jurídica</option>
                </select>
                <span class="mandatory">&nbsp;&nbsp;*</span>
              </div>
            </div>
            <div class="col-8">
              <div class="input-group input-group-sm">
                <span class="input-group-text">CPF/CNPJ</span>
                <vue-mask id="inputCgcCpf" :disabled="cadCliTipCli===''" v-if="cadCliTipCli !== 'J'" class="form-control cadastro-cliente" mask="000.000.000-00" :raw="false" :options="options" v-model="cadCliCgcCpf" v-on:keyup="validarCgcCpf"></vue-mask>
                <vue-mask id="inputCgcCpf" :disabled="cadCliTipCli===''" v-else class="form-control cadastro-cliente" mask="00.000.000/0000-00" :raw="false" :options="options" v-model="cadCliCgcCpf" v-on:keyup="validarCgcCpf"></vue-mask>
                <span class="mandatory">&nbsp;&nbsp;*</span>
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-4">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Ramo</span>
                <select class="form-select cadastro-cliente" v-model="cadCliCodRam" id="selectCodRam">
                  <option selected value=""> </option>
                  <option v-for="row in paramsPDV.ramos" :key="row.codRam" :value="row.codRam">{{ row.desRam }}</option>
                </select> 
              </div>  
            </div>
            <div class="col-8">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Nome</span>
                <input autocomplete="off" class="form-control cadastro-cliente" type="text" v-model="cadCliNomCli">  
                <span class="mandatory">&nbsp;&nbsp;*</span>
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-3">
              <div class="input-group input-group-sm">
                <span class="input-group-text">CEP</span>
                <vue-mask class="form-control cadastro-cliente" mask="00000-000" :raw="false" :options="options" v-model="cadCliCepCli" id="inputCadCliCepCli" v-on:keyup="consultarCep"></vue-mask>
                <span class="mandatory">&nbsp;&nbsp;*</span>
              </div>
            </div>
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Endereço</span>
                <input autocomplete="off" class="form-control cadastro-cliente" type="text" v-model="cadCliEndCli">  
                <span class="mandatory">&nbsp;&nbsp;*</span>
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-3">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Número</span>
                <input autocomplete="off" class="form-control cadastro-cliente" v-model="cadCliNenCli" maxLength="5"
                  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength); if(event.key==='.' || event.key===','){event.preventDefault()};">
              </div> 
            </div>
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Complemento</span>
                <input autocomplete="off" class="form-control cadastro-cliente" type="text" v-model="cadCliCplEnd">  
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Bairro</span>
                <input autocomplete="off" class="form-control cadastro-cliente" type="text" v-model="cadCliBaiCli"> 
                <span class="mandatory">&nbsp;&nbsp;*</span>
              </div> 
            </div>
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Cidade</span>
                <input autocomplete="off" class="form-control cadastro-cliente" type="text" v-model="cadCliCidCli">  
                <span class="mandatory">&nbsp;&nbsp;*</span>
              </div>
            </div>
            <div class="col-4">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Estado</span>
                <select class="form-select cadastro-cliente" v-model="cadCliSigUfs" id="selectSigUfs">
                  <option selected disabled value="">Selecione</option>
                  <option v-for="row in estados" :key="row.codUfs" :value="row.codUfs">{{ row.desUfs }}</option>
                </select> 
                <span class="mandatory">&nbsp;&nbsp;*</span>
              </div> 
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Telefone</span>
                <input autocomplete="off" class="form-control cadastro-cliente" v-model="cadCliFonCli" maxLength="12"
                  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength); if(event.key==='.' || event.key===','){event.preventDefault()};">
              </div> 
            </div>
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">E-mail</span>
                <input autocomplete="off" class="form-control cadastro-cliente" type="text" v-model="cadCliEmaCli"> 
              </div> 
            </div>
          </div>
        </div>
        <div class="row mx-2 mb-2">
          <span class="mandatory">Os campos marcados com * são obrigatórios.</span>
        </div>
        <div class="modal-footer">
          <span v-if="clienteExistente" class="mandatory">Já existe um cliente com esse CPF/CNPJ!</span>
          <span v-if="buscandoCEP" class="mandatory">Buscando informações de endereço...</span>
          <span v-if="buscandoDadosCliente" class="mandatory">Buscando informações por CPF...</span>
          <button type="button" class="btn btn-secondary btn-sm cadastro-cliente" :disabled="clienteExistente" @click="cadastrarCliente">Cadastrar</button>
          <button type="button" class="btn btn-secondary btn-sm cadastro-cliente" data-bs-dismiss="modal">Fechar</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Depositos -->
  <div class="modal fade" id="depositosModal" tabindex="-1" aria-labelledby="depositosModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="depositosModalLabel">Depósitos</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalDepositos"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3" v-if="depositos != null">
            <input type="text" autocomplete="off" class="form-control mb-3" id="inputDepositosFiltro" v-on:keydown="navegarModalDepositos" v-on:keyup="filtrarModalDepositos" v-model="depositosFiltro" placeholder="Digite para buscar o depósito abaixo">
            <table class="table table-striped table-hover table-bordered table-sm table-responsive">
              <thead>
                <tr>
                  <th class="sm-header" scope="col" style="width: 20%;">Código</th>
                  <th class="sm-header" scope="col" style="width: 80%;">Descrição</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in depositosFiltrados" :key="row.tabIndex" class="mouseHover row-modal" @click="selectDeposito(row, true)">
                  <th :id="'tabDep' + row.tabIndex" :class="{active:row.tabIndex == this.tableIndexDep}" class="fw-normal sm" scope="row">{{ row.codDep }}</th>
                  <th :class="{active:row.tabIndex == this.tableIndexDep}" class="fw-normal sm">{{ row.desDep }}</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else>
            <label>Buscando depósitos ...</label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Fechar</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Produtos -->
  <div class="modal fade" id="produtosModal" tabindex="-1" aria-labelledby="produtosModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="produtosModalLabel">Produtos</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalProdutos"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3" v-if="produtosTabelaPreco != null">
            <input type="text" autocomplete="off" class="form-control mb-3" id="inputProdutosFiltro" v-on:keydown="navegarModalProdutos" v-on:keyup="filtrarModalProdutos" v-model="produtosFiltro" placeholder="Digite para buscar o produto abaixo">
            <div class="row">
              <table class="table table-striped table-hover table-bordered table-sm table-responsive">
                <thead>
                  <tr>
                    <th class="sm-header" scope="col" style="width: 20%;">Código</th>
                    <th class="sm-header" scope="col" style="width: 10%;">Derivação</th>
                    <th class="sm-header" scope="col" style="width: 70%;">Descrição</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="row in produtosFiltrados" :key="row.tabIndex">
                    <tr v-if="row.numPag === this.numPagPro" class="mouseHover row-modal" @click="selectProduto(row, 1, 0, '', 'desconto', '', '', '', true, this.codDep)">
                      <th :id="'tabPro' + row.tabIndex" :class="{active:row.tabIndex == this.tableIndexPro}" class="fw-normal sm" scope="row">{{ row.codPro }}</th>
                      <th :class="{active:row.tabIndex == this.tableIndexPro}" class="fw-normal sm">{{ row.codDer }}</th>
                      <th :class="{active:row.tabIndex == this.tableIndexPro}" class="fw-normal sm">{{ row.desPro }}</th>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
            <div class="row mb-2">
              <div class="col text-center">
                <button class="btn btn-secondary btn-sm" @click="changePagePro(-1)" :disabled="this.numPagPro === 1"> &lt; </button>
                <span class="mx-2">{{ this.numPagPro }} de {{ this.numPagProMax }}</span>
                <button class="btn btn-secondary btn-sm"  @click="changePagePro(1)" :disabled="this.numPagPro === this.numPagProMax"> &gt; </button>
              </div>
            </div>
          </div>
          <div v-else>
            <label>Buscando Produtos ...</label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Fechar</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Tabelas Preco -->
  <div class="modal fade" id="tabelasPrecoModal" tabindex="-1" aria-labelledby="tabelasPrecoModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="tabelasPrecoModalLabel">Tabelas de Preço</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalTabelasPreco"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3" v-if="tabelasPreco != null">
            <input type="text" autocomplete="off" class="form-control mb-3" id="inputTabelasPrecoFiltro" v-on:keydown="navegarModalTabelasPreco" v-on:keyup="filtrarModalTabelasPreco" v-model="tabelasPrecoFiltro" placeholder="Digite para buscar a tabela de preço abaixo">
            <table class="table table-striped table-hover table-bordered table-sm table-responsive">
              <thead>
                <tr>
                  <th class="sm-header" scope="col">Código</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in tabelasPrecoFiltrados" :key="row.tabIndex" class="mouseHover row-modal" @click="selectTabelaPreco(row, true)">
                  <th :id="'tabTpr' + row.tabIndex" :class="{active:row.tabIndex == this.tableIndexTpr}" class="fw-normal sm" scope="row">{{ row.codTpr }}</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else>
            <label>Buscando Tabelas de Preço ...</label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Fechar</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Editar Item -->
  <div class="modal fade" id="editarItemModal" tabindex="-1" aria-labelledby="editarItemModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editarItemModalLabel">Editar quantidade</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalEditarItem"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <input type="number" maxLength="4"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength); if(event.key==='.' || event.key===','){event.preventDefault()};"
            autocomplete="off" class="form-control mb-3" id="inputEditarCarrinho" v-model="newValue" placeholder="Digite para alterar o valor"
            v-on:keyup.enter="alterarQuantidadeItem">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" @click="alterarQuantidadeItem" data-bs-dismiss="modal">Confirmar</button>
          <button type="button" class="btn btn-dismiss btn-sm" data-bs-dismiss="modal">(ESC) Cancelar</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Confirmar Impressao NFCe -->
  <div class="modal fade" id="confirmaImpressaoModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Confirmação de Impressão</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalConfirmaImpressao"></button>
        </div>
        <div class="modal-body">
          <p>{{ this.paramsConfirmacaoImpressao.msg }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" id="btnConfirmaImpressao"
            @click="callImpressao()">Sim</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Não</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Confirmar Geração NFCe -->
  <div class="modal fade" id="confirmaNFCeModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Confirmação de Geração de NFCe</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalConfirmaNFCe"></button>
        </div>
        <div class="modal-body">
          <p>Confirma a geração de NFCe de pedido fechado?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" id="btnConfirmaNFCe"
            @click="callNFCe(this.pedidoSelected.numPed)">Sim</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Não</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Gerar Pedido -->
  <div class="modal fade" id="confirmaVendaModal" tabindex="-1">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ confirmaVendaTitle }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalConfirmaVenda"></button>
        </div>
        <div class="modal-body">
          <div class="row mx-2" v-if="fecharVenda || gerarPedido">
            <div class="row">
              <div class="col-6">
                <div class="input-group input-group-sm">
                  <span class="input-group-text">Valor Pendente</span>
                  <input class="form-control" disabled :value="toMoneyString(valorPendente)">
                </div>
              </div>
              <div class="col-6">
                <div class="input-group input-group-sm">
                  <span class="input-group-text">Valor Pago</span>
                  <input class="form-control" disabled :value="toMoneyString(valorPago)">
                </div>
              </div>
            </div>
            <div v-if="valorPendente > 0">
              <hr/>
              <h5>Adicionar pagamento</h5>
              <div class="row my-2">
                <div class="col-6">
                  <div class="input-group input-group-sm">
                    <span class="input-group-text">Forma</span>
                    <select class="form-select" :disabled="!formasPagto.length" v-model="formaSelecionada" @change="attemptToFillCondicaoPagto" id="selectFpg" ref="selectFpgRef">
                      <option selected disabled :value="null" >Selecione ...</option>
                      <option v-for="forma in formasPagto" :key="forma.codFpg" :value="forma">{{ forma.codAta ? '(' + forma.codAta + ') - ' : ''}}{{ forma.desFpg }}</option>
                    </select>
                  </div>
                </div>
                <div class="col-6">
                  <div class="input-group input-group-sm">
                    <span class="input-group-text">Condição</span>
                    <select class="form-select" :disabled="formaSelecionada === null" v-model="condicaoSelecionada" @change="calcValorPagto()" id="selectCpg">
                      <option selected disabled :value="null" >Selecione ...</option>
                      <option v-if="formaSelecionada !== null" v-for="condicao in formaSelecionada.condicoes" :key="condicao.codCpg" :value="condicao">{{ condicao.desCpg }}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row my-2" v-if="prcDescontoForma !== '' || isPagamentoDinheiro()">
                <div class="col-6" v-if="prcDescontoForma !== ''">
                  <div class="input-group input-group-sm">
                    <span class="input-group-text">Desconto (forma de pagamento)</span>
                    <input class="form-control" disabled :value="prcDescontoForma + ' %'">
                  </div>  
                </div>
                <div class="col-6" v-if="isPagamentoDinheiro()">
                  <div class="input-group input-group-sm">
                    <span class="input-group-text">Troco</span>
                    <input class="form-control" disabled v-model="vlrTroco">
                  </div>  
                </div>
              </div>
              <div class="row my-2">
                <div class="col-6">
                  <div class="input-group input-group-sm">
                    <span class="input-group-text">Valor pago (R$)</span>
                    <vue-mask id="inputVlrPago" class="form-control" mask="000.000.000,00" :raw="false" :disabled="this.condicaoSelecionada === null" :options="options" v-model="vlrPago" v-on:keyup="handleInputValorPago"></vue-mask>
                  </div>
                </div>
              </div>
              <div class="row my-2" v-if="isPagamentoCartao() || isPagamentoPIXQrCode()">
                <span>Informações da transação</span>  
                <div class="row mb-2">
                  <div class="input-group input-group-sm">
                    <span class="input-group-text">Operadora</span>
                    <select class="form-select" v-model="cartao.cgcCpf" id="selectDesOpe" :disabled="!condicaoSelecionada">
                      <option selected disabled value="" >Selecione</option>
                      <option v-if="condicaoSelecionada" v-for="row in condicaoSelecionada.operadoras" :key="row.codOpe" :value="row.cgcCpf">{{ row.desOpe }}</option>
                    </select>
                  </div>
                </div>
                <div class="row mb-2" v-if="isPagamentoCartao()">
                  <div class="input-group input-group-sm">
                    <span class="input-group-text">Bandeira</span>
                    <select class="form-select" v-model="cartao.banOpe" id="selectBanOpe">
                      <option selected disabled value="" >Selecione</option>
                      <option v-for="row in cartoes" :key="row.codBan" :value="row.codBan">{{ row.codBan }} - {{ row.desBan }}</option>
                    </select>
                  </div>
                </div>
                <div class="row mb-2" v-if="isPagamentoCartao()">
                  <div class="input-group input-group-sm">
                    <span class="input-group-text">Número da Autorização de Transação</span>
                    <input autocomplete="off" class="form-control" type="text" v-model="cartao.catTef" v-on:keyup="handleInputValorPago">  
                  </div>
                </div>
                <div class="row mb-2" v-if="formaSelecionada && formaSelecionada.tipInt === '1' && isPagamentoCartao()">
                  <div class="input-group input-group-sm">
                    <span class="input-group-text">Número da Transação (TEF)</span>
                    <input autocomplete="off" class="form-control" type="text" v-model="cartao.nsuTef" v-on:keyup="handleInputValorPago">  
                  </div>
                </div>
              </div>
              <div class="row my-2">
                <div class="col">
                  <button id="btnProcessarPagto" :disabled="!formaSelecionada || !condicaoSelecionada" class="btn btn-secondary btn-sm form-control" @click="processarPagto">Processar Pagamento</button>
                </div>
              </div>
            </div>
            <div class="row" v-if="pagamentos.length">
              <hr/>
              <h5>Valores adicionados</h5>
              <div class="row mb-2" v-for="pagto in pagamentos" :key="pagto.tabIndex">
                <div class="col-12">
                  <div class="input-group input-group-sm">
                    <span class="input-group-text" style="width: 3%;">{{ (pagto.tabIndex + 1) }}</span>
                    <span class="input-group-text" style="width: 29%;">{{ pagto.forma.desFpg }}</span>
                    <span class="input-group-text" style="width: 30%;">{{ pagto.condicao.desCpg }}</span>
                    <span class="input-group-text" style="width: 5%;">Pago</span>
                    <input class="form-control" style="width: 11%;" disabled :value="toMoneyString(pagto.valorPago)">
                    <span class="input-group-text" style="width: 8%;">Desconto</span>
                    <input class="form-control" style="width: 11%;" disabled :value="toMoneyString(pagto.valorDesconto)">
                    <span>
                      <button class="btn btn-secondary btn-excl-pagto form-control" @click="removerPagto(pagto)"><font-awesome-icon class="icon-cart" icon="fa-trash"/></button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p v-else>{{ this.msgConfirmacao }}</p>
        </div>
        <div class="modal-footer" v-if="fecharVenda || gerarPedido">
          <button type="button" class="btn btn-secondary" :disabled="valorPendente > 0" @click="finalizarVenda" id="btnProcessarVenda">Finalizar</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        </div>
        <div class="modal-footer" v-else>
          <button type="button" class="btn btn-secondary" @click="finalizarVenda">Sim</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Não</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Opções teclado -->
  <div class="modal fade" id="atalhosModal" tabindex="-1" aria-labelledby="atalhosModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="atalhosModalLabel">Atalhos do Teclado</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalAtalhos"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <table class="table table-striped table-hover table-bordered table-sm table-responsive">
              <thead>
                <tr>
                  <th class="sm-header" scope="col" style="width: 20%;">Tecla</th>
                  <th class="sm-header" scope="col" style="width: 80%;">Ação</th>
                </tr>
              </thead>
              <tbody>
                <tr class="mouseHover" v-for="row in atalhos" :key="row.codAta">
                  <th class="fw-normal sm">{{ row.tecAta }}</th>
                  <th class="fw-normal sm">{{ row.desAta }}</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Fechar</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Pedidos -->
  <div class="modal fade" id="pedidosModal" tabindex="-1" aria-labelledby="pedidosModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="pedidosModalLabel">Pedidos</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalPedidos"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3" v-if="pedidos != null">
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text">Pedido</span>
              <input type="text" autocomplete="off" class="form-control" id="inputPedidosFiltro" v-on:keydown="navegarModalPedidos" v-on:keyup="filtrarModalPedidos" v-model="pedidosFiltro" placeholder="Digite para buscar o pedido abaixo">
            </div>
            <div class="row mb-3">
              <div class="col-6">
                <div class="input-group input-group-sm">
                  <span class="input-group-text">Cliente</span>
                  <input type="text" autocomplete="off" class="form-control" id="inputPedidosFiltroCliente" v-on:keydown="navegarModalPedidos" v-on:keyup="filtrarModalPedidos" v-model="pedidosFiltroCliente" placeholder="Digite para filtrar por cliente">
                </div>
              </div>
              <div class="col-6">
                <div class="input-group input-group-sm">
                  <span class="input-group-text">Representante</span>
                  <input type="text" autocomplete="off" class="form-control" id="inputPedidosFiltroRepresentante" v-on:keydown="navegarModalPedidos" v-on:keyup="filtrarModalPedidos" v-model="pedidosFiltroRepresentante" placeholder="Digite para filtrar por representante">
                </div>
              </div>
            </div>
            <table class="table table-striped table-hover table-bordered table-sm table-responsive">
              <thead>
                <tr>
                  <th class="sm-header" scope="col" style="width: 13%;">Número</th>
                  <th class="sm-header" scope="col" style="width: 13%;">Data de Emissão</th>
                  <th class="sm-header" scope="col" style="width: 32%;">Representante</th>
                  <th class="sm-header" scope="col" style="width: 32%;">Cliente</th>
                  <th class="sm-header" scope="col" style="width: 5%;">Tipo</th>
                  <th class="sm-header" scope="col" style="width: 5%;">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in pedidosFiltrados" :key="row.tabIndex" class="mouseHover row-modal" @click="selectPedido(row)">
                  <th :id="'tabPed' + row.tabIndex" :class="{active:row.tabIndex == this.tableIndexPed}" class="fw-normal sm" scope="row">{{ row.numPed }}</th>
                  <th :class="{active:row.tabIndex == this.tableIndexPed}" class="fw-normal sm">{{ row.datEmi }}</th>
                  <th :class="{active:row.tabIndex == this.tableIndexPed}" class="fw-normal sm">{{ row.ideRep }}</th>
                  <th :class="{active:row.tabIndex == this.tableIndexPed}" class="fw-normal sm">{{ row.ideCli }}</th>
                  <th :class="{active:row.tabIndex == this.tableIndexPed}" class="fw-normal sm">{{ row.tipPed }}</th>
                  <th :class="{active:row.tabIndex == this.tableIndexPed}" class="fw-normal sm">{{ row.staPed }}</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else>
            <label>Buscando Pedidos ...</label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Fechar</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Observação item -->
  <div class="modal fade" id="obsItemModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Observação do item</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalObsItem"></button>
        </div>
        <div class="modal-body">
          <textarea id="inputObsItem" class="form-control" maxlength="255" v-model="obsIpd" rows="5" placeholder="Informe a observação do item"></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="gravarObsIpd">Gravar</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Desconto item -->
  <div class="modal fade" id="descItemModal" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Desconto do item</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalDescItem"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col">
              <div class="input-group input-group-sm">
                <!-- <select :disabled="!this.itensCarrinho.length" @change="vlrDesc=''; tipDesc=''" class="form-select disable-on-sale" v-model="tipOpeVlrIpd" id="selectTipOpeVlr">
                  <option selected value="desconto">Desconto</option>
                  <option value="acrescimo">Acréscimo</option>
                </select> --> <!-- TODO: descomentar depois de resolver acrescimo -->
                <span class="input-group-text">Desconto</span> <!-- TODO: remover depois de resolver acrescimo -->
                <select @change="vlrDscIpd=''; perDscIpd=''" class="form-select" v-model="tipDescIpd" id="selectTipDescItem">
                  <option selected value="">Nenhum</option>
                  <option value="valor" v-if="tipOpeVlrIpd === 'desconto'">Valor</option>
                  <option value="porcentagem">Porcentagem</option>
                </select>
                <span class="input-group-text" v-if="tipDescIpd === 'valor'">R$</span>
                <vue-mask :disabled="tipDescIpd === ''" v-if="tipDescIpd === 'valor'" class="form-control" mask="000.000.000,00" :raw="false" :options="options" v-model="vlrDscIpd"></vue-mask>
                <vue-mask :disabled="tipDescIpd === ''" v-else class="form-control" mask="00,00" :raw="false" :options="options" v-model="perDscIpd"></vue-mask>
                <span class="input-group-text" v-if="tipDescIpd === 'porcentagem'">%</span>
              </div>
            </div>
            <div class="col-2">
              <button class="btn btn-secondary btn-sm" @click="limparDescontoItemFromModal">Limpar</button>
            </div>  
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="gravarDescItem">Gravar</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
  <Footer/>

</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import api from '../utils/api'
import shared from '../utils/sharedFunctions'
import vueMask from 'vue-jquery-mask'
import qz from 'qz-tray'
import { KEYUTIL, KJUR, stob64, hextorstr } from 'jsrsasign'
import { CERT, PRIVATE_KEY } from '../utils/printCerts'

export default {
  name: 'Venda',
  components: { Navbar, Footer, vueMask },
  data () {
    return {
      // representantes
      ideRep: '',
      codRep: '',
      representantes: [],
      representantesFiltro: '',
      representantesFiltrados: [],
      tableIndexRep: 0,
      
      //clientes
      ideCli: '',
      codCli: '',
      clientes: [],
      clientesFiltro: '',
      clientesFiltrados: [],
      tableIndexCli: 0,
      numPagCli: 1,
      numPagCliMax: 0,
      ipp: 15,
      
      //depositos
      ideDep: '',
      codDep: '',
      depositos: [],
      depositosFiltro: '',
      depositosFiltrados: [],
      tableIndexDep: 0,

      //cadastro clientes
      erroCliente: true,
      clienteExistente: false,
      buscandoCEP: false,
      buscandoDadosCliente: false,
      validandoCPF: false,
      cadCliCodCli: '',
      cadCliTipCli: '',
      cadCliCodRam: '',
      cadCliCgcCpf: '',
      cadCliNomCli: '',
      cadCliCepCli: '',
      cadCliEndCli: '',
      cadCliNenCli: '',
      cadCliCplEnd: '',
      cadCliBaiCli: '',
      cadCliCidCli: '',
      cadCliSigUfs: '',
      cadCliFonCli: '',
      cadCliEmaCli: '',
      estados: [
        { codUfs: 'AC', desUfs: 'Acre' },
        { codUfs: 'AL', desUfs: 'Alagoas' },
        { codUfs: 'AP', desUfs: 'Amapá' },
        { codUfs: 'AM', desUfs: 'Amazonas' },
        { codUfs: 'BA', desUfs: 'Bahia' },
        { codUfs: 'CE', desUfs: 'Ceará' },
        { codUfs: 'DF', desUfs: 'Distrito Federal' },
        { codUfs: 'ES', desUfs: 'Espírito Santo' },
        { codUfs: 'GO', desUfs: 'Goiás' },
        { codUfs: 'MA', desUfs: 'Maranhão' },
        { codUfs: 'MT', desUfs: 'Mato Grosso' },
        { codUfs: 'MS', desUfs: 'Mato Grosso do Sul' },
        { codUfs: 'MG', desUfs: 'Minas Gerais' },
        { codUfs: 'PA', desUfs: 'Pará' },
        { codUfs: 'PB', desUfs: 'Paraíba' },
        { codUfs: 'PR', desUfs: 'Paraná' },
        { codUfs: 'PE', desUfs: 'Pernambuco' },
        { codUfs: 'PI', desUfs: 'Piauí' },
        { codUfs: 'RJ', desUfs: 'Rio de Janeiro' },
        { codUfs: 'RN', desUfs: 'Rio Grande do Norte' },
        { codUfs: 'RS', desUfs: 'Rio Grande do Sul' },
        { codUfs: 'RO', desUfs: 'Rondônia' },
        { codUfs: 'RR', desUfs: 'Roraima' },
        { codUfs: 'SC', desUfs: 'Santa Catarina' },
        { codUfs: 'SP', desUfs: 'São Paulo' },
        { codUfs: 'SE', desUfs: 'Sergipe' },
        { codUfs: 'TO', desUfs: 'Tocantins' },
      ],
      
      //produtos
      codBar: '',
      produtos: [],
      produtosFiltro: '',
      produtosFiltrados: [],
      itensCarrinho: [],
      tableIndexPro: 0,
      tableIndexCar: 0,
      loadingProdutos: false,
      editandoCarrinho: false,
      newValue: '',
      obsIpd: '',
      tipOpeVlrIpd: '',
      tipDescIpd: '',
      vlrDscIpd: '',
      perDscIpd: '',
      itemEditando: null,
      buscandoProdutos: false,
      
      //tabelas preco
      ideTpr: '',
      codTpr: '',
      tabelasPreco: [],
      produtosTabelaPreco: [],
      tabelasPrecoFiltro: '',
      tabelasPrecoFiltrados: [],
      tableIndexTpr: 0,
      numPagPro: 1,
      numPagProMax: 0,
      
      //formas de pagamento
      formasPagto: [],

      //venda
      confirmaVendaTitle: '',
      finalizandoVenda: false,
      paramsPDV: { codTpr: '', dscTot: '', depositos: [], depPad: '', codEmp: '', codFil: '', nomUsu: '', codCli: '' },
      vlrTot: 'R$ 0,00',
      qtdTot: 0,
      vlrPagoDin: '',
      cartoes: [
        { codBan: '01', desBan: 'Visa' },
        { codBan: '02', desBan: 'Mastercard' },
        { codBan: '03', desBan: 'American Express' },
        { codBan: '04', desBan: 'Sorocred' },
        { codBan: '05', desBan: 'Diners Club' },
        { codBan: '06', desBan: 'Elo' },
        { codBan: '07', desBan: 'Hipercard' },
        { codBan: '08', desBan: 'Aura' },
        { codBan: '09', desBan: 'Cabal' },
        { codBan: '10', desBan: 'Banes Card' },
        { codBan: '11', desBan: 'Cabal' },
        { codBan: '12', desBan: 'CalCard' },
        { codBan: '13', desBan: 'Credz' },
        { codBan: '14', desBan: 'Discover' },
        { codBan: '15', desBan: 'GoodCard' },
        { codBan: '16', desBan: 'GreenCard' },
        { codBan: '17', desBan: 'Hiper' },
        { codBan: '18', desBan: 'JcB' },
        { codBan: '19', desBan: 'Mais' },
        { codBan: '20', desBan: 'MaxVan' },
        { codBan: '21', desBan: 'Policard' },
        { codBan: '22', desBan: 'RedeCompras' },
        { codBan: '23', desBan: 'Sodexo' },
        { codBan: '24', desBan: 'ValeCard' },
        { codBan: '25', desBan: 'Verocheque' },
        { codBan: '26', desBan: 'VR' },
        { codBan: '27', desBan: 'Ticket' },
        { codBan: '99', desBan: 'Outros' }
      ],
      cartao: {
        cgcCpf: '',
        banOpe: '',
        catTef: '',
        nsuTef: '',
      },
      fecharVenda: false,
      gerarPedido: false,
      msgConfirmacao: '',
      tipOpeVlr: 'desconto',
      tipDesc: '',
      vlrDesc: '',
      vlrDescPedido: 0,
      vlrFinalNbr: 0,
      vlrFinal: 'R$ 0,00',
      vlrComDesconto: '',
      prcDescontoForma: '',
      formaSelecionada: null,
      condicaoSelecionada: null,
      pagamentos: [],
      valorProcessado: 0,
      valorDescontos: 0,
      valorDescontoParcial: 0,
      valorParcial: 0,
      valorPendente: 0,
      valorPago: 0,
      vlrTroco: 'R$ 0,00',
      paramsConfirmacaoImpressao: {
        msg: '',
        pdfFile: '',
        printer: '',
      },

      //geral
      status: '',
      options: {
        reverse: true
      },
      options2: {
        reverse: false
      },
      optionsQtde: {
        style: 'number',
        minimumFractionDigits: 3
      },
      atalhos: [
        { codAta: 0, tecAta: 'F2', desAta: 'Produto' },
        { codAta: 1, tecAta: 'F4', desAta: 'Gerar Orçamento' },
        { codAta: 2, tecAta: 'F9', desAta: 'Gerar Pedido' },
        { codAta: 3, tecAta: 'F8', desAta: 'Gerar NFC' },
        { codAta: 4, tecAta: 'Alt + A', desAta: 'Pedido' },
        { codAta: 5, tecAta: 'Alt + R', desAta: 'Representante' },
        { codAta: 6, tecAta: 'Alt + T', desAta: 'Tabela de Preço' },
        { codAta: 7, tecAta: 'Alt + C', desAta: 'Cliente' },
        { codAta: 8, tecAta: 'Alt + O', desAta: 'Depósito' },
        { codAta: 9, tecAta: 'Alt + X', desAta: 'Editar carrinho' },
        { codAta: 10, tecAta: 'Alt + Q', desAta: 'Alterar Quantidade do Item' },
        { codAta: 11, tecAta: 'Alt + B', desAta: 'Observação do Item' },
        { codAta: 12, tecAta: 'Alt + S', desAta: 'Desconto (se editando carrinho, vale pro item, se não, para o total)' },
        { codAta: 13, tecAta: 'Delete', desAta: 'Remover Item' }
      ],
      pressedKeys: null,
      print: false,

      //Pedidos
      idePedPrv: '',
      pedPrv: '',
      pedidos: [],
      pedidosFiltro: '',
      pedidosFiltroCliente: '',
      pedidosFiltroRepresentante: '',
      pedidosFiltrados: [],
      tableIndexPed: 0,
      pedidoSelected: null,
      staPedSelected: '',
      msgPedidoFechado: 'Pedido já está fechado, não é possível realizar alterações pelo PDV. Para reabilitar o pedido, acesse o ERP Senior.'
    }
  },
  mounted () {
    if (!sessionStorage.getItem('token')) {
      this.$router.push({ name: 'Login' })
    } else {
      this.print = process.env.VUE_APP_IMPRESSAO == 'true'
      this.initEverything()
      this.addEvents()
      
      if (this.print) {
        this.signQZConnection()
        this.startQZConnection()
      }
    }
  },
  methods: {
    async initEverything() {
      this.pressedKeys = new Set()
      this.status = 'b_params'   
      await this.initParams()  
      this.status = 'b_representantes'
      await this.initRepresentantes()    
      this.status = 'b_clientes'
      await this.initClientes()    
      this.status = 'b_formas'
      await this.initFormasPagto()  
      this.status = ''  
    },
    restartRecords() {
      this.clearEverything()
      this.initEverything()
    },
    clearEverything() {
      this.emptyStorage()
      this.clearAllLists()
      this.clearAllInputs()
      this.clearInputsCadCli()
      this.clearInputsCartao()
      this.clearFocus()
    },
    emptyStorage() {
      sessionStorage.removeItem('representantes')
      sessionStorage.removeItem('clientes')
      sessionStorage.removeItem('formasPagto')
      sessionStorage.removeItem('pedidos')
      sessionStorage.removeItem('paramsPDV')
      sessionStorage.removeItem('depositoSelected')
    },
    clearAllLists() {
      this.representantes = []
      this.tabelasPreco = []
      this.clientes = []
      this.depositos = []
      this.formasPagto = []
      this.produtosTabelaPreco = []
      this.itensCarrinho = []
      this.pedidos = []
    },
    clearAllInputs() {
      this.idePedPrv = ''
      this.pedPrv = ''
      this.pedidoSelected = null
      this.staPedSelected = ''
      this.pedidosFiltro = ''
      this.pedidosFiltroCliente = ''
      this.pedidosFiltroRepresentante = ''
      this.ideRep = ''
      this.codRep = ''
      this.representantesFiltro = ''
      this.ideCli = ''
      this.codCli = ''
      this.clientesFiltro = ''
      this.ideDep = ''
      this.codDep = ''
      this.depositosFiltro = ''
      this.codBar = ''
      this.produtosFiltro = ''
      this.itensCarrinho = []
      this.ideTpr = ''
      this.codTpr = ''
      this.tabelasPrecoFiltro = ''
      this.vlrTot = 'R$ 0,00'
      this.status = ''
      this.vlrFinalNbr = 0
      this.vlrFinal = 'R$ 0,00'
      this.prcDescontoForma = ''
      this.newValue = ''
      this.obsIpd = ''
      this.limparDesconto(false)
    },
    clearAfterVenda() {
      this.idePedPrv = ''
      this.pedPrv = ''
      this.pedidoSelected = null
      this.staPedSelected = ''
      this.pedidosFiltro = ''
      this.pedidosFiltroCliente = ''
      this.pedidosFiltroRepresentante = ''
      this.representantesFiltro = ''
      this.ideCli = ''
      this.codCli = ''
      this.clientesFiltro = ''
      this.depositosFiltro = ''
      this.codBar = ''
      this.produtosFiltro = ''
      this.itensCarrinho = []
      this.tabelasPrecoFiltro = ''
      this.vlrTot = 'R$ 0,00'
      this.status = ''
      this.vlrFinalNbr = 0
      this.vlrFinal = 'R$ 0,00'
      this.prcDescontoForma = ''
      this.newValue = ''
      this.obsIpd = ''
      this.limparDesconto(false)
    },
    clearInputsCadCli() {
      document.getElementById('selectTipCli').selectedIndex = "0"
      document.getElementById('selectSigUfs').selectedIndex = "0"
      this.cadCliCodCli = ''
      this.cadCliTipCli = ''
      this.cadCliCodRam = ''
      this.cadCliCgcCpf = ''
      this.cadCliNomCli = ''
      this.cadCliCepCli = ''
      this.cadCliEndCli = ''
      this.cadCliNenCli = ''
      this.cadCliCplEnd = ''
      this.cadCliBaiCli = ''
      this.cadCliCidCli = ''
      this.cadCliSigUfs = ''
      this.cadCliFonCli = ''
      this.cadCliEmaCli = ''
    },
    clearInputsCartao() {
      const selectBanOpe = document.getElementById('selectBanOpe')
      if (selectBanOpe) selectBanOpe.selectedIndex = "0"
      const selectDesOpe = document.getElementById('selectDesOpe')
      if (selectDesOpe) selectDesOpe.selectedIndex = "0"
      this.cartao.banOpe = ''
      this.cartao.cgcCpf = ''
      this.cartao.catTef = ''
      this.cartao.nsuTef = ''
    },
    setEverythingDisabled(className, value) {
      const elements = document.getElementsByClassName(className)
      for (var i = 0; i < elements.length; i++) elements[i].disabled = value
    },
    addEvents() {
      let self = this
      document.addEventListener('keyup', function(ev) {
          self.deleteKey(ev.key)
      })
      document.addEventListener('keydown', function(ev) {
          self.handleNavigation(ev)
          self.handleOption(ev)
      })

      const inputIdeRep = document.getElementById('inputIdeRep')
      inputIdeRep.addEventListener('focus', (event) => {
        this.editandoCarrinho = false
        this.beginRepresentante()
      })

      const inputIdeCli = document.getElementById('inputIdeCli')
      inputIdeCli.addEventListener('focus', (event) => {
        this.editandoCarrinho = false
        this.beginCliente()
      })

      const inputIdeDep = document.getElementById('inputIdeDep')
      inputIdeDep.addEventListener('focus', (event) => {
        this.editandoCarrinho = false
        this.beginDeposito()
      })

      const inputProdutos = document.getElementById('inputProduto')
      inputProdutos.addEventListener('focus', (event) => {
        this.editandoCarrinho = false
        this.beginProduto()
      })

      const inputIdeTpr = document.getElementById('inputIdeTpr')
      inputIdeTpr.addEventListener('focus', (event) => {
        this.editandoCarrinho = false
        this.beginTabelasPreco()
      })

      const inputPedPrv = document.getElementById('inputPedPrv')
      inputPedPrv.addEventListener('focus', (event) => {
        this.editandoCarrinho = false
        this.beginPedido()
      })

      const modalFinalizarVenda = document.getElementById('confirmaVendaModal')
      modalFinalizarVenda.addEventListener('focusout', (event) => {
        this.triggerFinalizandoVenda(false, this.fecharVenda, this.gerarPedido)
      })
    },

    deleteKey(key) {
      this.pressedKeys.delete(key.toUpperCase())
    },

    async handleOption(event) {
      if (sessionStorage.getItem('form') === 'Venda') {
        this.pressedKeys.add(event.key.toUpperCase())

        if (this.pressedKeys.size === 2) {
          if (this.editandoCarrinho) {
            if (this.pressedKeys.has('ALT') && this.pressedKeys.has('Q')) document.getElementById('btnEdit' + this.tableIndexCar).click()
            else if (this.pressedKeys.has('ALT') && this.pressedKeys.has('B')) document.getElementById('btnObs' + this.tableIndexCar).click()
            else if (this.pressedKeys.has('ALT') && this.pressedKeys.has('S')) document.getElementById('btnDesc' + this.tableIndexCar).click()
          } else {
            if (this.pressedKeys.has('ALT') && this.pressedKeys.has('A')) this.focusPedido()
            else if (this.pressedKeys.has('ALT') && this.pressedKeys.has('R')) this.focusRepresentante()
            else if (this.pressedKeys.has('ALT') && this.pressedKeys.has('T')) this.focusTabelaPreco()
            else if (this.pressedKeys.has('ALT') && this.pressedKeys.has('C')) this.focusCliente()
            else if (this.pressedKeys.has('ALT') && this.pressedKeys.has('O')) this.focusDeposito()
            else if (this.pressedKeys.has('ALT') && this.pressedKeys.has('S')) document.getElementById('selectTipDesc').focus()
            else if (this.pressedKeys.has('ALT') && this.pressedKeys.has('X')) {
              if (this.itensCarrinho.length > 0) { 
                this.editarCarrinho()
              } else {
                this.pressedKeys.clear()
                alert('Carrinho vazio!')
              }
            } else {
              this.pressedKeys.clear()
            }
          }
        } else if (this.pressedKeys.size === 1) {
          if (this.editandoCarrinho) {
            if (this.pressedKeys.has('DELETE')) document.getElementById('btnDelete' + this.tableIndexCar).click()
          } else if (document.activeElement === document.getElementById('selectFpg')) {
            const forma = this.formasPagto.filter(fpg => ((fpg.codAta) && (fpg.codAta.toUpperCase() === event.key.toUpperCase())))
            if (forma[0]) {
              event.preventDefault()
              this.formaSelecionada = forma[0]
              this.attemptToFillCondicaoPagto()
            } 
          } else if (this.finalizandoVenda) {
            if (this.pressedKeys.has('ENTER')) {
              if (this.isPedidoSelectedAndFechado) await this.callNFCe(this.pedidoSelected.numPed)
              else await this.finalizarVenda()
            }
          } else {
            if (this.pressedKeys.has('F2')) this.focusProduto()
            else if (this.pressedKeys.has('F4')) document.getElementById('btnInserirPedido').click()
            else if (this.pressedKeys.has('F8')) document.getElementById('btnFinalizarVenda').click()
            else if (this.pressedKeys.has('F9')) document.getElementById('btnGerarPedido').click()
          }

          if (this.pressedKeys.has('ESCAPE')) {
            this.clearFocus()
            this.pressedKeys.clear()
          }

          if (!this.pressedKeys.has('ALT')) this.pressedKeys.clear()
        } else {
          this.pressedKeys.clear()
        }
      }
    },

    handleNavigation(event) {
      if (sessionStorage.getItem('form') === 'Venda') {
        if(this.itensCarrinho.length && this.editandoCarrinho) {
          if (event.keyCode === 38) this.focusTableCar(-1)
          else if (event.keyCode === 40) this.focusTableCar(1)
        }
      }
    },

    clearFocus() {
      document.activeElement.blur()
      if (this.editandoCarrinho) this.editandoCarrinho = false
    },

    noInputIsFocused() {
      const inputs = document.getElementsByClassName('form-control')
      for(let i = 0; i < inputs.length; i++) {
        if(document.activeElement === inputs[i])
          return false
      }
      return true
    },

    scrollToElement(element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      })
    },

    toMoneyString(value) {
      return shared.toMoneyString(value)
    },

    toMoneyThenNumber(value) {
      return shared.toMoneyThenNumber(value)
    },

    signQZConnection() {
      qz.security.setCertificatePromise(function(resolve, reject) {
        resolve(CERT)
      })

      qz.security.setSignatureAlgorithm("SHA512")
      qz.security.setSignaturePromise(function(toSign) {
          return function(resolve, reject) {
              try {
                  var pk = KEYUTIL.getKey(PRIVATE_KEY)
                  var sig = new KJUR.crypto.Signature({"alg": "SHA512withRSA"})
                  sig.init(pk)
                  sig.updateString(toSign)
                  var hex = sig.sign()
                  resolve(stob64(hextorstr(hex)))
              } catch (err) {
                  console.error(err)
                  alert('Ocorreu um erro ao assinar conexão com o QZ Tray. Verifique! Erro: \n' + err)
                  reject(err)
              }
          }
      })
    },

    async startQZConnection() {
      if (!qz.websocket.isActive()) {
        try {
          await qz.websocket.connect()
        } catch (error) {
          alert('Ocorreu uma falha ao conectar com o QZ Tray para impressões de NFCe. Verifique se a aplicação está aberta.')
        }
      }
    },

    /* Representantes */
    async initRepresentantes() {
      if (!sessionStorage.getItem('representantes')) {
        await api.getRepresentantes()
        .then((response) => {
          this.representantes = response.data
          this.representantesFiltrados = this.representantes
          if(this.representantes.length === 1) this.selectRepresentante(this.representantes[0])
          sessionStorage.setItem('representantes', JSON.stringify(this.representantes))
        })
        .catch((err) => {
          console.log(err)
          shared.handleRequestError(err)
        })
      } else {
        this.representantes = JSON.parse(sessionStorage.getItem('representantes'))
        this.representantesFiltrados = this.representantes
        if(this.representantes.length === 1) this.selectRepresentante(this.representantes[0])
      }
    },

    async beginRepresentante() {
      this.ideRep = ''
      this.codRep = ''
      this.representantesFiltro = ''

      if(!this.representantes.length) await this.initRepresentantes()
    },

    searchRepresentantes() {  
      this.filtrarRepresentantes(this.ideRep)
      if (this.representantesFiltrados.length === 1) { // encontramos, selecionar
        this.selectRepresentante(this.representantesFiltrados[0])
      } else { // nao encontramos, abrir modal
        this.openRepresentantesModal()
      }
    },

    async selectRepresentante(row) {
      this.ideRep = row.nomRep
      this.codRep = row.codRep
      document.getElementById('closeModalRepresentantes').click()
      
      this.tabelasPreco = []

      await this.initTabelasPreco()
      if (this.tabelasPreco.length) {
        const tabelaPadrao = this.paramsPDV.codTpr !== '' ? this.tabelasPreco.find(tpr => tpr.codTpr === this.paramsPDV.codTpr) : null
        if (this.tabelasPreco.length === 1) this.selectTabelaPreco(this.tabelasPreco[0], true)
        else if (tabelaPadrao) {
          this.selectTabelaPreco(tabelaPadrao, true)
        }
        else if (this.isPedidoSelectedAndFechado()) alert('Para atualizar o pedido de orçamento, selecione uma tabela de preços')
      } else {
        if (this.paramsPDV.codTpr !== '') {
          this.selectTabelaPreco({codTpr: this.paramsPDV.codTpr}, true)
        } else {
          alert('Não existe nenhuma tabela de preço ligada a este representante e nenhuma tabela de preço cadastrada nos parâmetros do PDV. '
            + 'Por favor, contate o administrador do sistema.')
        }
      }
    },

    filtrarRepresentantes(filter) {
      this.representantesFiltrados = this.representantes.filter(rep => (rep.codRep === filter ||
                  rep.nomRep.toUpperCase().includes(filter.toUpperCase()) ||
                  rep.apeRep.toUpperCase().includes(filter.toUpperCase())))
      this.tableIndexRep = 0

      shared.populateTabIndex(this.representantesFiltrados)
    },

    openRepresentantesModal() {
      this.representantesFiltro = this.ideRep
      document.getElementById('btnBuscaRepresentantes').click()
      const modalElement = document.getElementById('representantesModal')
      modalElement.addEventListener('shown.bs.modal', () => {
        document.getElementById('inputRepresentantesFiltro').focus()
      })
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.focusRepresentante()
      })
    },

    focusRepresentante() {
      this.codRep === '' ? document.getElementById('inputIdeRep').focus() : document.getElementById('btnClearRep').focus()
    },

    navegarModalRepresentantes(key) {
      if (key.keyCode === 38) this.focusTableRep(-1)
      else if (key.keyCode === 40) this.focusTableRep(1)
      else if (key.keyCode === 13) this.repListHit()
    },

    filtrarModalRepresentantes(key) {
      if(key.keyCode !== 38 && key.keyCode !== 40 && key.keyCode !== 13)
        this.filtrarRepresentantes(this.representantesFiltro)
    },

    focusTableRep(value) {
      this.tableIndexRep += value
      if (this.tableIndexRep < 0) 
        this.tableIndexRep = 0
      else if (this.tableIndexRep >= this.representantesFiltrados.length)
        this.tableIndexRep = (this.representantesFiltrados.length - 1)

      let elementToScroll
      if (this.tableIndexRep > 0)
        elementToScroll = document.getElementById('tabRep' + this.tableIndexRep)
      else 
        elementToScroll = document.getElementById('inputRepresentantesFiltro')
      
      this.scrollToElement(elementToScroll)
    },  

    repListHit() {
      const rep = this.representantesFiltrados.find(repFil => repFil.tabIndex === this.tableIndexRep)
      this.selectRepresentante(rep)
    },

    /* Depositos */
    async initDepositos() {
      if (!this.paramsPDV.depositos.length) {
        await this.initParams()
        this.depositos = this.paramsPDV.depositos
        this.depositosFiltrados = this.paramsPDV.depositos
        this.tryDefinirDeposito()
      } else {
        this.depositos = this.paramsPDV.depositos
        this.depositosFiltrados = this.depositos
        this.tryDefinirDeposito()
      }
    },

    tryDefinirDeposito() {
      if(sessionStorage.getItem('depositoSelected')) {
        const dep = JSON.parse(sessionStorage.getItem('depositoSelected'))
        this.selectDeposito(dep, true)
      }
      else if(this.paramsPDV.depPad !== '') {
        const depPad = this.depositos.find(dep => dep.codDep === this.paramsPDV.depPad)  
        if (depPad) this.selectDeposito(depPad, true)
      }
      else if(this.depositos.length === 1) this.selectDeposito(this.depositos[0], true)
    },

    async beginDeposito() {
      this.ideDep = ''
      this.codDep = ''
      this.depositosFiltro = ''

      if(!this.depositos.length) await this.initDepositos()
    },

    searchDepositos() {  
      this.filtrarDepositos(this.ideDep)
      if (this.depositosFiltrados.length === 1) { // encontramos, selecionar
        this.selectDeposito(this.depositosFiltrados[0], true)
      } else { // nao encontramos, abrir modal
        this.openDepositosModal()
      }
    },

    async selectDeposito(row, atualizar) {
      if (this.isPedidoSelectedAndFechado() && atualizar) {
        this.showMsgPedidoFechado()
      } else {
        this.ideDep = row.desDep
        this.codDep = row.codDep
        sessionStorage.setItem('depositoSelected', JSON.stringify(row))
        document.getElementById('closeModalDepositos').click()
        if (this.pedidoSelected && atualizar) {
          this.fecharVenda = false
          this.gerarPedido = false
          await this.enviarVenda(false)
        }
      }
    },

    filtrarDepositos(filter) {
      this.depositosFiltrados = this.depositos.filter(dep => (dep.codDep === filter ||
                  dep.desDep.toUpperCase().includes(filter.toUpperCase())))
      this.tableIndexDep = 0

      shared.populateTabIndex(this.depositosFiltrados)
    },

    openDepositosModal() {
      this.depositosFiltro = this.ideDep
      document.getElementById('btnBuscaDepositos').click()
      const modalElement = document.getElementById('depositosModal')
      modalElement.addEventListener('shown.bs.modal', () => {
        document.getElementById('inputDepositosFiltro').focus()
      })
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.focusDeposito()
      })
    },

    focusDeposito() {
      this.codDep === '' ? document.getElementById('inputIdeDep').focus() : document.getElementById('btnClearDep').focus()
    },

    navegarModalDepositos(key) {
      if (key.keyCode === 38) this.focusTableDep(-1)
      else if (key.keyCode === 40) this.focusTableDep(1)
      else if (key.keyCode === 13) this.depListHit()
    },

    filtrarModalDepositos(key) {
      if(key.keyCode !== 38 && key.keyCode !== 40 && key.keyCode !== 13)
        this.filtrarDepositos(this.depositosFiltro)
    },

    focusTableDep(value) {
      this.tableIndexDep += value
      if (this.tableIndexDep < 0) 
        this.tableIndexDep = 0
      else if (this.tableIndexDep >= this.depositosFiltrados.length)
        this.tableIndexDep = (this.depositosFiltrados.length - 1)

      let elementToScroll
      if (this.tableIndexDep > 0)
        elementToScroll = document.getElementById('tabDep' + this.tableIndexDep)
      else 
        elementToScroll = document.getElementById('inputDepositosFiltro')
      
      this.scrollToElement(elementToScroll)
    },  

    depListHit() {
      const dep = this.depositosFiltrados.find(depFil => depFil.tabIndex === this.tableIndexDep)
      this.selectDeposito(dep, true)
    },

    /* Clientes */
    async initClientes() {
      if (!sessionStorage.getItem('clientes')) {
        await api.getClientesSimplified()
        .then((response) => {
          this.clientes = response.data
          this.clientesFiltrados = this.clientes
          this.paginarClientes()
          sessionStorage.setItem('clientes', JSON.stringify(this.clientes))
        })
        .catch((err) => {
          console.log(err)
          shared.handleRequestError(err)
        })
      } else {
        this.clientes = JSON.parse(sessionStorage.getItem('clientes'))
        this.clientesFiltrados = this.clientes
        this.paginarClientes()
      }
    },

    paginarClientes() {
      this.numPagCli = 1
      this.numPagCliMax = 1
      let numPag = 1
      let index = 0
      this.clientesFiltrados.forEach(cli => {
        cli.numPag = numPag
        cli.tabIndex = index
        index++

        if (index === this.ipp) {
          numPag++
          index = 0
          this.numPagCliMax = numPag
        }
      })
    },

    changePageCli(value) {
      if ((this.numPagCli + value) >= 1 && (this.numPagCli + value) <= this.numPagCliMax) {
        this.numPagCli += value
        this.tableIndexCli = 0
      }
    },

    async beginCliente() {
      this.ideCli = ''
      this.codCli = ''
      this.clientesFiltro = ''

      if(!this.clientes.length) await this.initClientes()
    },

    searchClientes() {
      this.filtrarClientes(this.ideCli)
      if (this.clientesFiltrados.length === 1) { // encontramos, selecionar
        this.selectCliente(this.clientesFiltrados[0], true)
      } else { // nao encontramos, abrir modal
        this.openClientesModal()
      }
    },

    async selectCliente(row, applyCheck) {
      if (this.isPedidoSelectedAndFechado()) {
        this.showMsgPedidoFechado()
      } 
      else if (applyCheck && !await this.dadosClientePreenchidos(row)) {
        if (this.erroCliente) alert('O cliente possui dados incompletos!')
        else this.erroCliente = true
      } else {
        this.ideCli = row.nomCli
        this.codCli = row.codCli
        document.getElementById('closeModalClientes').click()
        if (this.pedidoSelected) {
          this.fecharVenda = false
          this.gerarPedido = false
          await this.enviarVenda(false)
        }
      }
    },

    async dadosClientePreenchidos(cliente) {
      document.getElementsByTagName('body')[0].style.cursor = 'wait'
      this.buscandoDadosCliente = true
      let dadosPreenchidos = await api.getCliente(cliente.codCli, null)
        .then((response) => {
          const clienteSearched = response.data
          if (clienteSearched.tipCli.trim() === '' ||
            clienteSearched.cgcCpf.trim() === '' ||
            clienteSearched.cepCli.trim() === '' ||
            clienteSearched.nomCli.trim() === '' ||
            clienteSearched.endCli.trim() === '' ||
            clienteSearched.baiCli.trim() === '' ||
            clienteSearched.cidCli.trim() === '' ||
            clienteSearched.sigUfs.trim() === '' )
            return false
          else return true
        })
        .catch((err) => {
          console.log(err)
          alert('Não foi possível localizar as informações para o cliente selecionado.')
        })
        .finally(() => {
          document.getElementsByTagName('body')[0].style.cursor = 'auto'
          this.buscandoDadosCliente = false
        })
      
        return dadosPreenchidos
    },

    filtrarClientes(filter) {
      this.clientesFiltrados = this.clientes.filter(cli => (cli.codCli === filter ||
                  cli.nomCli.toUpperCase().includes(filter.toUpperCase()) ||
                  cli.apeCli.toUpperCase().includes(filter.toUpperCase()) ||
                  cli.cgcCpf.startsWith(filter)))
      this.tableIndexCli = 0

      this.paginarClientes()
    },

    openClientesModal() {
      this.clientesFiltro = this.ideCli
      document.getElementById('btnBuscaClientes').click()
      const modalElement = document.getElementById('clientesModal')
      modalElement.addEventListener('shown.bs.modal', () => {
        document.getElementById('inputClientesFiltro').focus()
      })
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.focusCliente()
      })
    },

    focusCliente() {
      this.codCli === '' ? document.getElementById('inputIdeCli').focus() : document.getElementById('btnClearCli').focus()
    },

    navegarModalClientes(key) {
      if (key.keyCode === 37){
        this.changePageCli(-1)
        key.preventDefault()
      } 
      else if (key.keyCode === 38) {
        this.focusTableCli(-1)
        key.preventDefault()
      }
      else if (key.keyCode === 39) {
        this.changePageCli(1)
        key.preventDefault()
      }
      else if (key.keyCode === 40) {
        this.focusTableCli(1)
        key.preventDefault()
      }
      else if (key.keyCode === 13) this.cliListHit()
    },

    filtrarModalClientes(key) {
      if(key.keyCode !== 37 && key.keyCode !== 38 && key.keyCode !== 39 && key.keyCode !== 40 && key.keyCode !== 13)
        this.filtrarClientes(this.clientesFiltro)
    },

    focusTableCli(value) {
      this.tableIndexCli += value
      if (this.tableIndexCli < 0) 
        this.tableIndexCli = 0
      else if (this.tableIndexCli >= this.ipp)
        this.tableIndexCli = (this.ipp - 1)

      let elementToScroll
      if (this.tableIndexCli > 0)
        elementToScroll = document.getElementById('tabCli' + this.tableIndexCli)
      else 
        elementToScroll = document.getElementById('inputClientesFiltro')
      
      this.scrollToElement(elementToScroll)
    },  

    cliListHit() {
      const cli = this.clientesFiltrados.find(cliFil => cliFil.tabIndex === this.tableIndexCli && cliFil.numPag === this.numPagCli)
      this.selectCliente(cli, true)
    },

    async abrirDadosCliente(cliente) {
      this.erroCliente = false
      this.buscandoDadosCliente = true
      
      let clienteFull = await api.getCliente(cliente.codCli, null)
        .then((response) => {
          return response.data
        })
        .catch((err) => {
          console.log(err)
          alert('Não foi possível localizar as informações para o cliente selecionado.')
        })
        .finally(() => {
          document.getElementsByTagName('body')[0].style.cursor = 'auto'
          this.buscandoDadosCliente = false
        })
      
      this.habilitarCadastroCliente()
      this.preencherDadosCadastroCliente(clienteFull)
    },

    preencherDadosCadastroCliente(cliente) {
      this.cadCliCodCli = cliente.codCli
      this.cadCliTipCli = cliente.tipCli
      this.cadCliCodRam = cliente.codRam
      this.cadCliCgcCpf = cliente.cgcCpf
      this.cadCliNomCli = cliente.nomCli
      this.cadCliCepCli = cliente.cepCli
      this.cadCliEndCli = cliente.endCli
      this.cadCliNenCli = cliente.nenCli
      this.cadCliCplEnd = cliente.cplEnd
      this.cadCliBaiCli = cliente.baiCli
      this.cadCliCidCli = cliente.cidCli
      this.cadCliSigUfs = cliente.sigUfs
      this.cadCliFonCli = cliente.fonCli
      this.cadCliEmaCli = cliente.intNet
    },

    habilitarCadastroCliente() {
      document.getElementById('closeModalClientes').click()
      this.clearInputsCadCli()

      if(this.isRepresentanteEmpty()) {
        alert('Para cadastrar um novo cliente, é necessário informar o representante!')
        document.getElementById('inputIdeRep').focus()
      } else {
        this.clienteExistente = false
        document.getElementById('btnCadastrarNovoCliente').click()
        const modalElement = document.getElementById('cadastroClientesModal')
        modalElement.addEventListener('shown.bs.modal', () => {
          document.getElementById('selectTipCli').focus()
        })
      }
    },

    async validarCgcCpf() {
      if(!this.validandoCPF) {
        this.validandoCPF = true
        this.buscandoDadosCliente = true
        let cgcCpf = document.getElementById('inputCgcCpf').value
        cgcCpf = cgcCpf.replace('/','').replace('-','').replace('.','').replace('.','')
        const cliente = this.clientes.find(cli => cli.cgcCpf === cgcCpf)
        this.clienteExistente = false
        if (cliente) this.clienteExistente = true
        else {
          if (this.cadCliTipCli === 'F' && cgcCpf.length === 11 ||
              this.cadCliTipCli === 'J' && cgcCpf.length === 14) {
            document.getElementsByTagName('body')[0].style.cursor = 'auto'
            let clienteSearched = await api.getCliente(null, cgcCpf)
              .then((response) => {
                return response.data
              })
              .catch(() => {})
              .finally(() => {
                document.getElementsByTagName('body')[0].style.cursor = 'auto'
              })
            if(clienteSearched) {
              alert('Cliente encontrado com cadastro em outra filial. Favor atualizar o cadastro para incluir na filial atual.')
              this.preencherDadosCadastroCliente(clienteSearched)
            }
          }
        }
        this.validandoCPF = false
        this.buscandoDadosCliente = false
      }
    },

    async consultarCep() {
      const numCep = document.getElementById('inputCadCliCepCli').value.replace('-', '')
      if (numCep.length === 8) {
        document.getElementById('inputCadCliCepCli').disabled = true
        document.getElementsByTagName('body')[0].style.cursor = 'wait'
        this.buscandoCEP = true

        await api.consultarCEP(numCep)
          .then((response) => {
              const retornoCEP = response.data
              this.cadCliEndCli = retornoCEP.logradouro
              this.cadCliBaiCli = retornoCEP.bairro
              this.cadCliCidCli = retornoCEP.localidade
              this.cadCliSigUfs = retornoCEP.uf
            })
            .catch((err) => {
              console.log(err)
              alert('Não foi possível localizar as informações para o CEP informado.')
            })
            .finally(() => {
              document.getElementsByTagName('body')[0].style.cursor = 'auto'
              document.getElementById('inputCadCliCepCli').disabled = false
              document.getElementById('inputCadCliCepCli').focus()
              this.buscandoCEP = false
            })
      }
    },

    async cadastrarCliente() {
      if(this.validarCamposCliente()) {
        const cliente = {
          codCli: this.cadCliCodCli !== '' ? this.cadCliCodCli : '0',
          tipCli: this.cadCliTipCli,
          codRam: this.cadCliCodRam,
          cgcCpf: this.cadCliCgcCpf,
          cepCli: this.cadCliCepCli,
          nomCli: this.cadCliNomCli,
          endCli: this.cadCliEndCli,
          nenCli: this.cadCliNenCli,
          cplEnd: this.cadCliCplEnd,
          baiCli: this.cadCliBaiCli,
          cidCli: this.cadCliCidCli,
          sigUfs: this.cadCliSigUfs,
          fonCli: this.cadCliFonCli,
          emaCli: this.cadCliEmaCli,
          codRep: this.codRep,
        }
        document.getElementsByTagName('body')[0].style.cursor = 'wait'
        this.setEverythingDisabled('cadastro-cliente', true)
        await api.putCliente(cliente)
          .then((response) => {
            alert('Cliente cadastrado com sucesso.')    
            this.clientes = []
            sessionStorage.removeItem('clientes')
            this.beginCliente()
            
            const newCli = {
              codCli: response.data.codCli,
              nomCli: cliente.nomCli.toUpperCase(),
              tipCli: this.cadCliTipCli,
              codRam: this.cadCliCodRam,
              cgcCpf: this.cadCliCgcCpf,
              cepCli: this.cadCliCepCli,
              endCli: this.cadCliEndCli,
              nenCli: this.cadCliNenCli,
              cplEnd: this.cadCliCplEnd,
              baiCli: this.cadCliBaiCli,
              cidCli: this.cadCliCidCli,
              sigUfs: this.cadCliSigUfs,
              fonCli: this.cadCliFonCli,
              emaCli: this.cadCliEmaCli,
              codRep: this.codRep
            }
            document.getElementById('closeModalCadastroClientes').disabled = false
            document.getElementById('closeModalCadastroClientes').click()
            this.selectCliente(newCli, false)
            this.clearInputsCadCli()
          })
          .catch((err) => {
            console.log(err)
            shared.handleRequestError(err)
            if(err.response.data) {
              document.getElementById('selectTipCli').focus()
            }
          })
          .finally(() => {
            document.getElementsByTagName('body')[0].style.cursor = 'auto'
            this.setEverythingDisabled('cadastro-cliente', false)
          })
      }
    },

    validarCamposCliente() {
      if (this.cadCliTipCli.trim() === '') {
        alert('É necessário informar o tipo de cliente!')
        return false
      }
      else if (this.cadCliCgcCpf.trim() === '') {
        alert('É necessário informar o CPF/CNPJ!')
        return false
      }
      else if (this.cadCliNomCli.trim() === '') {
        alert('É necessário informar o Nome!')
        return false
      }
      else if (this.cadCliEndCli.trim() === '') {
        alert('É necessário informar o Endereco!')
        return false
      }
      else if (this.cadCliBaiCli.trim() === '') {
        alert('É necessário informar o Bairro!')
        return false
      }
      else if (this.cadCliCidCli.trim() === '') {
        alert('É necessário informar a Cidade!')
        return false
      }
      else if (this.cadCliSigUfs.trim() === '') {
        alert('É necessário informar o Estado!')
        return false
      }
      else if (this.cadCliCepCli.trim() === '') {
        alert('É necessário informar o CEP!')
        return false
      }
      return true
    },

    /* Produtos */    
    beginProduto() {
      this.codBar = ''
      this.produtosFiltro = ''
    },

    searchProdutos() {
      if (!this.finalizandoVenda) {
        this.filtrarProdutos(this.codBar)
        if (this.produtosFiltrados.length === 1) { // encontramos, selecionar
          this.selectProduto(this.produtosFiltrados[0], 1, 0, '', 'desconto', '', '', '', true, this.codDep)
        } else { // nao encontramos, abrir modal
          this.openProdutosModal()
        }
      }
    },

    async selectProduto(row, qtde, seqIpd, obsIpd, tipOpeVlrIpd, tipDsc, vlrDsc, perDsc, atualizar, codDep) {
      document.getElementById('closeModalProdutos').click()
      if (this.isPedidoSelectedAndFechado() && atualizar) {
        this.showMsgPedidoFechado()
      } else {
        const newItem = Object.create(row)
        const itemDoCarrinho = this.itensCarrinho.find(itemCar => itemCar.codPro === newItem.codPro && itemCar.codDer === newItem.codDer)
        if (itemDoCarrinho)  {
          itemDoCarrinho.qtdPed += qtde
          itemDoCarrinho.obsIpd = obsIpd
          itemDoCarrinho.tipOpeVlrIpd = tipOpeVlrIpd
          itemDoCarrinho.tipDsc = tipDsc
          itemDoCarrinho.vlrDsc = vlrDsc
          itemDoCarrinho.perDsc = perDsc
          itemDoCarrinho.codDep = codDep
          await this.definirPreco(itemDoCarrinho)
        }
        else {
          newItem.qtdPed = qtde
          newItem.seqIpd = seqIpd
          newItem.obsIpd = obsIpd
          newItem.tipOpeVlrIpd = tipOpeVlrIpd
          newItem.tipDsc = tipDsc
          newItem.vlrDsc = vlrDsc
          newItem.perDsc = perDsc
          newItem.codDep = codDep
          await this.definirPreco(newItem)
          if (newItem.preBas > 0) {
            this.itensCarrinho.push(newItem)
          }
        }

        this.codBar = ''
        document.getElementById('inputProduto').focus()
        shared.populateTabIndex(this.itensCarrinho)
        await this.atualizarValorTotalCompra()

        if (this.pedidoSelected && atualizar) {
          this.fecharVenda = false
          this.gerarPedido = false
          await this.enviarVenda(false)
          this.itensCarrinho[this.itensCarrinho.length - 1].seqIpd = this.itensCarrinho.length
        }
      }
    },

    definirPreco(produto) {
      let preBas = null
      produto.faixasPreco.every(faixa => {
        if (produto.qtdPed <= faixa.qtdMax) {
          preBas = faixa.preBas
          const vlrTot = this.roundUpIfThirdDecimalFiveOrMore(Number(preBas) * Number(produto.qtdPed))
          produto.preBas = preBas
          produto.vlrTot = vlrTot
          produto.vlrLiq = vlrTot
        }
        if (preBas !== null) return false
        return true
      })

      if (preBas === null) {
        produto.preBas = 0
        produto.vlrTot = 0
        produto.vlrLiq = 0
        alert ('Preço não encontrado para quantidade comprada.')
      }
    },

    roundUpIfThirdDecimalFiveOrMore(value) {
      // Round to 3 decimals
      let rounded = Math.round(value * 1000) / 1000;
      // Get the third decimal digit
      let thirdDecimal = Math.floor((rounded * 1000) % 10);
      if (thirdDecimal >= 5) {
        // Round up to next cent
        return Math.ceil(rounded * 100) / 100;
      } else {
        // Round to 2 decimals normally
        return Math.round(rounded * 100) / 100;
      }
    },

    async atualizarValorTotalCompra() {
      const successful = await this.calcularValorLiqItens()
      if (successful) {
        this.vlrTot = shared.toMoneyString(this.getVlrCarrinho())
        this.vlrFinalNbr = this.getVlrCarrinho()
        this.vlrFinal = this.vlrTot
        this.qtdTot = this.getQtdeItensCarrinho()
        if (this.tipDesc !== '' || this.prcDescontoForma !== '') {
          this.aplicarDesconto(false)
        }
      }
    },

    async calcularValorLiqItens() {
      for(let i = 0; i < this.itensCarrinho.length; i++) {
        const item = this.itensCarrinho[i]
        if (item.tipDsc === 'valor') {
          const vlrDsc = Number(item.vlrDsc.replace('.','').replace(',','.').trim())
          if(vlrDsc > item.vlrTot) {
            alert('O desconto não pode ser maior que o valor do produto!')
            this.limparDescontoItem(item)
            return false
          }
          item.vlrLiq = item.vlrTot - vlrDsc
        } else if (item.tipDsc === 'porcentagem') {
          const perDsc = Number(item.perDsc.replace(',','.').trim())
          item.vlrLiq = await this.calcularItemComDescontoAPI(item.vlrTot, (perDsc / 100))
        } else {
          item.vlrLiq = item.vlrTot
        }
      }
      return true
    },

    getVlrCarrinho() {
      return Number(this.itensCarrinho.map(item => item.vlrLiq).reduce((prev, curr) => prev + curr, 0))
    },

    getQtdeItensCarrinho() {
      return Number(this.itensCarrinho.map(item => item.qtdPed).reduce((prev, curr) => prev + curr, 0))
    },

    limparDescontoItem(item) {
      item.tipOpeVlrIpd = 'desconto'
      item.tipDsc = ''
      item.vlrDsc = ''
      item.perDsc = ''
    },
    
    filtrarProdutos(filter) {
      if (filter.includes(' ')) {
        const terms = filter.toUpperCase().split(' ').filter(term => term !== '')
        this.produtosFiltrados = this.produtosTabelaPreco.filter(pro => {
          let matches = 0
          
          terms.forEach(term => {
            pro.desPro.toUpperCase().split(' ').forEach(desc => {
              if (desc.startsWith(term)) matches++
            })
          })

          if (terms.length === 1) {  
            if (pro.codPro.toUpperCase().includes(terms[0])) matches++
          }
          else if (terms.length === 2) {  
            if (pro.codPro.toUpperCase().includes(terms[0])) matches++
            if (pro.codDer.toUpperCase().includes(terms[1])) matches++
          }

          return matches === terms.length
        })
      } else {
      this.produtosFiltrados = this.produtosTabelaPreco.filter(pro => (pro.codBar === filter ||
                  pro.codPro.toUpperCase().includes(filter.toUpperCase()) ||
                  pro.desPro.toUpperCase().includes(filter.toUpperCase())))
      }

      this.tableIndexPro = 0
      this.paginarProdutos()
    },

    paginarProdutos() {
      this.numPagPro = 1
      this.numPagProMax = 1
      let numPag = 1
      let index = 0
      this.produtosFiltrados.forEach(pro => {
        pro.numPag = numPag
        pro.tabIndex = index
        index++

        if (index === this.ipp) {
          numPag++
          index = 0
          this.numPagProMax = numPag
        }
      })
    },

    changePagePro(value) {
      if ((this.numPagPro + value) >= 1 && (this.numPagPro + value) <= this.numPagProMax) {
        this.numPagPro += value
        this.tableIndexPro = 0
      }
    },

    openProdutosModal() {
      this.produtosFiltro = this.codBar
      document.getElementById('btnBuscaProdutos').click()
      const modalElement = document.getElementById('produtosModal')
      modalElement.addEventListener('shown.bs.modal', () => {
        document.getElementById('inputProdutosFiltro').focus()
      })
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.focusProduto()
      })
    },

    focusProduto() {
      document.getElementById('inputProduto').focus()
    },

    navegarModalProdutos(key) {
      if (key.keyCode === 37){
        this.changePagePro(-1)
        key.preventDefault()
      } 
      else if (key.keyCode === 38) {
        this.focusTablePro(-1)
        key.preventDefault()
      }
      else if (key.keyCode === 39) {
        this.changePagePro(1)
        key.preventDefault()
      }
      else if (key.keyCode === 40) {
        this.focusTablePro(1)
        key.preventDefault()
      }
      else if (key.keyCode === 13) this.proListHit()
    },

    filtrarModalProdutos(key) {
      if(key.keyCode !== 37 && key.keyCode !== 38 && key.keyCode !== 39 && key.keyCode !== 40 && key.keyCode !== 13)
        this.filtrarProdutos(this.produtosFiltro)
    },

    focusTablePro(value) {
      this.tableIndexPro += value
      if (this.tableIndexPro < 0) 
        this.tableIndexPro = 0
      else if (this.tableIndexPro >= this.produtosFiltrados.length)
        this.tableIndexPro = (this.produtosFiltrados.length - 1)

      let elementToScroll
      if (this.tableIndexPro > 0)
        elementToScroll = document.getElementById('tabPro' + this.tableIndexPro)
      else 
        elementToScroll = document.getElementById('inputProdutosFiltro')
      
      this.scrollToElement(elementToScroll)
    },  

    proListHit() {
      const pro = this.produtosFiltrados.find(proFil => proFil.tabIndex === this.tableIndexPro && proFil.numPag === this.numPagPro)
      this.selectProduto(pro, 1, 0, '', 'desconto', '', '', '', true, this.codDep)
    },

    focusTableCar(value) {
      this.tableIndexCar += value
      if (this.tableIndexCar < 0) 
        this.tableIndexCar = 0
      else if (this.tableIndexCar >= this.itensCarrinho.length)
        this.tableIndexCar = (this.itensCarrinho.length - 1)

      let elementToScroll
      if (this.tableIndexCar > 0)
        elementToScroll = document.getElementById('tabCar' + this.tableIndexCar)
      else 
        elementToScroll = document.getElementById('cart-head')
      
      this.scrollToElement(elementToScroll)
    },  

    editarCarrinho() {
      this.editandoCarrinho = true
      this.tableIndexCar = 0
      const elementToScroll = document.getElementById('tabCar0')
      this.scrollToElement(elementToScroll)
    },

    async removerItem(item) {
      this.itensCarrinho = this.itensCarrinho.filter(itemCar => itemCar !== item)
      shared.populateTabIndex(this.itensCarrinho)
      await this.atualizarValorTotalCompra()
      this.tableIndexCar = 0
      if (!this.itensCarrinho.length) this.editandoCarrinho = false
      if (this.pedidoSelected) {
        this.fecharVenda = false
        this.gerarPedido = false
        await this.removerItemPedido(item)
      }
    },  

    async removerItemPedido(item) {
      item.excluir = true
      const itens = []
      itens.push(item)
      
      this.enviarPedido(itens, false)
    },

    editarItem(item) {
      this.newValue = item.qtdPed
      this.itemEditando = item
      const modalElement = document.getElementById('editarItemModal')
      modalElement.addEventListener('shown.bs.modal', () => {
        document.getElementById('inputEditarCarrinho').focus()
        document.getElementById('inputEditarCarrinho').select()
      })
    },  

    async alterarQuantidadeItem() {
      if (this.newValue > 9999) this.newValue = 9999
      if (this.newValue === 0) alert('A quantidade não pode ser zero!')
      else {
        this.itemEditando.qtdPed = this.newValue
        this.definirPreco(this.itemEditando)
        document.getElementById('closeModalEditarItem').click()
        this.atualizarValorTotalCompra()
        this.finalizarEdicaoItem()
      }
    },

    editarObsItem(item) {
      this.obsIpd = item.obsIpd
      this.itemEditando = item
      const modalElement = document.getElementById('obsItemModal')
      modalElement.addEventListener('shown.bs.modal', () => {
        document.getElementById('inputObsItem').focus()
        document.getElementById('inputObsItem').select()
      })
    },

    editarDescItem(item) {
      this.tipOpeVlrIpd = item.tipOpeVlrIpd
      this.tipDescIpd = item.tipDsc
      if (item.tipDsc === 'valor') this.vlrDscIpd = item.vlrDsc
      else this.perDscIpd = item.perDsc
      this.itemEditando = item
      const modalElement = document.getElementById('descItemModal')
      modalElement.addEventListener('shown.bs.modal', () => {
        document.getElementById('selectTipDescItem').focus()
      })
    },

    async gravarObsIpd() {
      this.itemEditando.obsIpd = this.obsIpd.trim()
      document.getElementById('closeModalObsItem').click()
      this.finalizarEdicaoItem()
    },

    async gravarDescItem() {
      this.itemEditando.tipOpeVlrIpd = this.tipOpeVlrIpd
      this.itemEditando.tipDsc = this.tipDescIpd
      this.itemEditando.vlrDsc = this.vlrDscIpd
      this.itemEditando.perDsc = this.perDscIpd
      document.getElementById('closeModalDescItem').click()
      this.atualizarValorTotalCompra()
      this.finalizarEdicaoItem()
    },

    limparDescontoItemFromModal() {
      this.limparDescontoItem(this.itemEditando)
      document.getElementById('closeModalDescItem').click()
      this.atualizarValorTotalCompra()
      this.finalizarEdicaoItem()
    },

    editDepItem(row, codDep) {
      this.itemEditando = row
      row.codDep = codDep
      this.finalizarEdicaoItem()
    },

    async finalizarEdicaoItem() {
      this.clearFocus()
      if (this.itemEditando.seqIpd > 0) {
        this.fecharVenda = false
        this.gerarPedido = false
        await this.enviarVenda(false)
      }
      this.itemEditando = null  
    },

    /* Tabelas Preco */
    async initTabelasPreco() {
      document.getElementsByTagName('body')[0].style.cursor = 'wait'
      await api.getTabelasPreco(this.codRep)
      .then((response) => {
        this.tabelasPreco = response.data
        this.tabelasPrecoFiltrados = this.tabelasPreco
      })
      .catch((err) => {
        console.log(err)
        shared.handleRequestError(err)
      })
      .finally(() => {
        document.getElementsByTagName('body')[0].style.cursor = 'auto'
      })
    },

    beginTabelasPreco() {
      if(!this.codRep.length) {
        alert('Favor informar um representante!')
        document.getElementById('inputIdeRep').focus()
      } else {
        this.ideTpr = ''
        this.codTpr = ''
        this.tabelasPrecoFiltro = ''
      }
    },

    async searchTabelasPreco() {
      await this.initTabelasPreco()
      if (this.tabelasPreco.length > 0) {
        this.filtrarTabelasPreco(this.ideTpr)
        if (this.tabelasPrecoFiltrados.length === 1) { // encontramos, selecionar
          this.selectTabelaPreco(this.tabelasPrecoFiltrados[0], true)
        } else { // nao encontramos, abrir modal
          this.openTabelasPrecoModal()
        }
      } else {
        if (this.paramsPDV.codTpr !== '') {
          alert('Nenhuma tabela encontrada para o representante. Utilizando tabela padrão.')
          this.selectTabelaPreco({codTpr: this.paramsPDV.codTpr}, true)
        } else {
          alert('Nenhuma tabela encontrada para o representante!')
        }
      }
    },

    async selectTabelaPreco(row, atualizar) {
      if (this.buscandoProdutos) {
        alert('Existe uma busca de produtos em andamento. Aguarde alguns segundos e tente novamente.')
        document.getElementById('closeModalTabelasPreco').click()
      } else {
        if (this.isPedidoSelectedAndFechado() && atualizar) {
          this.showMsgPedidoFechado()
        } else {
          let seguir = true
          if (this.pedidoSelected && atualizar) {
            seguir = await this.checarItensCarrinhoNovaTabela(row.codTpr)
          }

          document.getElementById('closeModalTabelasPreco').click()
          if (seguir) {
            this.preencherTabelaPrecoECarregarProdutos(row.codTpr)
            
            if (this.pedidoSelected && atualizar) {
              this.status = 'a_precos'
              this.atualizarPrecosCarrinho()
              this.status = ''
              this.fecharVenda = false
              this.gerarPedido = false
              await this.enviarVenda(false)
            }
          }
        }
      }
    },

    async preencherTabelaPrecoECarregarProdutos(codTpr) {
      this.ideTpr = codTpr
      this.codTpr = codTpr
      document.getElementsByTagName('body')[0].style.cursor = 'wait'
      this.status = 'b_produtos'
      await this.buscarProdutosTabela()
      this.status = ''
      this.focusProduto()
      document.getElementsByTagName('body')[0].style.cursor = 'auto'
    },

    async checarItensCarrinhoNovaTabela(codTpr) {
      let allProductsPresent = true
      await api.getProdutosTabelaPreco(codTpr)
      .then((response) => {
        const produtosTabela = response.data
        for(let i = 0; i < this.itensCarrinho.length; i++) {
          if (!produtosTabela.some(produto => produto.codPro === this.itensCarrinho[i].codPro 
                                    && produto.codDer === this.itensCarrinho[i].codDer)) {
            alert('Existem produtos no carrinho que não estão presentes na tabela de preço selecionada. Favor selecionar uma tabela válida!')
            allProductsPresent = false
            break
          }
        }
      })
      .catch((err) => {
        console.log(err)
        shared.handleRequestError(err)
      })
      return allProductsPresent
    },

    atualizarPrecosCarrinho() {
      this.itensCarrinho = []
      this.preencherItensPedido(this.pedidoSelected)
      this.preencherDadosDesconto(this.pedidoSelected)
    },

    async buscarProdutosTabela() {
      this.buscandoProdutos = true
      this.produtosTabelaPreco = []
      const codTpr = this.codTpr
      await api.getProdutosTabelaPreco(codTpr)
      .then(async (response) => {
        this.produtosTabelaPreco = response.data
      })
      .catch((err) => {
        console.log(err)
        shared.handleRequestError(err)
      })
      .finally(() => this.buscandoProdutos = false)
    },

    filtrarTabelasPreco(filter) {
      this.tabelasPrecoFiltrados = this.tabelasPreco.filter(tpr => (tpr.codTpr.toUpperCase().startsWith(filter.toUpperCase())))
      this.tableIndexTpr = 0

      shared.populateTabIndex(this.tabelasPrecoFiltrados)
    },

    openTabelasPrecoModal() {
      this.tabelasPrecoFiltro = this.ideTpr
      document.getElementById('btnBuscaTabelasPreco').click()
      const modalElement = document.getElementById('tabelasPrecoModal')
      modalElement.addEventListener('shown.bs.modal', () => {
        document.getElementById('inputTabelasPrecoFiltro').focus()
      })
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.focusTabelaPreco()
      })
    },

    focusTabelaPreco() {
      this.codTpr === '' ? document.getElementById('inputIdeTpr').focus() : document.getElementById('btnClearTpr').focus()
    },

    navegarModalTabelasPreco(key) {
      if (key.keyCode === 38) this.focusTableTpr(-1)
      else if (key.keyCode === 40) this.focusTableTpr(1)
      else if (key.keyCode === 13) this.tprListHit()
    },

    filtrarModalTabelasPreco(key) {
      if(key.keyCode !== 38 && key.keyCode !== 40 && key.keyCode !== 13)
        this.filtrarTabelasPreco(this.tabelasPrecoFiltro)
    },

    focusTableTpr(value) {
      this.tableIndexTpr += value
      if (this.tableIndexTpr < 0) 
        this.tableIndexTpr = 0
      else if (this.tableIndexTpr >= this.tabelasPrecoFiltrados.length)
        this.tableIndexTpr = (this.tabelasPrecoFiltrados.length - 1)

      let elementToScroll
      if (this.tableIndexTpr > 0)
        elementToScroll = document.getElementById('tabTpr' + this.tableIndexTpr)
      else 
        elementToScroll = document.getElementById('inputTabelasPrecoFiltro')
      
      this.scrollToElement(elementToScroll)
    },  

    tprListHit() {
      const tpr = this.tabelasPrecoFiltrados.find(tprFil => tprFil.tabIndex === this.tableIndexTpr)
      if (tpr) this.selectTabelaPreco(tpr, true)
    },

    /* Formas de Pagamento */
    async initFormasPagto() {
      if (!sessionStorage.getItem('formasPagto')) {
        await api.getFormasPagto()
        .then((response) => {
          this.formasPagto = response.data
          sessionStorage.setItem('formasPagto', JSON.stringify(this.formasPagto))
        })
        .catch((err) => {
          shared.handleRequestError(err)
          console.log(err)
        })
      } else {
        this.formasPagto = JSON.parse(sessionStorage.getItem('formasPagto'))
      }
    },

    /* Finalizar Venda */
    async initParams() {
      if (!sessionStorage.getItem('paramsPDV')) {
        await api.getUserParams()
        .then((response) => {
          this.paramsPDV = {
            codTpr: response.data.parametrosPDV.codTpr,
            dscTot: response.data.parametrosPDV.dscTot,
            depositos: response.data.parametrosPDV.depositos,
            ramos: response.data.parametrosPDV.ramos,
            depPad: response.data.parametrosPDV.codDep,
            codEmp: response.data.parametrosPDV.codEmp,
            codFil: response.data.parametrosPDV.codFil,
            nomEmp: response.data.parametrosPDV.nomEmp,
            nomFil: response.data.parametrosPDV.nomFil,
            nomUsu: response.data.parametrosPDV.nomUsu,
            codIp: response.data.parametrosPDV.codIp,
            indImp: response.data.parametrosPDV.indImp,
            qtdImp: response.data.parametrosPDV.qtdImp,
            codCli: response.data.parametrosPDV.codCli
          }
          this.initDepositos()
          sessionStorage.setItem('paramsPDV', JSON.stringify(this.paramsPDV))

        })
        .catch((err) => {
          shared.handleRequestError(err)
          console.log(err)
        })
      } else {
        this.paramsPDV = JSON.parse(sessionStorage.getItem('paramsPDV'))
        this.initDepositos()
      }
    },

    async triggerFinalizandoVenda(finalizandoVenda, fechar, gerarPedido) {
      this.finalizandoVenda = finalizandoVenda
      this.fecharVenda = fechar
      this.gerarPedido = gerarPedido
      if (this.isPedidoSelectedAndFechado()) {
        document.getElementById('btnOpenConfirmarNFCeModal').click()
      }
      else if (this.finalizandoVenda) {
        if (this.allFieldsArePopulated()) this.openFinalizarVendaModal()
        else this.finalizandoVenda = false
      }
    },

    async callNFCe(numPed) {
      document.getElementById('closeModalConfirmaNFCe').click()
      this.status = 'nfce'
      await this.gerarNFCe(numPed)
    },

    openFinalizarVendaModal() {
      this.pagamentos = []
      if (this.fecharVenda || this.gerarPedido) {
        this.valorPendente = this.vlrFinalNbr
        this.valorPago = 0
        this.confirmaVendaTitle = 'Processar pagamento'
        this.resetPagamento()
        document.getElementById('btnOpenFinalizarVendaModal').click()
        
        const modalElement = document.getElementById('confirmaVendaModal')
        modalElement.addEventListener('shown.bs.modal', () => {
          document.getElementById('selectFpg').focus()
        })
        modalElement.addEventListener('hidden.bs.modal', () => {
          this.focusProduto()
        })
      }
      else {
        this.confirmaVendaTitle = 'Confirmar orçamento'
        this.msgConfirmacao = 'Tem certeza que deseja inserir o pedido de orçamento?'
        document.getElementById('btnOpenInserirPedidoModal').click()
      }
    },

    attemptToFillCondicaoPagto() {
      this.aplicarDescontoFormaPagto() 
      if (this.formaSelecionada && this.formaSelecionada.condicoes && this.formaSelecionada.condicoes.length === 1) {
        this.condicaoSelecionada = this.formaSelecionada.condicoes[0]
        this.calcValorPagto()
      } else {
        this.condicaoSelecionada = null
        this.vlrPago = ''
      }
    },

    async calcValorPagto() { 
      this.valorParcial = this.valorPendente
      if (this.prcDescontoForma !== '') {
        this.valorDescontoParcial = await this.calcularDescontoAPI(this.valorParcial, (Number(this.prcDescontoForma.replace(',', '.')) / 100))
        this.valorDescontoParcial = shared.toMoneyString(this.valorDescontoParcial)
        this.valorParcial = this.valorParcial - this.valorDescontoParcial
      } else {
        this.valorDescontoParcial = 0
      }
      this.vlrPago = shared.toMoneyString(this.valorParcial).replace('R$', '').trim()
      this.vlrTroco = 'R$ 0,00'
      this.clearInputsCartao()
      this.focusValorPago()

      if (this.condicaoSelecionada.operadoras.length === 1) {
        this.cartao.cgcCpf = this.condicaoSelecionada.operadoras[0].cgcCpf
        const banOpe = this.condicaoSelecionada.operadoras[0].banOpe
        this.cartao.banOpe = ((banOpe) && (banOpe.length > 0)) ? banOpe : ''
      }

      if (this.isPagamentoCartao()) this.cartao.catTef = '0'
      else this.cartao.catTef = ''
    },

    focusValorPago() {
      const inputVlrPago = document.getElementById('inputVlrPago')
      inputVlrPago.disabled = false
      inputVlrPago.value = this.vlrPago
      inputVlrPago.focus()
      inputVlrPago.select()
    },

    handleInputValorPago (event) {
      if (event.key === 'Enter') {
        this.processarPagto()
      } else if(!this.isPagamentoDifferentThanDinheiro()) {
        this.calcularTroco()
      }
    },

    calcularTroco() {
      try {
        const vlrPago = document.getElementById('inputVlrPago').value
        const vlrPagoNbr = Number(vlrPago.replace('.', '').replace(',', '.'))
        const troco = (vlrPagoNbr - this.valorParcial)
        if (troco <= 0) this.vlrTroco = 'R$ 0,00' 
        else this.vlrTroco = shared.toMoneyString(troco)
      } catch (ex) {
        this.vlrTroco = 'R$ 0,00'  
      }
    },

    aplicarDescontoFormaPagto() {
      if(this.formaSelecionada.perDsc !== '0,00') {
        this.prcDescontoForma = this.formaSelecionada.perDsc
      } else {
        this.prcDescontoForma = ''
      }
    },

    isPagamentoCartao() {
      return this.formaSelecionada && ['1','2'].includes(this.formaSelecionada.tipInt) && !['30','31'].includes(this.formaSelecionada.tipFpg)
    },

    isPagamentoPIXQrCode() {
      return this.formaSelecionada && ['1','2'].includes(this.formaSelecionada.tipInt) && ['31'].includes(this.formaSelecionada.tipFpg)
    },

    isPagamentoDifferentThanDinheiro() {
      return this.formaSelecionada && this.formaSelecionada.tipFpg !== '01'
    },

    isPagamentoDinheiro() {
      return this.formaSelecionada && this.formaSelecionada.tipFpg === '01'
    },

    processarPagto() {
      if (!this.valorExcede()) {
        if((this.isPagamentoCartao() && this.confirmarDadosCartao()) || 
           (this.isPagamentoPIXQrCode() && this.confirmarDadosPIXQrCode()) ||
           (this.isPagamentoCartao() === false && this.isPagamentoPIXQrCode() === false)) {
          this.pagamentos.push({
            forma: this.formaSelecionada,
            condicao: this.condicaoSelecionada,
            valorPago: this.valorPagoNumber(),
            valorTroco: this.valorTrocoNumber(),
            valorDesconto: Number(this.valorDescontoParcial),
            valorTotalPago: shared.toMoneyThenNumber(this.valorPagoNumber() + Number(this.valorDescontoParcial)),
            banOpe: this.cartao.banOpe,
            cgcCre: this.cartao.cgcCpf,
            catTef: this.cartao.catTef,
            nsuTef: this.cartao.nsuTef,
          })
          this.resetPagamento()
          this.updateValorPendente()
          if (this.valorPendente > 0)
            document.getElementById('selectFpg').focus()
          else
            document.getElementById('btnProcessarVenda').disabled = false
            document.getElementById('btnProcessarVenda').focus()
        }
      }
    },

    resetPagamento() {
      this.formaSelecionada = null
      this.condicaoSelecionada = null
      this.vlrPago = ''
      this.prcDescontoForma = ''
      this.vlrTroco = 'R$ 0,00'
    },

    updateValorPendente() {
      shared.populateTabIndex(this.pagamentos)
      this.calcularValorPendente()
    },

    removerPagto(pagto) {
      this.pagamentos = this.pagamentos.filter(pagtoItem => pagtoItem !== pagto)
      this.updateValorPendente()
    },

    calcularValorPendente() {
      this.valorPendente = shared.toMoneyThenNumber(this.vlrFinalNbr)
      this.valorPago = 0
      this.pagamentos.forEach(pagto => {
        this.valorPendente -= pagto.valorTotalPago
        this.valorPago += pagto.valorTotalPago
        this.valorPendente = shared.toMoneyThenNumber(this.valorPendente)
        this.valorPago = shared.toMoneyThenNumber(this.valorPago)
      })
      this.valorPendente = shared.toMoneyThenNumber(this.valorPendente)
      this.valorPago = shared.toMoneyThenNumber(this.valorPago)
    },

    valorExcede() {
      if(this.isPagamentoDifferentThanDinheiro()) {
        const valorPagoTotal = shared.toMoneyThenNumber(this.valorPagoNumber() + Number(this.valorDescontoParcial))
        if (valorPagoTotal > shared.toMoneyThenNumber(this.valorPendente)) {
          alert('O valor pago não deve exceder o valor pendente!')
          return true
        }
      }
      return false
    },

    valorPagoNumber() {
      const vlrPago = document.getElementById('inputVlrPago').value
      const vlrPagoNbr = Number(vlrPago.replace('.', '').replace(',', '.'))
      // const vlrPagoNbr = shared.toMoneyThenNumber(vlrPago)
      // if (this.isPagamentoDinheiro() && vlrPagoNbr > this.valorPendente) return this.valorPendente
      if (this.isPagamentoDinheiro() && vlrPagoNbr > this.valorPendente) return shared.toMoneyThenNumber(this.valorPendente)
      return vlrPagoNbr
    },

    valorTrocoNumber() {
      return Number(this.vlrTroco.replace('R$', '').replace('.','').replace(',','.').trim())
    },

    async finalizarVenda() {
      if ((this.fecharVenda || this.gerarPedido) && this.valorPendente > 0) {
        alert('Favor informar o pagamento!')
      } else {
        document.getElementById('closeModalConfirmaVenda').click()
        await this.enviarVenda(true)
      }
    },  

    confirmarDadosCartao() {
      if (this.cartao.banOpe.trim() === '') {
        alert('Selecione a bandeira do cartão!')
        return false
      }
      else if (this.cartao.catTef.trim() === '') {
        alert('Preencha o número da autorização!') 
        return false
      }
      else if (this.cartao.nsuTef.trim() === '' && this.formaSelecionada.tipInt === '1') {
        alert('Preencha o número da transação (TEF)!') 
        return false
      }
      else if (this.isOperadoraMissing()) {
        alert('Selecione a operadora!') 
        return false
      }
      return true
    },

    confirmarDadosPIXQrCode() {
      if (this.isOperadoraMissing()) {
        alert('Selecione a operadora!') 
        return false
      }
      return true
    },

    isOperadoraMissing() {
      return this.condicaoSelecionada && this.cartao.cgcCpf === ''
    },

    calcularVlrDar() {
      let vlrDarParc = Number(((this.vlrFinalNbr - this.getVlrCarrinho())))
      this.pagamentos.forEach(pagto => {
        if(pagto.valorDesconto > 0) vlrDarParc -= pagto.valorDesconto
      })
      return shared.toMoneyString(vlrDarParc).replace('R$', '').replace('.','').replace(',','.').replace('- ','-').trim()
    },

    calcularVlrTro() {
      let vlrTroParc = 0
      this.pagamentos.forEach(pagto => {
        if(pagto.valorTroco > 0) vlrTroParc += pagto.valorTroco
      })
      return shared.toMoneyString(vlrTroParc).replace('R$', '').replace('.','').replace(',','.').trim()
    },

    async enviarVenda(limpar) {
      const itens = []
      this.itensCarrinho.forEach(item => {
        const itemPedido = {
          codPro: item.codPro,
          codDer: item.codDer,
          codTpr: item.codTpr,
          qtdPed: item.qtdPed,
          vlrTot: item.vlrTot,
          seqIpd: item.seqIpd,
          obsIpd: item.obsIpd,
          codDep: item.codDep,
          tnsPed: item.tnsPed,
          excluir: false
        }
        if (item.tipOpeVlrIpd === 'acrescimo') {
          itemPedido.vlrDsc = ''
          itemPedido.perDsc = ''
          itemPedido.perAcr = item.perDsc
        } else {
          itemPedido.vlrDsc = item.vlrDsc
          itemPedido.perDsc = item.perDsc
          itemPedido.perAcr = ''
        }
        itens.push(itemPedido)
      })
      this.enviarPedido(itens, limpar)
    },

    async enviarPedido(itens, limpar) {
      let pedido = null
      const vlrDar = this.calcularVlrDar()
      const vlrTro = this.calcularVlrTro()

      if (this.pedidoSelected && (this.fecharVenda || this.gerarPedido)) {
        pedido = {
          numPed: this.pedPrv,
          fechar: this.fecharVenda,
          gerar: this.gerarPedido,
          vlrTot: shared.toMoneyString(this.vlrFinalNbr).replace('R$', '').replace('.','').replace(',','.').trim(),
          vlrDar: vlrDar,
          vlrTro: vlrTro,
          pagamentos: this.pagamentos
        }
      } else {
        pedido = {
          numPed: !this.pedidoSelected ? '0' : this.pedPrv,
          codCli: this.codCli,
          codRep: this.codRep,
          itens: itens,
          fechar: this.fecharVenda,
          gerar: this.gerarPedido,
          vlrTot: shared.toMoneyString(this.vlrFinalNbr).replace('R$', '').replace('.','').replace(',','.').trim(),
          vlrDar: vlrDar,
          vlrTro: vlrTro,
          pagamentos: this.pagamentos,
          tnsPed: this.pedidoSelected ? this.pedidoSelected.codTns : ''
        }
      }
      
      document.getElementsByTagName('body')[0].style.cursor = 'wait'
      this.setEverythingDisabled('disable-on-sale', true)
      shared.toggleHeaderLinksDisabled(true)

      this.status = 'pedido'
      const operacao = this.pedidoSelected ? 'alterado' : 'criado'

      await api.putPedido(pedido)
        .then(async (response) => {
          const respostaPedido = response.data
          if (this.fecharVenda) {
            await this.callNFCe(respostaPedido.numPed)
          } else {
            document.getElementById('closeModalConfirmaVenda').click()
            if (limpar) {
              alert('Pedido ' + respostaPedido.numPed + ' ' + operacao + ' com sucesso!')
              this.limparCamposAposVenda()
            }
          }
        })
        .catch((err) => {
          shared.handleRequestError(err)
          console.log(err)
        })
        .finally(() => {
          document.getElementsByTagName('body')[0].style.cursor = 'auto'
          this.setEverythingDisabled('disable-on-sale', false)
          shared.toggleHeaderLinksDisabled(false)
          this.status = ''
        }) 
    },

    async gerarNFCe(numPed) {
      await api.putNFCe(numPed)
        .then((response) => {
          const resposta = response.data
          const msg = this.isPedidoSelectedAndFechado() ? 'NFC-e gerada: ' + resposta.nfce + '.' : 'Pedido ' + numPed + ' fechado com sucesso! NFC-e gerada: ' + resposta.nfce + '.'
          if (this.paramsPDV.indImp !== 'S') {
            this.limparCamposAposVenda()
            if(this.print) this.imprimirNfce(resposta.pdfFile, resposta.printer)
          } else {
            this.openImprimirNFCeModal(msg, resposta.pdfFile, resposta.printer)
          }
        })
        .catch((err) => {
          if(err.response.data.message.startsWith('ERRO')) {
            const msg = this.isPedidoSelectedAndFechado() ? 
              'Geração de NFC-e retornou o seguinte erro: \n' + err.response.data.message : 
              'Pedido ' + numPed + ' fechado com sucesso, mas geração de NFC-e retornou o seguinte erro: \n' + err.response.data.message
            alert(msg)
          } else shared.handleRequestError(err)
          console.log(err)
        })
        .finally(() => {
          document.getElementById('closeModalConfirmaVenda').click()
        })
    },

    openImprimirNFCeModal(msg, pdfFile, printer) {
      this.paramsConfirmacaoImpressao.msg = msg + ' Deseja imprimir a NFC-e?'
      this.paramsConfirmacaoImpressao.pdfFile = pdfFile
      this.paramsConfirmacaoImpressao.printer = printer
      
      document.getElementById('btnOpenConfirmarImpressaoModal').click()
      
      const modalElement = document.getElementById('confirmaImpressaoModal')
      modalElement.addEventListener('shown.bs.modal', () => {
        document.getElementById('btnConfirmaImpressao').focus()
      })
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.limparCamposAposVenda()
      })
    },

    callImpressao() {
      document.getElementById('closeModalConfirmaImpressao').click()
      this.imprimirNfce(this.paramsConfirmacaoImpressao.pdfFile, this.paramsConfirmacaoImpressao.printer)
    },

    limparCamposAposVenda() {
      this.clearAfterVenda()
      this.clearInputsCadCli()
      this.clearInputsCartao()
      this.limparDesconto(false)
      this.clearFocus()
      this.focusProduto()
    },
    
    // TODO: IF BASE64 WORKS, REMOVE THI
    // async imprimirNfce(pdf, printer) {
    //   await this.startQZConnection()

    //   const response = await api.getNFCe(pdf)
    //   const blob = new Blob([response.data], { type: 'application/pdf' })

    //   // Convert Blob to Base64
    //   const reader = new FileReader()
    //   reader.readAsDataURL(blob)
    //   reader.onloadend = async () => {
    //       const base64PDF = reader.result.split(",")[1] // Strip metadata
    //       const copies = this.paramsPDV.qtdImp && this.paramsPDV.qtdImp.trim() !== '' ? Number(this.paramsPDV.qtdImp.trim()) : 1
          
    //       // Configure the printer
    //       const config = qz.configs.create(printer, {copies: copies})

    //       // Send print job
    //       await qz.print(config, [{ type: "pdf", format: "base64", data: base64PDF }])
    //   }
    // },
    
    async imprimirNfce(pdf, printer) {
      await this.startQZConnection()

      const response = await api.getNFCeBase64(pdf)
      const base64 = this.base64ToByteArray(response.data)

      const copies = this.paramsPDV.qtdImp && this.paramsPDV.qtdImp.trim() !== '' ? Number(this.paramsPDV.qtdImp.trim()) : 1
      
      // Configure the printer
      const config = qz.configs.create(printer, {copies: copies})

      // Send print job
      await qz.print(config, [{ type: "pdf", format: "base64", data: base64 }])
    },

    base64ToByteArray(base64) {
        let binary = atob(base64)
        let len = binary.length
        let bytes = new Uint8Array(len)
        for (let i = 0; i < len; i++) {
            bytes[i] = binary.charCodeAt(i)
        }
        return bytes
    },

    isOnVenda() {
      return (this.status === 'pedido' || this.status === 'nfce')
    },

    allFieldsArePopulated() {
      if (this.isRepresentanteEmpty()) {
        alert('Favor informar um representante!')
        return false
      } else if (this.isTabelaPrecoEmpty()) {
        alert('Favor informar uma tabela de preço!')
        return false
      } else if (this.isCarrinhoEmpty()) {
        alert('Favor adicionar ao menos um item ao carrinho!')
        return false
      }
      return true
    },

    isRepresentanteEmpty() {
      return this.codRep === ''
    },

    isTabelaPrecoEmpty() {
      return this.codTpr === ''
    },

    isCarrinhoEmpty() {
      return (!this.itensCarrinho || !this.itensCarrinho.length)
    },

    async aplicarDesconto(atualizar) {
      if (this.isPedidoSelectedAndFechado() && atualizar) {
        this.showMsgPedidoFechado()
      } else if(this.tipDesc !== '') {
        const valorTmp = this.getVlrCarrinho()
        this.vlrDescPedido = this.tipDesc === 'valor' ? Number(this.vlrDesc.replace('.', '').replace(',', '.')) : await this.calcularDescontoAPI(valorTmp, Number(this.vlrDesc.replace(',', '.')) / 100)

        if (valorTmp < this.vlrDescPedido && this.tipOpeVlr === 'desconto') {
          alert('O desconto não pode ser maior que o valor total do pedido!')
          this.vlrDesc = ''
          this.vlrDescPedido = ''
          this.vlrFinalNbr = valorTmp
          atualizar = false
        } else if (this.tipOpeVlr === 'desconto' && this.descontoExcedeLimite(valorTmp)) {
          alert('O desconto não pode ser maior que o estipulado nos parâmetros, que é de ' + this.paramsPDV.dscTot + '% do valor da compra!')
          this.vlrDesc = ''
          this.vlrDescPedido = ''
          this.vlrFinalNbr = valorTmp
          atualizar = false
        } else {
          const vlrCalc = this.tipOpeVlr === 'desconto' ? valorTmp - this.vlrDescPedido : valorTmp + this.vlrDescPedido
          this.vlrComDesconto = shared.toMoneyString(vlrCalc)
          this.vlrFinalNbr = vlrCalc
          this.vlrFinal = this.vlrComDesconto
        }
      }

      if (this.pedidoSelected && atualizar) {
        this.fecharVenda = false
        this.gerarPedido = false
        const itens = []
        this.enviarPedido(itens, false)
      }
    },

    async calcularDescontoAPI(vlrPro, vlrDsc) {
      let vlrDesc = 0
      await api.calcularDesconto(vlrPro, vlrDsc)
      .then((response) => {
        vlrDesc = response.data
      })
      .catch((err) => {
        console.log(err)
        shared.handleRequestError(err)
      })
      return vlrDesc
    },

    async calcularItemComDescontoAPI(vlrPro, vlrDsc) {
      let vlrDesc = 0
      await api.calcularItemComDesconto(vlrPro, vlrDsc)
      .then((response) => {
        vlrDesc = response.data
      })
      .catch((err) => {
        console.log(err)
        shared.handleRequestError(err)
      })
      return vlrDesc
    },

    descontoExcedeLimite(vlrTmp) {
      if (this.paramsPDV.dscTot) {
        const percMax = Number(this.paramsPDV.dscTot.replace(',', '.'))
        if (percMax > 0) {
          const descMax = vlrTmp * percMax / 100
          if (this.vlrDescPedido > descMax) return true
          else return false
        } 
        else return false
      }
      return false
    },

    limparDesconto(atualizar) {
      if (this.isPedidoSelectedAndFechado() && atualizar) {
        this.showMsgPedidoFechado()
      } else {
        this.tipOpeVlr = 'desconto'
        this.vlrDesc = ''
        this.vlrComDesconto = ''
        this.vlrDescPedido = 0
        this.tipDesc = ''
        this.atualizarValorTotalCompra()

        if (this.pedidoSelected && atualizar) {
          this.fecharVenda = false
          this.gerarPedido = false
          const itens = []
          this.enviarPedido(itens, false)
        }
      }
    },

    /* Pedidos */
    async initPedidos() {
      const numPed = this.idePedPrv === '' ? null : this.idePedPrv
      const codCli = this.codCli === '' ? this.paramsPDV.codCli : this.codCli
      const codRep = this.codRep === '' ? null : this.codRep
      await api.getPedidos('TODOS', 'ABERTOS_FECHADOS', numPed, null, null, 'ASC', codCli, codRep, false)
      .then((response) => {
        this.pedidos = response.data
        this.preencherRepresentanteCliente()
        this.pedidosFiltrados = this.pedidos
        sessionStorage.setItem('pedidos', JSON.stringify(this.pedidos))
      })
      .catch((err) => {
        console.log(err)
        shared.handleRequestError(err)
      })
    },

    preencherRepresentanteCliente() {
      this.pedidos.forEach(ped => {
        if (ped.codRep) {
          const rep = this.representantes.find(repRow => repRow.codRep === ped.codRep)
          if(rep) ped.ideRep = ped.codRep + ' - ' + rep.nomRep
        }
        if (ped.codCli) {
          const cli = this.clientes.find(cliRow => cliRow.codCli === ped.codCli)
          if(cli) ped.ideCli = ped.codCli + ' - ' + cli.nomCli
        }
      })
    },

    clearPedido() {
      this.beginPedido()
      this.focusProduto()
    },

    async beginPedido() {
      this.pedidoSelected = null
      this.staPedSelected = ''
      this.idePedPrv = ''
      this.pedPrv = ''
      this.pedidosFiltro = ''
      this.pedidosFiltroCliente = ''
      this.pedidosFiltroRepresentante = ''

      this.clearInputsCadCli()
      this.clearInputsCartao()
      
      this.clearAfterVenda()
    },

    async searchPedidos() {
      document.getElementsByTagName('body')[0].style.cursor = 'wait'
      this.status = 'b_pedidos'
      this.pedidos = []
      await this.initPedidos()
      document.getElementsByTagName('body')[0].style.cursor = 'auto'
      this.status = ''
      this.filtrarPedidos(this.idePedPrv, '', '')
      if (this.pedidosFiltrados.length === 1) { // encontramos, selecionar
        this.selectPedido(this.pedidosFiltrados[0])
      } else { // nao encontramos, abrir modal
        this.openPedidosModal()
      }
    },

    selectPedido(row) {
      this.idePedPrv = row.numPed
      this.pedPrv = row.numPed
      this.pedidoSelected = row
      this.staPedSelected = row.staPed

      this.carregarInfoPedido(row)

      document.getElementById('closeModalPedidos').click()
    },

    showMsgPedidoFechado() {
      alert(this.msgPedidoFechado)
    },

    async carregarInfoPedido(pedido) {
      this.codRep = pedido.codRep
      this.ideRep = pedido.ideRep
      this.codCli = pedido.codCli
      this.ideCli = pedido.ideCli

      await this.carregarItensPedido(pedido)

      const depPad = this.depositos.find(dep => dep.codDep === pedido.itens[0].codDep)  
      if (this.depPad !== depPad) this.selectDeposito(depPad, false)

      const codTpr = pedido.itens[0].codTpr
      if (this.codTpr !== codTpr) await this.selectTabelaPreco({codTpr: codTpr}, false)
      
      this.preencherItensPedido(pedido)
      this.preencherDadosDesconto(pedido)
    },

    async carregarItensPedido(pedido) {
      await api.getPedidoDetalhes(pedido.numPed)
      .then((response) => {
        pedido.itens = response.data.itens
        pedido.parcelas = response.data.parcelas
      })
      .catch((err) => { 
        console.log(err)
        shared.handleRequestError(err)
      })
    },

    preencherItensPedido(pedido) {
      pedido.itens.forEach(item => {
        const prod = this.produtosTabelaPreco.find(pro => pro.codPro === item.codPro && pro.codDer === item.codDer)
        let tipOpeVlrIpd = ''
        let perDsc = ''
        if (Number(item.perAcr.replace(',','.')) > 0) {
          tipOpeVlrIpd = 'acrescimo'
          perDsc = item.perAcr
        } else {
          tipOpeVlrIpd = 'desconto'
          perDsc = item.perDsc
        }
        if(prod) this.selectProduto(prod, Number(item.qtdPed.replace(',','.')), item.seqIpd, item.obsIpd, tipOpeVlrIpd, item.tipDsc, item.vlrDsc, perDsc, false, item.codDep)
      })
    },

    preencherDadosDesconto(pedido) {
      if(pedido.vlrDar !== '0,00') {
        this.tipOpeVlr = pedido.vlrDar.includes('-') ? 'desconto' : 'acrescimo'
        const vlrDarTmp = pedido.vlrDar.replace('-', '')
        this.tipDesc = 'valor'
        this.vlrDesc = vlrDarTmp
     
        this.atualizarValorTotalCompra()
      }
    },

    filtrarPedidos(filterPed, filterCli, filterRep) {
      this.pedidosFiltrados = filterPed !== '' ? this.pedidos.filter(ped => (ped.numPed === filterPed)) : this.pedidos
      this.pedidosFiltrados = filterCli !== '' ? this.pedidosFiltrados.filter(ped => (ped.codCli === filterCli)) : this.pedidosFiltrados
      this.pedidosFiltrados = filterRep !== '' ? this.pedidosFiltrados.filter(ped => (ped.codRep === filterRep)) : this.pedidosFiltrados
      this.tableIndexPed = 0

      shared.populateTabIndex(this.pedidosFiltrados)
    },

    openPedidosModal() {
      this.pedidosFiltro = this.pedPrv
      document.getElementById('btnBuscaPedidos').click()
      const modalElement = document.getElementById('pedidosModal')
      modalElement.addEventListener('shown.bs.modal', () => {
        document.getElementById('inputPedidosFiltro').focus()
      })
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.focusPedido()
      })
    },

    focusPedido() {
      this.pedPrv === '' ? document.getElementById('inputPedPrv').focus() : document.getElementById('btnClearPed').focus()
    },

    navegarModalPedidos(key) {
      if (key.keyCode === 38) this.focusTablePed(-1)
      else if (key.keyCode === 40) this.focusTablePed(1)
      else if (key.keyCode === 13) this.pedListHit()
    },

    filtrarModalPedidos(key) {
      if(key.keyCode !== 38 && key.keyCode !== 40 && key.keyCode !== 13)
        this.filtrarPedidos(this.pedidosFiltro, this.pedidosFiltroCliente, this.pedidosFiltroRepresentante)
    },

    focusTablePed(value) {
      this.tableIndexPed += value
      if (this.tableIndexPed < 0) 
        this.tableIndexPed = 0
      else if (this.tableIndexPed >= this.pedidosFiltrados.length)
        this.tableIndexPed = (this.pedidosFiltrados.length - 1)

      let elementToScroll
      if (this.tableIndexPed > 0)
        elementToScroll = document.getElementById('tabPed' + this.tableIndexPed)
      else 
        elementToScroll = document.getElementById('inputPedidosFiltro')
      
      this.scrollToElement(elementToScroll)
    },  

    pedListHit() {
      const ped = this.pedidosFiltrados.find(pedFil => pedFil.tabIndex === this.tableIndexPed)
      this.selectPedido(ped)
    },

    isPedidoSelectedAndFechado() {
      return this.pedidoSelected && this.staPedSelected === 'FECHADO'
    },
  }
}
</script>

<style scoped src="../styles/general.css"></style>