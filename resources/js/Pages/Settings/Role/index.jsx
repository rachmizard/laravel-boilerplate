import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Head, router } from '@inertiajs/react';
import { createColumnHelper } from '@tanstack/react-table';
import { Button } from 'flowbite-react';
import { useState } from 'react';

import Datatable from '@/Components/Datatable';
import CreateRoleModal from './CreateRoleModal';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import EditRoleModal from './EditRoleModal';
import DeleteRoleModal from './DeleteRoleModal';

const columnHelper = createColumnHelper();

export default function SettingRoleIndexPage(props) {
      const { queryParams } = props.ziggy;

      const [openCreateModal, setOpenCreateModal] = useState(false);
      const [openEditModal, setOpenEditModal] = useState(false);
      const [openDeleteModal, setOpenDeleteModal] = useState(false);
      const [roleData, setRoleData] = useState(null);

      const columns = [
            columnHelper.accessor('id', {
                  header: () => <span>ID</span>,
                  cell: info => info.getValue(),
            }),
            columnHelper.accessor('name', {
                  header: () => <span>Role Name</span>,
                  cell: info => info.getValue(),
            }),
            columnHelper.accessor(row => row.guard_name, {
                  id: 'guard_name',
                  cell: info => info.getValue().toUpperCase(),
                  header: () => <span>Guard Name</span>,
            }),
            columnHelper.accessor(row => row.permissions, {
                  id: 'permissions',
                  enableSorting: false,
                  cell: info => (
                        <p className="truncate">
                              {info
                                    .getValue()
                                    .map(permission => permission.name)
                                    .join(', ')}
                        </p>
                  ),
                  header: () => <span>Permissions</span>,
            }),
            columnHelper.accessor(row => row.id, {
                  id: 'action',
                  enableSorting: false,
                  cell: ({ row }) => (
                        <div className="inline-flex items-center space-x-4">
                              <Button
                                    gradientMonochrome="purple"
                                    size="xs"
                                    pill
                                    onClick={() => {
                                          setOpenEditModal(true);
                                          setRoleData({
                                                ...row.original,
                                                id: row.original.id,
                                                permissions:
                                                      row.original.permissions.map(
                                                            permission =>
                                                                  permission.name
                                                      ),
                                          });
                                    }}
                              >
                                    Edit
                              </Button>
                              <Button
                                    gradientMonochrome="failure"
                                    size="xs"
                                    pill
                                    onClick={() => {
                                          setOpenDeleteModal(true);
                                          setRoleData(row.original);
                                    }}
                              >
                                    Delete
                              </Button>
                        </div>
                  ),
                  header: () => <span>Actions</span>,
            }),
      ];

      function onSortChange(sorts) {
            router.get(
                  window.route('settings.roles.index'),
                  { ...queryParams, sorts },
                  {
                        preserveScroll: true,
                        preserveState: true,
                  }
            );
      }

      return (
            <AuthenticatedLayout
                  auth={props.auth}
                  errors={props.errors}
                  header={
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                              Settings - Role
                        </h2>
                  }
            >
                  <Head title="Settings - Role" />

                  <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <Datatable
                              columns={columns}
                              data={props.roles?.data ?? []}
                              onSortChange={onSortChange}
                        >
                              <Datatable.HeaderAction>
                                    <div className="flex items-center justify-end">
                                          <Button
                                                size="sm"
                                                color="purple"
                                                pill
                                                onClick={() =>
                                                      setOpenCreateModal(true)
                                                }
                                          >
                                                Create
                                                <PlusCircleIcon className="ml-1 h-5 w-5" />
                                          </Button>
                                    </div>
                              </Datatable.HeaderAction>
                              <Datatable.Pagination
                                    links={props.roles?.links ?? []}
                              />
                        </Datatable>
                  </div>

                  <CreateRoleModal
                        show={openCreateModal}
                        onClose={() => setOpenCreateModal(false)}
                  />

                  {openEditModal && roleData && (
                        <EditRoleModal
                              defaultValues={roleData}
                              onClose={() => setOpenEditModal(false)}
                        />
                  )}

                  <DeleteRoleModal
                        show={openDeleteModal && roleData}
                        id={roleData?.id}
                        onClose={() => setOpenDeleteModal(false)}
                  />
            </AuthenticatedLayout>
      );
}
