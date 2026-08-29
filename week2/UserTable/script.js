async function fetchUserData(tableBodyId) {
    var tableBody = document.getElementById(tableBodyId);

    if (!tableBody) {
        console.log('Element not found: ' + tableBodyId);
        return;
    }

    try {
        var response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        var userData = await response.json();

        tableBody.innerHTML = '';

        for (var i = 0; i < userData.length; i++) {
            var user = userData[i];
            var street = 'N/A';
            var city = 'N/A';

            if (user.address && user.address.street) {
                street = user.address.street;
            }

            if (user.address && user.address.city) {
                city = user.address.city;
            }

            tableBody.innerHTML += '<tr>' +
                '<td>' + user.id + '</td>' +
                '<td>' + user.name + '</td>' +
                '<td>' + user.email + '</td>' +
                '<td>' + street + '</td>' +
                '<td>' + city + '</td>' +
                '</tr>';
        }
    } catch (error) {
        console.log('Error fetching user data:', error);
        tableBody.innerHTML = '<tr><td colspan="5" class="empty-message">Unable to load user data.</td></tr>';
    }
}

fetchUserData('user-table-body');