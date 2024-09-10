document.getElementById('toggleSidebar').addEventListener('click', function() {
    let sidebar = document.getElementById('sidebar');
    sidebar.style.width = sidebar.style.width === '80px' ? '250px' : '80px';
});

document.getElementById('darkModeToggle').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
});

// Example data for dynamically adding rows
const products = [
    { id: 1, brand: 'Brand A', product: 'Product A', image: 'img1.jpg', offerPrice: 100, originalPrice: 150, dealPercentage: 33, sizes: 'S, M, L', rating: 4.5, category: 'Clothing' },
    { id: 2, brand: 'Brand B', product: 'Product B', image: 'img2.jpg', offerPrice: 200, originalPrice: 250, dealPercentage: 20, sizes: 'M, L', rating: 4.0, category: 'Electronics' },
    { id: 3, brand: 'Brand C', product: 'Product C', image: 'img3.jpg', offerPrice: 150, originalPrice: 180, dealPercentage: 16, sizes: 'L', rating: 5.2, category: 'Clothing' },
    { id: 1, brand: 'Brand A', product: 'Product A', image: 'img1.jpg', offerPrice: 100, originalPrice: 150, dealPercentage: 33, sizes: 'S, M, L', rating: 4.5, category: 'Clothing' },
    { id: 2, brand: 'Brand B', product: 'Product B', image: 'img2.jpg', offerPrice: 200, originalPrice: 250, dealPercentage: 20, sizes: 'M, L', rating: 4.0, category: 'Electronics' },
    { id: 3, brand: 'Brand C', product: 'Product C', image: 'img3.jpg', offerPrice: 150, originalPrice: 180, dealPercentage: 16, sizes: 'L', rating: 5.2, category: 'Clothing' },
    { id: 1, brand: 'Brand A', product: 'Product A', image: 'img1.jpg', offerPrice: 100, originalPrice: 150, dealPercentage: 33, sizes: 'S, M, L', rating: 4.5, category: 'Clothing' },
    { id: 2, brand: 'Brand B', product: 'Product B', image: 'img2.jpg', offerPrice: 200, originalPrice: 250, dealPercentage: 20, sizes: 'M, L', rating: 4.0, category: 'Electronics' },
    { id: 3, brand: 'Brand C', product: 'Product C', image: 'img3.jpg', offerPrice: 150, originalPrice: 180, dealPercentage: 16, sizes: 'L', rating: 5.2, category: 'Clothing' },
    { id: 1, brand: 'Brand A', product: 'Product A', image: 'img1.jpg', offerPrice: 100, originalPrice: 150, dealPercentage: 33, sizes: 'S, M, L', rating: 4.5, category: 'Clothing' },
    { id: 2, brand: 'Brand B', product: 'Product B', image: 'img2.jpg', offerPrice: 200, originalPrice: 250, dealPercentage: 20, sizes: 'M, L', rating: 4.0, category: 'Electronics' },
    { id: 3, brand: 'Brand C', product: 'Product C', image: 'img3.jpg', offerPrice: 150, originalPrice: 180, dealPercentage: 16, sizes: 'L', rating: 5.2, category: 'Clothing' },
    
    
    
    // Add more products as needed
];

const tableBody = document.querySelector('table tbody');

// Dynamically insert product rows
products.forEach(product => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.brand}</td>
        <td>${product.product}</td>
        <td><img src="${product.image}" alt="${product.product}" style="width:50px;height:50px"></td>
        <td>$${product.offerPrice}</td>
        <td>$${product.originalPrice}</td>
        <td>${product.dealPercentage}%</td>
        <td>${product.sizes}</td>
        <td>${product.rating}</td>
        <td>${product.category}</td>
    `;
    tableBody.appendChild(row);
});

// Search functionality
document.getElementById('searchInput').addEventListener('input', function() {
    const filter = this.value.toLowerCase();
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(filter) ? '' : 'none';
    });
});

// Filter by specific column functionality
document.getElementById('filterCriteria').addEventListener('change', function() {
    const filterType = this.value;
    const filterValue = prompt(`Enter value to filter by ${filterType}:`).toLowerCase();
    const rows = tableBody.querySelectorAll('tr');

    rows.forEach(row => {
        let cellValue = '';
        switch (filterType) {
            case 'brand':
                cellValue = row.cells[1].innerText.toLowerCase();
                break;
            case 'product':
                cellValue = row.cells[2].innerText.toLowerCase();
                break;
            case 'offerPrice':
                cellValue = row.cells[4].innerText.toLowerCase().replace('$', '');
                break;
            case 'originalPrice':
                cellValue = row.cells[5].innerText.toLowerCase().replace('$', '');
                break;
            case 'dealPercentage':
                cellValue = row.cells[6].innerText.toLowerCase().replace('%', '');
                break;
            case 'sizes':
                cellValue = row.cells[7].innerText.toLowerCase();
                break;
            case 'rating':
                cellValue = row.cells[8].innerText.toLowerCase();
                break;
            case 'category':
                cellValue = row.cells[9].innerText.toLowerCase();
                break;
        }

        row.style.display = cellValue.includes(filterValue) ? '' : 'none';
    });
});
