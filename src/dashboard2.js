$(document).ready(function() {
    // Sidebar toggle
    $('#toggle-sidebar').on('click', function() {
        $('#sidebar').toggleClass('active');
    });

    // Load social media page on click
    $('#sidebar ul li a').on('click', function() {
        const url = $(this).data('url');
        $('#webview').attr('src', url);
        $('#current-icon').attr('class', $(this).find('i').attr('class') + ' fa-2x');
    });

    // Settings modal
    $('#settings-btn').on('click', function() {
        $('#settings-modal').modal('show');
    });

    // Night mode toggle
    $('#mode-toggle').on('change', function() {
        if ($(this).is(':checked')) {
            $('body').css('background-color', '#222');
            $('.top-bar, #sidebar').css('background-color', '#1c1c1c');
            $('iframe').css('filter', 'invert(1)');
        } else {
            $('body').css('background-color', '#f4f4f4');
            $('.top-bar, #sidebar').css('background-color', '#343a40');
            $('iframe').css('filter', 'invert(0)');
        }
    });

    // Navigation buttons
    $('#back-btn').on('click', function() {
        $('#webview')[0].contentWindow.history.back();
    });

    $('#forward-btn').on('click', function() {
        $('#webview')[0].contentWindow.history.forward();
    });

    $('#refresh-btn').on('click', function() {
        $('#webview')[0].contentWindow.location.reload();
    });
});
