<tr>
    <td class="table-text">
        <div>{{ $task->name }}</div>
    </td>
    <td>
        <button type="submit" id="delete-task" data-id="{{ $task->id }}" class="btn btn-danger">
            <i class="fa fa-btn fa-trash"></i>@lang('main.delete')
        </button>
    </td>
</tr>
