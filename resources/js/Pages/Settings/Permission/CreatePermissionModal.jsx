import { useForm } from '@inertiajs/react';
import { Button, Modal } from 'flowbite-react';
import PermissionFields from './PermissionFields';

export default function CreatePermissionModal({ show, onClose }) {
      const { data, setData, post, reset, errors, recentlySuccessful } =
            useForm({
                  name: '',
            });

      const onSubmit = e => {
            e.preventDefault();
            post(window.route('settings.permissions.store'), {
                  onSuccess: () => {
                        reset('name');
                  },
            });
      };

      return (
            <Modal show={show} dismissible onClose={onClose}>
                  <form onSubmit={onSubmit}>
                        <Modal.Header>Create New Permission</Modal.Header>
                        <Modal.Body>
                              <PermissionFields
                                    data={data}
                                    errors={errors}
                                    recentlySuccessful={recentlySuccessful}
                                    setData={setData}
                                    successMessage="Permission Created Successfully"
                              />
                        </Modal.Body>
                        <Modal.Footer>
                              <Button type="submit">Create</Button>
                              <Button color="gray" onClick={onClose}>
                                    Cancel
                              </Button>
                        </Modal.Footer>
                  </form>
            </Modal>
      );
}
