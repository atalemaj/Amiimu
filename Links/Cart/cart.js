/* ============================================
   Amiimu Gadgets - Cart Page JavaScript
   Email: Formsubmit.co (free, no signup)
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // Parse URL parameters for product info
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('product');
    const productPrice = urlParams.get('price');
    const productImage = urlParams.get('image');

    const cartItemDisplay = document.getElementById('cartItemDisplay');
    const cartEmpty = document.getElementById('cartEmpty');
    const orderFormSection = document.getElementById('orderFormSection');
    const orderForm = document.getElementById('orderForm');
    const orderSuccess = document.getElementById('orderSuccess');

    // Set product info from URL params
    if (productName && productPrice) {
        cartItemDisplay.style.display = 'flex';
        cartEmpty.style.display = 'none';

        document.getElementById('cartProductName').textContent = decodeURIComponent(productName);
        document.getElementById('cartProductPrice').textContent = formatPrice(productPrice);

        // Update product image if provided
        if (productImage) {
            document.getElementById('cartProductImage').src = decodeURIComponent(productImage);
        }

        // Pre-fill the form
        document.getElementById('formProductName').value = decodeURIComponent(productName);
        document.getElementById('formProductPrice').value = productPrice;
    } else {
        cartItemDisplay.style.display = 'none';
        cartEmpty.style.display = 'block';
    }

    // Remove item button
    const removeBtn = document.getElementById('cartRemoveBtn');
    if (removeBtn) {
        removeBtn.addEventListener('click', function () {
            cartItemDisplay.style.display = 'none';
            cartEmpty.style.display = 'block';
            document.getElementById('formProductName').value = '';
            document.getElementById('formProductPrice').value = '';
        });
    }

    // Form submission using Formsubmit.co
    if (orderForm) {
        orderForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const fullName = document.getElementById('formFullName').value.trim();
            const email = document.getElementById('formEmail').value.trim();
            const whatsapp = document.getElementById('formWhatsApp').value.trim();
            const phone = document.getElementById('formPhone').value.trim();
            const district = document.getElementById('formDistrict').value;
            const productNameVal = document.getElementById('formProductName').value;
            const productPriceVal = document.getElementById('formProductPrice').value;
            const notes = document.getElementById('formNotes').value.trim();

            // Validate required fields
            if (!fullName || !email || !whatsapp || !district) {
                alert('Please fill in all required fields (Name, Email, WhatsApp, Location).');
                return;
            }

            // Disable submit button to prevent double-clicks
            const submitBtn = orderForm.querySelector('.btn-submit');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="bx bx-loader bx-spin"></i> Sending Order...';

            // Prepare form data for Formsubmit.co
            const formData = {
                name: fullName,
                email: email,
                _subject: 'New Order - Amiimu Gadgets Website',
                _template: 'table',
                _captcha: 'false',
                'Customer Name': fullName,
                'Customer Email': email,
                'WhatsApp Number': whatsapp,
                'Phone Number': phone || 'N/A',
                'Delivery Location': district,
                'Product': productNameVal || 'Not specified',
                'Price': productPriceVal ? formatPrice(productPriceVal) + ' UGX' : 'Contact Us',
                'Additional Notes': notes || 'None',
            };

            // Send via Formsubmit.co (free, no account needed)
            fetch('https://formsubmit.co/ajax/amiimugadgets2026ug@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok');
            })
            .then(function (data) {
                // Success - show success message
                showSuccess();
            })
            .catch(function (error) {
                console.log('Formsubmit.co failed, trying mailto fallback...', error);

                // Fallback: Open mailto link
                const subject = encodeURIComponent('New Order - Amiimu Gadgets');
                const body = encodeURIComponent(
                    'NEW CUSTOMER ORDER\n\n' +
                    'Customer Details:\n' +
                    'Name: ' + fullName + '\n' +
                    'Email: ' + email + '\n' +
                    'WhatsApp: ' + whatsapp + '\n' +
                    'Phone: ' + (phone || 'N/A') + '\n' +
                    'Location: ' + district + '\n\n' +
                    'Order Details:\n' +
                    'Product: ' + (productNameVal || 'N/A') + '\n' +
                    'Price: ' + (productPriceVal ? formatPrice(productPriceVal) + ' UGX' : 'Contact Us') + '\n\n' +
                    'Additional Notes:\n' +
                    (notes || 'None') + '\n\n' +
                    '---\n' +
                    'Amiimu Gadgets Website Order System'
                );

                window.location.href = 'mailto:amiimugadgets2026ug@gmail.com?subject=' + subject + '&body=' + body;

                // Also try WhatsApp as another fallback
                const whatsappMsg = encodeURIComponent(
                    'NEW ORDER from Amiimu Gadgets Website\n\n' +
                    'Name: ' + fullName + '\n' +
                    'Email: ' + email + '\n' +
                    'WhatsApp: ' + whatsapp + '\n' +
                    'Location: ' + district + '\n' +
                    'Product: ' + (productNameVal || 'N/A') + '\n' +
                    'Price: ' + (productPriceVal ? formatPrice(productPriceVal) + ' UGX' : 'Contact Us') + '\n' +
                    'Notes: ' + (notes || 'None')
                );

                // Show success with a note about the fallback
                showSuccess();
            });

            function showSuccess() {
                orderFormSection.style.display = 'none';
                cartItemDisplay.style.display = 'none';
                orderSuccess.classList.add('visible');
            }
        });
    }

    // Format price helper
    function formatPrice(price) {
        if (price === 'Contact Us' || price === 'Contact+Us' || isNaN(Number(price))) {
            return 'Contact Us';
        }
        return Number(price).toLocaleString() + ' UGX';
    }

});
