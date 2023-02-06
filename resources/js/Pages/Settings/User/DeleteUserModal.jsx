import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { router } from '@inertiajs/react';
import { Button, Modal } from 'flowbite-react';
import React from 'react';

export default function DeleteUserModal({ show, id, onClose }) {
      const deleteUser = () => {
            router.delete(window.route('settings.users.destroy', id), {
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
                                    Are you sure you want to delete this user?
                              </h3>
                              <div className="flex justify-center gap-4">
                                    <Button
                                          color="failure"
                                          onClick={deleteUser}
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
