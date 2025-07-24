// tef.js

// Helper to load the external script only once
function loadPaykitScript() {
  return new Promise((resolve, reject) => {
    if (window.PaykitCheckout) {
      resolve();
      return;
    }
    const scriptId = 'paykit-checkout-js';
    if (document.getElementById(scriptId)) {
      // Script is already being loaded
      document.getElementById(scriptId).addEventListener('load', resolve);
      return;
    }
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://linxpaykitapi-hmg.linx.com.br/LinxPaykitApi/paykit-checkout.js';
    script.type = 'text/javascript';
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

// Helper to generate a 6-digit numerical string with leading zeroes
function generateSixDigitKey() {
  const num = Math.floor(Math.random() * 1000000); // 0 to 999999
  return num.toString().padStart(6, '0');
}

var functions = {
  // Function to authenticate using PaykitCheckout
  async authenticatePaykit(authenticationKey) {
    await loadPaykitScript()
    console.log('Paykit script loaded successfully')
    const authenticationRequest = {
      authenticationKey
    }

    // Fallbacks for callbacks
    const success = function(response) {
      console.log('Success:')
      console.log(response.details);
    }
    const error = function(response) {
      console.log('Error:')
      console.log(response.reason);
    }
    const handlePendingPayments = function(response) {
      console.log('Pending Payments:')
      console.log(response.details.administrativeCodes);
    }

    // Call the PaykitCheckout API
    return window.PaykitCheckout.authenticate(
      authenticationRequest,
      success,
      error,
      handlePendingPayments
    )
  },

  async payDebit(authenticationKey, amount) {
    // Authenticate first
    await this.authenticatePaykit(authenticationKey);

    const request = {
      amount,
      requestKey: generateSixDigitKey()
    };

    const success = function(response) {
      // callback para pagamento bem sucedido
      console.log(response.administrativeCode);
      console.log(response.receipt.merchantReceipt);
    };

    const error = function(response) {
      // callback para pagamento que falhou
      console.log(response.reason);
    };

    // Call debitPayment on the PaykitCheckout instance
    if (window.PaykitCheckout && typeof window.PaykitCheckout.debitPayment === 'function') {
      window.PaykitCheckout.debitPayment(request, success, error);
    } else {
      console.error('PaykitCheckout.debitPayment is not available.');
    }
  }
}

export default functions;