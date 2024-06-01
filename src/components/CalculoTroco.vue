<template>
  <div class="row mt-2">
    <span>Calcular troco:</span>
  </div>
  <div class="row my-2">
    <div class="col-4">
      <div class="input-group input-group-sm">
        <span class="input-group-text">Valor Final</span>
        <input class="form-control" disabled v-model="vlrFinal">
      </div>
    </div>
    <div class="col-4">
      <div class="input-group input-group-sm">
        <span class="input-group-text">Pago (R$)</span>
        <vue-mask id="inputVlrPagoDin" class="form-control" mask="000.000.000,00" :raw="false" :options="options" v-model="vlrPagoDin" v-on:keyup="calcularTroco"></vue-mask>
      </div>
    </div>
    <div class="col-4">
      <div class="input-group input-group-sm">
        <span class="input-group-text">Troco</span>
        <input class="form-control" disabled v-model="vlrTroco">
      </div>
    </div>
  </div>
</template>

<script>
import vueMask from 'vue-jquery-mask'
import shared from '../utils/sharedFunctions'

export default {
  name: 'CalculoTroco',
  components: { vueMask },
  data () {
    return {
      vlrTroco: 'R$ 0,00',
      options: {
        reverse: true
      }
    }
  },
  mounted () {
    document.getElementById('inputVlrPagoDin').focus()
    document.getElementById('inputVlrPagoDin').select()
  },
  methods: {
    calcularTroco() {
      try {
        const vlrPago = document.getElementById('inputVlrPagoDin').value
        const troco = (Number(vlrPago.replace('.', '').replace(',', '.')) - this.vlrFinalNbr)
        if (troco <= 0) this.vlrTroco = 'R$ 0,00' 
        else this.vlrTroco = shared.toMoneyString(troco)
      } catch (ex) {
        this.vlrTroco = 'R$ 0,00'  
      }
    }
  },
  props: {
    vlrPagoDin: String,
    vlrFinal: String,
    vlrFinalNbr: Number
  }
}

</script>

<style scoped src="../styles/general.css"></style>