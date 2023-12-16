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
        if (user.role === 'admin') {
          // Chuyển hướng cho quản trị viên
          localStorage.setItem('users', JSON.stringify(users));
          window.location.href = 'admin.html';
        } else if (user.role === 'employee') {
          // Chuyển hướng cho nhân viên
          localStorage.setItem('users', JSON.stringify(users));
          window.location.href = 'Nhanvien.html';
        } else {
          // Mặc định là khách hàng
         localStorage.setItem('users', JSON.stringify(users));
        window.location.href = 'DichvuQC.html';
        }  
        // Lưu lại thông tin người dùng vào localStorage
        
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

      // Chuyển hướng đến trang đăng nhập
      window.location.href = 'Login.html';
  });
});


 // Hàm filterResults để lọc và hiển thị kết quả
 function filterResults(selectedPlatforms, selectedDurations, minPrice, maxPrice) {
  // Lấy danh sách tất cả các gói dịch vụ
  const allPackages = $('.card');

  // Ẩn tất cả các gói dịch vụ
  allPackages.hide();

  // Lọc và hiển thị các gói dịch vụ phù hợp
  allPackages.each(function () {
    const platform = $(this).data('platform');
    const duration = $(this).data('duration');
    const price = $(this).data('price');

    // Kiểm tra điều kiện lọc
    const platformMatch = selectedPlatforms.length === 0 || selectedPlatforms.includes(platform);
    const durationMatch = selectedDurations.length === 0 || selectedDurations.includes(duration);
    const priceMatch = price >= minPrice && price <= maxPrice;

    // Hiển thị gói dịch vụ nếu thỏa mãn tất cả điều kiện
    if (platformMatch && durationMatch && priceMatch) {
      $(this).show();
    }
  });
}


// Bạn có thể đặt đoạn mã trên vào phần $(document).ready() của bạn
$(document).ready(function () {
  const platformCheckboxes = $('.platform-checkbox');
  const durationCheckboxes = $('.duration-checkbox');
  const priceRangeFrom = $('#priceRangeFrom');
  const priceRangeTo = $('#priceRangeTo');

  $('#applyFilterBtn').click(function () {
    const selectedPlatforms = platformCheckboxes.filter(':checked').map(function () { return this.value; }).get();
    const selectedDurations = durationCheckboxes.filter(':checked').map(function () { return this.value; }).get();
    const minPrice = parseFloat(priceRangeFrom.val()) || 0;
    const maxPrice = parseFloat(priceRangeTo.val()) || Number.POSITIVE_INFINITY;

    filterResults(selectedPlatforms, selectedDurations, minPrice, maxPrice);
  });
});



$(document).ready(function() {
  $("#submitBtn").click(function() {
      submitFeedback();
  });
});


function submitFeedback() {
  var name = $("#name").val();
  var email = $("#email").val();
  var message = $("#message").val();

  // Kiểm tra xem Local Storage có sẵn không
  if (typeof(Storage) !== "undefined") {
      // Lấy danh sách ý kiến đóng góp từ Local Storage (nếu có)
      var feedbackList = JSON.parse(localStorage.getItem("feedbackList")) || [];

      // Thêm ý kiến mới vào danh sách
      feedbackList.push({ name: name, email: email, message: message });

      // Lưu danh sách mới vào Local Storage
      localStorage.setItem("feedbackList", JSON.stringify(feedbackList));

      // Thông báo ý kiến đã được gửi
      alert("Ý kiến của bạn đã được gửi đi!");

      // Xóa dữ liệu trong các ô input
      $("#name").val('');
      $("#email").val('');
      $("#message").val('');
  } else {
      // Nếu Local Storage không khả dụng, thông báo lỗi
      alert("Trình duyệt của bạn không hỗ trợ Local Storage. Vui lòng sử dụng trình duyệt khác.");
  }
}


$(document).ready(function() {
  // Kiểm tra xem Local Storage có sẵn không
  if (typeof(Storage) !== "undefined") {
      // Lấy danh sách ý kiến đóng góp từ Local Storage
      var feedbackList = JSON.parse(localStorage.getItem("feedbackList")) || [];

      // Hiển thị danh sách ý kiến đóng góp
      feedbackList.forEach(function(feedback, index) {
          var feedbackItem = $("<tr></tr>");
          feedbackItem.append("<th scope='row'>" + (index + 1) + "</th>");
          feedbackItem.append("<td>" + feedback.name + "</td>");
          feedbackItem.append("<td>" + feedback.email + "</td>");
          feedbackItem.append("<td>" + feedback.message + "</td>");
          feedbackItem.append("<td><button class='btn btn-danger deleteBtn'>Xóa</button></td>");
          $("#feedbackList").append(feedbackItem);
      });

      // Xử lý sự kiện click cho nút Xóa
      $(".deleteBtn").click(function() {
          var index = $(this).closest("tr").index();
          deleteFeedback(index);
      });
  } else {
      // Nếu Local Storage không khả dụng, thông báo lỗi
      alert("Trình duyệt của bạn không hỗ trợ Local Storage. Vui lòng sử dụng trình duyệt khác.");
  }
});


function deleteFeedback(index) {
  // Lấy danh sách ý kiến đóng góp từ Local Storage
  var feedbackList = JSON.parse(localStorage.getItem("feedbackList")) || [];

  // Xóa ý kiến theo chỉ mục
  feedbackList.splice(index, 1);

  // Lưu danh sách mới vào Local Storage
  localStorage.setItem("feedbackList", JSON.stringify(feedbackList));

  // Cập nhật bảng
  updateTable();
}

function updateTable() {
  // Xóa toàn bộ nội dung trong bảng
  $("#feedbackList").empty();

  // Lấy danh sách ý kiến đóng góp từ Local Storage
  var feedbackList = JSON.parse(localStorage.getItem("feedbackList")) || [];

  // Hiển thị danh sách ý kiến đóng góp
  feedbackList.forEach(function(feedback, index) {
      var feedbackItem = $("<tr></tr>");
      feedbackItem.append("<th scope='row'>" + (index + 1) + "</th>");
      feedbackItem.append("<td>" + feedback.name + "</td>");
      feedbackItem.append("<td>" + feedback.email + "</td>");
      feedbackItem.append("<td>" + feedback.message + "</td>");
      feedbackItem.append("<td><button class='btn btn-danger deleteBtn'>Xóa</button></td>");
      $("#feedbackList").append(feedbackItem);
  });

  // Xử lý sự kiện click cho nút Xóa
  $(".deleteBtn").click(function() {
      var index = $(this).closest("tr").index();
      deleteFeedback(index);
  });
}
 

 
function handleProcessing(rowIndex) {
  // Lấy thông tin giỏ hàng từ Local Storage
  var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Xử lý logic xử lý đơn hàng ở chỉ số hàng rowIndex
  cartItems[rowIndex].status = "Đã xử lý";

  // Lưu lại thông tin giỏ hàng sau khi xử lý
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  // Gọi lại hàm để cập nhật bảng
  updateCartTable();
}

function updateCartTable() {
  console.log("Updating cart table...");
  // Xóa toàn bộ nội dung trong bảng
  $("#cartItems").empty();

  // Lấy danh sách ý kiến đóng góp từ Local Storage
  var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Hiển thị danh sách ý kiến đóng góp
  cartItems.forEach(function (item, index) {
    var row = $("<tr></tr>");

    // Thêm thông tin vào các ô của hàng
    row.append("<td>" + item.platform + "</td>");
    row.append("<td>" + item.duration + "</td>");
    row.append("<td>" + item.price + " VND</td>");
    row.append("<td>" + item.status + "</td>");

    // Thêm nút "Xử lý" vào hàng bảng với khả năng xử lý (handleProcessing) được thêm vào
    var processButton = $("<button></button>")
      .addClass("btn btn-primary btn-sm")
      .text("Xử lý")
      .on("click", function () {
        console.log("Handling processing for index: " + index);
        handleProcessing(index);

        // Sau khi xử lý, cập nhật lại bảng để xóa hàng vừa nhấn xử lý
        updateCartTable();
      });

    row.append($("<td></td>").append(processButton));

    // Thêm hàng vào bảng
    $("#cartItems").append(row);
  });

  console.log("Cart table updated.");
}