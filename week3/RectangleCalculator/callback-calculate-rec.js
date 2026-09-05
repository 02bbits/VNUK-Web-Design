function calculatePerimeter(length, width, callback) {
    const perimeter = 2 * (length + width);
    callback(perimeter);
}

function calculateArea(length, width, callback) {
    const area = length * width;
    callback(area);
}

// Callback xử lý kết quả chu vi
function handlePerimeterResult(result) {
    document.getElementById("perimeterResult").innerText =
        `Chu vi hình chữ nhật là: ${result}`;
}

// Callback xử lý kết quả diện tích
function handleAreaResult(result) {
    document.getElementById("areaResult").innerText =
        `Diện tích hình chữ nhật là: ${result}`;
}

// Hàm chạy khi bấm nút
function runCalculation() {
    const length = parseFloat(document.getElementById("length").value);
    const width = parseFloat(document.getElementById("width").value);

    calculatePerimeter(length, width, handlePerimeterResult);
    calculateArea(length, width, handleAreaResult);

    const resultElement1 = document.getElementById("perimeterResult");
    resultElement1.hidden = false;
    const resultElement2 = document.getElementById("areaResult");
    resultElement2.hidden = false;
}

