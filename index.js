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
$(document).ready(function () {
  // Lấy thông tin người dùng từ localStorage
  var users = JSON.parse(localStorage.getItem('users')) || [];

  // Kiểm tra xem có người dùng đã đăng nhập hay không
  var loggedInUser = users.find(function (u) {
    return u.loggedIn === true;
  });

  // Nếu có người dùng đã đăng nhập, hiển thị thông tin và nút đăng xuất
  if (loggedInUser) {
    $('#usernameDisplay').text('Chào ' + loggedInUser.username);
    $('#loginBtn, #signupBtn').hide();
    $('#logoutBtn').show();
  }

  // Xử lý sự kiện khi người dùng bấm nút đăng xuất
  $('#logoutBtn').click(function () {
    // Đánh dấu người dùng hiện tại đã đăng xuất
    $('.nav-link.dropdown-toggle').html('<i class="bi bi-person-circle"></i><a> Tài khoản</a>');

    loggedInUser.loggedIn = false;

    // Lưu lại thông tin người dùng vào localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Hiển thị lại nút đăng nhập và đăng ký
    $('#loginBtn, #signupBtn').show();
    $('#logoutBtn').hide();

    // Thực hiện các hành động khác sau khi đăng xuất
    alert('Đăng xuất thành công');
  });
});
$(document).ready(function () {
  // Lấy danh sách các checkbox và input từ DOM
  const platformCheckboxes = $('.platform-checkbox');
  const durationCheckboxes = $('.duration-checkbox');
  const priceRangeFrom = $('#priceRangeFrom');
  const priceRangeTo = $('#priceRangeTo');

  // Lắng nghe sự kiện khi người dùng nhấn nút Áp dụng
  $('#applyFilterBtn').click(function () {
    // Lọc dựa trên giá trị của checkbox và input
    const selectedPlatforms = platformCheckboxes.filter(':checked').map(function () { return this.value; }).get();
    const selectedDurations = durationCheckboxes.filter(':checked').map(function () { return this.value; }).get();
    const minPrice = parseFloat(priceRangeFrom.val()) || 0;
    const maxPrice = parseFloat(priceRangeTo.val()) || Number.POSITIVE_INFINITY;

    // Hiển thị các kết quả phù hợp
    filterResults(selectedPlatforms, selectedDurations, minPrice, maxPrice);
  });
});
