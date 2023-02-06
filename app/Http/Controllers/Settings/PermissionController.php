<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $permissions = \Spatie\Permission\Models\Permission::query();

        if ($request->has('sorts')) {
            $sorts = array_merge(...$request->sorts);
            $permissions->orderBy($sorts['id'], $sorts['desc'] === "true" ? 'DESC' : 'ASC');
        }

        return Inertia::render('Settings/Permission/index', [
            'permissions' => $permissions->paginate(5)
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
            'name' => 'required|unique:permissions,name',
        ]);

        \Spatie\Permission\Models\Permission::create(['name' => $request->name]);

        return redirect()->route('settings.permissions.index')->with('success', 'Permission created successfully.');
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
            'name' => 'required|unique:permissions,name',
        ]);

        $permission = \Spatie\Permission\Models\Permission::find($id);
        $permission->name = $request->name;
        $permission->save();

        return redirect()->route('settings.permissions.index')->with('success', 'Permission updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $permission = \Spatie\Permission\Models\Permission::find($id);
        $permission->delete();

        return redirect()->route('settings.permissions.index')->with('success', 'Permission deleted successfully.');
    }
}
