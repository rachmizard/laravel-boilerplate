import { Children, cloneElement, useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline';
import { Link, usePage } from '@inertiajs/react';
import {
      flexRender,
      getCoreRowModel,
      getSortedRowModel,
      useReactTable,
} from '@tanstack/react-table';
import { Button, Table } from 'flowbite-react';

export default function Datatable({
      columns = [],
      data = [],
      onSortChange,
      children,
}) {
      const { ziggy } = usePage().props;
      const { sorts } = ziggy.queryParams || {};

      const [sorting, setSorting] = useState(sorts || []);

      const onSortingChange = callback => {
            setSorting(callback);
            onSortChange && onSortChange(callback());
      };

      const table = useReactTable({
            data,
            columns,
            state: {
                  sorting,
            },
            manualSorting: true,
            onSortingChange,
            getCoreRowModel: getCoreRowModel(),
            getSortedRowModel: getSortedRowModel(),
      });

      return (
            <div className="flex flex-col space-y-4">
                  {Children.map(children, child => {
                        if (child.type === Datatable.HeaderAction) {
                              return cloneElement(child, {
                                    ...child.props,
                              });
                        }

                        return null;
                  })}

                  <div className="flex flex-col overflow-x-auto max-w-full">
                        <Table hoverable={true}>
                              <Table.Head>
                                    {table.getHeaderGroups().map(headerGroup =>
                                          headerGroup.headers.map(header => (
                                                <Table.HeadCell
                                                      colSpan={header.colSpan}
                                                      key={header.id}
                                                >
                                                      {header.isPlaceholder ? null : (
                                                            <div
                                                                  className={`inline-flex items-center gap-1 ${
                                                                        header.column.getCanSort()
                                                                              ? 'cursor-pointer select-none'
                                                                              : ''
                                                                  }`}
                                                                  onClick={header.column.getToggleSortingHandler()}
                                                            >
                                                                  {flexRender(
                                                                        header
                                                                              .column
                                                                              .columnDef
                                                                              .header,
                                                                        header.getContext()
                                                                  )}

                                                                  {
                                                                        {
                                                                              asc: (
                                                                                    <ArrowUpIcon className="w-4 h-4" />
                                                                              ),
                                                                              desc: (
                                                                                    <ArrowDownIcon className="w-4 h-4" />
                                                                              ),
                                                                        }[
                                                                              header.column.getIsSorted() ??
                                                                                    null
                                                                        ]
                                                                  }
                                                            </div>
                                                      )}
                                                </Table.HeadCell>
                                          ))
                                    )}
                              </Table.Head>
                              <Table.Body className="divide-y">
                                    {table.getRowModel().rows.map(row => (
                                          <Table.Row
                                                key={row.id}
                                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                          >
                                                {row
                                                      .getVisibleCells()
                                                      .map(cell => (
                                                            <Table.Cell
                                                                  key={cell.id}
                                                                  className="p-4 whitespace-nowrap font-medium text-gray-900 dark:text-white"
                                                            >
                                                                  {flexRender(
                                                                        cell
                                                                              .column
                                                                              .columnDef
                                                                              .cell,
                                                                        cell.getContext()
                                                                  )}
                                                            </Table.Cell>
                                                      ))}
                                          </Table.Row>
                                    ))}
                              </Table.Body>
                        </Table>
                  </div>

                  {children &&
                        Children.map(children, child => {
                              if (child.type === Datatable.Pagination) {
                                    return (
                                          <div className="flex justify-end">
                                                {cloneElement(child, {
                                                      ...child.props,
                                                })}
                                          </div>
                                    );
                              }

                              return null;
                        })}
            </div>
      );
}

Datatable.Pagination = function DatatablePagination({ links = [] }) {
      return (
            <div className="inline-flex overflow-hidden gap-2">
                  {links.map((link, index) => {
                        return (
                              <Link
                                    key={index}
                                    href={link.url}
                                    preserveState
                                    preserveScroll
                              >
                                    <Button
                                          disabled={link.active}
                                          size="xs"
                                          pill
                                    >
                                          <span
                                                dangerouslySetInnerHTML={{
                                                      __html: link.label,
                                                }}
                                          />
                                    </Button>
                              </Link>
                        );
                  })}
            </div>
      );
};

Datatable.HeaderAction = function DatatableHeaderAction({ children }) {
      return children;
};
