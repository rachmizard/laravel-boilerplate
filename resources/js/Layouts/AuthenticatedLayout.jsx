/* eslint-disable no-undef */
import Sidebar from '@/Components/Sidebar';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { Link, router, usePage } from '@inertiajs/react';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';

const getSeperatedUrlPath = url => {
      const urlPath = url.split('/');
      urlPath.shift();

      // remove query params ? from url
      urlPath[urlPath.length - 1] = urlPath[urlPath.length - 1].split('?')[0];

      return urlPath
            .map(path => {
                  return path[0].toUpperCase() + path.slice(1);
            })
            .join(' > ');
};

export default function Authenticated({ auth, children }) {
      const { url } = usePage();

      return (
            <div className="min-h-screen bg-gray-100">
                  <div className="flex">
                        <Sidebar />

                        <div className="flex flex-col flex-auto">
                              <Navbar rounded>
                                    <Navbar.Brand href="/">
                                          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                                                {getSeperatedUrlPath(url)}
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
                                                      icon={
                                                            ArrowRightOnRectangleIcon
                                                      }
                                                >
                                                      <span>Sign out</span>
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
