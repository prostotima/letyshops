document.getElementById('login-form').addEventListener('submit', function(event) {
    
    event.preventDefault();

    const login = document.getElementById('login').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const errorMsg = document.getElementById('error-message');
    
    let errors = [];

  
    const loginRegex = /^[a-zA-Z0-9]{3,20}$/;
    if (!login.match(loginRegex)) {
        errors.push("Логін має містити 3-20 латинських символів або цифр.");
    }

   
    const emailRegex = /@.*\./; 
    if (email.search(emailRegex) === -1) {
        errors.push("Email введено некоректно.");
    }

    
    const phoneRegex = /^\+380\d{9}$/;
    if (!phone.match(phoneRegex)) {
        errors.push("Телефон має бути у форматі +380XXXXXXXXX");
    }


    if (errors.length > 0) {
        errorMsg.style.display = 'block';
        errorMsg.innerHTML = errors.join('<br>');
    } else {
        errorMsg.style.display = 'none';
        alert('Дані валідовані успішно! Вхід дозволено.');
        
    }
});