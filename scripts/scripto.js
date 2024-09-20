document.addEventListener("DOMContentLoaded", () => {
    const singleProductModal = document.getElementById("singleProductModal");
    const multipleDataModal = document.getElementById("multipleDataModal");
    const deleteConfirmModal = document.getElementById("deleteConfirmModal");
    const updateProductModal = document.getElementById("updateProductModal");

    const singleProductBtn = document.getElementById("singleProductBtn");
    const multipleDataBtn = document.getElementById("multipleDataBtn");

    const closeButtons = document.querySelectorAll(".close");
    const productTableBody = document.querySelector("#productTable tbody");

    const excelFileInput = document.getElementById("excelFile");
    const fileNameDisplay = document.getElementById("fileName");
    const submitExcelBtn = document.getElementById("submitExcel");

    const searchInput = document.getElementById('searchInput');
    const filterSelect = document.getElementById('filterSelect');

    let currentDeleteRow = null;
    let selectedRowIndex = null;

    // Open Modals
    singleProductBtn.onclick = () => {
        singleProductModal.style.display = "block";
    };

    multipleDataBtn.onclick = () => {
        multipleDataModal.style.display = "block";
    };

    // Close Modals
    closeButtons.forEach(button => {
        button.onclick = () => {
            singleProductModal.style.display = "none";
            multipleDataModal.style.display = "none";
            deleteConfirmModal.style.display = "none";
            updateProductModal.style.display = "none";
        };
    });

    window.onclick = (event) => {
        if (event.target == singleProductModal) {
            singleProductModal.style.display = "none";
        }
        if (event.target == multipleDataModal) {
            multipleDataModal.style.display = "none";
        }
        if (event.target == deleteConfirmModal) {
            deleteConfirmModal.style.display = "none";
        }
        if (event.target == updateProductModal) {
            updateProductModal.style.display = "none";
        }
    };

    // Submit Single Product Form
    document.getElementById("singleProductForm").addEventListener("submit", (e) => {
        e.preventDefault();

        const brandName = document.getElementById("brandName").value;
        const productName = document.getElementById("productName").value;
        const productImageInput = document.getElementById("productImageInput");
        const offerPrice = document.getElementById("offerPrice").value;
        const originalPrice = document.getElementById("originalPrice").value;
        const dealPercentage = document.getElementById("dealPercentage").value;
        const sizes = document.getElementById("sizes").value;
        const rating = document.getElementById("rating").value;
        const category = document.getElementById("category").value;

        const fileReader = new FileReader();
        fileReader.onload = function(event) {
            const imgSrc = event.target.result;
            const row = productTableBody.insertRow();
            row.innerHTML = `
                <td>${productTableBody.rows.length + 1}</td>
                <td>${brandName}</td>
                <td>${productName}</td>
                <td><img src="${imgSrc}" alt="Product Image" width="50"></td>
                <td>${offerPrice}</td>
                <td>${originalPrice}</td>
                <td>${dealPercentage}%</td>
                <td>${sizes}</td>
                <td>${rating}</td>
                <td>${category}</td>
                <td>
                    <button class="deleteBtn">Delete</button>
                    <button class="updateBtn">Update</button>
                </td>
            `;

            // Add event listeners for delete and update buttons
            row.querySelector('.deleteBtn').addEventListener('click', () => {
                currentDeleteRow = row;
                deleteConfirmModal.style.display = "block";
            });

            row.querySelector('.updateBtn').addEventListener('click', () => {
                selectedRowIndex = Array.from(productTableBody.rows).indexOf(row);
                openUpdateModal(row);
            });
        };
        fileReader.readAsDataURL(productImageInput.files[0]);

        singleProductModal.style.display = "none";
    });

    // Handle Multiple Data File Upload
    excelFileInput.addEventListener("change", () => {
        fileNameDisplay.textContent = excelFileInput.files[0]?.name || '';
    });

    // Event listener for the submit button
    submitExcelBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const file = excelFileInput.files[0];
        if (file) {
            readExcelFile(file);
        } else {
            alert("Please select a file first.");
        }
        multipleDataModal.style.display = "none";
    });

    // Function to read Excel file and display data
    function readExcelFile(file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            // Clear existing table rows
            productTableBody.innerHTML = "";

            jsonData.forEach((product, index) => {
                const row = productTableBody.insertRow();
                const imgPath = product["Image Path"];

                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${product["Brand Name"] || 'N/A'}</td>
                    <td>${product["Product Name"] || 'N/A'}</td>
                    <td>
                        <img src="${imgPath}" alt="Product Image" width="50" onerror="this.onerror=null; this.src='fallback_image_url_here';">
                    </td>
                    <td>${product["Offer Price"] || 'N/A'}</td>
                    <td>${product["Original Price"] || 'N/A'}</td>
                    <td>${product["Deal Percentage"] || 'N/A'}%</td>
                    <td>${product["Sizes"] || 'N/A'}</td>
                    <td>${product["Rating"] || 'N/A'}</td>
                    <td>${product["Category"] || 'N/A'}</td>
                    <td>
                        <button class="deleteBtn">Delete</button>
                        <button class="updateBtn">Update</button>
                    </td>
                `;

                // Add event listeners for delete and update buttons
                row.querySelector('.deleteBtn').addEventListener('click', () => {
                    currentDeleteRow = row;
                    deleteConfirmModal.style.display = "block";
                });

                row.querySelector('.updateBtn').addEventListener('click', () => {
                    selectedRowIndex = Array.from(productTableBody.rows).indexOf(row);
                    openUpdateModal(row);
                });
            });
        };

        reader.readAsArrayBuffer(file);
    }

    // Delete confirmation handlers
    document.getElementById('confirmDelete').addEventListener('click', () => {
        currentDeleteRow.remove();
        updateRowNumbers();
        deleteConfirmModal.style.display = "none";
    });

    document.getElementById('cancelDelete').addEventListener('click', () => {
        deleteConfirmModal.style.display = "none";
    });

    // Update product form submission
    document.getElementById('updateProductForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const row = productTableBody.rows[selectedRowIndex];
        const cells = row.getElementsByTagName('td');

        cells[1].textContent = document.getElementById("updateBrandName").value;
        cells[2].textContent = document.getElementById("updateProductName").value;

        // Image handling
        const updateProductImageInput = document.getElementById("updateProductImageInput");
        if (updateProductImageInput.files.length > 0) {
            const fileReader = new FileReader();
            fileReader.onload = function(event) {
                const imgSrc = event.target.result;
                cells[3].innerHTML = `<img src="${imgSrc}" alt="Product Image" width="50">`;
            };
            fileReader.readAsDataURL(updateProductImageInput.files[0]);
        }

        cells[4].textContent = document.getElementById("updateOfferPrice").value;
        cells[5].textContent = document.getElementById("updateOriginalPrice").value;
        cells[6].textContent = document.getElementById("updateDealPercentage").value + '%';
        cells[7].textContent = document.getElementById("updateSizes").value;
        cells[8].textContent = document.getElementById("updateRating").value;
        cells[9].textContent = document.getElementById("updateCategory").value;

        updateProductModal.style.display = "none";
    });

    function openUpdateModal(row) {
        const cells = row.getElementsByTagName('td');

        document.getElementById("updateBrandName").value = cells[1].textContent;
        document.getElementById("updateProductName").value = cells[2].textContent;
        // Image handling if needed
        document.getElementById("updateOfferPrice").value = cells[4].textContent;
        document.getElementById("updateOriginalPrice").value = cells[5].textContent;
        document.getElementById("updateDealPercentage").value = cells[6].textContent.replace('%', '');
        document.getElementById("updateSizes").value = cells[7].textContent;
        document.getElementById("updateRating").value = cells[8].textContent;
        document.getElementById("updateCategory").value = cells[9].textContent;

        updateProductModal.style.display = "block";
    }

    function updateRowNumbers() {
        const rows = productTableBody.getElementsByTagName('tr');
        for (let i = 0; i < rows.length; i++) {
            rows[i].cells[0].textContent = i + 1;
        }
    }

    // Search and Filter
    searchInput.addEventListener('input', filterTable);
    filterSelect.addEventListener('change', filterTable);

    function filterTable() {
        const searchTerm = searchInput.value.toLowerCase();
        const filterBy = filterSelect.value;
        const rows = productTableBody.getElementsByTagName('tr');

        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            let showRow = false;

            const cellIndex = getFilterIndex(filterBy);
            if (cellIndex !== -1) {
                const cellValue = cells[cellIndex]?.textContent.toLowerCase();
                if (cellValue && cellValue.includes(searchTerm)) {
                    showRow = true;
                }
            }

            rows[i].style.display = showRow ? '' : 'none';
        }
    }

    function getFilterIndex(filterBy) {
        const columns = {
            brandName: 1,
            productName: 2,
            offerPrice: 4,
            originalPrice: 5,
            dealPercentage: 6,
            sizes: 7,
            rating: 8,
            category: 9
        };
        return columns[filterBy] || -1;
    }

    // Sidebar toggle
    document.getElementById('toggleSidebar').addEventListener('click', () => {
        let sidebar = document.getElementById('sidebar');
        let mainContent = document.querySelector('.main-content');
        if (sidebar.classList.contains('collapsed')) {
            sidebar.classList.remove('collapsed');
            mainContent.style.marginLeft = '0px';
            sidebar.style.width = '250px';
        } else {
            sidebar.classList.add('collapsed');
            mainContent.style.marginLeft = '0px';
            sidebar.style.padding = '8px 10px';
            sidebar.style.width = '70px';
        }
    });

    // Dark Mode Toggle
    document.getElementById('darkModeToggle').addEventListener('change', function() {
        document.body.classList.toggle('dark-mode');
    });
});
