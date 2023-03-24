$(document).ready(function() {
    // Load data from JSON file
    $.getJSON('MOCK_DATA.json', function(data) {
        // Loop through the data and add rows to the table
        $.each(data, function(key, value) {
            var row =   '<div class="row" id="article">' +
                            '<div class="col col-1"><span class="material-symbols-outlined">drag_indicator</span> <input type="checkbox" data-id="' + value.id + '"></div>' +
                            '<div class="col-8"><div class="row"><strong>' + value.title + '</strong></div>' +
                            '<div class="row"><span><i class="fa-solid fa-circle-user" style="color: #1ea10c;"></i> ' + value.author +' | <i class="fa-solid fa-calendar-days" style="color: #1ea10c;"></i></i> ' + value.date + '</span></div>' + 
                            '<div class="row"><div class="d-flex align-items-center"><span>'+ value.content.substring(0, 90) +'... </span><a class="view-article-btn" data-bs-toggle="modal" data-bs-target="#article-modal" data-id="' + value.id + '" style="text-decoration: none; cursor: pointer;"><i class="fa-solid fa-eye"></i> Read Full</a></div></div></div>' +
                            '<div class="col-3 text-end"><button class="btn btn-sm btn-outline-success btn-block mb-2"><b>#Sports</b></button> <a class="btn btn-sm btn-outline-success btn-block mb-2"><b>#Worldwide</b></a> <button class="btn btn-sm btn-outline-success btn-block mb-2"><b>#Local</b></button></div>' +
                        '</div>';
            // Append the row to the table body
            $('#article-list').append(row);
        });

        // Handle click event for view article button
        $('.view-article-btn').on('click', function() {
            // Get the article ID from the button data-id attribute
            var articleId = $(this).data('id');

            // Loop through the data to find the article with matching ID
            $.each(data, function(key, value) {
                if (value.id == articleId) {
                    // Update the modal content with the article details
                    $('#article-modal-title').text(value.title);
                    $('#article-modal-author-date').text(value.author + ' | ' + value.date);
                    $('#article-modal-content').text(value.content);
                    return false; // Exit the loop once the article is found
                }
            });
        });

        // Handle click event for delete button
        $('.delete-button').on('click', function() {
            // Get the list of selected checkboxes
            var selected = $('input:checked');

            // Loop through the selected checkboxes and remove their corresponding rows
            $.each(selected, function(key, value) {
                var articleId = $(this).data('id');
                $('#article-list').find('[data-id="' + articleId + '"]').closest('.row').remove();
            });
        });
    });
    // Attach click event handler to "Select All" checkbox
    $('#select-all').on('click', function() {
        // Get the state of the "Select All" checkbox
        var selectAllChecked = $(this).prop('checked');

        // Set the "checked" property of all the other checkboxes based on the state of the "Select All" checkbox
        $('input[type="checkbox"][data-id]').prop('checked', selectAllChecked);
    });
});
