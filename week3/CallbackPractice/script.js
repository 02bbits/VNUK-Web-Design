async function fetchUserData(tableBodyId, callback) {
    var tableBody = document.getElementById(tableBodyId);

    if (!tableBody) {
        console.log('Element not found: ' + tableBodyId);
        return;
    }

    try {
        var response = await fetch('https://6aa0dbb52703577aa1e31450.mockapi.io/products')
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
            })
          .then(result => {
            callback(null, result);
            return result;
          })
          .catch(error => {
              callback(error, null);
          });

        tableBody.innerHTML = '';

        for (var i = 0; i < response.length; i++) {
            var product = response[i];

            tableBody.innerHTML += '<tr>' +
                '<td>' + product.id + '</td>' +
                '<td>' + product.name + '</td>' +
                '<td>' + product.price + '</td>' +
                '</tr>';
        }

    } catch (error) {
        console.log('Error fetching product data:', error);
        tableBody.innerHTML = '<tr><td colspan="5" class="empty-message">Unable to load user data.</td></tr>';
        if (callback) {
            callback(error, null);
        }
    }
}
function handleAPIData(error, data) {
  if (error) {
    console.log("Something when wrong when fetching API:", error);
  } else {
    console.log('Data from API:', data);
  }
}

fetchUserData('user-table-body', handleAPIData);
