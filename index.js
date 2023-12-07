$(document).ready(function () {
  // Các sự kiện và xử lý khác ...

  // Sự kiện click cho nút Xem Danh Sách Người Dùng
  $('#openUserListButton').click(function () {
    if (isLoggedIn()) {
      var users = JSON.parse(localStorage.getItem('users')) || [];
      var currentUser = getCurrentUser();

      if (currentUser && currentUser.role === 'admin') {
        // Nếu người dùng là admin, hiển thị modal
        $('#userListModal').modal('show');
      } else {
        // Người dùng không phải là admin, có thể hiển thị thông báo hoặc thực hiện hành động khác
        console.log("Bạn không có quyền xem danh sách người dùng.");
      }
    } else {
      // Người dùng chưa đăng nhập, bạn có thể chuyển hướng đến trang đăng nhập hoặc hiển thị modal đăng nhập
      console.log("Người dùng chưa đăng nhập. Hiển thị modal đăng nhập hoặc chuyển hướng đến trang đăng nhập.");
    }
  });

  // Sự kiện click cho nav-item.dropdown
  $('.nav-item.dropdown').click(function (e) {
    e.preventDefault();
    $(this).find('.dropdown-menu').slideToggle();
  });

  var hiddenProducts = $('.product-box:gt(2)').hide();

  $('.btn-show-more').click(function () {
    hiddenProducts.slice(0, 3).fadeIn();
    hiddenProducts = hiddenProducts.slice(3);

    if (hiddenProducts.length === 0) {
      $('.btn-show-more').hide();
    }
  });

  // Xử lý khi modal đăng nhập được đóng
  $('#loginModal').on('hidden.bs.modal', function () {
    // Xóa dữ liệu trong modal sau khi nó được đóng
    $('#loginUsername').val('');
    $('#loginPassword').val('');
  });

  // Xử lý khi modal đăng ký được đóng
  $('#signupModal').on('hidden.bs.modal', function () {
    // Xóa dữ liệu trong modal sau khi nó được đóng
    $('#signupUsername').val('');
    $('#signupPassword').val('');
  });

  // Xử lý đăng nhập
  $('#loginForm').submit(function (event) {
    event.preventDefault();
    var username = $('#loginUsername').val();
    var password = $('#loginPassword').val();

    // Kiểm tra tài khoản và mật khẩu với danh sách người dùng
    var users = JSON.parse(localStorage.getItem('users')) || [];
    var user = users.find(function (u) {
      return u.username === username && u.password === password;
    });

    if (user) {
      // Đăng nhập thành công
      alert('Đăng nhập thành công với tài khoản: ' + username);

      // Kiểm tra vai trò của người dùng
      if (user.role === 'admin') {
        // Nếu là admin, hiển thị nút Xem Danh Sách Người Dùng
        $('#openUserListButton').show();
      } else {
        // Nếu là user, ẩn nút Xem Danh Sách Người Dùng
        $('#openUserListButton').hide();
      }

      // Có thể thực hiện các hành động khác sau khi đăng nhập thành công
      // Ví dụ: Hiển thị tên người dùng ở góc trên cùng
      $('.nav-link.dropdown-toggle').html('<i class="bi bi-person-circle"></i> ' + username);
    } else {
      // Đăng nhập thất bại
      alert('Tài khoản hoặc mật khẩu không đúng');
    }

    // Sau khi xử lý xong, bạn có thể ẩn modal bằng cách sử dụng:
    $('#loginModal').modal('hide');
  });

  // Xử lý đăng ký
  $('#signupForm').submit(function (event) {
    event.preventDefault();
    var username = $('#signupUsername').val();
    var password = $('#signupPassword').val();
    var role = $('#userRole').val(); // Lấy giá trị của trường role

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
      users.push({ username: username, password: password, role: role });
      // Lưu danh sách người dùng vào localStorage
      localStorage.setItem('users', JSON.stringify(users));

      // Hiển thị thông báo đăng ký thành công
      alert('Đăng ký thành công!');

      // Sau khi xử lý xong, bạn có thể ẩn modal bằng cách sử dụng:
      $('#signupModal').modal('hide');
    }
  });

  // Xử lý sự kiện click cho nút Xem Danh Sách Người Dùng
  $('#userListModal').on('show.bs.modal', function () {
    if (isLoggedIn()) {
      // Lấy danh sách người dùng từ localStorage
      var users = JSON.parse(localStorage.getItem('users')) || [];

      // Hiển thị danh sách người dùng trong bảng
      var userListBody = $('#userListBody');
      userListBody.empty(); // Xóa dữ liệu cũ

      if (users.length > 0) {
        users.forEach(function (user, index) {
          userListBody.append('<tr><th scope="row">' + (index + 1) + '</th><td>' + user.username + '</td><td>' + user.password + '</td><td>' + user.role + '</td><td><button class="btn btn-danger btn-sm" onclick="deleteUser(' + index + ')">Xóa</button></td></tr>');
        });
      } else {
        // Không có người dùng
        userListBody.append('<tr><td colspan="5">Không có người dùng.</td></tr>');
      }
    } else {
      // Người dùng chưa đăng nhập
      console.log("Người dùng chưa đăng nhập. Không thể xem danh sách người dùng.");
    }
  });

  // Ẩn modal
  $('#LGcloseButton').click(function () {
    $('#loginModal').modal('hide');
  });
  $('#SncloseButton').click(function () {
    $('#signupModal').modal('hide');
  });
  $('#ulcloseButton').click(function () {
    $('#userListModal').modal('hide');
  });
});

// Hàm kiểm tra trạng thái đăng nhập
function isLoggedIn() {
  // Thực hiện logic xác thực của bạn ở đây
  return true; // Trả về true nếu người dùng đã đăng nhập, ngược lại trả về false
}

// Hàm lấy thông tin người dùng hiện tại từ local storage
function getCurrentUser() {
  var username = ''; // Lấy thông tin người dùng hiện tại dựa trên logic của bạn
  var users = JSON.parse(localStorage.getItem('users')) || [];
  return users.find(function (u) {
    return u.username === username;
  });
}

// Hàm đăng xuất
function logout() {
  // Ẩn nút Đăng Xuất, hiển thị nút Đăng Nhập và Đăng Ký
  $('#openUserListButton').hide();

  // Ẩn biểu tượng người dùng và hiển thị lại biểu tượng mặc định
  $('.nav-link.dropdown-toggle').html('<i class="bi bi-person-circle"></i>');
}
