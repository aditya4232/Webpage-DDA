$(document).ready(function() {
    $('#download-url-form').on('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission

        var fileUrl = $('#url').val();
        var fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1); // Extract the file name from the URL

        var fileExists = false;
        $('#file-list li').each(function() {
            if ($(this).data('file') === fileName) {
                fileExists = true;
            }
        });

        if (fileExists) {
            if (confirm("File already exists: " + fileName + ". Do you want to download it anyway?")) {
                // Download the file
                window.location.href = fileUrl; // Adjust as needed to actually download the file
            } else {
                // Highlight the existing file in the list
                $('#file-list li').removeClass('highlight'); // Remove highlight from all
                $('#file-list li[data-file="' + fileName + '"]').addClass('highlight');
            }
        } else {
            // Add the new file to the list
            $('#file-list').append('<li data-file="' + fileName + '">' + fileName + '</li>');
        }
    });
});
