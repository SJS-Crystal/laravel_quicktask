<?php

namespace App\Http\Controllers;

use App\Task;
use App\Http\Requests\TaskFormRequest;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\TaskRepository;

class TaskController extends Controller
{
    protected $tasks;

    public function __construct(TaskRepository $tasks)
    {
        $this->middleware('auth');
        $this->tasks = $tasks;
    }

    public function index(Request $request)
    {
        return view('tasks.index', [
            'tasks' => $this->tasks->forUser($request->user()),
        ]);
    }

    public function store(TaskFormRequest $request)
    {
        $task = $request->user()->tasks()->create([
            'name' => $request->name,
        ]);

        $taskHtml = view('patials.add_task', ['task'=> $task])->render();

        return response()->json([
            'status' => 'ok',
            'task' => $taskHtml,
        ], 200);
    }

    public function destroy(Request $request, Task $task)
    {
        $this->authorize('destroy', $task);
        $task->delete();

        return response()->json([
            'status' => 'ok',
        ], 200);
    }
}
