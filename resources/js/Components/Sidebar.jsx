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

const itemGroups = [
      {
            active: uri => uri.startsWith('/dashboard'),
            label: 'Dashboard',
            href: window.route('dashboard'),
            icon: ChartPieIcon,
            hasChildren: false,
            can: ['view-dashboard'],
            children: [],
      },
      {
            active: uri => uri.startsWith('/settings'),
            label: 'Settings',
            href: '#',
            icon: Cog6ToothIcon,
            hasChildren: true,
            can: ['view-settings'],
            children: [
                  {
                        active: uri => uri.startsWith('/settings/roles'),
                        label: 'Roles',
                        href: window.route('settings.roles.index'),
                        icon: UserIcon,
                        can: ['view-settings-roles'],
                  },
                  {
                        active: uri => uri.startsWith('/settings/permissions'),
                        label: 'Permissions',
                        href: window.route('settings.permissions.index'),
                        icon: ShieldCheckIcon,
                        can: ['view-settings-permissions'],
                  },
                  {
                        active: uri => uri.startsWith('/settings/users'),
                        label: 'Manage Users',
                        href: window.route('settings.users.index'),
                        icon: UsersIcon,
                        can: ['view-settings-users'],
                  },
            ],
      },
];

function checkPermissions(userPermissions = [], permissions = []) {
      if (permissions.length === 0) return true;

      return permissions.some(permission =>
            userPermissions.includes(permission)
      );
}

export default function Sidebar() {
      const { url, props } = usePage();
      const { app_name, auth } = props;

      const userRoles = auth.roles;
      const userPermissions = auth.permissions;
      const isSuperAdmin = userRoles.includes('super-admin');

      const [sidebarOpen, setSidebarOpen] = useState(true);

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
                                          {itemGroups.map(
                                                (itemGroup, index) => {
                                                      const hasChildren =
                                                            itemGroup.hasChildren ||
                                                            itemGroup.children
                                                                  .length > 0;

                                                      if (
                                                            !isSuperAdmin &&
                                                            !checkPermissions(
                                                                  userPermissions,
                                                                  itemGroup.can
                                                            )
                                                      ) {
                                                            return null;
                                                      }

                                                      return hasChildren ? (
                                                            <FlowbiteSidebar.Collapse
                                                                  icon={
                                                                        itemGroup.icon
                                                                  }
                                                                  label={
                                                                        itemGroup.label
                                                                  }
                                                                  open={itemGroup.active(
                                                                        url
                                                                  )}
                                                            >
                                                                  {itemGroup.children.map(
                                                                        child => (
                                                                              <FlowbiteSidebar.Item
                                                                                    key={`${child.label}-${index}`}
                                                                                    active={child.active(
                                                                                          url
                                                                                    )}
                                                                                    href="#"
                                                                                    onClick={() => {
                                                                                          router.visit(
                                                                                                child.href
                                                                                          );
                                                                                    }}
                                                                                    icon={
                                                                                          child.icon
                                                                                    }
                                                                              >
                                                                                    {
                                                                                          child.label
                                                                                    }
                                                                              </FlowbiteSidebar.Item>
                                                                        )
                                                                  )}
                                                            </FlowbiteSidebar.Collapse>
                                                      ) : (
                                                            <FlowbiteSidebar.Item
                                                                  href="#"
                                                                  active={itemGroup.active(
                                                                        url
                                                                  )}
                                                                  onClick={() => {
                                                                        router.visit(
                                                                              itemGroup.href
                                                                        );
                                                                  }}
                                                                  icon={
                                                                        itemGroup.icon
                                                                  }
                                                            >
                                                                  {
                                                                        itemGroup.label
                                                                  }
                                                            </FlowbiteSidebar.Item>
                                                      );
                                                }
                                          )}
                                    </FlowbiteSidebar.ItemGroup>

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
