import { useForm } from '@inertiajs/react';
import { Button, Modal, Spinner } from 'flowbite-react';
import UserFields from './UserFields';

export default function EditUserModal({
      defaultValues = {
            name: '',
            email: '',
            roles: [],
            email_verified_at: '',
      },
      onClose,
}) {
      const { data, setData, put, errors, recentlySuccessful, processing } =
            useForm({
                  name: defaultValues.name,
                  email: defaultValues.email,
                  roles: defaultValues.roles.map(role => role.name),
                  email_verified_at: defaultValues.email_verified_at,
            });

      const onSubmit = e => {
            e.preventDefault();
            put(window.route('settings.users.update', defaultValues.id));
      };

      return (
            <Modal size="4xl" show dismissible onClose={onClose}>
                  <form autoComplete="off" onSubmit={onSubmit}>
                        <Modal.Header>Edit User</Modal.Header>
                        <Modal.Body>
                              <UserFields
                                    data={data}
                                    errors={errors}
                                    recentlySuccessful={recentlySuccessful}
                                    setData={setData}
                                    successMessage="User Updated Successfully"
                                    withPassword={false}
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
