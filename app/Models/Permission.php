<?php

namespace App\Models;

use App\Filters\Searchable;
use App\Filters\Sortable;

use Spatie\Permission\Models\Permission as ModelsPermission;

class Permission extends ModelsPermission
{
    use Sortable, Searchable;
}
