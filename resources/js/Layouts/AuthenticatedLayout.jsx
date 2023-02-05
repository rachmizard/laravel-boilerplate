import { Link, router } from '@inertiajs/react';
import { Avatar, Dropdown, Navbar, Sidebar } from 'flowbite-react';

export default function Authenticated({ auth, header, children }) {
      return (
            <div className="min-h-screen bg-gray-100">
                  <Navbar fluid={true} rounded={true}>
                        <Navbar.Brand href="/">
                              <img
                                    src="https://flowbite.com/docs/images/logo.svg"
                                    className="mr-3 h-6 sm:h-9"
                                    alt="Flowbite Logo"
                              />
                              <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                                    Flowbite
                              </span>
                        </Navbar.Brand>
                        <div className="flex md:order-2">
                              <Dropdown
                                    inline={true}
                                    label={
                                          <div className="inline-flex space-x-3 items-center">
                                                <span className="hidden md:block text-sm text-gray-500">
                                                      {auth.user.name}
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
                                                      route('profile.edit')
                                                );
                                          }}
                                    >
                                          <Link href={route('profile.edit')}>
                                                Profile
                                          </Link>
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item
                                          onClick={() => {
                                                router.post(route('logout'));
                                          }}
                                    >
                                          <div className="inline-flex gap-2">
                                                <LogoutIcon />
                                                <span>Sign out</span>
                                          </div>
                                    </Dropdown.Item>
                              </Dropdown>
                        </div>
                  </Navbar>

                  <div className="w-fit">
                        <Sidebar aria-label="Sidebar with multi-level dropdown example">
                              <Sidebar.Items>
                                    <Sidebar.ItemGroup>
                                          <Sidebar.Item
                                                href="#"
                                                icon={HiChartPie}
                                          >
                                                Dashboard
                                          </Sidebar.Item>
                                          <Sidebar.Collapse
                                                icon={HiShoppingBag}
                                                label="E-commerce"
                                          >
                                                <Sidebar.Item href="#">
                                                      Products
                                                </Sidebar.Item>
                                          </Sidebar.Collapse>
                                          <Sidebar.Item href="#" icon={HiInbox}>
                                                Inbox
                                          </Sidebar.Item>
                                          <Sidebar.Item href="#" icon={HiUser}>
                                                Users
                                          </Sidebar.Item>
                                          <Sidebar.Item
                                                href="#"
                                                icon={HiShoppingBag}
                                          >
                                                Products
                                          </Sidebar.Item>
                                          <Sidebar.Item
                                                href="#"
                                                icon={HiArrowSmRight}
                                          >
                                                Sign In
                                          </Sidebar.Item>
                                          <Sidebar.Item href="#" icon={HiTable}>
                                                Sign Up
                                          </Sidebar.Item>
                                    </Sidebar.ItemGroup>
                              </Sidebar.Items>
                        </Sidebar>
                  </div>

                  <main>{children}</main>
            </div>
      );
}
