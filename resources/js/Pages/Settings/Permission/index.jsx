import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Head } from '@inertiajs/react';
import { createColumnHelper } from '@tanstack/react-table';
import { Button } from 'flowbite-react';
import { useState } from 'react';

import Datatable from '@/Components/Datatable';
import CreatePermissionModal from './CreatePermissionModal';
import EditPermissionModal from './EditPermissionModal';
import DeletePermissionModal from './DeletePermissionModal';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const columnHelper = createColumnHelper();

export default function SettingPermissionIndexPage(props) {
      const [openCreateModal, setOpenCreateModal] = useState(false);
      const [openEditModal, setOpenEditModal] = useState(false);
      const [openDeleteModal, setOpenDeleteModal] = useState(false);
      const [permissionData, setPermissionData] = useState(null);

      const columns = [
            columnHelper.accessor('id', {
                  header: () => <span>ID</span>,
                  cell: info => info.getValue(),
            }),
            columnHelper.accessor('name', {
                  header: () => <span>Permission Name</span>,
                  cell: info => info.getValue(),
            }),
            columnHelper.accessor(row => row.guard_name, {
                  id: 'guardName',
                  cell: info => info.getValue().toUpperCase(),
                  header: () => <span>Guard Name</span>,
            }),
            columnHelper.accessor(row => row.id, {
                  id: 'action',
                  cell: ({ row }) => (
                        <div className="inline-flex items-center space-x-4">
                              <Button
                                    gradientMonochrome="purple"
                                    size="xs"
                                    pill
                                    onClick={() => {
                                          setOpenEditModal(true);
                                          setPermissionData(row.original);
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
                                          setPermissionData(row.original);
                                    }}
                              >
                                    Delete
                              </Button>
                        </div>
                  ),
                  header: () => <span>Actions</span>,
            }),
      ];

      return (
            <AuthenticatedLayout
                  auth={props.auth}
                  errors={props.errors}
                  header={
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                              Settings - Permissions
                        </h2>
                  }
            >
                  <Head title="Settings - Permissions" />

                  <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <Datatable
                              columns={columns}
                              data={props.permissions?.data ?? []}
                              headerActions={
                                    <div className="flex items-center justify-end space-x-4">
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
                              }
                              footerActions={
                                    <div className="flex justify-end">
                                          <Datatable.Pagination
                                                links={
                                                      props.permissions
                                                            ?.links ?? []
                                                }
                                          />
                                    </div>
                              }
                        />
                  </div>

                  <CreatePermissionModal
                        show={openCreateModal}
                        onClose={() => setOpenCreateModal(false)}
                  />

                  <EditPermissionModal
                        show={openEditModal && permissionData}
                        defaultValues={permissionData}
                        onClose={() => setOpenEditModal(false)}
                  />

                  <DeletePermissionModal
                        show={openDeleteModal && permissionData}
                        id={permissionData?.id}
                        onClose={() => setOpenDeleteModal(false)}
                  />
            </AuthenticatedLayout>
      );
}
