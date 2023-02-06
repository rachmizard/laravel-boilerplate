import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Button, Modal } from 'flowbite-react';
import RoleFields from './RoleFields';

export default function EditRoleModal({ defaultValues, show, onClose }) {
      const { data, setData, put, errors, recentlySuccessful } =
            useForm(defaultValues);
      useEffect(() => {
            let isMounted = true;

            if (show && isMounted) {
                  setData(defaultValues);
            }

            return () => {
                  isMounted = false;
            };
      }, [defaultValues, show]);

      const onSubmit = e => {
            e.preventDefault();
            put(window.route('settings.roles.update', defaultValues.id));
      };

      return (
            <Modal show={show} dismissible onClose={onClose}>
                  <form onSubmit={onSubmit}>
                        <Modal.Header>Edit Role</Modal.Header>
                        <Modal.Body>
                              <RoleFields
                                    data={data}
                                    errors={errors}
                                    recentlySuccessful={recentlySuccessful}
                                    setData={setData}
                                    successMessage="Role Updated Successfully"
                              />
                        </Modal.Body>
                        <Modal.Footer>
                              <Button type="submit">Update</Button>
                              <Button Uolor="gray" onClick={onClose}>
                                    Cancel
                              </Button>
                        </Modal.Footer>
                  </form>
            </Modal>
      );
}
