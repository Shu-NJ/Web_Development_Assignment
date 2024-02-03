function calculateLoan() {
    var customer_id = document.getElementById('customer_id').value;
    var loan_amount = parseFloat(document.getElementById('loan_amount').value);
    var loan_period = parseInt(document.getElementById('loan_period').value);
    var interest_rate = parseFloat(document.getElementById('interest_rate').value);

    var principal = loan_amount;
    var numberOfYears = loan_period / 12; 
    var rateOfInterest = interest_rate / 100;

    var interest = calculateInterest(principal, numberOfYears, rateOfInterest);
    var total_amount = principal + interest;
    var monthly_emi = total_amount / loan_period;

    document.getElementById('total_amount').textContent = total_amount.toFixed(2);
    document.getElementById('monthly_emi').textContent = monthly_emi.toFixed(2);
}

function calculateInterest(principal, numberOfYears, rateOfInterest) {
    return principal * numberOfYears * rateOfInterest;
}

function makePayment() {
    var lump_sum_payment = parseFloat(document.getElementById('lump_sum_payment').value);
    var total_amount_element = document.getElementById('total_amount');
    var monthly_emi_element = document.getElementById('monthly_emi');

    var total_amount = parseFloat(total_amount_element.textContent);
    var monthly_emi = parseFloat(monthly_emi_element.textContent);

    total_amount -= lump_sum_payment;

    if (total_amount < 0) {
        total_amount = 0;
    }

    var loan_period = Math.ceil(total_amount / monthly_emi);

    total_amount_element.textContent = total_amount.toFixed(2);
    monthly_emi_element.textContent = (total_amount / loan_period).toFixed(2);
}

function viewLedger() {
    var loan_id_ledger = document.getElementById('loan_id_ledger').value;


    var sampleLedger = [
        { type: 'EMI Payment', amount: 500, date: '2024-02-01' },
        { type: 'Lump Sum Payment', amount: 1000, date: '2024-03-01' },
        
    ];

    var ledgerResult = document.getElementById('ledger_result');
    ledgerResult.innerHTML = `
        <h3>Loan Ledger</h3>
        <ul>
            ${sampleLedger.map(transaction => `<li>${transaction.type}: ${transaction.amount.toFixed(2)} on ${transaction.date}</li>`).join('')}
        </ul>
    `;
}

function viewAccountOverview() {
    var customer_id_account = document.getElementById('customer_id_account').value;

  

    var sampleAccountOverview = [
        { loan_id: 'L001', loan_amount: 10000, total_amount: 12000, monthly_emi: 500, total_interest: 2000, amount_paid: 7000, emis_left: 10 },
        { loan_id: 'L002', loan_amount: 15000, total_amount: 18000, monthly_emi: 600, total_interest: 3000, amount_paid: 8000, emis_left: 12 },
        
    ];

    var accountOverviewResult = document.getElementById('account_overview_result');
    accountOverviewResult.innerHTML = `
        <h3>Account Overview</h3>
        <ul>
            ${sampleAccountOverview.map(loan => `
                <li>
                    <strong>Loan ID:</strong> ${loan.loan_id}<br>
                    <strong>Loan Amount:</strong> ${loan.loan_amount.toFixed(2)}<br>
                    <strong>Total Amount:</strong> ${loan.total_amount.toFixed(2)}<br>
                    <strong>EMI Amount:</strong> ${loan.monthly_emi.toFixed(2)}<br>
                    <strong>Total Interest:</strong> ${loan.total_interest.toFixed(2)}<br>
                    <strong>Amount Paid Till Date:</strong> ${loan.amount_paid.toFixed(2)}<br>
                    <strong>Number of EMIs Left:</strong> ${loan.emis_left}
                </li>
            `).join('')}
        </ul>
    `;
}
