document.addEventListener('DOMContentLoaded', function() {
    console.log('Custom cart modification script loaded');

    function clearCart() {
        console.log('Clearing cart...');
        // Add a cache-busting parameter to the URL
        const url = '/cart/clear.js' + '?cache=' + Date.now();
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Cart cleared:', data);
        })
        .catch(error => {
            console.error('Error clearing cart:', error);
        });
    }

    function checkAndClearCart() {
        fetch('/cart.js')
            .then(response => response.json())
            .then(cart => {
                console.log('Current cart state:', cart);

               
                let totalPrice = 0;
                cart.items.forEach(item => {
                    totalPrice += item.price * item.quantity;
                });
                console.log('Total cart price:', totalPrice);

                
                if (totalPrice <= 1) {
                    clearCart();
                }
            })
            .catch(error => {
                console.error('Error checking cart:', error);
            });
    }

    
    document.body.addEventListener('click', function(event) {
        if (event.target.id && event.target.id.startsWith('Remove-')) {
            console.log('Cart item removal detected, clearing cart...');
            // Clear the cart immediately when a "Remove" button is clicked
            clearCart();
        }
    });

    checkAndClearCart(); 
});
