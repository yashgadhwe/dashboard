document.addEventListener("DOMContentLoaded", () => {
    // Get the modals
    const singleProductModal = document.getElementById("singleProductModal");
    const multipleDataModal = document.getElementById("multipleDataModal");

    // Get the buttons that open the modals
    const singleProductBtn = document.getElementById("singleProductBtn");
    const multipleDataBtn = document.getElementById("multipleDataBtn");

    // Get the <span> elements that close the modals
    const closeButtons = document.querySelectorAll(".close");

    // Get the product table
    const productTableBody = document.querySelector("#productTable tbody");

    // Open the single product modal
    singleProductBtn.onclick = () => {
        singleProductModal.style.display = "block";
    };

    // Open the multiple data modal
    multipleDataBtn.onclick = () => {
        multipleDataModal.style.display = "block";
    };

    // Close the modals when the close button is clicked
    closeButtons.forEach(button => {
        button.onclick = () => {
            singleProductModal.style.display = "none";
            multipleDataModal.style.display = "none";
        };
    });

    // Close the modals when the user clicks anywhere outside of the modal
    window.onclick = (event) => {
        if (event.target == singleProductModal) {
            singleProductModal.style.display = "none";
        }
        if (event.target == multipleDataModal) {
            multipleDataModal.style.display = "none";
        }
    };

    // Submit Single Product Form
    document.getElementById("singleProductForm").addEventListener("submit", (e) => {
        e.preventDefault();

        // Get form values
        const brandName = document.getElementById("brandName").value;
        const productName = document.getElementById("productName").value;
        const productImage = document.getElementById("productImage").value;
        const offerPrice = document.getElementById("offerPrice").value;
        const originalPrice = document.getElementById("originalPrice").value;
        const dealPercentage = document.getElementById("dealPercentage").value;
        const sizes = document.getElementById("sizes").value;
        const rating = document.getElementById("rating").value;
        const category = document.getElementById("category").value;

        // Insert data into the table
        const row = productTableBody.insertRow();
        row.innerHTML = `
            <td>${productTableBody.rows.length}</td>
            <td>${brandName}</td>
            <td>${productName}</td>
            <td><img src="${productImage}" alt="Product Image" width="50"></td>
            <td>${offerPrice}</td>
            <td>${originalPrice}</td>
            <td>${dealPercentage}%</td>
            <td>${sizes}</td>
            <td>${rating}</td>
            <td>${category}</td>
        `;

        // Close the modal
        singleProductModal.style.display = "none";
    });

    // Handle Multiple Data File Upload
    const excelFileInput = document.getElementById("excelFile");
    const fileNameDisplay = document.getElementById("fileName");

    excelFileInput.addEventListener("change", () => {
        fileNameDisplay.textContent = excelFileInput.files[0]?.name || '';
    });

    document.getElementById("submitExcel").addEventListener("click", () => {
        const file = excelFileInput.files[0];
        if (file) {
            readExcelFile(file);
        }
        multipleDataModal.style.display = "none";
    });

    // Function to read Excel file and display data in the table
    function readExcelFile(file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            console.log(jsonData); // Log the parsed data

            jsonData.forEach((product, index) => {
                const row = productTableBody.insertRow();
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${product["Brand Name"] || 'N/A'}</td>
                    <td>${product["Product Name"] || 'N/A'}</td>
                    <td><img src="${product["Product Image"] || 'No Image'}" alt="Product Image" width="50"></td>
                    <td>${product["Offer Price"] || 'N/A'}</td>
                    <td>${product["Original Price"] || 'N/A'}</td>
                    <td>${product["Deal Percentage"] || 'N/A'}%</td>
                    <td>${product["Sizes"] || 'N/A'}</td>
                    <td>${product["Rating"] || 'N/A'}</td>
                    <td>${product["Category"] || 'N/A'}</td>
                `;
            });
        };

        reader.readAsArrayBuffer(file);
    }

    // Search and Filter
    const searchInput = document.getElementById('searchInput');
    const filterSelect = document.getElementById('filterSelect');

    searchInput.addEventListener('input', filterTable);
    filterSelect.addEventListener('change', filterTable);

    function filterTable() {
        const searchTerm = searchInput.value.toLowerCase();
        const filterBy = filterSelect.value;
        const rows = productTableBody.getElementsByTagName('tr');

        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            let showRow = false;

            for (let j = 0; j < cells.length; j++) {
                const cell = cells[j];
                const cellValue = cell.textContent || cell.innerText;

                if (filterBy === 'brandName' && j === 1) {
                    if (cellValue.toLowerCase().includes(searchTerm)) {
                        showRow = true;
                    }
                } else if (filterBy === 'productName' && j === 2) {
                    if (cellValue.toLowerCase().includes(searchTerm)) {
                        showRow = true;
                    }
                } else if (filterBy === 'offerPrice' && j === 4) {
                    if (cellValue.toLowerCase().includes(searchTerm)) {
                        showRow = true;
                    }
                } else if (filterBy === 'originalPrice' && j === 5) {
                    if (cellValue.toLowerCase().includes(searchTerm)) {
                        showRow = true;
                    }
                } else if (filterBy === 'dealPercentage' && j === 6) {
                    if (cellValue.toLowerCase().includes(searchTerm)) {
                        showRow = true;
                    }
                } else if (filterBy === 'sizes' && j === 7) {
                    if (cellValue.toLowerCase().includes(searchTerm)) {
                        showRow = true;
                    }
                } else if (filterBy === 'rating' && j === 8) {
                    if (cellValue.toLowerCase().includes(searchTerm)) {
                        showRow = true;
                    }
                } else if (filterBy === 'category' && j === 9) {
                    if (cellValue.toLowerCase().includes(searchTerm)) {
                        showRow = true;
                    }
                }
            }

            rows[i].style.display = showRow ? '' : 'none';
        }
    }
});

// Toggle Sidebar
document.getElementById('toggleSidebar').addEventListener('click', () => {
    let sidebar = document.getElementById('sidebar');
    let mainContent = document.querySelector('.main-content');
    if (sidebar.classList.contains('collapsed')) {
        sidebar.classList.remove('collapsed');
        mainContent.style.marginLeft = '0px'; // Reset margin for expanded state
        sidebar.style.width = '250px'
    } else {
        sidebar.classList.add('collapsed');
        mainContent.style.marginLeft = '20px'; // Adjust margin for collapsed state
        sidebar.style.width = '70px'
    }
});

// Dark Mode Toggle
document.getElementById('darkModeToggle').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
});
