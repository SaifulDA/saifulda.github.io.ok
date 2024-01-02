window.onload = function() {
  var form = document.forms["submit-pesan"];
  var emailInput = form.elements["email"];
  var namaInput = form.elements["nama"];
  var pesanInput = form.elements["pesan"];
  var alertBox = document.querySelector(".my-alert");

  form.addEventListener("submit", function(event) {
    event.preventDefault(); // Menghentikan pengiriman formulir secara default

    if (validateForm()) {
      showAlert("Terima Kasih! Kami Telah Menerima Pesan Anda.", "alert-success");
      resetForm();
    }
  });

  function validateForm() {
    if (!validateEmail(emailInput.value)) {
      showAlert("Email harus diisi", "alert-danger");
      return false;
    }

    if (namaInput.value.trim() === "") {
      showAlert("Nama Lengkap harus diisi", "alert-danger");
      return false;
    }

    if (pesanInput.value.trim() === "") {
      showAlert("Pesan harus diisi", "alert-danger");
      return false;
    }

    return true;
  }

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function showAlert(message, alertClass) {
    alertBox.textContent = message;
    alertBox.classList.remove("d-none");
    alertBox.classList.toggle("alert-danger", alertClass === "alert-danger");
    alertBox.classList.toggle("alert-success", alertClass === "alert-success");
  }

  function resetForm() {
    form.reset();
  }

  // Cek status refresh menggunakan localStorage
  var isRefreshed = localStorage.getItem("isRefreshed");

  if (!isRefreshed) {
    // Mengosongkan input setelah pengiriman berhasil
    emailInput.value = "";
    namaInput.value = "";
    pesanInput.value = "";

    // Set status refresh menjadi true di localStorage
    localStorage.setItem("isRefreshed", true);

    // Reload halaman saat pertama kali dimuat
    location.reload();
  } else {
    // Hapus status refresh dari localStorage
    localStorage.removeItem("isRefreshed");
  }
};
