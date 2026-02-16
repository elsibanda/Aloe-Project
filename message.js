// Function to show a custom message box
function showMessage(message, type = 'success') {
    const messageBox = document.createElement('div');
    messageBox.id = 'messageBox';
    messageBox.classList.add('show');
    messageBox.innerText = message;

    // Set background color based on message type
    messageBox.style.backgroundColor = type === 'success' ? '#2ecc71' : '#e74c3c';

    document.body.appendChild(messageBox);

    // Remove the message box after 3 seconds
    setTimeout(() => {
        messageBox.classList.remove('show');
        document.body.removeChild(messageBox);
    }, 3000);
}
