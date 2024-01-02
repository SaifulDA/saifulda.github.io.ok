window.addEventListener("load", function() {
    var text = document.querySelector(".typing-effect").textContent;
    var speed = 100; // Kecepatan mengetik (ms per karakter)
    
    setTimeout(function() {
      document.querySelector(".typing-effect").textContent = "";
      repeatTyping(text, speed);
    }, 1000); // Waktu penundaan sebelum animasi dimulai (ms)
  });
  
  // Fungsi untuk mengulangi ketik
  function repeatTyping(text, speed) {
    typeWriter(text, 0, speed, function() {
      setTimeout(function() {
        document.querySelector(".typing-effect").textContent = "";
        repeatTyping(text, speed);
      }, 2000); // Waktu penundaan sebelum ulang (ms)
    });
  }
  
  // Fungsi untuk mengetik
  function typeWriter(text, index, speed, callback) {
    if (index < text.length) {
      document.querySelector(".typing-effect").textContent += text.charAt(index);
      index++;
      setTimeout(function() {
        typeWriter(text, index, speed, callback);
      }, speed);
    } else {
      callback();
    }
  }
  