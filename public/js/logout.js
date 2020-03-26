$(document).on('click','#logout', function (e) {
  e.preventDefault();
  $.ajaxSetup({
      headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
  });
  $.ajax({
      type: 'POST',
      url: 'logout',
      dataType: 'json',
      data: {},
      success: function (data) {
          $("#app .navbar").html(data.nav);
      },
      error: function (data) {}
  });
});
