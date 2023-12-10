$(document).ready(function () {
  $('#signupForm').submit(function (event) {
    event.preventDefault();
    handleFormSubmit('signup');
  });

  $('#loginForm').submit(function (event) {
    event.preventDefault();
    handleFormSubmit('login');
  });
  function handleFormSubmit(formType) {
    var username = $('#' + formType + 'Form #username').val();
    var password = $('#' + formType + 'Form #password').val();
  
    if (formType === 'signup') {
      var email = $('#email').val();
      var phone = $('#phone').val();
      var role = $('#role').val();
  
      // Kiểm tra xem tài khoản đã tồn tại chưa
      var users = JSON.parse(localStorage.getItem('users')) || [];
      var existingUser = users.find(function (u) {
        return u.username === username;
      });
  
      if (existingUser) {
        // Tài khoản đã tồn tại
        alert('Tài khoản đã tồn tại. Vui lòng chọn tên đăng nhập khác.');
      } else {
        // Thêm thông tin tài khoản mới vào danh sách
        var newUser = {
          username: username,
          email: email,
          phone: phone,
          password: password,
          role: role,
          loggedIn: true  // Thêm trường loggedIn và đặt giá trị là true khi đăng ký
        };
  
        users.push(newUser);
  
        // Lưu danh sách người dùng vào localStorage
        localStorage.setItem('users', JSON.stringify(users));
  
        // Hiển thị thông báo đăng ký thành công
        alert('Đăng ký thành công!');
        // Sau khi đăng ký thành công, bạn có thể chuyển hướng người dùng hoặc thực hiện các hành động khác ở đây
        window.location.href = 'Login.html';
      }
    } else if (formType === 'login') {
      // Kiểm tra tài khoản và mật khẩu với danh sách người dùng
      var users = JSON.parse(localStorage.getItem('users')) || [];
      var user = users.find(function (u) {
        return u.username === username && u.password === password;
      });
  
      if (user) {
        // Đăng nhập thành công
        alert('Đăng nhập thành công với tài khoản: ' + username);
        // Đặt trường loggedIn thành true khi đăng nhập
        user.loggedIn = true;
  
        // Lưu lại thông tin người dùng vào localStorage
        localStorage.setItem('users', JSON.stringify(users));
        window.location.href = 'DichvuQC.html';
        // Có thể thực hiện các hành động khác sau khi đăng nhập thành công
      } else {
        // Đăng nhập thất bại
        alert('Tài khoản hoặc mật khẩu không đúng');
      }
    }
  }
});
document.addEventListener('DOMContentLoaded', function () {
  // Lấy danh sách các checkbox và input từ DOM
  const platformCheckboxes = document.querySelectorAll('.platform-checkbox');
  const durationCheckboxes = document.querySelectorAll('.duration-checkbox');
  const priceRangeFrom = document.getElementById('priceRangeFrom');
  const priceRangeTo = document.getElementById('priceRangeTo');

  // Lắng nghe sự kiện khi người dùng nhấn nút Áp dụng
  document.getElementById('applyFilterBtn').addEventListener('click', function () {
    // Lọc dựa trên giá trị của checkbox và input
    const selectedPlatforms = Array.from(platformCheckboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
    const selectedDurations = Array.from(durationCheckboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
    const minPrice = parseFloat(priceRangeFrom.value) || 0;
    const maxPrice = parseFloat(priceRangeTo.value) || Number.POSITIVE_INFINITY;

    // Hiển thị các kết quả phù hợp
    filterResults(selectedPlatforms, selectedDurations, minPrice, maxPrice);
  });
});

function filterResults(selectedPlatforms, selectedDurations, minPrice, maxPrice) {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const platform = card.dataset.platform.toLowerCase();
    const duration = card.dataset.duration.toLowerCase();
    const price = parseFloat(card.dataset.price);

    const platformMatch = selectedPlatforms.length === 0 || selectedPlatforms.includes(platform);
    const durationMatch = selectedDurations.length === 0 || selectedDurations.includes(duration);
    const priceMatch = price >= minPrice && price <= maxPrice;

    if (platformMatch && durationMatch && priceMatch) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}
