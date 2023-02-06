import { useForm } from '@inertiajs/react';
import { Button, Modal } from 'flowbite-react';
import RoleFields from './RoleFields';

export default function CreateRoleModal({ show, onClose }) {
      const { data, setData, post, reset, errors, recentlySuccessful } =
            useForm({
                  name: '',
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
                              <Button type="submit">Create</Button>
                              <Button color="gray" onClick={onClose}>
                                    Cancel
                              </Button>
                        </Modal.Footer>
                  </form>
            </Modal>
      );
}
