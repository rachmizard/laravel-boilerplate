import { useForm } from '@inertiajs/react';
import { Button, Modal, Spinner } from 'flowbite-react';

import RoleFields from './RoleFields';

export default function CreateRoleModal({ show, onClose }) {
      const {
            data,
            setData,
            post,
            reset,
            errors,
            recentlySuccessful,
            processing,
      } = useForm({
            name: '',
            permissions: [],
      });

      const onSubmit = e => {
            e.preventDefault();
            post(window.route('settings.roles.store'), {
                  onSuccess: () => {
                        reset('name');
                  },
            });
      };

      return (
            <Modal show={show} dismissible onClose={onClose}>
                  <form onSubmit={onSubmit}>
                        <Modal.Header>Create New Role</Modal.Header>
                        <Modal.Body>
                              <RoleFields
                                    data={data}
                                    errors={errors}
                                    recentlySuccessful={recentlySuccessful}
                                    setData={setData}
                                    successMessage="Role Created Successfully"
                              />
                        </Modal.Body>
                        <Modal.Footer>
                              <Button type="submit" disabled={processing}>
                                    {processing && (
                                          <div className="mr-2">
                                                <Spinner light size="sm" />
                                          </div>
                                    )}
                                    Create
                              </Button>
                              <Button color="gray" onClick={onClose}>
                                    Cancel
                              </Button>
                        </Modal.Footer>
                  </form>
            </Modal>
      );
}
