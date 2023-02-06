import { useForm } from '@inertiajs/react';
import { Button, Modal, Spinner } from 'flowbite-react';
import UserFields from './UserFields';

export default function CreateUserModal({ show, onClose }) {
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
            email: '',
            password: '',
            password_confirmation: '',
            roles: [],
            email_verified_at: '',
      });

      const onSubmit = e => {
            e.preventDefault();
            post(window.route('settings.users.store'), {
                  onSuccess: () => {
                        reset();
                  },
            });
      };

      return (
            <Modal size="4xl" show={show} dismissible onClose={onClose}>
                  <form autoComplete="off" onSubmit={onSubmit}>
                        <Modal.Header>Create New User</Modal.Header>
                        <Modal.Body>
                              <UserFields
                                    data={data}
                                    errors={errors}
                                    recentlySuccessful={recentlySuccessful}
                                    setData={setData}
                                    successMessage="User Created Successfully"
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
