
$(document).ready(function () {


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
        $('#signupEmail').val('');
        $('#signupPhoneNumber').val('');
        $('#userRole').val('');
    });
    
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
            $('.nav-item:last-child .dropdown-menu').html('<li class="logout-btn"><a class="dropdown-item" href="#" onclick="logout()"><i class="bi bi-box-arrow-left"></i> Đăng Xuất</a></li><li><li><hr class="dropdown-divider"></li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#userListModal"><i class="bi bi-person-lines-fill"></i> User list</a></li>');
          } else {
            // Nếu là user, ẩn nút Xem Danh Sách Người Dùng
            $('.nav-item:last-child .dropdown-menu').html('<li class="logout-btn"><a class="dropdown-item" href="#" onclick="logout()"><i class="bi bi-box-arrow-left"></i> Đăng Xuất</a></li>');
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
        var email = $('#signupEmail').val();
        var phoneNumber = $('#signupPhoneNumber').val();
        var role = $('#userRole').val();
    
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
            users.push({
                username: username,
                password: password,
                email: email,
                phoneNumber: phoneNumber,
                role: role
            });
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
        // Lấy danh sách người dùng từ localStorage
        var users = JSON.parse(localStorage.getItem('users')) || [];
    
        // Hiển thị danh sách người dùng trong bảng
        var userListBody = $('#userListBody');
        userListBody.empty(); // Xóa dữ liệu cũ
    
        if (users.length > 0) {
            users.forEach(function (user, index) {
                userListBody.append('<tr><th scope="row">' + (index + 1) +
                    '</th><td>' + user.username +
                    '</td><td>' + user.password +
                    '</td><td>' + user.role +
                    '</td><td>' + user.phoneNumber +
                    '</td><td>' + user.email +
                    '</td><td><button class="btn btn-danger btn-sm" onclick="deleteUser(' + index + ')">Xóa</button></td></tr>');
            });
        } else {
            // Không có người dùng
            userListBody.append('<tr><td colspan="7">Không có người dùng.</td></tr>');
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
    
    // Hàm lưu thông tin tài khoản vào localStorage
    function saveCredentials(username, password) {
    // Kiểm tra xem đã có danh sách người dùng trong localStorage chưa
    var users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Thêm thông tin tài khoản mới vào danh sách
    users.push({ username: username, password: password });
    
    // Lưu danh sách người dùng vào localStorage
    localStorage.setItem('users', JSON.stringify(users));
    }
    
    // Hàm xóa tài khoản
    function deleteUser(index) {
    // Lấy danh sách người dùng từ localStorage
    var users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Xóa người dùng khỏi danh sách
    users.splice(index, 1);
    
    // Lưu danh sách người dùng vào localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    // Hiển thị lại danh sách người dùng trong modal
    $('#userListModal').modal('show');
    }
    
    // Hàm đăng xuất
    function logout() {
        // Ẩn nút Đăng Xuất, hiển thị nút Đăng Nhập và Đăng Ký
        $('.nav-item:last-child .dropdown-menu').html('<li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#loginModal"><i class="bi bi-box-arrow-in-right"></i> Đăng Nhập</a></li><li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#signupModal"><i class="bi bi-person-plus-fill"></i> Đăng Ký</a></li>');
    
        // Ẩn biểu tượng người dùng và hiển thị lại biểu tượng mặc định
        $('.nav-link.dropdown-toggle').html('<i class="bi bi-person-circle"></i>');
    }

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
        $('.dropdown-menu').html('<li class="logout-btn"><a class="dropdown-item" href="#" onclick="logout()">Đăng Xuất</a></li><li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#userListModal">User list</a></li>');
      } else {
        // Nếu là user, ẩn nút Xem Danh Sách Người Dùng
        $('.dropdown-menu').html('<li class="logout-btn"><a class="dropdown-item" href="#" onclick="logout()">Đăng Xuất</a></li>');
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

// Hàm lưu thông tin tài khoản vào localStorage
function saveCredentials(username, password) {
  // Kiểm tra xem đã có danh sách người dùng trong localStorage chưa
  var users = JSON.parse(localStorage.getItem('users')) || [];

  // Thêm thông tin tài khoản mới vào danh sách
  users.push({ username: username, password: password });

  // Lưu danh sách người dùng vào localStorage
  localStorage.setItem('users', JSON.stringify(users));
}

// Hàm xóa tài khoản
function deleteUser(index) {
  // Lấy danh sách người dùng từ localStorage
  var users = JSON.parse(localStorage.getItem('users')) || [];

  // Xóa người dùng khỏi danh sách
  users.splice(index, 1);

  // Lưu danh sách người dùng vào localStorage
  localStorage.setItem('users', JSON.stringify(users));

  // Hiển thị lại danh sách người dùng trong modal
  $('#userListModal').modal('show');
}

// Hàm đăng xuất
function logout() {
  // Ẩn nút Đăng Xuất, hiển thị nút Đăng Nhập và Đăng Ký
  $('.dropdown-menu').html('<li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#loginModal">Đăng Nhập</a></li><li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#signupModal">Đăng Ký</a></li><li class="logout-btn" style="display:none;"><a class="dropdown-item" href="#" onclick="logout()">Đăng Xuất</a></li><li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#userListModal">User list</a></li>');

  // Ẩn biểu tượng người dùng và hiển thị lại biểu tượng mặc định
  $('.nav-link.dropdown-toggle').html('<i class="bi bi-person-circle"></i>');
}

