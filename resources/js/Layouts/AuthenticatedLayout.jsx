/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import {
      ArrowRightOnRectangleIcon,
      ArrowSmallLeftIcon,
      ArrowSmallRightIcon,
      ChartPieIcon,
      InboxIcon,
      ShoppingBagIcon,
      UserIcon,
} from '@heroicons/react/24/outline';
import { Avatar, Dropdown, Navbar, Sidebar } from 'flowbite-react';

export default function Authenticated({ auth, children }) {
      const [sidebarOpen, setSidebarOpen] = useState(true);

      return (
            <div className="min-h-screen bg-gray-100">
                  <div className="flex">
                        <div
                              className={`flex-initial ${
                                    sidebarOpen ? 'w-64' : 'w-fit'
                              } min-h-screen`}
                        >
                              <Sidebar
                                    className="min-h-screen h-full"
                                    aria-label="Sidebar with multi-level dropdown example"
                                    collapsed={!sidebarOpen}
                              >
                                    <React.Fragment>
                                          <Sidebar.Logo
                                                href="#"
                                                img="https://flowbite.com/docs/images/logo.svg"
                                                imgAlt="Flowbite logo"
                                          >
                                                Flowbite
                                          </Sidebar.Logo>
                                          <Sidebar.Items>
                                                <Sidebar.ItemGroup>
                                                      <Sidebar.Item
                                                            href="#"
                                                            onClick={() => {
                                                                  router.visit(
                                                                        route(
                                                                              'dashboard'
                                                                        )
                                                                  );
                                                            }}
                                                            icon={ChartPieIcon}
                                                      >
                                                            Dashboard
                                                      </Sidebar.Item>
                                                      <Sidebar.Collapse
                                                            icon={
                                                                  ShoppingBagIcon
                                                            }
                                                            label="E-commerce"
                                                      >
                                                            <Sidebar.Item href="#">
                                                                  Products
                                                            </Sidebar.Item>
                                                      </Sidebar.Collapse>
                                                      <Sidebar.Item
                                                            href="#"
                                                            icon={InboxIcon}
                                                      >
                                                            Inbox
                                                      </Sidebar.Item>
                                                      <Sidebar.Item
                                                            href="#"
                                                            icon={UserIcon}
                                                      >
                                                            Users
                                                      </Sidebar.Item>
                                                      <Sidebar.Item
                                                            href="#"
                                                            icon={
                                                                  ShoppingBagIcon
                                                            }
                                                      >
                                                            Products
                                                      </Sidebar.Item>
                                                      <Sidebar.Item
                                                            href="#"
                                                            onClick={() =>
                                                                  setSidebarOpen(
                                                                        prev =>
                                                                              !prev
                                                                  )
                                                            }
                                                            icon={
                                                                  sidebarOpen
                                                                        ? ArrowSmallLeftIcon
                                                                        : ArrowSmallRightIcon
                                                            }
                                                      />
                                                </Sidebar.ItemGroup>
                                          </Sidebar.Items>
                                    </React.Fragment>
                              </Sidebar>
                        </div>

                        <div className="flex flex-col flex-auto">
                              <Navbar rounded>
                                    <Navbar.Brand href="/">
                                          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                                                Flowbite
                                          </span>
                                    </Navbar.Brand>
                                    <div className="flex md:order-2">
                                          <Dropdown
                                                inline={true}
                                                label={
                                                      <div className="inline-flex space-x-3 items-center">
                                                            <span className="hidden md:block text-sm text-gray-500 dark:text-gray-100">
                                                                  {
                                                                        auth
                                                                              .user
                                                                              .name
                                                                  }
                                                            </span>
                                                            <Avatar
                                                                  alt="User settings"
                                                                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                                                  rounded={true}
                                                            />
                                                      </div>
                                                }
                                          >
                                                <Dropdown.Header>
                                                      <span className="block text-sm">
                                                            {auth.user.name}
                                                      </span>
                                                      <span className="block truncate text-sm font-medium">
                                                            {auth.user.email}
                                                      </span>
                                                </Dropdown.Header>
                                                <Dropdown.Item
                                                      onClick={() => {
                                                            router.visit(
                                                                  route(
                                                                        'profile.edit'
                                                                  )
                                                            );
                                                      }}
                                                >
                                                      <Link
                                                            href={route(
                                                                  'profile.edit'
                                                            )}
                                                      >
                                                            Profile
                                                      </Link>
                                                </Dropdown.Item>
                                                <Dropdown.Divider />
                                                <Dropdown.Item
                                                      onClick={() => {
                                                            router.post(
                                                                  route(
                                                                        'logout'
                                                                  )
                                                            );
                                                      }}
                                                >
                                                      <div className="inline-flex gap-2">
                                                            <ArrowRightOnRectangleIcon />
                                                            <span>
                                                                  Sign out
                                                            </span>
                                                      </div>
                                                </Dropdown.Item>
                                          </Dropdown>
                                    </div>
                              </Navbar>

                              <main className="flex-1 py-6 relative z-0 overflow-y-auto focus:outline-none">
                                    {children}
                              </main>
                        </div>
                  </div>
            </div>
      );
}
