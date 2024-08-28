const signupFormHandler = async (event) => {
    event.preventDefault();
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const confirmPassword = document.querySelector('#confirm-password-signup').value.trim();
    
    if (username && email && password && confirmPassword) {
        if (password === confirmPassword) {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                body: JSON.stringify({ username, email, password }),
                headers: { 'Content-Type': 'application/json' }
  
          });
        }         
}
};

document
.querySelector('.signup-form')
.addEventListener('submit', signupFormHandler);