import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Button, Modal } from 'flowbite-react';
import PermissionFields from './PermissionFields';

export default function EditPermissionModal({ defaultValues, show, onClose }) {
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
            put(window.route('settings.permissions.update', defaultValues.id));
      };

      return (
            <Modal show={show} dismissible onClose={onClose}>
                  <form onSubmit={onSubmit}>
                        <Modal.Header>Edit Permission</Modal.Header>
                        <Modal.Body>
                              <PermissionFields
                                    data={data}
                                    errors={errors}
                                    recentlySuccessful={recentlySuccessful}
                                    setData={setData}
                                    successMessage="Permission Updated Successfully"
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
