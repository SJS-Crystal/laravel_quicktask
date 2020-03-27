@extends('layouts.app')

@section('content')
    <script src="{{ asset('js/task.js') }}" defer></script>

    <!-- Bootstrap Boilerplate... -->

    <div class="panel-body">
        <!-- Display Validation Errors -->
        @include('common.errors')

        <!-- Task Name -->
        <div class="form-group">
            <label for="task-name" class="col-sm-3 control-label">@lang('main.task')</label>

            <div class="col-sm-6">
                <input type="text" name="name" id="task-name" class="form-control">
            </div>
        </div>

        <!-- Add Task Button -->
        <div class="form-group">
            <div class="col-sm-offset-3 col-sm-6">
                <button type="submit" id="add-task" class="btn btn-default">
                    <i class="fa fa-plus"></i> @lang('main.add_task')
                </button>
            </div>
        </div>
    </div>

    <!-- Current Tasks -->
    @if (count($tasks) > 0)
        <div class="panel panel-default task-list">
            <div class="panel-heading">
                @lang('main.current_task')
            </div>

            <div class="panel-body">
                <table class="table table-striped task-table">

                    <!-- Table Headings -->
                    <thead>
                        <th>@lang('main.task')</th>
                        <th>&nbsp;</th>
                    </thead>

                    <!-- Table Body -->
                    <tbody>
                        @foreach ($tasks as $task)
                            @include('patials/add_task')
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    @endif
@endsection
