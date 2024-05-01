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
        <div class="col-5">
          <span class="fw-bold subtitle">Pedido</span>
          <div class="row margin-y-fields">
            <div class="input-group input-group-sm">
              <span class="input-group-text">Pedido</span>
              <input autocomplete="off" id="inputPedPrv" class="form-control input-sale" type="text" v-on:keyup.enter="searchPedidos" v-model="idePedPrv"
                :disabled="!this.representantes.length || !this.clientes.length || !this.formasPagto.length || this.pedidoSelected || this.status === 'b_pedidos'"
                :placeholder="this.status === 'b_pedidos' ? 'Buscando pedidos ...' : ''">
              <button id="btnClearPed" :disabled="!this.pedidoSelected" class="btn btn-secondary input-group-btn disable-on-sale" @click="beginPedido"><font-awesome-icon icon="fa-circle-xmark"/></button>
              <button id="btnBuscaPedidos" class="btn-busca" data-bs-toggle="modal" data-bs-target="#pedidosModal">...</button>
            </div>
          </div>
          <span class="fw-bold subtitle">Identificação</span>
          <div class="row margin-y-fields">
            <div class="input-group input-group-sm">
              <span class="input-group-text">Representante</span>
              <input autocomplete="off" id="inputIdeRep" class="form-control input-sale" type="text" v-on:keyup.enter="searchRepresentantes" v-model="ideRep"
                :disabled="!this.representantes.length || this.codRep !== ''" :placeholder="!this.representantes.length ? 'Buscando representantes ...' : ''" :class="{searching: !this.representantes.length}">
              <button id="btnClearRep" :disabled="this.codRep === ''" class="btn btn-secondary input-group-btn disable-on-sale" @click="beginRepresentante"><font-awesome-icon icon="fa-circle-xmark"/></button>
              <button id="btnBuscaRepresentantes" class="btn-busca" data-bs-toggle="modal" data-bs-target="#representantesModal">...</button>
            </div>
          </div>
          <div class="row margin-y-fields">
            <div class="input-group input-group-sm">
              <span class="input-group-text">Tabela de Preço</span> 
              <input :disabled="this.codTpr !== ''" autocomplete="off" id="inputIdeTpr" class="form-control input-sale" type="text" v-on:keyup.enter="searchTabelasPreco" v-model="ideTpr">
              <button id="btnClearTpr" :disabled="this.codTpr === ''" class="btn btn-secondary input-group-btn disable-on-sale" @click="beginTabelasPreco"><font-awesome-icon icon="fa-circle-xmark"/></button>
              <button id="btnBuscaTabelasPreco" class="btn-busca" data-bs-toggle="modal" data-bs-target="#tabelasPrecoModal">...</button>
            </div>
          </div>
          <div class="row margin-y-fields">
            <div class="input-group input-group-sm">
              <span class="input-group-text">Cliente</span>
              <input autocomplete="off" id="inputIdeCli" class="form-control input-sale" type="text" v-on:keyup.enter="searchClientes" v-model="ideCli"
                :disabled="!this.clientes.length || this.codCli !== ''" :placeholder="(!this.clientes.length && this.codCli === '') ? 'Buscando clientes ...' : ''"
                :class="{searching: (!this.clientes.length && this.codCli === '')}">
              <button id="btnClearCli" :disabled="this.codCli === ''" class="btn btn-secondary input-group-btn disable-on-sale" @click="beginCliente"><font-awesome-icon icon="fa-circle-xmark"/></button>
              <button id="btnBuscaClientes" class="btn-busca" data-bs-toggle="modal" data-bs-target="#clientesModal">...</button>
            </div>
          </div>
          <div class="row margin-y-fields">
            <div class="input-group input-group-sm">
              <span class="input-group-text">Forma de Pagamento</span>
              <input autocomplete="off" id="inputIdeFpg" class="form-control input-sale" type="text" v-on:keyup.enter="searchFormasPagto" v-model="ideFpg"
                :disabled="!this.formasPagto.length || this.codFpg !== ''" :placeholder="!this.formasPagto.length ? 'Buscando formas de pagamento ...' : ''" :class="{searching: !this.formasPagto.length}">
              <button id="btnClearFpg" :disabled="this.codFpg === ''" class="btn btn-secondary input-group-btn disable-on-sale" @click="beginFormaPagto"><font-awesome-icon icon="fa-circle-xmark"/></button>
              <button id="btnBuscaFormasPagto" class="btn-busca" data-bs-toggle="modal" data-bs-target="#formasPagtoModal">...</button>
            </div>
          </div>
          <div class="row margin-y-fields">
            <div class="input-group input-group-sm">
              <span class="input-group-text">Condição de Pagamento</span>
              <input autocomplete="off" id="inputIdeCpg" class="form-control input-sale" type="text" v-on:keyup.enter="searchCondicoesPagto" v-model="ideCpg"
                :disabled="!this.formasPagto.length || this.codCpg !== ''" :placeholder="!this.formasPagto.length ? 'Buscando formas de pagamento ...' : ''" :class="{searching: !this.condicoesPagto.length}">
              <button id="btnClearCpg" :disabled="this.codCpg === ''" class="btn btn-secondary input-group-btn disable-on-sale" @click="beginCondicaoPagto"><font-awesome-icon icon="fa-circle-xmark"/></button>
              <button id="btnBuscaCondicoesPagto" class="btn-busca" data-bs-toggle="modal" data-bs-target="#condicoesPagtoModal">...</button>
            </div>
          </div>
        </div>
        <div class="col-7">
          <span class="fw-bold subtitle">Carrinho</span>
          <div class="row margin-y-fields">
            <div class="input-group input-group-sm">
              <span class="input-group-text">Produto</span>
              <input autocomplete="off" id="inputProduto" class="form-control input-sale" type="text" v-on:keyup.enter="searchProdutos" v-model="codBar"
                :disabled="this.codTpr === '' || !this.produtosTabelaPreco.length" :class="{searching: !this.produtosTabelaPreco.length}" 
                :placeholder=" this.codTpr === '' ? 'Selecione a tabela de preço' : 
                              !this.produtosTabelaPreco.length ? 'Buscando produtos da tabela de preço ...' : ''">
              <button id="btnBuscaProdutos" class="btn-busca" data-bs-toggle="modal" data-bs-target="#produtosModal">...</button>
            </div>
          </div>
          <div class="row table-wrapper border">
            <table class="table table-striped table-hover table-sm table-responsive table-items">
              <thead>
                <tr id="cart-head">
                  <th class="sm-header" style="width: 70%;"><small>Produto</small></th>
                  <th class="sm-header" style="width: 10%;"><small>Quantidade</small></th>
                  <th class="sm-header" style="width: 10%;"><small>Valor Unit.</small></th>
                  <th class="sm-header" style="width: 10%;"><small>Valor Total</small></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in itensCarrinho" :key="row.codPro + row.codDer">
                  <th :id="'tabCar' + row.tabIndex" :class="{active:row.tabIndex == this.tableIndexCar && this.editandoCarrinho}" class="fw-normal sm"><button :id="'btnDelete' + row.tabIndex" @click="removerItem(row)" class="btn btn-secondary btn-sm sm edit-cart disable-on-sale"><font-awesome-icon class="icon-cart" icon="fa-trash"/></button> {{ row.desPro }}</th>
                  <th :class="{active:row.tabIndex == this.tableIndexCar && this.editandoCarrinho}" class="fw-normal sm"><span>{{ row.qtdPed }}</span><button :id="'btnEdit' + row.tabIndex" @click="editarItem(row)" data-bs-toggle="modal" data-bs-target="#editarItemModal" class="btn btn-secondary btn-sm sm edit-cart disable-on-sale"><font-awesome-icon class="icon-cart" icon="fa-refresh"/></button></th>
                  <th :class="{active:row.tabIndex == this.tableIndexCar && this.editandoCarrinho}" class="fw-normal sm">{{ Number(row.preBas).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }}</th>
                  <th :class="{active:row.tabIndex == this.tableIndexCar && this.editandoCarrinho}" class="fw-normal sm">{{ Number(row.vlrTot).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }}</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="row margin-y-fields">
            <div class="col-6">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Valor Total</span>
                <input class="form-control" disabled v-model="vlrTot">
              </div>
            </div>
          </div>
          <div class="row margin-y-fields">
            <div class="col-6">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Desconto</span>
                <select :disabled="!this.itensCarrinho.length" @change="vlrDesc=''" class="form-select disable-on-sale" v-model="tipDesc" id="selectTipDesc">
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
                <span class="input-group-text">Valor com desconto</span>
                <input class="form-control" disabled v-model="vlrComDesconto">
              </div>  
            </div>
          </div>
          <div class="row margin-y-fields">
            <div class="col">
              <div class="float-end mx-2">
                <button id="btnFinalizarVenda" class="btn btn-secondary disable-on-sale" @click="triggerFinalizandoVenda(true, true)" :disabled="!this.itensCarrinho.length">Finalizar Venda</button>
                <button id="btnOpenFinalizarVendaModal" class="btn-busca" data-bs-toggle="modal" data-bs-target="#confirmaVendaModal">.</button>
              </div>
              <div class="float-end mx-2">
                <button id="btnInserirPedido" class="btn btn-secondary disable-on-sale" @click="triggerFinalizandoVenda(true, false)" v-if="!this.pedidoSelected" :disabled="!this.itensCarrinho.length">Inserir Pedido</button>
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
    <div class="modal-dialog modal-dialog-scrollable modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="clientesModalLabel">Clientes</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalClientes"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3" v-if="clientes != null">
            <input type="text" autocomplete="off" class="form-control mb-3" id="inputClientesFiltro" v-on:keydown="navegarModalClientes" v-on:keyup="filtrarModalClientes" v-model="clientesFiltro" placeholder="Digite para buscar o cliente abaixo">
            <table class="table table-striped table-hover table-bordered table-sm table-responsive">
              <thead>
                <tr>
                  <th class="sm-header" scope="col" style="width: 10%;">Código</th>
                  <th class="sm-header" scope="col" style="width: 30%;">Nome</th>
                  <th class="sm-header" scope="col" style="width: 30%;">Apelido</th>
                  <th class="sm-header" scope="col" style="width: 30%;">CPF/CNPJ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in clientesFiltrados" :key="row.tabIndex" class="mouseHover row-modal" @click="selectCliente(row)">
                  <th :id="'tabCli' + row.tabIndex" :class="{active:row.tabIndex == this.tableIndexCli}" class="fw-normal sm" scope="row">{{ row.codCli }}</th>
                  <th :class="{active:row.tabIndex == this.tableIndexCli}" class="fw-normal sm">{{ row.nomCli }}</th>
                  <th :class="{active:row.tabIndex == this.tableIndexCli}" class="fw-normal sm">{{ row.apeCli }}</th>
                  <th :class="{active:row.tabIndex == this.tableIndexCli}" class="fw-normal sm">{{ row.cgcCpf }}</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else>
            <label>Buscando Clientes ...</label>
          </div>
        </div>
        <div class="modal-footer">
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
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalCadastroClientes"></button>
        </div>
        <div class="modal-body">
          <div class="row mb-2">
            <div class="col-4">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Tipo</span>
                <select @change="cadCliCgcCpf=''" class="form-select" v-model="cadCliTipCli" id="selectTipCli">
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
                <vue-mask v-if="cadCliTipCli !== 'J'" class="form-control" mask="000.000.000-00" :raw="false" :options="options" v-model="cadCliCgcCpf"></vue-mask>
                <vue-mask v-else class="form-control" mask="00.000.000/0000-00" :raw="false" :options="options" v-model="cadCliCgcCpf"></vue-mask>
                <span class="mandatory">&nbsp;&nbsp;*</span>
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="input-group input-group-sm">
              <span class="input-group-text">Nome</span>
              <input autocomplete="off" class="form-control" type="text" v-model="cadCliNomCli">  
              <span class="mandatory">&nbsp;&nbsp;*</span>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-3">
              <div class="input-group input-group-sm">
                <span class="input-group-text">CEP</span>
                <vue-mask class="form-control" mask="00000-000" :raw="false" :options="options" v-model="cadCliCepCli"></vue-mask>
              </div>
            </div>
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Endereço</span>
                <input autocomplete="off" class="form-control" type="text" v-model="cadCliEndCli">  
                <span class="mandatory">&nbsp;&nbsp;*</span>
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-3">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Número</span>
                <input autocomplete="off" class="form-control" v-model="cadCliNenCli" maxLength="5"
                  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength); if(event.key==='.' || event.key===','){event.preventDefault()};">
              </div> 
            </div>
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Complemento</span>
                <input autocomplete="off" class="form-control" type="text" v-model="cadCliCplEnd">  
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Bairro</span>
                <input autocomplete="off" class="form-control" type="text" v-model="cadCliBaiCli"> 
                <span class="mandatory">&nbsp;&nbsp;*</span>
              </div> 
            </div>
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Cidade</span>
                <input autocomplete="off" class="form-control" type="text" v-model="cadCliCidCli">  
                <span class="mandatory">&nbsp;&nbsp;*</span>
              </div>
            </div>
            <div class="col-4">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Estado</span>
                <select class="form-select" v-model="cadCliSigUfs" id="selectSigUfs">
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
                <vue-mask class="form-control" mask="00 00000-0000" :raw="false" :options="options" v-model="cadCliFonCli"></vue-mask>
              </div> 
            </div>
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">E-mail</span>
                <input autocomplete="off" class="form-control" type="text" v-model="cadCliEmaCli"> 
              </div> 
            </div>
          </div>
        </div>
        <div class="row mx-2 mb-2">
          <span class="mandatory">Os campos marcados com * são obrigatórios.</span>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" @click="cadastrarCliente">Cadastrar</button>
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
            <table class="table table-striped table-hover table-bordered table-sm table-responsive">
              <thead>
                <tr>
                  <th class="sm-header" scope="col" style="width: 20%;">Código</th>
                  <th class="sm-header" scope="col" style="width: 10%;">Derivação</th>
                  <th class="sm-header" scope="col" style="width: 70%;">Descrição</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in produtosFiltrados" :key="row.tabIndex" class="mouseHover row-modal" @click="selectProduto(row, 1, 0, true)">
                  <th :id="'tabPro' + row.tabIndex" :class="{active:row.tabIndex == this.tableIndexPro}" class="fw-normal sm" scope="row">{{ row.codPro }}</th>
                  <th :class="{active:row.tabIndex == this.tableIndexPro}" class="fw-normal sm">{{ row.codDer }}</th>
                  <th :class="{active:row.tabIndex == this.tableIndexPro}" class="fw-normal sm">{{ row.desPro }}</th>
                </tr>
              </tbody>
            </table>
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

  <!-- Modal Condicoes Pagto -->
  <div class="modal fade" id="condicoesPagtoModal" tabindex="-1" aria-labelledby="condicoesPagtoModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="condicoesPagtoModalLabel">Condições de Pagamento</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalCondicoesPagto"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3" v-if="condicoesPagto != null">
            <input type="text" autocomplete="off" class="form-control mb-3" id="inputCondicoesPagtoFiltro" v-on:keydown="navegarModalCondicoesPagto" v-on:keyup="filtrarModalCondicoesPagto" v-model="condicoesPagtoFiltro" placeholder="Digite para buscar a condição de pagamento abaixo">
            <table class="table table-striped table-hover table-bordered table-sm table-responsive">
              <thead>
                <tr>
                  <th class="sm-header" scope="col" style="width: 20%;">Código</th>
                  <th class="sm-header" scope="col" style="width: 50%;">Abreviação</th>
                  <th class="sm-header" scope="col" style="width: 30%;">Descrição</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in condicoesPagtoFiltrados" :key="row.tabIndex" class="mouseHover row-modal" @click="selectCondicaoPagto(row, true)">
                  <th :id="'tabCpg' + row.tabIndex" :class="{active:row.tabIndex == this.tableIndexCpg}" class="fw-normal sm" scope="row">{{ row.codCpg }}</th>
                  <th :class="{active:row.tabIndex == this.tableIndexCpg}" class="fw-normal sm">{{ row.abrCpg }}</th>
                  <th :class="{active:row.tabIndex == this.tableIndexCpg}" class="fw-normal sm">{{ row.desCpg }}</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else>
            <label>Buscando Condições de Pagamento ...</label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Fechar</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Formas Pagto -->
  <div class="modal fade" id="formasPagtoModal" tabindex="-1" aria-labelledby="formasPagtoModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="formasPagtoModalLabel">Formas de Pagamento</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalFormasPagto"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3" v-if="formasPagto != null">
            <input type="text" autocomplete="off" class="form-control mb-3" id="inputFormasPagtoFiltro" v-on:keydown="navegarModalFormasPagto" v-on:keyup="filtrarModalFormasPagto" v-model="formasPagtoFiltro" placeholder="Digite para buscar a forma de pagamento abaixo">
            <table class="table table-striped table-hover table-bordered table-sm table-responsive">
              <thead>
                <tr>
                  <th class="sm-header" scope="col" style="width: 20%;">Código</th>
                  <th class="sm-header" scope="col" style="width: 50%;">Abreviação</th>
                  <th class="sm-header" scope="col" style="width: 30%;">Descrição</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in formasPagtoFiltrados" :key="row.tabIndex" class="mouseHover row-modal" @click="selectFormaPagto(row, true)">
                  <th :id="'tabFpg' + row.tabIndex" :class="{active:row.tabIndex == this.tableIndexFpg}" class="fw-normal sm" scope="row">{{ row.codFpg }}</th>
                  <th :class="{active:row.tabIndex == this.tableIndexFpg}" class="fw-normal sm">{{ row.abrFpg }}</th>
                  <th :class="{active:row.tabIndex == this.tableIndexFpg}" class="fw-normal sm">{{ row.desFpg }}</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else>
            <label>Buscando Formas de Pagamento ...</label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Fechar</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Gerar Pedido -->
  <div class="modal fade" id="confirmaVendaModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Confirma venda</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalConfirmaVenda"></button>
        </div>
        <div class="modal-body">
          <p>{{ this.msgConfirmacao }}</p>
          <p v-if="this.codCli === ''"><i>Aviso: nenhum cliente foi selecionado. O pedido será gerado com o cliente padrão.</i></p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="finalizarVenda">Sim</button>
          <button type="button" id="btnCartao" class="btn-busca" data-bs-toggle="modal" data-bs-target="#cartaoModal"></button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Não</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Opções teclado -->
  <div class="modal fade" id="atalhosModal" tabindex="-1" aria-labelledby="atalhosModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-sm">
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
                  <th class="sm-header" scope="col" style="width: 10%;">Tecla</th>
                  <th class="sm-header" scope="col" style="width: 90%;">Ação</th>
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

  <!-- Modal Informações Cartão -->
  <div class="modal fade" id="cartaoModal" tabindex="-1" aria-labelledby="cartaoModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="cartaoModalLabel">Informações Cartão</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalCartao"></button>
        </div>
        <div class="modal-body">
          <div class="row mb-2">
            <div class="input-group input-group-sm">
              <span class="input-group-text">Bandeira</span>
              <select class="form-select" v-model="cartao.banOpe" id="selectBanOpe">
                <option selected disabled value="" >Selecione</option>
                <option v-for="row in cartoes" :key="row.codBan" :value="row.codBan">{{ row.codBan }} - {{ row.desBan }}</option>
              </select>
            </div>
          </div>
          <div class="row mb-2">
            <div class="input-group input-group-sm">
              <span class="input-group-text">Número da Autorização de Transação</span>
              <input autocomplete="off" class="form-control" type="text" v-model="cartao.catTef">  
            </div>
          </div>
          <div class="row mb-2" v-if="this.formaSelected && this.formaSelected.tipInt === '1'">
            <div class="input-group input-group-sm">
              <span class="input-group-text">Número da Transação (TEF)</span>
              <input autocomplete="off" class="form-control" type="text" v-model="cartao.nsuTef">  
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" @click="confirmarDadosCartao">Confirmar</button>
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
            <input type="text" autocomplete="off" class="form-control mb-3" id="inputPedidosFiltro" v-on:keydown="navegarModalPedidos" v-on:keyup="filtrarModalPedidos" v-model="pedidosFiltro" placeholder="Digite para buscar o pedido abaixo">
            <table class="table table-striped table-hover table-bordered table-sm table-responsive">
              <thead>
                <tr>
                  <th class="sm-header" scope="col" style="width: 15%;">Número</th>
                  <th class="sm-header" scope="col" style="width: 15%;">Data de Emissão</th>
                  <th class="sm-header" scope="col" style="width: 35%;">Representante</th>
                  <th class="sm-header" scope="col" style="width: 35%;">Cliente</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in pedidosFiltrados" :key="row.tabIndex" class="mouseHover row-modal" @click="selectPedido(row)">
                  <th :id="'tabPed' + row.tabIndex" :class="{active:row.tabIndex == this.tableIndexPed}" class="fw-normal sm" scope="row">{{ row.numPed }}</th>
                  <th :class="{active:row.tabIndex == this.tableIndexPed}" class="fw-normal sm">{{ row.datEmi }}</th>
                  <th :class="{active:row.tabIndex == this.tableIndexPed}" class="fw-normal sm">{{ row.ideRep }}</th>
                  <th :class="{active:row.tabIndex == this.tableIndexPed}" class="fw-normal sm">{{ row.ideCli }}</th>
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

</template>

<script>
import Navbar from '../components/Navbar.vue'
import api from '../utils/api'
import shared from '../utils/sharedFunctions'
import vueMask from 'vue-jquery-mask'

export default {
  name: 'Venda',
  components: { Navbar, vueMask },
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

      //cadastro clientes
      cadCliTipCli: '',
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
      itemEditando: null,
      
      //tabelas preco
      ideTpr: '',
      codTpr: '',
      tabelasPreco: [],
      produtosTabelaPreco: [],
      tabelasPrecoFiltro: '',
      tabelasPrecoFiltrados: [],
      tableIndexTpr: 0,
      
      //condicoes de pagamento
      ideCpg: '',
      codCpg: '',
      condicaoSelected: null,
      condicoesPagto: [],
      condicoesPagtoFiltro: '',
      condicoesPagtoFiltrados: [],
      tableIndexCpg: 0,
      
      //formas de pagamento
      ideFpg: '',
      codFpg: '',
      formaSelected: null,
      formasPagto: [],
      formasPagtoFiltro: '',
      formasPagtoFiltrados: [],
      tableIndexFpg: 0,

      //venda
      finalizandoVenda: false,
      paramsPDV: { codTpr: '' },
      vlrTot: 'R$ 0,00',
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
        banOpe: '',
        catTef: '',
        nsuTef: '',
      },
      fecharVenda: false,
      msgConfirmacao: '',
      tipDesc: '',
      vlrDesc: '',
      vlrDescPedido: 0,
      vlrComDesconto: '',

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
        { codAta: 0, tecAta: 'A', desAta: 'Pedido' },
        { codAta: 1, tecAta: 'R', desAta: 'Representante' },
        { codAta: 2, tecAta: 'T', desAta: 'Tabela de Preço' },
        { codAta: 3, tecAta: 'C', desAta: 'Cliente' },
        { codAta: 4, tecAta: 'F', desAta: 'Forma de Pagamento' },
        { codAta: 5, tecAta: 'O', desAta: 'Condição de Pagamento' },
        { codAta: 6, tecAta: 'P', desAta: 'Produto' },
        { codAta: 7, tecAta: 'E', desAta: 'Editar carrinho' },
        { codAta: 8, tecAta: 'Q', desAta: 'Alterar Quantidade do Item' },
        { codAta: 9, tecAta: 'Delete', desAta: 'Remover Item' },
        { codAta: 10, tecAta: 'D', desAta: 'Desconto' },
        { codAta: 11, tecAta: 'I', desAta: 'Inserir Pedido' },
        { codAta: 12, tecAta: 'X', desAta: 'Finalizar Venda' }
      ],

      //Pedidos
      idePedPrv: '',
      pedPrv: '',
      pedidos: [],
      pedidosFiltro: '',
      pedidosFiltrados: [],
      tableIndexPed: 0,
      pedidoSelected: null
    }
  },
  mounted () {
    if (!sessionStorage.getItem('token')) {
      this.$router.push({ name: 'Login' })
    } else {
      this.initEverything()
      this.addEvents()
    }
  },
  methods: {
    async initEverything() {
      this.status = 'b_representantes'
      await this.initRepresentantes()    
      this.status = 'b_clientes'
      await this.initClientes()    
      this.status = 'b_formas'
      await this.initFormasPagto()    
      this.initParams()  
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
    },
    clearAllLists() {
      this.representantes = []
      this.tabelasPreco = []
      this.clientes = []
      this.condicoesPagto = []
      this.formasPagto = []
      this.produtosTabelaPreco = []
      this.itensCarrinho = []
      this.pedidos = []
    },
    clearAllInputs() {
      this.idePedPrv = ''
      this.pedPrv = ''
      this.pedidoSelected = null
      this.pedidosFiltro = ''
      this.ideRep = ''
      this.codRep = ''
      this.representantesFiltro = ''
      this.ideCli = ''
      this.codCli = ''
      this.clientesFiltro = ''
      this.codBar = ''
      this.produtosFiltro = ''
      this.itensCarrinho = []
      this.ideTpr = ''
      this.codTpr = ''
      this.tabelasPrecoFiltro = ''
      this.ideCpg = ''
      this.codCpg = ''
      this.condicaoSelected = null
      this.condicoesPagtoFiltro = ''
      this.ideFpg = ''
      this.codFpg = ''
      this.formaSelected = null
      this.formasPagtoFiltro = ''
      this.vlrTot = 'R$ 0,00'
      this.status = ''
      this.limparDesconto(false)
    },
    clearInputsCadCli() {
      document.getElementById('selectTipCli').selectedIndex = "0";
      document.getElementById('selectSigUfs').selectedIndex = "0";
      this.cadCliTipCli = ''
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
      document.getElementById('selectBanOpe').selectedIndex = "0";
      this.cartao.banOpe = ''
      this.cartao.catTef = ''
      this.cartao.nsuTef = ''
    },
    setEverythingDisabled(value) {
      const elements = document.getElementsByClassName('disable-on-sale')
      for (var i = 0; i < elements.length; i++) elements[i].disabled = value
    },
    addEvents() {
      let self = this
      window.addEventListener('keyup', function(ev) {
          self.handleOption(ev)
      });
      window.addEventListener('keydown', function(ev) {
          self.handleNavigation(ev)
      });

      const inputIdeRep = document.getElementById('inputIdeRep')
      inputIdeRep.addEventListener('focus', (event) => {
        this.editandoCarrinho = false
        this.beginRepresentante()
      });

      const inputIdeCli = document.getElementById('inputIdeCli')
      inputIdeCli.addEventListener('focus', (event) => {
        this.editandoCarrinho = false
        this.beginCliente()
      });

      const inputProdutos = document.getElementById('inputProduto')
      inputProdutos.addEventListener('focus', (event) => {
        this.editandoCarrinho = false
        this.beginProduto()
      });

      const inputIdeTpr = document.getElementById('inputIdeTpr')
      inputIdeTpr.addEventListener('focus', (event) => {
        this.editandoCarrinho = false
        this.beginTabelasPreco()
      });

      const inputIdeCpg = document.getElementById('inputIdeCpg')
      inputIdeCpg.addEventListener('focus', (event) => {
        this.editandoCarrinho = false
        this.beginCondicaoPagto()
      });

      const inputIdeFpg = document.getElementById('inputIdeFpg')
      inputIdeFpg.addEventListener('focus', (event) => {
        this.editandoCarrinho = false
        this.beginFormaPagto()
      });

      const inputPedPrv = document.getElementById('inputPedPrv')
      inputPedPrv.addEventListener('focus', (event) => {
        this.editandoCarrinho = false
        this.beginPedido()
      });

      const modalFinalizarVenda = document.getElementById('confirmaVendaModal')
      modalFinalizarVenda.addEventListener('focusout', (event) => {
        this.triggerFinalizandoVenda(false, this.fecharVenda)
      });
    },

    async handleOption(event) {
      if (sessionStorage.getItem('form') === 'Venda') {
        if(this.noInputIsFocused() && !this.editandoCarrinho) {
          if (event.key.toUpperCase() === 'R') this.focusRepresentante()
          else if (event.key.toUpperCase() === 'C') this.focusCliente()
          else if (event.key.toUpperCase() === 'P') this.focusProduto()
          else if (event.key.toUpperCase() === 'T') this.focusTabelaPreco()
          else if (event.key.toUpperCase() === 'O') this.focusCondicaoPagto()
          else if (event.key.toUpperCase() === 'F') this.focusFormaPagto()
          else if (event.key.toUpperCase() === 'A') this.focusPedido()
          else if (event.key.toUpperCase() === 'X') document.getElementById('btnFinalizarVenda').click()
          else if (event.key.toUpperCase() === 'I') document.getElementById('btnInserirPedido').click()
          else if (event.key.toUpperCase() === 'D') document.getElementById('selectTipDesc').focus()
          else if (event.key.toUpperCase() === 'E') {
            if (this.itensCarrinho.length > 0) { 
              this.editarCarrinho()
            }
            else {
              alert('Carrinho vazio!')
            }
          }
        } else {
          if (event.key === 'Escape') this.clearFocus()
        }

        if (this.editandoCarrinho) {
          if (event.key.toUpperCase() === 'Q') document.getElementById('btnEdit' + this.tableIndexCar).click()
          if (event.key === 'Delete') document.getElementById('btnDelete' + this.tableIndexCar).click()
        }

        if (this.finalizandoVenda) {
          if (event.key === 'Enter') {
            await this.finalizarVenda()
          }
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

    populateTabIndex(list) {
      let index = 0
      list.forEach(item => {
        item.tabIndex = index
        index++
      })
    },

    scrollToElement(element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      })
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
        if (this.tabelasPreco.length === 1) this.selectTabelaPreco(this.tabelasPreco[0], true)
        else if (this.pedidoSelected) alert('Para atualizar o pedido de orçamento, selecione uma tabela de preços')
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

      this.populateTabIndex(this.representantesFiltrados)
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

    /* Clientes */
    async initClientes() {
      if (!sessionStorage.getItem('clientes')) {
        await api.getClientes()
        .then((response) => {
          this.clientes = response.data
          this.clientesFiltrados = this.clientes
          sessionStorage.setItem('clientes', JSON.stringify(this.clientes))
        })
        .catch((err) => {
          console.log(err)
          shared.handleRequestError(err)
        })
      } else {
        this.clientes = JSON.parse(sessionStorage.getItem('clientes'))
        this.clientesFiltrados = this.clientes
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
        this.selectCliente(this.clientesFiltrados[0])
      } else { // nao encontramos, abrir modal
        this.openClientesModal()
      }
    },

    async selectCliente(row) {
      this.ideCli = row.nomCli
      this.codCli = row.codCli
      document.getElementById('closeModalClientes').click()
      if (this.pedidoSelected) {
        this.fecharVenda = false
        await this.enviarVenda(false)
      }
    },

    filtrarClientes(filter) {
      this.clientesFiltrados = this.clientes.filter(cli => (cli.codCli === filter ||
                  cli.nomCli.toUpperCase().includes(filter.toUpperCase()) ||
                  cli.apeCli.toUpperCase().includes(filter.toUpperCase()) ||
                  cli.cgcCpf.startsWith(filter)))
      this.tableIndexCli = 0

      this.populateTabIndex(this.clientesFiltrados)
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
      if (key.keyCode === 38) this.focusTableCli(-1)
      else if (key.keyCode === 40) this.focusTableCli(1)
      else if (key.keyCode === 13) this.cliListHit()
    },

    filtrarModalClientes(key) {
      if(key.keyCode !== 38 && key.keyCode !== 40 && key.keyCode !== 13)
        this.filtrarClientes(this.clientesFiltro)
    },

    focusTableCli(value) {
      this.tableIndexCli += value
      if (this.tableIndexCli < 0) 
        this.tableIndexCli = 0
      else if (this.tableIndexCli >= this.clientesFiltrados.length)
        this.tableIndexCli = (this.clientesFiltrados.length - 1)

      let elementToScroll
      if (this.tableIndexCli > 0)
        elementToScroll = document.getElementById('tabCli' + this.tableIndexCli)
      else 
        elementToScroll = document.getElementById('inputClientesFiltro')
      
      this.scrollToElement(elementToScroll)
    },  

    cliListHit() {
      const cli = this.clientesFiltrados.find(cliFil => cliFil.tabIndex === this.tableIndexCli)
      this.selectCliente(cli)
    },

    habilitarCadastroCliente() {
      document.getElementById('closeModalClientes').click()
      this.clearInputsCadCli()

      if(this.isRepresentanteEmpty()) {
        alert('Para cadastrar um novo cliente, é necessário informar o representante!')
        document.getElementById('inputIdeRep').focus()
      } else {
        document.getElementById('btnCadastrarNovoCliente').click()
        const modalElement = document.getElementById('cadastroClientesModal')
        modalElement.addEventListener('shown.bs.modal', () => {
          document.getElementById('selectTipCli').focus()
        })
      }
    },

    async cadastrarCliente() {
      if(this.validarCamposCliente()) {
        const cliente = {
          tipCli: this.cadCliTipCli,
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
        await api.putCliente(cliente)
          .then((response) => {
            alert('Cliente cadastrado com sucesso.')         
            document.getElementById('closeModalCadastroClientes').click()
            this.clearInputsCadCli()
            this.clientes = []
            sessionStorage.removeItem('clientes')
            this.beginCliente()
            
            const newCli = {
              codCli: response.data.codCli,
              nomCli: cliente.nomCli.toUpperCase()
            }
            this.selectCliente(newCli)
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
          })
      }
    },

    validarCamposCliente() {
      if (this.cadCliTipCli === '') {
        alert('É necessário informar o tipo de cliente!')
        return false
      }
      else if (this.cadCliCgcCpf === '') {
        alert('É necessário informar o CPF/CNPJ!')
        return false
      }
      else if (this.cadCliNomCli === '') {
        alert('É necessário informar o Nome!')
        return false
      }
      else if (this.cadCliEndCli === '') {
        alert('É necessário informar o Endereco!')
        return false
      }
      else if (this.cadCliBaiCli === '') {
        alert('É necessário informar o Bairro!')
        return false
      }
      else if (this.cadCliCidCli === '') {
        alert('É necessário informar a Cidade!')
        return false
      }
      else if (this.cadCliSigUfs === '') {
        alert('É necessário informar o Estado!')
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
      this.filtrarProdutos(this.codBar)
      if (this.produtosFiltrados.length === 1) { // encontramos, selecionar
        this.selectProduto(this.produtosFiltrados[0], 1, 0, true)
      } else { // nao encontramos, abrir modal
        this.openProdutosModal()
      }
    },

    async selectProduto(row, qtde, seqIpd, atualizar) {
      document.getElementById('closeModalProdutos').click()
      const newItem = Object.create(row)
      const itemDoCarrinho = this.itensCarrinho.find(itemCar => itemCar.codPro === newItem.codPro && itemCar.codDer === newItem.codDer)
      if (itemDoCarrinho)  {
        itemDoCarrinho.qtdPed += qtde
        this.definirPreco(itemDoCarrinho)
      }
      else {
        newItem.qtdPed = qtde
        newItem.seqIpd = seqIpd
        this.definirPreco(newItem)
        if (newItem.preBas > 0) {
          this.itensCarrinho.push(newItem)
        }
      }

      this.codBar = ''
      document.getElementById('inputProduto').focus()
      this.populateTabIndex(this.itensCarrinho)
      this.atualizarValorTotalCompra()

      if (this.pedidoSelected && atualizar) {
        this.fecharVenda = false
        await this.enviarVenda(false)
        this.itensCarrinho[this.itensCarrinho.length - 1].seqIpd = this.itensCarrinho.length
      }
    },

    definirPreco(produto) {
      let preBas = null
      produto.faixasPreco.every(faixa => {
        if (produto.qtdPed <= faixa.qtdMax) {
          preBas = faixa.preBas
          const vlrTot = Number(preBas) * Number(produto.qtdPed)
          produto.preBas = preBas
          produto.vlrTot = vlrTot
        }
        if (preBas !== null) return false
        return true
      })

      if (preBas === null) {
        produto.preBas = 0
        produto.vlrTot = 0
        alert ('Preço não encontrado para quantidade comprada.')
      }
    },

    atualizarValorTotalCompra() {
      this.vlrTot = Number(this.itensCarrinho.map(item => item.vlrTot).reduce((prev, curr) => prev + curr, 0))
                  .toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
      if (this.tipDesc !== '') {
        this.aplicarDesconto(false)
      }
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
      this.populateTabIndex(this.produtosFiltrados)
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
      if (key.keyCode === 38) this.focusTablePro(-1)
      else if (key.keyCode === 40) this.focusTablePro(1)
      else if (key.keyCode === 13) this.proListHit()
    },

    filtrarModalProdutos(key) {
      if(key.keyCode !== 38 && key.keyCode !== 40 && key.keyCode !== 13)
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
      const pro = this.produtosFiltrados.find(proFil => proFil.tabIndex === this.tableIndexPro)
      this.selectProduto(pro, 1, 0, true)
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
      this.populateTabIndex(this.itensCarrinho)
      this.atualizarValorTotalCompra()
      this.tableIndexCar = 0
      if (!this.itensCarrinho.length) this.editandoCarrinho = false
      if (this.pedidoSelected) {
        this.fecharVenda = false
        await this.removerItemPedido(item)
      }
    },  

    async removerItemPedido(item) {
      item.excluir = true
      const itens = []
      itens.push(item)
      
      this.enviarPedido(itens, false, true)
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
        this.clearFocus()
        if (this.itemEditando.seqIpd > 0) {
          this.fecharVenda = false
          await this.enviarVenda(false)
        }
        this.itemEditando = null
      }
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
      let seguir = true
      if (this.pedidoSelected && atualizar) {
        seguir = await this.checarItensCarrinhoNovaTabela(row.codTpr)
      }

      document.getElementById('closeModalTabelasPreco').click()
      if (seguir) {
        this.ideTpr = row.codTpr
        this.codTpr = row.codTpr
        document.getElementsByTagName('body')[0].style.cursor = 'wait'
        this.status = 'b_produtos'
        await this.buscarProdutosTabela()
        this.status = ''
        document.getElementsByTagName('body')[0].style.cursor = 'auto'
        
        if (this.pedidoSelected && atualizar) {
          this.status = 'a_precos'
          this.atualizarPrecosCarrinho()
          this.status = ''
          this.fecharVenda = false
          await this.enviarVenda(false)
        }
      }
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
      this.produtosTabelaPreco = []
      await api.getProdutosTabelaPreco(this.codTpr)
      .then((response) => {
        this.produtosTabelaPreco = response.data
      })
      .catch((err) => {
        console.log(err)
        shared.handleRequestError(err)
      })
    },

    filtrarTabelasPreco(filter) {
      this.tabelasPrecoFiltrados = this.tabelasPreco.filter(tpr => (tpr.codTpr.toUpperCase().startsWith(filter.toUpperCase())))
      this.tableIndexTpr = 0

      this.populateTabIndex(this.tabelasPrecoFiltrados)
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

    /* Condições de Pagamento */
    async beginCondicaoPagto() {
      this.ideCpg = ''
      this.codCpg = ''
      this.condicoesPagtoFiltro = ''
    },

    async searchCondicoesPagto() {
      if(!this.codFpg.length) {
        alert('Favor informar uma forma de pagamento!')
        document.getElementById('inputIdeFpg').focus()
      } else {
        this.filtrarCondicoesPagto(this.ideCpg)
        if (this.condicoesPagtoFiltrados.length === 1) { // encontramos, selecionar
          this.selectCondicaoPagto(this.condicoesPagtoFiltrados[0], true)
        } else if (this.condicoesPagtoFiltrados.length === 0) {
          alert('Nenhuma condição ligada à forma de pagamento selecionada foi encontrada. Favor entrar em contato com o administrador do sistema!')
        } else { // nao encontramos, abrir modal
          this.openCondicoesPagtoModal()
        }
      }
    },

    async selectCondicaoPagto(row, atualizar) {
      this.ideCpg = row.desCpg
      this.codCpg = row.codCpg
      this.condicaoSelected = row
      document.getElementById('closeModalCondicoesPagto').click()
      if (this.pedidoSelected && atualizar) {
        this.fecharVenda = false
        await this.enviarVenda(false)
      }
    },

    filtrarCondicoesPagto(filter) {
      this.condicoesPagtoFiltrados = this.condicoesPagto.filter(cpg => (cpg.codCpg === filter ||
                cpg.desCpg.toUpperCase().includes(filter.toUpperCase()) ||
                cpg.abrCpg.toUpperCase().includes(filter.toUpperCase())))
      this.tableIndexCpg = 0

      this.populateTabIndex(this.condicoesPagtoFiltrados)
    },

    openCondicoesPagtoModal() {
      this.condicoesPagtoFiltro = this.ideCpg
      document.getElementById('btnBuscaCondicoesPagto').click()
      const modalElement = document.getElementById('condicoesPagtoModal')
      modalElement.addEventListener('shown.bs.modal', () => {
        document.getElementById('inputCondicoesPagtoFiltro').focus()
      })
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.focusCondicaoPagto()
      })
    },

    focusCondicaoPagto() {
      this.codCpg === '' ? document.getElementById('inputIdeCpg').focus() : document.getElementById('btnClearCpg').focus()
    },

    navegarModalCondicoesPagto(key) {
      if (key.keyCode === 38) this.focusTableCpg(-1)
      else if (key.keyCode === 40) this.focusTableCpg(1)
      else if (key.keyCode === 13) this.cpgListHit()
    },

    filtrarModalCondicoesPagto(key) {
      if(key.keyCode !== 38 && key.keyCode !== 40 && key.keyCode !== 13)
        this.filtrarCondicoesPagto(this.condicoesPagtoFiltro)
    },

    focusTableCpg(value) {
      this.tableIndexCpg += value
      if (this.tableIndexCpg < 0) 
        this.tableIndexCpg = 0
      else if (this.tableIndexCpg >= this.condicoesPagtoFiltrados.length)
        this.tableIndexCpg = (this.condicoesPagtoFiltrados.length - 1)

      let elementToScroll
      if (this.tableIndexCpg > 0)
        elementToScroll = document.getElementById('tabCpg' + this.tableIndexCpg)
      else 
        elementToScroll = document.getElementById('inputCondicoesPagtoFiltro')
      
      this.scrollToElement(elementToScroll)
    },  

    cpgListHit() {
      const cpg = this.condicoesPagtoFiltrados.find(cpgFil => cpgFil.tabIndex === this.tableIndexCpg)
      this.selectCondicaoPagto(cpg, true)
    },

    /* Formas de Pagamento */
    async initFormasPagto() {
      if (!sessionStorage.getItem('formasPagto')) {
        await api.getFormasPagto()
        .then((response) => {
          this.formasPagto = response.data
          this.formasPagtoFiltrados = this.formasPagto
          sessionStorage.setItem('formasPagto', JSON.stringify(this.formasPagto))
        })
        .catch((err) => {
          shared.handleRequestError(err)
          console.log(err)
        })
      } else {
        this.formasPagto = JSON.parse(sessionStorage.getItem('formasPagto'))
        this.formasPagtoFiltrados = this.formasPagto
      }
    },

    async beginFormaPagto() {
      this.ideFpg = ''
      this.codFpg = ''
      this.formasPagtoFiltro = ''
      this.ideCpg = ''
      this.codCpg = ''
      this.condicoesPagtoFiltro = ''
      
      if(!this.formasPagto.length) await this.initFormasPagto()
    },

    async searchFormasPagto() {
      this.filtrarFormasPagto(this.ideFpg)
      if (this.formasPagtoFiltrados.length === 1) { // encontramos, selecionar
        this.selectFormaPagto(this.formasPagtoFiltrados[0], true)
      } else { // nao encontramos, abrir modal
        this.openFormasPagtoModal()
      }
    },

    async selectFormaPagto(row, atualizar) {
      this.ideFpg = row.desFpg
      this.codFpg = row.codFpg
      this.formaSelected = row
      this.condicoesPagto = this.formaSelected.condicoes
      this.condicoesPagtoFiltrados = this.condicoesPagto
      if(this.condicoesPagto.length === 1) this.selectCondicaoPagto(this.condicoesPagto[0])
      document.getElementById('closeModalFormasPagto').click()
      if (this.pedidoSelected && atualizar) {
        this.fecharVenda = false
        await this.enviarVenda(false)
      }
    },

    filtrarFormasPagto(filter) {
      this.formasPagtoFiltrados = this.formasPagto.filter(fpg => (fpg.codFpg === filter ||
                fpg.desFpg.toUpperCase().includes(filter.toUpperCase()) ||
                fpg.abrFpg.toUpperCase().includes(filter.toUpperCase())))
      this.tableIndexFpg = 0

      this.populateTabIndex(this.formasPagtoFiltrados)
    },

    openFormasPagtoModal() {
      this.formasPagtoFiltro = this.ideFpg
      document.getElementById('btnBuscaFormasPagto').click()
      const modalElement = document.getElementById('formasPagtoModal')
      modalElement.addEventListener('shown.bs.modal', () => {
        document.getElementById('inputFormasPagtoFiltro').focus()
      })
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.focusFormaPagto()
      })
    },

    focusFormaPagto() {
      this.codFpg === '' ? document.getElementById('inputIdeFpg').focus() : document.getElementById('btnClearFpg').focus()
    },

    navegarModalFormasPagto(key) {
      if (key.keyCode === 38) this.focusTableFpg(-1)
      else if (key.keyCode === 40) this.focusTableFpg(1)
      else if (key.keyCode === 13) this.fpgListHit()
    },

    filtrarModalFormasPagto(key) {
      if(key.keyCode !== 38 && key.keyCode !== 40 && key.keyCode !== 13)
        this.filtrarFormasPagto(this.formasPagtoFiltro)
    },

    focusTableFpg(value) {
      this.tableIndexFpg += value
      if (this.tableIndexFpg < 0) 
        this.tableIndexFpg = 0
      else if (this.tableIndexFpg >= this.formasPagtoFiltrados.length)
        this.tableIndexFpg = (this.formasPagtoFiltrados.length - 1)

      let elementToScroll
      if (this.tableIndexFpg > 0)
        elementToScroll = document.getElementById('tabFpg' + this.tableIndexFpg)
      else 
        elementToScroll = document.getElementById('inputFormasPagtoFiltro')
      
      this.scrollToElement(elementToScroll)
    },  

    fpgListHit() {
      const fpg = this.formasPagtoFiltrados.find(fpgFil => fpgFil.tabIndex === this.tableIndexFpg)
      this.selectFormaPagto(fpg, true)
    },

    /* Finalizar Venda */
    async initParams() {
      if (!sessionStorage.getItem('paramsPDV')) {
        await api.getUserParams()
        .then((response) => {
          this.paramsPDV = {
            codTpr: response.data.parametrosPDV.codTpr
          }
          sessionStorage.setItem('paramsPDV', JSON.stringify(paramsPDV))
        })
        .catch((err) => {
          shared.handleRequestError(err)
          console.log(err)
        })
      } else {
        this.paramsPDV = JSON.parse(sessionStorage.getItem('paramsPDV'))
      }
    },

    triggerFinalizandoVenda(finalizandoVenda, fechar) {
      this.finalizandoVenda = finalizandoVenda
      this.fecharVenda = fechar
      if (this.finalizandoVenda) {
        if (this.allFieldsArePopulated()) this.openFinalizarVendaModal()
        else this.finalizandoVenda = false
      }
    },

    openFinalizarVendaModal() {
      this.msgConfirmacao = this.fecharVenda ? 'Tem certeza que deseja finalizar a venda?' 
                                             : !this.pedidoSelected ? 'Tem certeza que deseja inserir o pedido?' 
                                                                  : 'Tem certeza que deseja atualizar o pedido?'
      if (this.fecharVenda) document.getElementById('btnOpenFinalizarVendaModal').click()
      else document.getElementById('btnOpenInserirPedidoModal').click()
    },

    async finalizarVenda() {
        document.getElementById('closeModalConfirmaVenda').click()
      if (['1','2'].includes(this.formaSelected.tipInt) && this.fecharVenda) {
        this.clearInputsCartao()
        document.getElementById('btnCartao').click()
        const modalElement = document.getElementById('cartaoModal')
        modalElement.addEventListener('shown.bs.modal', () => {
          document.getElementById('selectBanOpe').focus()
        })
      } else {
        await this.enviarVenda(true)
      }
    },  

    async confirmarDadosCartao() {
      if (this.cartao.banOpe === '') alert('Selecione a bandeira do cartão!')
      else if (this.cartao.catTef === '') alert('Preencha o número da autorização!') 
      else if (this.cartao.nsuTef === '' && this.formaSelected.tipInt === '1') alert('Preencha o número da transação (TEF)!') 
      else {
        document.getElementById('closeModalCartao').click()
        await this.enviarVenda(true)
      }
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
          excluir: false
        }
        itens.push(itemPedido)
      })
      this.enviarPedido(itens, limpar, true)
    },

    async enviarPedido(itens, limpar, parcelas) {
      let pedido = null
      if (this.pedidoSelected && this.fecharVenda) {
        pedido = {
          numPed: this.pedPrv,
          fechar: this.fecharVenda
        }
      } else {
        let vlrTmp = Number(this.itensCarrinho.map(item => item.vlrTot).reduce((prev, curr) => prev + curr, 0))
        let vlrDar = 0
        if (this.tipDesc !== '') {
          vlrTmp -= this.vlrDescPedido
          vlrDar = this.vlrDescPedido
        }
        vlrTmp = vlrTmp.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
                    .replace('R$', '').replace('.','').replace(',','.').trim()

        pedido = {
          codCli: this.codCli,
          codCpg: this.codCpg,
          codFpg: this.codFpg,
          desFpg: this.formaSelected.desFpg,
          tipFpg: this.formaSelected.tipFpg,
          tipInt: this.formaSelected.tipInt,
          codOpe: this.formaSelected.codOpe,
          codRep: this.codRep,
          vlrTot: vlrTmp,
          itens: itens,
          qtdPar: this.condicaoSelected.qtdParCpg,
          parcelas: this.condicaoSelected.parcelas,
          banOpe: this.cartao.banOpe,
          catTef: this.cartao.catTef,
          nsuTef: this.cartao.nsuTef,
          fechar: this.fecharVenda,
          numPed: !this.pedidoSelected ? '0' : this.pedPrv,
          vlrDar: vlrDar,
          incluirParcelas: parcelas
        }
      }
      document.getElementsByTagName('body')[0].style.cursor = 'wait'
      this.setEverythingDisabled(true)

      this.status = 'pedido'
      const operacao = this.pedidoSelected ? 'alterado' : 'criado'

      await api.putPedido(pedido)
        .then(async (response) => {
          const respostaPedido = response.data
          if (this.fecharVenda) {
            this.status = 'nfce'
            await this.gerarNFCe(respostaPedido.numPed)
          } else {
            document.getElementById('closeModalConfirmaVenda').click()
            if (limpar) {
              alert('Pedido ' + respostaPedido.numPed + ' ' + operacao + ' com sucesso!')
              this.clearAllInputs()
              this.clearInputsCadCli()
              this.clearInputsCartao()
              this.limparDesconto(false)
              this.clearFocus()
            }
          }
        })
        .catch((err) => {
          shared.handleRequestError(err)
          console.log(err)
        })
        .finally(() => {
          document.getElementsByTagName('body')[0].style.cursor = 'auto'
          this.setEverythingDisabled(false)
          this.status = ''
        })
    },

    async gerarNFCe(numPed) {
      await api.putNFCe(numPed)
        .then((response) => {
          const resposta = response.data
          if(resposta.startsWith('ERRO')) {
            const msg = 'Pedido ' + numPed + 
              ' fechado com sucesso, mas geração de NFC-e retornou o seguinte erro: \n' +
              response.data
            alert(msg)
          } else {
            alert('Pedido ' + numPed + ' fechado com sucesso!')
            this.clearAllInputs()
            this.clearInputsCadCli()
            this.clearInputsCartao()
            this.limparDesconto(false)
            this.clearFocus()
          } 
        })
        .catch((err) => {
          shared.handleRequestError(err)
          console.log(err)
        })
        .finally(() => {
          document.getElementById('closeModalConfirmaVenda').click()
        })
    },

    allFieldsArePopulated() {
      if (this.isRepresentanteEmpty()) {
        alert('Favor informar um representante!')
        return false
      } else if (this.isTabelaPrecoEmpty()) {
        alert('Favor informar uma tabela de preço!')
        return false
      } else if (this.isCondicaoPagtoEmpty()) {
        alert('Favor informar uma condição de pagamento!')
        return false
      } else if (this.isFormaPagtoEmpty()) {
        alert('Favor informar uma forma de pagamento!')
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

    isCondicaoPagtoEmpty() {
      return this.codCpg === ''
    },

    isFormaPagtoEmpty() {
      return this.codFpg === ''
    },

    isCarrinhoEmpty() {
      return (!this.itensCarrinho || !this.itensCarrinho.length)
    },

    aplicarDesconto(atualizar) {
      const valorTmp = Number(this.itensCarrinho.map(item => item.vlrTot).reduce((prev, curr) => prev + curr, 0))
      this.vlrDescPedido = this.tipDesc === 'valor' ? Number(this.vlrDesc.replace('.', '').replace(',', '.')) : valorTmp * (Number(this.vlrDesc.replace(',', '.')) / 100)

      if (valorTmp < this.vlrDescPedido) {
        alert('O desconto não pode ser maior que o valor total do pedido!')
        this.vlrDesc = ''
      } else {
        this.vlrComDesconto = (valorTmp - this.vlrDescPedido).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
      }

      if (this.pedidoSelected && atualizar) {
        this.fecharVenda = false
        const itens = []
        this.enviarPedido(itens, false, false)
      }
    },

    limparDesconto(atualizar) {
      this.vlrDesc = ''
      this.vlrComDesconto = ''
      this.vlrDescPedido = 0
      this.tipDesc = ''

      if (this.pedidoSelected && atualizar) {
        this.fecharVenda = false
        const itens = []
        this.enviarPedido(itens, false, false)
      }
    },

    /* Pedidos */
    async initPedidos() {
      await api.getPedidos('ABERTOS', 'ASC')
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
        if (ped.codFpg) {
          const fpg = this.formasPagto.find(fpgRow => fpgRow.codFpg === ped.codFpg)
          if(fpg) ped.fpg = fpg
        }
        if (ped.codCpg && ped.fpg) {
          const cpg = ped.fpg.condicoes.find(cpgRow => cpgRow.codCpg === ped.codCpg)
          if(cpg) ped.cpg = cpg
        }
      })
    },

    async beginPedido() {
      this.idePedPrv = ''
      this.pedPrv = ''
      this.pedidosFiltro = ''

      this.clearAllInputs()
      this.clearInputsCadCli()
      this.clearInputsCartao()
    },

    async searchPedidos() {
      document.getElementsByTagName('body')[0].style.cursor = 'wait'
      this.status = 'b_pedidos'
      this.pedidos = []
      await this.initPedidos()
      document.getElementsByTagName('body')[0].style.cursor = 'auto'
      this.status = ''
      this.filtrarPedidos(this.idePedPrv)
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

      this.carregarInfoPedido(row)

      document.getElementById('closeModalPedidos').click()
    },

    async carregarInfoPedido(pedido) {
      this.codRep = pedido.codRep
      this.ideRep = pedido.ideRep
      this.codCli = pedido.codCli
      this.ideCli = pedido.ideCli
      if (pedido.fpg) this.selectFormaPagto(pedido.fpg, false)
      if (pedido.cpg) this.selectCondicaoPagto(pedido.cpg, false)
      await this.selectTabelaPreco({codTpr: pedido.itens[0].codTpr}, false)
      this.preencherItensPedido(pedido)
      this.preencherDadosDesconto(pedido)
    },

    preencherItensPedido(pedido) {
      pedido.itens.forEach(item => {
        const prod = this.produtosTabelaPreco.find(pro => pro.codPro === item.codPro && pro.codDer === item.codDer)
        if(prod) this.selectProduto(prod, Number(item.qtdPed.replace(',','.')), item.seqIpd, false)
      })
    },

    preencherDadosDesconto(pedido) {
      if(pedido.vlrDar !== '0,00') {
        this.tipDesc = 'valor'
        this.vlrDesc = pedido.vlrDar
        this.aplicarDesconto(false)
      }
    },

    filtrarPedidos(filter) {
      this.pedidosFiltrados = filter !== '' ? this.pedidos.filter(ped => (ped.numPed === filter)) : this.pedidos
      this.tableIndexPed = 0

      this.populateTabIndex(this.pedidosFiltrados)
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
        this.filtrarPedidos(this.pedidosFiltro)
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
  }
}
</script>

<style scoped src="../styles/general.css"></style>