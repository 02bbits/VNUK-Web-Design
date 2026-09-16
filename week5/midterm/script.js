export class TourDuLich {
    static baseUrl = "https://6aa0dbb52703577aa1e31450.mockapi.io/TourDuLich";

    constructor(ten, moTa, hinhAnh, ngayKhoiHanh, ngayKetThuc, gia, id = null) {
        this.ten = ten;
        this.moTa = moTa;
        this.hinhAnh = hinhAnh;
        this.ngayKhoiHanh = ngayKhoiHanh;
        this.ngayKetThuc = ngayKetThuc;
        this.gia = gia;
        this.id = id;
    }

    static async getAll() {
        const response = await fetch(TourDuLich.baseUrl);
        if (!response.ok) throw new Error("Không thể tải danh sách tour.");

        return response.json();
    }

    async taoTour() {
        return this.sendRequest(TourDuLich.baseUrl, "POST");
    }

    static async capNhatTour(id, data) {
        const response = await fetch(`${TourDuLich.baseUrl}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error("Không thể cập nhật tour.");
        return response.json();
    }

    static async xoaTour(id) {
        const response = await fetch(`${TourDuLich.baseUrl}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error("Không thể xóa tour.");
    }

    async sendRequest(url, method) {
        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.toJSON())
        });

        if (!response.ok) throw new Error("Không thể thêm tour.");
        return response.json();
    }

    toJSON() {
        return {
            ten: this.ten,
            moTa: this.moTa,
            hinhAnh: this.hinhAnh,
            ngayKhoiHanh: this.ngayKhoiHanh,
            ngayKetThuc: this.ngayKetThuc,
            gia: this.gia
        };
    }
}

const productContainer = document.getElementById("product-container");
const tourCount = document.getElementById("tour-count");
const tourForm = document.getElementById("tour-form");
const formTitle = document.getElementById("form-title");
const formMessage = document.getElementById("form-message");
const tourSelect = document.getElementById("tour-select");

let tours = [];

function formatDate(date) {
    return new Date(date).toLocaleDateString("vi-VN");
}

function formatPrice(price) {
    return `${Number(price).toLocaleString("vi-VN")} VNĐ`;
}

function dateForInput(date) {
    const value = new Date(date);
    const offset = value.getTimezoneOffset() * 60000;
    return new Date(value.getTime() - offset).toISOString().slice(0, 16);
}

function createTourCard(tour) {
    const imageUrl = tour.hinhAnh || `https://picsum.photos/seed/${tour.id}/400/300`;

    return `
        <article class="product-card">
            <img class="product-image" src="${imageUrl}" alt="${tour.ten}">
            <div class="product-content">
                <h3 class="product-title">Tour ID ${tour.id}</h3>
                <h3 class="product-title">${tour.ten}</h3>
                <p class="product-desc">${tour.moTa}</p>
                <p class="product-dates">Từ ${formatDate(tour.ngayKhoiHanh)} đến ${formatDate(tour.ngayKetThuc)}</p>
                <p class="product-price">${formatPrice(tour.gia)}</p>
            </div>
            <div class="actions">
                <button class="btn-book">Đặt Tour</button>
            </div>
        </article>
    `;
}

function showTours() {
    productContainer.innerHTML = tours.map(createTourCard).join("");
    tourCount.textContent = `${tours.length} tour`;
    tourSelect.innerHTML = '<option value="">Tour mới</option>';

    tours.forEach((tour) => {
        tourSelect.innerHTML += `<option value="${tour.id}">${tour.ten}</option>`;
    });
}

async function getTours() {
    tours = await TourDuLich.getAll();
    showTours();
}

function getFormData() {
    return {
        ten: document.getElementById("tour-name").value,
        moTa: document.getElementById("tour-description").value,
        hinhAnh: document.getElementById("tour-image").value,
        ngayKhoiHanh: document.getElementById("start-date").value,
        ngayKetThuc: document.getElementById("end-date").value,
        gia: document.getElementById("tour-price").value
    };
}

function fillForm(tour) {
    document.getElementById("tour-id").value = tour.id;
    document.getElementById("tour-name").value = tour.ten;
    document.getElementById("tour-description").value = tour.moTa;
    document.getElementById("tour-image").value = tour.hinhAnh || "";
    document.getElementById("start-date").value = dateForInput(tour.ngayKhoiHanh);
    document.getElementById("end-date").value = dateForInput(tour.ngayKetThuc);
    document.getElementById("tour-price").value = tour.gia;
    formTitle.textContent = "Cập nhật tour";
}

function clearForm() {
    tourForm.reset();
    document.getElementById("tour-id").value = "";
    formTitle.textContent = "Thêm tour mới";
}

async function saveTour(event) {
    event.preventDefault();
    const data = getFormData();
    const id = document.getElementById("tour-id").value;

    if (id) {
        await TourDuLich.capNhatTour(id, data);
        formMessage.textContent = "Đã cập nhật tour.";
    } else {
        const newTour = new TourDuLich(
            data.ten,
            data.moTa,
            data.hinhAnh,
            data.ngayKhoiHanh,
            data.ngayKetThuc,
            data.gia
        );
        await newTour.taoTour();
        formMessage.textContent = "Đã thêm tour.";
    }

    await getTours();
    clearForm();
}

async function deleteTour(id) {
    if (!confirm("Bạn có chắc muốn xóa tour này không?")) return;

    await TourDuLich.xoaTour(id);
    await getTours();
    clearForm();
    formMessage.textContent = "Đã xóa tour.";
}

function showError(error) {
    formMessage.textContent = error.message;
    console.error(error);
}

tourForm.addEventListener("submit", (event) => saveTour(event).catch(showError));
document.getElementById("cancel-button").addEventListener("click", clearForm);

tourSelect.addEventListener("change", () => {
    const tour = tours.find((item) => String(item.id) === tourSelect.value);
    if (tour) fillForm(tour);
    else clearForm();
});

document.getElementById("edit-button").addEventListener("click", () => {
    const tour = tours.find((item) => String(item.id) === tourSelect.value);
    if (tour) fillForm(tour);
    else formMessage.textContent = "Hãy chọn tour cần sửa.";
});

document.getElementById("delete-button").addEventListener("click", () => {
    if (!tourSelect.value) {
        formMessage.textContent = "Hãy chọn tour cần xóa.";
        return;
    }

    deleteTour(tourSelect.value).catch(showError);
});

getTours().catch(showError);
