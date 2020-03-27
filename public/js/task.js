$(document).on('click','#add-task', function (e) {
    e.preventDefault();
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'POST',
        url: 'tasks',
        dataType: 'json',
        data: {
            name: $('input[name="name"]').val(),
        },
        success: function (result) {
            $('.panel-body .alert.alert-danger:first-child').remove();
            if (result.status == 'ok') {
                if ($('.task-list').length == 0) {
                    $('.py-4').append(
                        '<div class="panel panel-default task-list">'+
                            '<div class="panel-heading">'+
                                'Current Tasks'+
                            '</div>'+

                            '<div class="panel-body">'+
                                '<table class="table table-striped task-table">'+
                                    '<thead>'+
                                        '<th>Task</th>'+
                                        '<th>&nbsp;</th>'+
                                    '</thead>'+
                                    '<tbody>'+
                                    '</tbody>'+
                                '</table>'+
                            '</div>'+
                        '</div>'
                    );
                }

                $("tbody").append(result.task);
            }

            $('input[name="name"]').val('');
        },
        error: function (result) {
            var errors = $.parseJSON(result.responseText);
            $('.panel-body .alert.alert-danger:first-child').remove();
            $('.panel-body:first').prepend('<div class="alert alert-danger"' +
                'style="position: fixed; top: 0;left: 0; right: 0; z-index: 10;">' +
                '<strong>Whoops! Something went wrong!</strong>'+
                '<br><br>' + '<ul class="add_task_error"></ul>' + '</div>'
            );

            $.each(errors.errors, function (key, value) {
                $('.add_task_error').append('<li>' + value + '</li>');
            });

            setTimeout(function(){
                $('.alert.alert-danger').hide();
            }, 1500);
        }
    });
});



$(document).on('click','[id=delete-task]', function (e) {
    e.preventDefault();
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    var id = $(this).data('id');;
    $.ajax({
        type: 'POST',
        url: 'tasks/' + id,
        dataType: 'json',
        data: {
            _method: 'DELETE',
        },
        success: function (result) {
            $('.panel-body .alert.alert-danger:first-child').remove();
            if (result.status == 'ok') {
                $('tr:has([data-id=' + id + '])').remove();
            }
        },
        complete: function (xhr, data) {
            if (xhr.status == 404) {
                $('.panel-body .alert.alert-danger:first-child').remove();

                $('.panel-body:first').prepend('<div class="alert alert-danger"' +
                    'style="position: fixed; top: 0;left: 0; right: 0; z-index: 10;">' +
                    '<strong>Whoops! Something went wrong!</strong>'+
                    '<br><br>' + '<ul class="add_task_error"><li>Id not found</li></ul>' +
                    '</div>'
                );
                setTimeout(function(){
                    $('.alert.alert-danger').hide();
                }, 1500);
            }
        }
    });
});
