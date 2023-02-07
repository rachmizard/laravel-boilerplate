<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;


trait Searchable
{
    /**
     * Search the model by a given term.
     * @param  Builder $query
     * @param  string|null $search
     * @param  array $searchable
     * @return Builder
     */
    public function scopeSearch(Builder $query, string|null $search, array $searchable = [])
    {
        if (empty($search)) {
            return $query;
        }
        $this->setSearchable($searchable);

        if (!$this->isSearchable()) {
            return $query;
        }

        return $query->where(function ($query) use ($search) {
            foreach ($this->getSearchable() as $column) {
                $query->orWhere($column, 'LIKE', "%{$search}%");
            }
        });
    }

    /**
     * Get the columns that are searchable.
     * @return array
     */
    public function getSearchable(): array
    {
        return $this->searchable ?? [];
    }

    /**
     * Set the columns that are searchable.
     * @param  array $searchable
     * @return void
     */
    public function setSearchable(array $searchable)
    {
        $this->searchable = $searchable;
    }

    /**
     * Determine if the model is searchable.
     * @return bool
     */
    public function isSearchable(): bool
    {
        return !empty($this->searchable);
    }
}
