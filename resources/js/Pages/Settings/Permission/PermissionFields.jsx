import { Alert, Label, TextInput } from 'flowbite-react';

export default function PermissionFields({
      recentlySuccessful,
      data,
      errors,
      setData,
      successMessage,
}) {
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
                                          htmlFor="permissionName"
                                          value="Permission Name"
                                    />
                              </div>
                              <TextInput
                                    id="permissionName"
                                    type="text"
                                    name="name"
                                    placeholder="ex: edit articles, delete articles, etc."
                                    value={data?.name ?? ''}
                                    color={errors.name ? 'failure' : ''}
                                    helperText={errors.name}
                                    onChange={e =>
                                          setData('name', e.target.value)
                                    }
                              />
                        </div>
                  </div>
            </>
      );
}
