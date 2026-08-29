// 1. Support for Constants (const): Khai báo hằng số, biến không thể được gán lại giá trị sau khi đã khởi tạo.
const PI = 3.14159; 

// 2. Block Scope (let & const): Biến được khai báo bằng 'let' hoặc 'const' chỉ tồn tại và có thể truy cập bên trong khối lệnh {} chứa nó.
if (true) { 
    let x = 10; 
    console.log(x); // 10 
}
console.log(x); // Lỗi: x is not defined (do 'let' có phạm vi khối)

// 3. Arrow Functions: Cú pháp ngắn gọn hơn để viết các hàm (hàm mũi tên), không có 'this' riêng.
const add = (a, b) => a + b; 
console.log(add(5, 3)); // 8


// 4. Extended Parameter Handling (Rest & Spread)
// Rest Parameters: Gom nhiều đối số truyền vào hàm thành một mảng duy nhất.
function sum(...numbers) { 
    return numbers.reduce((acc, num) => acc + num, 0); 
}

console.log(sum(1, 2, 3, 4)); // 10

// Spread Operator: Phân tách các phần tử của một mảng (hoặc object) để thêm vào một mảng (hoặc object) khác.
const arr1 = [1, 2, 3]; 
const arr2 = [...arr1, 4, 5]; 

console.log(arr2); // [1, 2, 3, 4, 5]

// 5. Template Literals: Cho phép nối chuỗi và nhúng biến/biểu thức trực tiếp vào chuỗi thông qua cú pháp `${}`.
const name = "Alice"; 
const greeting = `Hello, ${name}!`; 
console.log(greeting); // "Hello, Alice!"

// 6. Extended Literals: Hỗ trợ viết các cơ số trực tiếp: nhị phân (0b), bát phân (0o), thập lục phân (0x).

console.log(0b1010); // 10 (Binary) 
console.log(0o52); // 42 (Octal) 
console.log(0x2A); // 42 (Hexadecimal)

// 7. Enhanced Object Properties: Cú pháp khởi tạo object ngắn gọn khi tên thuộc tính và tên biến chứa giá trị giống hệt nhau.
const name2 = "John"; 
const age = 25; 
const person = { name: name2, age }; // Biến name2 được dùng để tránh lỗi trùng lặp với phần 5
console.log(person); // { name: "John", age: 25 }

// 8. Destructuring Assignment: Cú pháp cho phép "giải nén" các thuộc tính từ object hoặc mảng và gán chúng cho các biến riêng biệt.
const user = { userName: "Alice", userAge: 30 }; 
const { userName, userAge } = user; 
console.log(userName); // "Alice" 
console.log(userAge); // 30

// 9. Modules (Export & Import): Cơ chế tách mã thành các tệp riêng biệt để tái sử dụng.

// module.js - Xuất (export) hàm để file khác có thể dùng
export const greet = (name) => `Hello, ${name}!`;

// main.js - Nhập (import) hàm từ file khác vào
import { greet } from "./module.js"; 
console.log(greet("Alice")); // "Hello, Alice!"

// 10. Classes: Cú pháp hướng đối tượng (OOP) rõ ràng hơn, giúp khởi tạo đối tượng với constructor và các phương thức (methods).
class Person { 
    constructor(name) { 
        this.name = name; 
    } 
    greet() { 
        return `Hello, my name is ${this.name}`; 
    } 
} 
const newPerson = new Person("Bob"); 
console.log(newPerson.greet()); // "Hello, my name is Bob"

// 11. Iterators: Cơ chế giúp đối tượng có thể được duyệt qua (iterable) từng phần tử một bằng cách gọi phương thức next().
const arr = [1, 2, 3]; 
const iterator = arr[Symbol.iterator](); 
console.log(iterator.next().value); // 1 
console.log(iterator.next().value); // 2 
console.log(iterator.next().value); // 3

// 12. Generators: Các hàm có khả năng tạm dừng thực thi tại từ khóa 'yield' và tiếp tục lại sau đó, trả về một Iterator.
function* generateNumbers() { 
    yield 1; 
    yield 2; 
    yield 3; 
} 
const gen = generateNumbers(); 
console.log(gen.next().value); // 1 
console.log(gen.next().value); // 2 
console.log(gen.next().value); // 3

// 13. Collections (Map & Set)
// Map: Cấu trúc dữ liệu lưu trữ theo dạng cặp key-value, cho phép key là mọi kiểu dữ liệu.
const map = new Map(); 
map.set("name", "Alice"); 
console.log(map.get("name")); // "Alice"

// Set: Cấu trúc dữ liệu lưu trữ tập hợp các giá trị, tự động loại bỏ các giá trị trùng lặp.
const set = new Set([1, 2, 2, 3]); 
console.log(set); // Set { 1, 2, 3 } (Không có giá trị trùng lặp)

// 14. New Built-in Methods: Các hàm tiện ích mới được thêm vào cho mảng và chuỗi.
console.log([1, 2, 3].includes(2)); // true (Kiểm tra mảng có chứa giá trị không)
console.log("Hello".startsWith("He")); // true (Kiểm tra chuỗi bắt đầu bằng từ khóa không)
console.log("Hello".endsWith("lo")); // true (Kiểm tra chuỗi kết thúc bằng từ khóa không)

// 15. Promises: Đối tượng đại diện cho một tác vụ bất đồng bộ (hoàn thành hoặc thất bại) trong tương lai.
const fetchData = () => { 
    return new Promise((resolve, reject) => { 
        setTimeout(() => resolve("Data received"), 2000); 
    }); 
}; 
fetchData().then(console.log); // "Data received" (sau 2 giây)
