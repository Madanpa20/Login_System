/**
 * Notification System
 * Handles generic toast notifications for the application.
 */

// Create Container
function initNotificationContainer() {
    if ($("#toast-container").length === 0) {
        $("body").append('<div id="toast-container" class="toast-container"></div>');
    }
}

/**
 * Show a generic toast notification
 * @param {string} type 'success', 'error', 'warning', 'info'
 * @param {string} title Title of the notification
 * @param {string} message Description message
 */
function showToast(type, title, message) {
    initNotificationContainer();

    let iconHtml = '';

    // Select Icon based on type
    switch (type) {
        case 'success':
            iconHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            break;
        case 'error':
            iconHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
            break;
        case 'warning':
            iconHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>';
            break;
        case 'info':
            iconHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
            break;
    }

    let toastHtml = `
        <div class="toast-box toast-${type}">
            <div class="toast-icon">${iconHtml}</div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" onclick="$(this).parent().remove();">&times;</button>
        </div>
    `;

    let $toast = $(toastHtml);
    $("#toast-container").append($toast);

    // Trigger animation
    setTimeout(() => {
        $toast.addClass("show");
    }, 10);

    // Auto remove
    setTimeout(() => {
        $toast.removeClass("show");
        setTimeout(() => {
            $toast.remove();
        }, 400); // 400ms matches transition
    }, 4000);
}
