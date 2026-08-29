const FemaleProducts = [
    {
        id: 1,
        name: "Áo sơ mi siêu vip pro",
        code: "F001",
        price: "290.000",
        image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Quần baggy",
        code: "REPO123",
        price: "398.000",
        image: "https://sakurafashion.vn/upload/sanpham/large/95451-quan-baggy-jean-nu-nhung-mieng-va-theu-hoa-1.jpg"
    },
    {
        id: 5,
        name: "Váy nữ mùa hè",
        code: "F002",
        price: "450.000",
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "Túi xách thời trang",
        code: "F003",
        price: "520.000",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80"
    }
];

const MaleProducts = [
    {
        id: 3,
        name: "Áo thun nam cao cấp",
        code: "M001",
        price: "390.999",
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Giày Sneakers",
        code: "M002",
        price: "5.900.00",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        name: "Áo khoác nam",
        code: "M003",
        price: "650.000",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        name: "Đồng hồ nam cổ điển",
        code: "M004",
        price: "890.000",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80"
    }
];

function displayProducts(products, containerId) {
    const productContainer = document.getElementById(containerId);

    productContainer.innerHTML = products.map(product => `
            <article class="product-card">
                <img class="product-image" src="${product.image}" alt="${product.name}">
                <div class="product-details">
                    <h3>${product.name}  -  ${product.code}</h3>
                    <div class="product-price">${product.price} vnd</div>
                </div>
                <button class="order-button" type="button">Đặt mua</button>
            </article>
        `).join("");
}

function loadProducts() {
    displayProducts(FemaleProducts, "femaleProducts");
    displayProducts(MaleProducts, "maleProducts");
}