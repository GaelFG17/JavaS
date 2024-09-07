// Tasas de cambio predefinidas
const exchangeRates = {
    USD: { EUR: 0.85, JPY: 110.53, GBP: 0.73 },
    EUR: { USD: 1.18, JPY: 129.53, GBP: 0.86 },
    JPY: { USD: 0.009, EUR: 0.0077, GBP: 0.0067 },
    GBP: { USD: 1.36, EUR: 1.17, JPY: 151.55 }
};

document.getElementById('convertBtn').addEventListener('click', function() {
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const fromAmount = parseFloat(document.getElementById('fromAmount').value);

    if (isNaN(fromAmount) || fromAmount <= 0) {
        alert('Por favor, ingresa un monto válido.');
        return;
    }

    let toAmount;

    if (fromCurrency === toCurrency) {
        toAmount = fromAmount;
    } else {
        const rate = exchangeRates[fromCurrency][toCurrency];
        toAmount = fromAmount * rate;
    }

    document.getElementById('toAmount').value = toAmount.toFixed(2);
});
