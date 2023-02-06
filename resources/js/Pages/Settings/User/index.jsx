import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Head, router } from '@inertiajs/react';
import { createColumnHelper } from '@tanstack/react-table';
import { Alert, Button } from 'flowbite-react';
import { useState } from 'react';

import Datatable from '@/Components/Datatable';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserModal from './DeleteUserModal';
import CreateUserModal from './CreateUserModal';
import EditUserModal from './EditUserModal';

const columnHelper = createColumnHelper();

export default function SettingUserIndexPage(props) {
      const { queryParams } = props.ziggy;
      const { flash } = props;

      const [openCreateModal, setOpenCreateModal] = useState(false);
      const [openEditModal, setOpenEditModal] = useState(false);
      const [openDeleteModal, setOpenDeleteModal] = useState(false);

      const [userData, setUserData] = useState(null);

      const [id, setId] = useState(null);

      const columns = [
            columnHelper.accessor('id', {
                  header: () => <span>ID</span>,
                  cell: info => info.getValue(),
            }),
            columnHelper.accessor('name', {
                  header: () => <span>Name</span>,
                  cell: info => info.getValue(),
            }),
            columnHelper.accessor('email', {
                  cell: info => info.getValue(),
                  header: () => <span>Email</span>,
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
                                          setUserData(row.original);
                                          setOpenEditModal(true);
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
                                          setId(row.original.id);
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
                  window.route('settings.users.index'),
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
                              Settings - Users
                        </h2>
                  }
            >
                  <Head title="Settings - Users" />

                  <div className="max-w-7xl mx-auto space-y-3 sm:px-6 lg:px-8">
                        {flash.success && (
                              <Alert color="success">{flash.success}</Alert>
                        )}

                        {flash.error && (
                              <Alert color="failure">{flash.error}</Alert>
                        )}

                        <Datatable
                              columns={columns}
                              data={props.users?.data ?? []}
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
                                    links={props.users?.links ?? []}
                              />
                        </Datatable>
                  </div>

                  <CreateUserModal
                        onClose={() => setOpenCreateModal(false)}
                        show={openCreateModal}
                  />

                  {openEditModal && (
                        <EditUserModal
                              defaultValues={userData}
                              onClose={() => setOpenEditModal(false)}
                        />
                  )}

                  <DeleteUserModal
                        show={openDeleteModal && id}
                        id={id}
                        onClose={() => setOpenDeleteModal(false)}
                  />
            </AuthenticatedLayout>
      );
}
