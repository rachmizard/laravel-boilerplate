import { Link } from '@inertiajs/react';
import {
      flexRender,
      getCoreRowModel,
      useReactTable,
} from '@tanstack/react-table';
import { Button, Table } from 'flowbite-react';

export default function Datatable({
      headerActions,
      footerActions,
      columns = [],
      data = [],
}) {
      const table = useReactTable({
            data,
            columns,
            getCoreRowModel: getCoreRowModel(),
      });

      return (
            <div className="flex flex-col space-y-4">
                  {headerActions && headerActions}

                  <div className="flex flex-col overflow-x-auto max-w-full">
                        <Table hoverable={true}>
                              <Table.Head>
                                    {table
                                          .getHeaderGroups()
                                          .map(headerGroup =>
                                                headerGroup.headers.map(
                                                      header => (
                                                            <Table.HeadCell
                                                                  key={
                                                                        header.id
                                                                  }
                                                            >
                                                                  {header.isPlaceholder
                                                                        ? null
                                                                        : flexRender(
                                                                                header
                                                                                      .column
                                                                                      .columnDef
                                                                                      .header,
                                                                                header.getContext()
                                                                          )}
                                                            </Table.HeadCell>
                                                      )
                                                )
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

                  {footerActions && footerActions}
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
