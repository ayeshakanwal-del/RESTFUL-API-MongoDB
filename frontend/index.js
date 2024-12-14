const apiBaseURL = 'http://localhost:3000/api/items'; // Backend API URL

// Fetch and display items
function fetchItems() {
    $.ajax({
        url: apiBaseURL,
        method: 'GET',
        success: (items) => {
            $('#itemsList').empty(); 
            items.forEach((item) => {
                $('#itemsList').append(`
                    <div class="item" data-id="${item._id}">
                        <span>${item.name} - $${item.price}</span>
                        <div>
                            <button class="update" onclick="updateItem('${item._id}')">Update</button>
                            <button onclick="deleteItem('${item._id}')">Delete</button>
                        </div>
                    </div>
                `);
            });
        },
        error: (err) => console.error('Error fetching items:', err),
    });
}

// Add new item
$('#addDataButton').click(() => {
    const name = $('#productTitle').val();
    const price = $('#productPrice').val();

    if (name && price) {
        $.ajax({
            url: apiBaseURL,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name, price: parseFloat(price) }),
            success: () => {
                alert('Item added successfully!');
                $('#productTitle').val(''); 
                $('#productPrice').val('');
                fetchItems(); // Refresh the list
            },
            error: (err) => console.error('Error adding item:', err),
        });
    } else {
        alert('Please enter a name and price.');
    }
});

// Update item
function updateItem(id) {
    const newName = prompt('Enter the new item name:');
    const newPrice = prompt('Enter the new price:');

    if (newName && newPrice) {
        $.ajax({
            url: `${apiBaseURL}/${id}`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ name: newName, price: parseFloat(newPrice) }),
            success: () => {
                alert('Item updated successfully!');
                fetchItems(); 
            },
            error: (err) => console.error('Error updating item:', err),
        });
    }
}

// Delete item
function deleteItem(id) {
    if (confirm('Are you sure you want to delete this item?')) {
        $.ajax({
            url: `${apiBaseURL}/${id}`,
            method: 'DELETE',
            success: () => {
                alert('Item deleted successfully!');
                fetchItems(); 
            },
            error: (err) => console.error('Error deleting item:', err),
        });
    }
}

// Fetch items when page loads (optional)
//$(document).ready(() => {
  //  fetchItems(); // Fetch items on page load

    
    $('#getDataButton').click(() => {
        fetchItems(); 
    });
//});
