// Modal handling
const singleProductBtn = document.getElementById('singleProductBtn');
const multipleDataBtn = document.getElementById('multipleDataBtn');
const singleProductModal = document.getElementById('singleProductModal');
const multipleDataModal = document.getElementById('multipleDataModal');
const closeSingleProductModal = document.getElementById('closeSingleProductModal');
const closeMultipleDataModal = document.getElementById('closeMultipleDataModal');

singleProductBtn.onclick = () => singleProductModal.style.display = 'flex';
multipleDataBtn.onclick = () => multipleDataModal.style.display = 'flex';
closeSingleProductModal.onclick = () => singleProductModal.style.display = 'none';
closeMultipleDataModal.onclick = () => multipleDataModal.style.display = 'none';

// Single Product Form Submission
document.getElementById('singleProductForm').onsubmit = function (e) {
    e.preventDefault();

    const brandName = document.getElementById('brandName').value;
    const productName = document.getElementById('productName').value;
    const productImage = document.getElementById('productImage').value;
    const offerPrice = document.getElementById('offerPrice').value;
    const originalPrice = document.getElementById('originalPrice').value;
    const dealPercentage = document.getElementById('dealPercentage').value;
    const sizes = document.getElementById('sizes').value;
    const rating = document.getElementById('rating').value;
    const category = document.getElementById('category').value;

    const tableBody = document.querySelector('#productTable tbody');
    const newRow = `<tr>
        <td>${brandName}</td>
        <td>${productName}</td>
        <td><img src="${productImage}" alt="Product Image" width="50"></td>
        <td>${offerPrice}</td>
        <td>${originalPrice}</td>
        <td>${dealPercentage}</td>
        <td>${sizes}</td>
        <td>${rating}</td>
        <td>${category}</td>
    </tr>`;

    tableBody.insertAdjacentHTML('beforeend', newRow);

    singleProductModal.style.display = 'none';
};

// Multiple Data (Excel File Upload)
document.getElementById('uploadBtn').onclick = function () {
    const fileInput = document.getElementById('excelFile');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0]; // Assuming first sheet
            const sheet = workbook.Sheets[sheetName];
            const products = XLSX.utils.sheet_to_json(sheet);

            // Display products in table
            const tableBody = document.querySelector('#productTable tbody');
            products.forEach(product => {
                const newRow = `<tr>
                    <td>${product['Brand Name']}</td>
                    <td>${product['Product Name']}</td>
                    <td><img src="${product['Product Image']}" alt="Product Image" width="50"></td>
                    <td>${product['Offer Price']}</td>
                    <td>${product['Original Price']}</td>
                    <td>${product['Deal Percentage']}</td>
                    <td>${product['Sizes']}</td>
                    <td>${product['Rating']}</td>
                    <td>${product['Category']}</td>
                </tr>`;
                tableBody.insertAdjacentHTML('beforeend', newRow);
            });

            // Close modal after displaying the data
            multipleDataModal.style.display = 'none';
        };

        // Read the file as array buffer
        reader.readAsArrayBuffer(file);
    } else {
        alert("Please select a file first.");
    }
};
