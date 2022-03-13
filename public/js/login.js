const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const creatorname = document.querySelector('#creator-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (creatorname && password) {
      const response = await fetch('/api/creators/login', {
        method: 'POST',
        body: JSON.stringify({ creatorname, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('OOOOOPS, try again!');
      }
    }
  };
  
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const creatorname = document.querySelector('#creatorname-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (creatorname && password) {
      const response = await fetch('/api/creators', {
        method: 'POST',
        body: JSON.stringify({ creatorname, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
  