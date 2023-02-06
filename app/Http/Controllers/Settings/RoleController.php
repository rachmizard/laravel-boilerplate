<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $roles = \Spatie\Permission\Models\Role::where('name', '!=', 'super-admin')
            ->with(['permissions' => function ($query) {
                $query->select('name');
                $query->orderBy('created_at', 'DESC');
            }]);


        if ($request->has('sorts')) {
            $sorts = array_merge(...$request->sorts);
            $roles = $roles->orderBy($sorts['id'], $sorts['desc'] === "true" ? 'DESC' : 'ASC');
        }


        $roles = $roles->paginate(5);

        return Inertia::render('Settings/Role/index', [
            'permissions' => \Spatie\Permission\Models\Permission::orderBy('created_at', 'DESC')->get()->pluck('name'),
            'roles' => $roles
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:roles,name',
            'permissions' => 'array|exists:permissions,name',
        ]);

        $role = \Spatie\Permission\Models\Role::create(['name' => $request->name]);

        if ($request->has('permissions')) {
            $role->syncPermissions($request->permissions);
        }

        return redirect()->route('settings.roles.index')->with('success', 'Role created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'permissions' => 'array|exists:permissions,name'
        ]);

        $role = \Spatie\Permission\Models\Role::find($id);
        $role->name = $request->name;
        $role->save();

        if ($request->has('permissions')) {
            $role->syncPermissions($request->permissions);
        }

        return redirect()->route('settings.roles.index')->with('success', 'Role updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $role = \Spatie\Permission\Models\Role::find($id);
        $role->delete();

        return redirect()->route('settings.roles.index')->with('success', 'Role deleted successfully.');
    }
}
