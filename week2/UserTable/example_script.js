// Hàm lấy dữ liệu từ API
async function fetchFoodData() {
    try {
        const response = await fetch('https://api.example.com/foods');

        // Kiểm tra xem phản hồi có thành công không
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const foodData = await response.json();

        // Duyệt qua từng sản phẩm thực phẩm và destructure dữ liệu
        foodData.forEach(({ id, name, price, description, ingredients }) => {
            console.log(`ID: ${id}`);
            console.log(`Name: ${name}`);
            console.log(`Price: $${price}`);
            console.log(`Description: ${description}`);
            console.log(`Ingredients: ${ingredients.join(', ')}`);
            console.log('--------------------');
        });

    } catch (error) {
        console.error('Error fetching food data:', error);
    }
}

// Gọi hàm để thực hiện yêu cầu API
fetchFoodData();
