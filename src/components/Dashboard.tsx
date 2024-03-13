import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { AppShell, Burger, Button, Flex, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconLogout, IconWallet } from '@tabler/icons-react';
import Transaction from './Transaction';

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
    let exist = localStorage.getItem('john');
    let user_deta = exist ? JSON.parse(exist) : null;

    return (
        <>
            {
                localStorage.getItem("login") ? (
                    <>
                        <AppShell header={{ height: 50 }} navbar={{ width: 150, breakpoint: 'sm', collapsed: { mobile: !opened } }} padding="md">

                            <AppShell.Header>
                                <Flex
                                    mih={50}
                                    bg="#b8b3b3d6"
                                    gap="md"
                                    justify="space-between"
                                    align="center"
                                    direction="row"
                                    wrap="nowrap"
                                >
                                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                                    <Title c='#225b35'>{<IconWallet size={30} style={{ marginRight: "10px" }} />}Budget Tracker</Title>
                                    <Button size='sm' leftSection={<IconLogout size={14} />} onClick={handleLogout} color='red' radius="lg">Logout</Button>
                                </Flex>
                            </AppShell.Header>

                            <AppShell.Navbar p="md">
                                <Sidebar />
                            </AppShell.Navbar>

                            <AppShell.Main>
                                {/* <div>Welcome - {userName.name}</div> */}
                                <div className='mainDetails'>
                                    <div className="budDetail">
                                        <h3>Total Income<p>₹.20000</p></h3>
                                        <h3>Total Expenses<p>₹.20000</p></h3>
                                        <h3>Remaining Budget<p>₹.30000</p></h3>
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