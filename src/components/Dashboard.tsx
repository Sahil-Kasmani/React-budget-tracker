import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { Button, Menu } from '@mantine/core';
import { IconLogout, IconUser, IconChevronDown } from '@tabler/icons-react';
import { Avatar } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCircleUp } from '@fortawesome/free-solid-svg-icons'
import { Sidebar, Transaction } from '../index';


const Dashboard: React.FC = () => {
    const [toggle, setToggle] = useState<boolean>(false);

    const loggedUser = localStorage.getItem("user");
    const userName = loggedUser ? JSON.parse(loggedUser) : null;

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("login");
        navigate("/login");
    }


    // user details 
    let exist = localStorage.getItem(userName.name);
    let user_deta = exist ? JSON.parse(exist) : null;

    // logic for the credit and debit b1 
    const totalCredit = user_deta.filter((item: any) => item.cate === "credit").reduce((prev: number, value: any) => prev + parseFloat(value.amount), 0)
    const totalDebit = user_deta.filter((item: any) => item.cate === "debit").reduce((prev: number, value: any) => prev + parseFloat(value.amount), 0)


    // toggle function 
    const handleToggle = () => {
        setToggle((btnState) => !btnState)
    }

    let toggleActive = toggle ? ' active' : null;

    return (
        <>
            <div className="interface">
                <Sidebar isToggle={toggleActive} />

                <div className='content'>
                    <div className="navbar">
                        <div className='menu'>
                            <FontAwesomeIcon id='menu-icon' onClick={handleToggle} icon={faBars} />
                            <h3>Overview</h3>
                        </div>
                        <Menu shadow='md' width={100}>
                            <div>
                                <Avatar style={{ padding: "1em", cursor: 'pointer' }}>
                                    <IconUser size="1.5rem" />
                                </Avatar>  <Menu.Target>
                                    <Button variant='outline' color='black' style={{ margin: "0px 0.7rem" }}>User <IconChevronDown /></Button>
                                </Menu.Target>
                            </div>
                            <Menu.Dropdown>
                                <Menu.Item leftSection={<IconLogout size={14} />} onClick={handleLogout} color='red'>
                                    Logout
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </div>

                    <div className='mainDetails'>
                        <div id='budDetail'>
                            <div className="b1">
                                <div>Total Balance<h1>{totalCredit > totalDebit ? "+ " : "- "}₹.{totalCredit - totalDebit + ".00"}</h1></div>
                                <p><FontAwesomeIcon icon={faCircleUp} /> grow</p>

                            </div>

                            <div className='b2'>
                                <div>Total Income<h1>₹.{totalCredit + ".00"}</h1></div>
                            </div>
                            <div className='b2'>
                                <div>Total Expenses<h1>₹.{totalDebit + ".00"}</h1></div>
                            </div>
                        </div>
                        <div className="transDetail">
                            <Transaction user_deta={user_deta} />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Dashboard