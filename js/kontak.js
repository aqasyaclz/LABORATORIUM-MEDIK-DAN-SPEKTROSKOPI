// Form Validation and Submission
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const nama = document.getElementById('nama').value.trim();
            const email = document.getElementById('email').value.trim();
            const subjek = document.getElementById('subjek').value;
            const pesan = document.getElementById('pesan').value.trim();

            // Validation
            if (!nama || !email || subjek === '' || !pesan) {
                showMessage('Mohon lengkapi semua field yang diperlukan', 'error');
                return;
            }

            // Email validation
            if (!validateEmail(email)) {
                showMessage('Format email tidak valid', 'error');
                return;
            }

            // Prepare email data
            const emailSubject = `[${subjek}] Pesan dari ${nama}`;
            const emailBody = `Nama: ${nama}\nEmail: ${email}\nSubjek: ${subjek}\n\nPesan:\n${pesan}`;

            // Create mailto link
            const mailtoLink = `mailto:tasyhasridesiana12@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

            // Open email client
            window.location.href = mailtoLink;

            // Show success message
            showMessage('Aplikasi email Anda akan terbuka. Silakan kirim pesan.', 'success');

            // Reset form after short delay
            setTimeout(() => {
                contactForm.reset();
            }, 1000);
        });
    }

    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Show message function
    function showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;

        // Style the message
        messageDiv.style.cssText = `
            padding: 1rem 1.5rem;
            margin-bottom: 1.5rem;
            border-radius: 10px;
            font-weight: 500;
            animation: slideIn 0.3s ease;
        `;

        if (type === 'success') {
            messageDiv.style.background = 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)';
            messageDiv.style.color = '#065f46';
            messageDiv.style.border = '1px solid #6ee7b7';
        } else {
            messageDiv.style.background = 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)';
            messageDiv.style.color = '#991b1b';
            messageDiv.style.border = '1px solid #fca5a5';
        }

        // Insert message before form
        contactForm.insertBefore(messageDiv, contactForm.firstChild);

        // Auto remove after 5 seconds
        setTimeout(() => {
            messageDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => messageDiv.remove(), 300);
        }, 5000);
    }

    // Add slide in/out animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-10px);
            }
        }
    `;
    document.head.appendChild(style);

    // Real-time input validation feedback
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            if (this.value.trim() === '' && this.hasAttribute('required')) {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '#10b981';
            }
        });

        input.addEventListener('focus', function () {
            this.style.borderColor = '#2563eb';
        });
    });

    // Email field specific validation
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function () {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#ef4444';
                showFieldError(this, 'Format email tidak valid');
            } else if (this.value) {
                this.style.borderColor = '#10b981';
                removeFieldError(this);
            }
        });
    }

    function showFieldError(field, message) {
        removeFieldError(field);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        `;
        field.parentNode.appendChild(errorDiv);
    }

    function removeFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    // Character counter for textarea
    const pesanTextarea = document.getElementById('pesan');
    if (pesanTextarea) {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = `
            text-align: right;
            color: #64748b;
            font-size: 0.875rem;
            margin-top: 0.5rem;
        `;
        pesanTextarea.parentNode.appendChild(counter);

        pesanTextarea.addEventListener('input', function () {
            const count = this.value.length;
            counter.textContent = `${count} karakter`;

            if (count > 500) {
                counter.style.color = '#ef4444';
            } else {
                counter.style.color = '#64748b';
            }
        });
    }
});
