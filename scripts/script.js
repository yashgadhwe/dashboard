document.addEventListener("DOMContentLoaded", () => {
    // Define the table body
    const productTableBody = document.querySelector("#productTable tbody");

    // Sidebar toggle
    document.getElementById('toggleSidebar').addEventListener('click', () => {
        let sidebar = document.getElementById('sidebar');
        let mainContent = document.querySelector('.main-content');
        if (sidebar.classList.contains('collapsed')) {
            sidebar.classList.remove('collapsed');
            mainContent.style.marginLeft = '0px'; // Reset margin for expanded state
            sidebar.style.width = '250px'
        } else {
            sidebar.classList.add('collapsed');
            mainContent.style.marginLeft = '0px'; // Adjust margin for collapsed state
            sidebar.style.padding = '8px 10px'
            sidebar.style.width = '70px'
        }
    });

    

    // Dark mode toggle
    document.getElementById('darkModeToggle').addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Search functionality
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
