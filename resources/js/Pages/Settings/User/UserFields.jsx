import { usePage } from '@inertiajs/react';
import { Alert, Checkbox, Label, TextInput } from 'flowbite-react';

export default function UserFields({
      recentlySuccessful,
      data,
      errors,
      setData,
      successMessage,
      withPassword = true,
}) {
      const { roles } = usePage().props;

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
                                    <Label htmlFor="name" value="Name" />
                              </div>
                              <TextInput
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="ex: John Doe"
                                    value={data.name}
                                    color={errors.name ? 'failure' : ''}
                                    helperText={errors.name}
                                    onChange={e =>
                                          setData('name', e.target.value)
                                    }
                              />
                        </div>
                        <div>
                              <div className="mb-2 block">
                                    <Label htmlFor="email" value="Email" />
                              </div>
                              <TextInput
                                    id="email"
                                    type="email"
                                    name="name"
                                    placeholder="ex: john.doe@mail.com"
                                    value={data.email}
                                    color={errors.email ? 'failure' : ''}
                                    helperText={errors.email}
                                    onChange={e =>
                                          setData('email', e.target.value)
                                    }
                              />
                        </div>

                        {withPassword && (
                              <div>
                                    <div className="mb-2 block">
                                          <Label
                                                htmlFor="password"
                                                value="Password"
                                          />
                                    </div>
                                    <TextInput
                                          id="password"
                                          type="password"
                                          name="password"
                                          value={data.password}
                                          color={
                                                errors.password ? 'failure' : ''
                                          }
                                          helperText={errors.password}
                                          onChange={e =>
                                                setData(
                                                      'password',
                                                      e.target.value
                                                )
                                          }
                                    />
                              </div>
                        )}

                        {withPassword && (
                              <div>
                                    <div className="mb-2 block">
                                          <Label
                                                htmlFor="password_confirmation"
                                                value="Confirm Password"
                                          />
                                    </div>
                                    <TextInput
                                          id="password_confirmation"
                                          type="password"
                                          name="password_confirmation"
                                          value={data.password_confirmation}
                                          color={
                                                errors.password_confirmation
                                                      ? 'failure'
                                                      : ''
                                          }
                                          helperText={
                                                errors.password_confirmation
                                          }
                                          onChange={e =>
                                                setData(
                                                      'password_confirmation',
                                                      e.target.value
                                                )
                                          }
                                    />
                              </div>
                        )}

                        <div className="flex flex-col gap-4" id="checkbox">
                              <Label
                                    htmlFor="roles"
                                    color={errors.roles ? 'failure' : ''}
                              >
                                    Roles
                              </Label>

                              <div
                                    id="roles"
                                    className="grid grid-cols-3 gap-4"
                              >
                                    {roles.map((role, index) => {
                                          const onChange = e => {
                                                if (e.target.checked) {
                                                      setData('roles', [
                                                            ...data.roles,
                                                            role,
                                                      ]);
                                                } else {
                                                      setData(
                                                            'roles',
                                                            data.roles.filter(
                                                                  p =>
                                                                        p !==
                                                                        role
                                                            )
                                                      );
                                                }
                                          };

                                          const isChecked =
                                                data.roles?.includes(role);

                                          return (
                                                <div
                                                      key={role}
                                                      className="flex items-center gap-2"
                                                >
                                                      <Checkbox
                                                            id={`role_${index}`}
                                                            onChange={onChange}
                                                            checked={isChecked}
                                                      />
                                                      <Label
                                                            htmlFor={`role_${index}`}
                                                      >
                                                            {role}
                                                      </Label>
                                                </div>
                                          );
                                    })}
                              </div>

                              {errors.roles && (
                                    <span className="text-red-500 text-md">
                                          {errors.roles}
                                    </span>
                              )}
                        </div>
                        <div>
                              <div className="mb-2 block space-x-2">
                                    <Checkbox
                                          id="email_verified_at"
                                          checked={!!data.email_verified_at}
                                          onChange={e => {
                                                setData(
                                                      'email_verified_at',
                                                      e.target.checked
                                                            ? new Date()
                                                            : null
                                                );
                                          }}
                                    />

                                    <Label
                                          htmlFor="email_verified_at"
                                          value="Verify Email"
                                    />
                              </div>
                        </div>
                  </div>
            </>
      );
}
