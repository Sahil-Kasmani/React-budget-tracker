import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { ActionIcon, Button, Modal } from '@mantine/core'
import { IconFilterEdit, IconCategoryPlus } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks';

interface FormValues {
    cate: string,
    amount: number | string,
    date: string,
    desc: string
}

interface data_prop {
    user_deta: any;
}

const Transaction = ({ user_deta }: data_prop) => {
    const [inputValue, setInputValue] = useState<FormValues>({
        cate: "",
        amount: "",
        date: "",
        desc: ""
    })

    const [opened, { open, close }] = useDisclosure(false);


    const navigate = useNavigate();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userValue = localStorage.getItem("user");
        const user = userValue ? JSON.parse(userValue) : null;

        const { cate, amount, date, desc } = inputValue;

        const existingValue = localStorage.getItem(user.name);
        const details = existingValue ? JSON.parse(existingValue) : [];
        const detail = { cate, amount, date, desc };
        details.push(detail)

        const values = JSON.stringify(details);
        localStorage.setItem(user.name, values);

        navigate('/dashboard')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setInputValue((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    return (
        <div style={{ width: '100%' }}>
            <div>
                <div className='flex'>
                    <h2>Transactions</h2>
                    <ActionIcon variant='outline' color='black' ><IconFilterEdit /></ActionIcon>
                </div>
                {user_deta && user_deta.map((data: any, index: number) => {
                    return <section key={index} className='trans' > {data.cate} <p>₹{data.amount}</p></section>
                })}
                {/* <section className='trans'>Tea <p>₹200</p></section>
                <section className='trans'>Grocries <p>₹1300</p></section>
                <section className='trans'>Dining Out <p>₹2250</p></section> */}
            </div >
            <Modal opened={opened} onClose={close} title="Add Your Transaction">
                <fieldset>
                    <form autoComplete='off' onSubmit={(e) => handleSubmit(e)} >
                        <label htmlFor="dropdown">Category:
                            <select onChange={handleChange} value={inputValue.cate} id="dropdown" name='cate' required>
                                <option value="" disabled>Category</option>
                                <option value="credit">Credit</option>
                                <option value="debit">Debit</option>
                            </select>
                        </label>

                        <label htmlFor="amount">Amount:
                            <input onChange={handleChange} type="text" id='amount' name='amount' placeholder='amount' required />
                        </label>

                        <label htmlFor="date">Date:<input onChange={handleChange} type="date" id='date' name='date' required /></label>

                        <label htmlFor="desc">Description: <textarea onChange={handleChange} name="desc" id="desc" placeholder='Write your desc...' rows={3} style={{ borderRadius: "unset" }} required /></label>

                        <button className='DetaBtn'>Submit</button>
                    </form>
                </fieldset>
            </Modal>
            <Button variant='outline' leftSection={<IconCategoryPlus size={14} />} style={{ margin: "10px 1.3rem" }} onClick={open}>Add New</Button>
        </div >
    )
}

export default Transaction