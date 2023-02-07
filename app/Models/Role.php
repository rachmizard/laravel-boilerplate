<?php

namespace App\Models;

use App\Filters\Searchable;
use App\Filters\Sortable;

use Spatie\Permission\Models\Role as ModelsRole;

class Role extends ModelsRole
{
    use Sortable, Searchable;
}
