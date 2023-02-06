import { usePage } from '@inertiajs/react';
import { Alert, Checkbox, Label, TextInput } from 'flowbite-react';

export default function RoleFields({
      recentlySuccessful,
      data,
      errors,
      setData,
      successMessage,
}) {
      const { permissions } = usePage().props;

      return (
            <>
                  {recentlySuccessful && (
                        <div className="mb-4">
                              <Alert color="success">
                                    <span>{successMessage}</span>
                              </Alert>
                        </div>
                  )}

                  <div className="space-y-6">
                        <div>
                              <div className="mb-2 block">
                                    <Label
                                          htmlFor="roleName"
                                          value="Role Name"
                                    />
                              </div>
                              <TextInput
                                    id="roleName"
                                    type="text"
                                    name="name"
                                    placeholder="Admin, User, etc."
                                    value={data.name}
                                    color={errors.name ? 'failure' : ''}
                                    helperText={errors.name}
                                    onChange={e =>
                                          setData('name', e.target.value)
                                    }
                              />
                        </div>

                        <div className="flex flex-col gap-4" id="checkbox">
                              <Label>
                                    Select these permissions that can attach to
                                    this role
                              </Label>

                              <div className="grid grid-cols-3 gap-4">
                                    {permissions.map((permission, index) => {
                                          const onChange = e => {
                                                if (e.target.checked) {
                                                      setData('permissions', [
                                                            ...data.permissions,
                                                            permission,
                                                      ]);
                                                } else {
                                                      setData(
                                                            'permissions',
                                                            data.permissions.filter(
                                                                  p =>
                                                                        p !==
                                                                        permission
                                                            )
                                                      );
                                                }
                                          };

                                          const isChecked =
                                                data.permissions?.includes(
                                                      permission
                                                );

                                          return (
                                                <div
                                                      key={permission}
                                                      className="flex items-center gap-2"
                                                >
                                                      <Checkbox
                                                            id={`permission_${index}`}
                                                            onChange={onChange}
                                                            checked={isChecked}
                                                      />
                                                      <Label
                                                            htmlFor={`permission_${index}`}
                                                      >
                                                            {permission}
                                                      </Label>
                                                </div>
                                          );
                                    })}
                              </div>
                        </div>
                  </div>
            </>
      );
}
