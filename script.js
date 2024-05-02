const canvas = document.getElementById('whiteboard');
const context = canvas.getContext('2d');
const resetBtn = document.getElementById('resetBtn');
const colorPicker = document.getElementById('colorPicker');
const bgColorPicker = document.getElementById('bgColorPicker');

let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Function to update canvas background color
function updateBackgroundColor(color) {
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

// Initialize background color to white
updateBackgroundColor('#ffffff');

// Function to reset canvas content and background color
function resetCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    updateBackgroundColor('#ffffff'); // Reset background color to white
}

canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    [lastX, lastY] = [event.offsetX, event.offsetY];
});

canvas.addEventListener('mousemove', (event) => {
    if (!isDrawing) return;
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(event.offsetX, event.offsetY);
    context.strokeStyle = colorPicker.value;
    context.stroke();
    [lastX, lastY] = [event.offsetX, event.offsetY];
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

resetBtn.addEventListener('click', () => {
    resetCanvas();
});

document.getElementById('downloadBtn').addEventListener('click', () => {
    const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const link = document.createElement('a');
    link.setAttribute('download', 'signature.png');
    link.setAttribute('href', image);
    link.click();
});

// Event listener for background color picker
bgColorPicker.addEventListener('input', () => {
    updateBackgroundColor(bgColorPicker.value);
});
