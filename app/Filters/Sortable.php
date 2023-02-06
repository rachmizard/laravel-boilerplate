<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;


trait Sortable
{
    /**
     * @param Builder $query
     * @param array|null $values
     * @return Builder
     */
    public function scopeSortFromArray(Builder $query, array|null $values): Builder
    {
        if (empty($values)) {
            return $query;
        }

        $sorts = array_merge(...$values);
        return $query->orderBy($sorts['id'], $sorts['desc'] === "true" ? 'DESC' : 'ASC');
    }
}
