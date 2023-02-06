import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { Sidebar as FlowbiteSidebar } from 'flowbite-react';
import {
      ArrowSmallLeftIcon,
      ArrowSmallRightIcon,
      ChartPieIcon,
      Cog6ToothIcon,
      ShieldCheckIcon,
      UserIcon,
      UsersIcon,
} from '@heroicons/react/24/outline';

export default function Sidebar() {
      const { url, props } = usePage();
      const { app_name, auth } = props;

      const [sidebarOpen, setSidebarOpen] = useState(true);

      const elligibleAccessSettings = auth.roles.includes('super-admin');

      return (
            <div
                  className={`flex-initial ${
                        sidebarOpen ? 'w-64' : 'w-fit'
                  } min-h-screen`}
            >
                  <FlowbiteSidebar
                        className="min-h-screen h-full"
                        aria-label="FlowbiteSidebar with multi-level dropdown example"
                        collapsed={!sidebarOpen}
                  >
                        <React.Fragment>
                              <FlowbiteSidebar.Logo
                                    href="#"
                                    img="https://flowbite.com/docs/images/logo.svg"
                                    imgAlt={`${app_name} logo`}
                              >
                                    {app_name}
                              </FlowbiteSidebar.Logo>
                              <FlowbiteSidebar.Items>
                                    <FlowbiteSidebar.ItemGroup>
                                          <FlowbiteSidebar.Item
                                                href="#"
                                                onClick={() => {
                                                      router.visit(
                                                            window.route(
                                                                  'dashboard'
                                                            )
                                                      );
                                                }}
                                                icon={ChartPieIcon}
                                          >
                                                Dashboard
                                          </FlowbiteSidebar.Item>
                                    </FlowbiteSidebar.ItemGroup>
                                    {elligibleAccessSettings && (
                                          <FlowbiteSidebar.ItemGroup>
                                                <FlowbiteSidebar.Collapse
                                                      icon={Cog6ToothIcon}
                                                      label="Settings"
                                                      open={url.startsWith(
                                                            '/settings'
                                                      )}
                                                >
                                                      <FlowbiteSidebar.Item
                                                            icon={UserIcon}
                                                            href="#"
                                                            active={url.startsWith(
                                                                  '/settings/roles'
                                                            )}
                                                            onClick={() =>
                                                                  router.visit(
                                                                        window.route(
                                                                              'settings.roles.index'
                                                                        ),
                                                                        {
                                                                              preserveState: true,
                                                                        }
                                                                  )
                                                            }
                                                      >
                                                            Roles
                                                      </FlowbiteSidebar.Item>
                                                      <FlowbiteSidebar.Item
                                                            icon={
                                                                  ShieldCheckIcon
                                                            }
                                                            href="#"
                                                            active={url.startsWith(
                                                                  '/settings/permissions'
                                                            )}
                                                            onClick={() =>
                                                                  router.visit(
                                                                        window.route(
                                                                              'settings.permissions.index'
                                                                        ),
                                                                        {
                                                                              preserveState: true,
                                                                        }
                                                                  )
                                                            }
                                                      >
                                                            Permissions
                                                      </FlowbiteSidebar.Item>
                                                      <FlowbiteSidebar.Item
                                                            icon={UsersIcon}
                                                            href="#"
                                                            active={url.startsWith(
                                                                  '/settings/users'
                                                            )}
                                                            onClick={() =>
                                                                  router.visit(
                                                                        window.route(
                                                                              'settings.users.index'
                                                                        ),
                                                                        {
                                                                              preserveState: true,
                                                                        }
                                                                  )
                                                            }
                                                      >
                                                            Manage Users
                                                      </FlowbiteSidebar.Item>
                                                </FlowbiteSidebar.Collapse>
                                          </FlowbiteSidebar.ItemGroup>
                                    )}
                                    <FlowbiteSidebar.ItemGroup>
                                          <FlowbiteSidebar.Item
                                                href="#"
                                                onClick={() =>
                                                      setSidebarOpen(
                                                            prev => !prev
                                                      )
                                                }
                                                icon={
                                                      sidebarOpen
                                                            ? ArrowSmallLeftIcon
                                                            : ArrowSmallRightIcon
                                                }
                                          >
                                                {sidebarOpen
                                                      ? 'Collapse'
                                                      : 'Expand'}{' '}
                                                sidebar
                                          </FlowbiteSidebar.Item>
                                    </FlowbiteSidebar.ItemGroup>
                              </FlowbiteSidebar.Items>
                        </React.Fragment>
                  </FlowbiteSidebar>
            </div>
      );
}
