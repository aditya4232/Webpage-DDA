document.getElementById('checkForDuplicates').addEventListener('click', checkForDuplicates);

function checkForDuplicates() {
    // Simulate checking for duplicates
    let duplicates = detectDuplicates();

    if (duplicates.length > 0) {
        showAlert(`Duplicates detected: ${duplicates.join(', ')}`);
    } else {
        showAlert('No duplicates found.');
    }
}

function detectDuplicates() {
    // Dummy function to simulate duplicate detection
    // Replace with actual logic or data fetching
    const sampleData = ['file1.jpg', 'file2.jpg', 'file1.jpg']; // Example data
    let duplicates = [];
    let seen = new Set();

    sampleData.forEach(item => {
        if (seen.has(item)) {
            duplicates.push(item);
        } else {
            seen.add(item);
        }
    });

    return Array.from(new Set(duplicates)); // Return unique duplicates
}

function showAlert(message) {
    const alertBox = document.getElementById('alertBox');
    alertBox.textContent = message;
    alertBox.style.display = 'block';
}
