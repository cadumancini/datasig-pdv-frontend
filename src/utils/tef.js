// tef.js

let paykitPromise = null;

/**
 * Carrega dinamicamente o script do Paykit, garantindo que seja carregado apenas uma vez.
 * @returns {Promise<void>}
 */
function loadPaykitScript() {
  if (paykitPromise) {
    return paykitPromise;
  }

  paykitPromise = new Promise((resolve, reject) => {
    const scriptId = 'paykit-script';
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      if (window.PaykitCheckout) {
        return resolve();
      }
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'text/javascript';
    script.src = 'https://linxpaykitapi-hmg.linx.com.br/LinxPaykitApi/paykit-checkout.js';
    
    script.onload = () => {
      console.log('Paykit script loaded successfully.');
      setTimeout(() => {
        if (window.PaykitCheckout) {
          resolve();
        } else {
          paykitPromise = null;
          reject(new Error('PaykitCheckout object not found after script load.'));
        }
      }, 100);
    };

    script.onerror = () => {
      console.error('Failed to load Paykit script.');
      paykitPromise = null;
      reject(new Error('Failed to load Paykit script.'));
    };

    document.body.appendChild(script);
  });

  return paykitPromise;
}


var functions = {

  // Helper to generate a 6-digit numerical string with leading zeros
  generateSixDigitKey() {
    const num = Math.floor(Math.random() * 1000000); // 0 to 999999
    return num.toString().padStart(6, '0');
  },

  // Function to authenticate using PaykitCheckout
  async authenticatePaykit(authenticationKey) {
    // Ensure the Paykit script has been loaded.
    await loadPaykitScript();

    const authenticationRequest = {
      authenticationKey
    }
    console.log('Authentication Request')

    return new Promise((resolve, reject) => {
      // capture the object returned by authenticate (if any)
      let checkoutInstance = null;

      const success = function(response) {
        console.log('Success auth:')
        console.log(response);
        // Resolve with the checkout instance if it was returned synchronously
        // by window.PaykitCheckout.authenticate; otherwise fall back to the
        // callback response.
        resolve(checkoutInstance || response);
      }

      const error = function(response) {
        console.log('Error auth:')
        console.log(response);
        reject(response);
      }

      const handlePendingPayments = function(response) {
        console.log('Pending Payments:')
        console.log(response);
        // Resolve with the checkout instance when available; if not, provide
        // a pending marker with the response.
        resolve(checkoutInstance || { pending: true, data: response });
      }

      try {
        checkoutInstance = window.PaykitCheckout.authenticate(
          authenticationRequest,
          success,
          error,
          handlePendingPayments
        )
      } catch (ex) {
        // Synchronous failure from the authenticate call
        reject(ex);
      }
    })
  },

  async payDebit(amount, authKey) {
    // await loadPaykitScript();

    // Authenticate and get the checkout instance that exposes debitPayment
    var checkout = await this.authenticatePaykit(authKey);
    console.log(checkout)

    const request = {
      amount: amount,
      requestKey: this.generateSixDigitKey()
    };

    // return new Promise((resolve, reject) => {
      const success = function(response) {
        console.log('Success debit:')
        console.log(response);
        // resolve(response);
      };

      const error = function(response) {
        console.log('Error debit:')
        console.log(response);
        // reject(response);
      };

      // try {
        checkout.debitPayment(request, success, error);
      // } catch (ex) {
      //   reject(ex);
      // }
    // })
  }
}

export default functions;
