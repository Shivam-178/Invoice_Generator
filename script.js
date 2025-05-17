let invoiceNumber = 1;

document.getElementById('add-item').addEventListener('click', function() {
  const itemDiv = document.createElement('div');
  itemDiv.classList.add('item');

  itemDiv.innerHTML = `
    <input type="text" class="itemName" placeholder="Item Name" required>
    <input type="number" class="itemQty" placeholder="Quantity" required>
    <input type="number" class="itemPrice" placeholder="Price" required>
  `;

  document.getElementById('items').appendChild(itemDiv);
});

document.getElementById('generate').addEventListener('click', function() {
  const companyName = document.getElementById('companyName').value;
  const clientName = document.getElementById('clientName').value;
  const itemNames = document.querySelectorAll('.itemName');
  const itemQtys = document.querySelectorAll('.itemQty');
  const itemPrices = document.querySelectorAll('.itemPrice');

  let total = 0;
  let itemsHtml = '';

  for (let i = 0; i < itemNames.length; i++) {
    const name = itemNames[i].value;
    const qty = parseFloat(itemQtys[i].value);
    const price = parseFloat(itemPrices[i].value);
    const itemTotal = qty * price;
    total += itemTotal;

    itemsHtml += `
      <tr>
        <td>${name}</td>
        <td>${qty}</td>
        <td>₹${price.toFixed(2)}</td>
        <td>₹${itemTotal.toFixed(2)}</td>
      </tr>
    `;
  }

  const today = new Date();
  const dateStr = today.toLocaleDateString();

  const invoiceHtml = `
    <div class="invoice-header">
      <div>
        <h2>${companyName}</h2>
        <p>Date: ${dateStr}</p>
        <p>Invoice #: INV${String(invoiceNumber).padStart(3, '0')}</p>
        <p>Bill To: ${clientName}</p>
      </div>
      <div>
        <img src="https://via.placeholder.com/100x50.png?text=Logo" alt="Company Logo">
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
    </table>

    <h3 style="text-align:right;">Grand Total: ₹${total.toFixed(2)}</h3>
  `;

  const preview = document.getElementById('invoice-preview');
  preview.innerHTML = invoiceHtml;
  preview.style.display = 'block';

  html2pdf().from(preview).save(`invoice_INV${String(invoiceNumber).padStart(3, '0')}.pdf`);

  invoiceNumber++; // Next invoice will be incremented
});
  