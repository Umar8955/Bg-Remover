function updateAccount() {
  const email = document.getElementById('email').value;
  if (email) {
    alert('Account updated successfully with email: ' + email);
    // Here you can add Firebase auth or Firestore logic
  } else {
    alert('Please enter an email.');
  }
}
