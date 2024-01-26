

document.addEventListener('DOMContentLoaded', function() {
    const LEATHER_BAG_VARIANT_ID = "42058171711535"; 
    const WINTER_JACKET_VARIANT_ID = "42054053167151"; 

    
    function isLeatherBagInCart(cart) {
        return cart.items.some(item => item.id === LEATHER_BAG_VARIANT_ID);
    }

    
    function addWinterJacket() {
        fetch('/cart/add.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: [{
                    id: WINTER_JACKET_VARIANT_ID,
                    quantity: 1,
                    properties: { '_price': '0.01' }
                }]
            })
        }).then(response => response.json())
          .then(data => console.log('Winter Jacket added', data))
          .catch(error => console.error('Error adding Winter Jacket', error));
    }

    
    function removeWinterJacket() {
        fetch('/cart/change.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: WINTER_JACKET_VARIANT_ID,
                quantity: 0
            })
        }).then(response => response.json())
          .then(data => console.log('Winter Jacket removed', data))
          .catch(error => console.error('Error removing Winter Jacket', error));
    }

    
    document.addEventListener('cart:updated', function(event) {
        const cart = event.detail.cart;

        
        if (isLeatherBagInCart(cart)) {
            addWinterJacket();
        } else {
            removeWinterJacket();
        }
    });
});
