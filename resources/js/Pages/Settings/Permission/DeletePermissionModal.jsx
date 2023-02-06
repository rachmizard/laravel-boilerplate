import React from 'react';
import { router } from '@inertiajs/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

import { Button, Modal } from 'flowbite-react';

export default function DeletePermissionModal({ show, id, onClose }) {
      const deletePermission = () => {
            router.delete(window.route('settings.permissions.destroy', id), {
                  preserveScroll: true,
                  onSuccess: () => onClose && onClose(),
            });
      };

      return (
            <Modal show={show} size="md" popup={true} onClose={onClose}>
                  <Modal.Header />
                  <Modal.Body>
                        <div className="text-center">
                              <ExclamationTriangleIcon className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Are you sure you want to delete this
                                    permission?
                              </h3>
                              <div className="flex justify-center gap-4">
                                    <Button
                                          color="failure"
                                          onClick={deletePermission}
                                          type="button"
                                    >
                                          Yes
                                    </Button>
                                    <Button color="gray" onClick={onClose}>
                                          No, cancel
                                    </Button>
                              </div>
                        </div>
                  </Modal.Body>
            </Modal>
      );
}
