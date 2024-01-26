document.addEventListener('DOMContentLoaded', function() {
    console.log("custom-add_to_cart.js loaded");

    const handbagVariantId = '42058171711535';
    const jacketVariantId = '42054053167151';

    document.addEventListener('click', function(event) {
        if (event.target.id.includes('ProductSubmitButton')) {
            const selectedVariantInput = document.querySelector('.product-variant-id');
            if (selectedVariantInput && selectedVariantInput.value === handbagVariantId) {
                event.preventDefault();
                addToCart(handbagVariantId).then(() => addToCart(jacketVariantId));
            }
        }
    });

    function addToCart(variantId) {
        console.log(`Attempting to add variant ${variantId} to cart`);
        return fetch('/cart/add.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: variantId, quantity: 1 })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Item added to cart:', data);
            return data;
        })
        .catch(error => console.error('Error adding item to cart:', error));
    }


    
});
