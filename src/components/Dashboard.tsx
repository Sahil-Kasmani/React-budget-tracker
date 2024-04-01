import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { AppShell, Burger, Button, Flex, Title, Menu, } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconLogout, IconWallet, IconUser, IconChevronDown } from '@tabler/icons-react';
import Transaction from './Transaction';
import { Avatar } from 'antd';

const Dashboard: React.FC = () => {
    const loggedUser = localStorage.getItem("user");
    const userName = loggedUser ? JSON.parse(loggedUser) : null;

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("login");
        navigate("/login");
    }

    const [opened, { toggle }] = useDisclosure();

    // user details 
    let exist = localStorage.getItem(userName.name);
    let user_deta = exist ? JSON.parse(exist) : null;

    // logic for the credit and debit balance 
    const totalCredit = user_deta.filter((item: any) => item.cate === "credit").reduce((prev: number, value: any) => prev + parseFloat(value.amount), 0)
    const totalDebit = user_deta.filter((item: any) => item.cate === "debit").reduce((prev: number, value: any) => prev + parseFloat(value.amount), 0)


    return (
        <>
            {
                localStorage.getItem("login") ? (
                    <>
                        <AppShell header={{ height: 50 }} navbar={{ width: 200, breakpoint: 'sm', collapsed: { mobile: !opened } }} padding="md">

                            <AppShell.Header>
                                <Flex
                                    mih={50}

                                    gap="md"
                                    justify="space-between"
                                    align="center"
                                    wrap="wrap"
                                >
                                    <div>
                                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                                        {<IconWallet size={35} style={{ marginRight: "10px" }} />}
                                    </div>
                                    {/* <Title c='#225b35' size={30}></Title> */}
                                    <Menu shadow='md' width={100}>
                                        <div>
                                            <Avatar style={{ padding: "1em" }}>
                                                <IconUser size="1.5rem" />
                                            </Avatar>  <Menu.Target>
                                                {/* <Button>Toggle menu</Button> */}
                                                <Button variant='outline' color='black' style={{ margin: "0px 0.7rem" }}>User <IconChevronDown /></Button>
                                            </Menu.Target>
                                        </div>
                                        <Menu.Dropdown>
                                            {/* <Button size='sm' leftSection={<IconLogout size={14} />} onClick={handleLogout} color='red' radius="lg">Logout</Button> */}
                                            <Menu.Item leftSection={<IconLogout size={14} />} onClick={handleLogout} color='red'>
                                                Logout
                                            </Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                </Flex>
                            </AppShell.Header>

                            <AppShell.Navbar p="md">
                                <Sidebar />
                            </AppShell.Navbar>

                            <AppShell.Main>
                                {/* <div>Welcome - {userName.name}</div> */}
                                <div className='mainDetails'>
                                    <div className="budDetail">
                                        <h3>Total Income<p>+₹.{totalCredit}</p></h3>
                                        <h3>Total Expenses<p>-₹.{totalDebit}</p></h3>
                                        <h3>Total Balance<p>{totalCredit > totalDebit ? "+" : "-"}₹.{totalCredit - totalDebit}</p></h3>
                                    </div>
                                    <div className="budDetail2">
                                        <Transaction user_deta={user_deta} />
                                    </div>
                                </div>
                            </AppShell.Main>
                        </AppShell>
                    </>
                ) :
                    <>
                        <h2 style={{ textAlign: "center", margin: "50px" }}>User is not logged in :- <Link to="/login">Login</Link></h2>
                    </>
            }
        </>
    )
}

export default Dashboard