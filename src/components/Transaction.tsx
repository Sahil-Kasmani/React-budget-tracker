import React, { useEffect, useState } from "react";
import { Button, Modal } from "@mantine/core";
import { IconCategoryPlus } from "@tabler/icons-react";
import { DatePicker } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupee } from "@fortawesome/free-solid-svg-icons";

interface FormValues {
    cate: string;
    amount: number | string;
    date: string;
    desc: string;
}

interface filterValues {
    type: string;
    dates: string;
}

interface data_prop {
    user_deta: any;
    totalCredit: any;
    totalDebit: any;
}

const Transaction = ({ user_deta, totalCredit, totalDebit }: data_prop) => {
    const [tranValue, setTranValue] = useState<FormValues>({
        cate: "",
        amount: "",
        date: "",
        desc: "",
    });

    const [filterValue, setFilterValue] = useState<filterValues>({
        type: "",
        dates: "",
    });

    const [firstModalOpen, setFirstModalOpen] = useState(false);
    const [secondModalOpen, setSecondModalOpen] = useState(false);
    const [filteredData, setFilteredData] = useState<any[]>(user_deta);

    const { RangePicker } = DatePicker;
    const [dateRange, setDateRange] = useState<string[]>([]);

    // filter modal coding
    const handleFilterOpen = () => {
        setFilterValue({
            type: "",
            dates: "",
        });
        setDateRange([]);
        setFirstModalOpen(true);
    };

    const filterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let { dates, type } = filterValue;

        let filtered;

        if (type !== "" && dateRange.length === 2) {
            filtered = user_deta.filter((data: any) => {
                const dataDate = moment(data.date, "YYYY-MM-DD");
                return (
                    dataDate.isBetween(
                        moment(dateRange[0]),
                        moment(dateRange[1]),
                        "day",
                        "[]"
                    ) && data.cate === type
                );
            });
        } else if (dateRange.length === 2) {
            console.log("Date Range Selected:", dateRange);
            filtered = user_deta.filter((data: any) => {
                const dataDate = moment(data.date, "YYYY-MM-DD");
                return dataDate.isBetween(
                    moment(dateRange[0]),
                    moment(dateRange[1]),
                    "day",
                    "[]"
                );
            });
        } else if (dates !== "" && type !== "") {
            filtered = user_deta.filter(
                (data: any) => data.date === dates && data.cate === type
            );
        } else if (type !== "") {
            filtered = user_deta.filter((data: any) => data.cate === type);
        } else if (dates !== "") {
            filtered = user_deta.filter((data: any) => data.date === dates);
        } else {
            filtered = user_deta;
        }

        setFilteredData(filtered);
        setFirstModalOpen(false);
    };

    const filterChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFilterValue((prev) => ({ ...prev, [name]: value }));
    };

    // Transaction modal coding
    const tranSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { cate, amount, date, desc } = tranValue;
        const detail = { cate, amount, date, desc };

        const userValue = localStorage.getItem("user");
        const user = userValue ? JSON.parse(userValue) : null;

        const existingValue = localStorage.getItem(user.name);
        const details = existingValue ? JSON.parse(existingValue) : [];
        details.push(detail);

        const values = JSON.stringify(details);
        localStorage.setItem(user.name, values);

        setSecondModalOpen(false);

        const updatedUserDeta = [...details];
        setFilteredData(updatedUserDeta);

        console.log(totalCredit);
        console.log(totalDebit);
    };

    const handleTransactionOpen = () => {
        setTranValue({
            cate: "",
            amount: "",
            date: "",
            desc: "",
        });
        setSecondModalOpen(true);
    };

    const tranChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        setTranValue((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div style={{ width: "100%" }}>
            <div>
                <div className="flex">
                    <h2>Transactions</h2>
                    <Link
                        to=""
                        style={{ textDecoration: "none" }}
                        className="explore"
                        onClick={handleFilterOpen}
                    >
                        <small>Explore all</small>
                    </Link>

                    <Modal
                        opened={firstModalOpen}
                        onClose={() => setFirstModalOpen(false)}
                        title="Filter Options"
                        size="lg"
                    >
                        <fieldset>
                            <form autoComplete="off" onSubmit={(e) => filterSubmit(e)}>
                                <label htmlFor="dateRange">
                                    Date Range:
                                    <RangePicker
                                        onChange={(dates) => {
                                            setDateRange(
                                                dates.map((item) => {
                                                    return moment(item?.toDate()).format("YYYY-MM-DD");
                                                    // console.log("Start Date:", dates[0]?.format('YYYY-MM-DD'))
                                                    // console.log("End Date:", dates[1]?.format('YYYY-MM-DD'));
                                                })
                                            );
                                        }}
                                        id="dateRange"
                                        name="dateRange"
                                        style={{ width: "100%" }}
                                    />
                                </label>

                                <label htmlFor="type">
                                    Select Transaction Type:
                                    <div className="">
                                        <select
                                            onChange={filterChange}
                                            value={filterValue.type}
                                            id="type"
                                            name="type"
                                        >
                                            <option value="" disabled>
                                                Transaction Type
                                            </option>
                                            <option value="credit">Credit</option>
                                            <option value="debit">Debit</option>
                                        </select>
                                    </div>
                                </label>

                                <label htmlFor="dates">
                                    Sort by Date:
                                    <div className="inputIcon">
                                        <input
                                            onChange={filterChange}
                                            type="date"
                                            id="dates"
                                            name="dates"
                                        />
                                    </div>
                                </label>
                                <button className="DetaBtn">Apply</button>
                            </form>
                        </fieldset>
                    </Modal>
                </div>
                <div>
                    <div>
                        <Button
                            variant="light"
                            leftSection={<IconCategoryPlus size={14} />}
                            style={{
                                margin: "4px 1.3rem",
                                width: "calc(99% - 40px)",
                                borderRadius: "10px",
                            }}
                            onClick={() => handleTransactionOpen()}
                        >
                            Add
                        </Button>
                    </div>
                </div>
                {filteredData.length === 0 && user_deta.length === 0 ? (
                    <p className="flex" style={{ color: "#da453c" }}>
                        No data available
                    </p>
                ) : filteredData.length === 0 && user_deta.length > 0 ? (
                    <p className="flex" style={{ color: "#da453c" }}>
                        No data available In selected filter Range
                    </p>
                ) : (
                    filteredData &&
                    filteredData.map((data: any, index: number) => {
                        return (
                            <section key={index} className="trans">
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <img
                                        className="cate-icon"
                                        src={
                                            data.cate === "credit"
                                                ? "/images/profit.jpg"
                                                : "/images/loss.jpg"
                                        }
                                        width="33px"
                                        height="33px"
                                        style={{ borderRadius: "50%", margin: "0px 10px 0px 5px" }}
                                    ></img>
                                    <div>
                                        <p style={{ fontWeight: "600" }}>{data.desc}</p>{" "}
                                        <p style={{ fontWeight: "300" }}>{data.cate}</p>{" "}
                                    </div>
                                </div>
                                <p style={{ fontWeight: "600" }}>₹{data.amount}</p>
                            </section>
                        );
                    })
                )}
            </div>
            <Modal
                opened={secondModalOpen}
                onClose={() => setSecondModalOpen(false)}
                title="Add Your Transaction"
            >
                <fieldset>
                    <form autoComplete="off" onSubmit={(e) => tranSubmit(e)}>
                        <label htmlFor="dropdown">
                            Category:
                            <div className="">
                                <select
                                    onChange={tranChange}
                                    value={tranValue.cate}
                                    id="dropdown"
                                    name="cate"
                                    required
                                >
                                    <option value="" disabled>
                                        Category
                                    </option>
                                    <option value="credit">Credit</option>
                                    <option value="debit">Debit</option>
                                </select>
                            </div>
                        </label>

                        <label htmlFor="amount">
                            Amount:
                            <div className="inputIcon">
                                <input
                                    onChange={tranChange}
                                    type="text"
                                    id="amount"
                                    name="amount"
                                    placeholder="amount"
                                    required
                                />
                                <i>
                                    <FontAwesomeIcon icon={faIndianRupee} size="sm" />
                                </i>
                            </div>
                        </label>

                        <label htmlFor="date">
                            Date:
                            <div className="inputIcon">
                                <input
                                    onChange={tranChange}
                                    type="date"
                                    id="date"
                                    name="date"
                                    required
                                />
                            </div>
                        </label>

                        <label htmlFor="desc">
                            Description:
                            <div className="">
                                <textarea
                                    onChange={tranChange}
                                    name="desc"
                                    id="desc"
                                    placeholder="Write your desc..."
                                    rows={3}
                                    style={{ borderRadius: "unset" }}
                                    required
                                />
                            </div>
                        </label>

                        <button className="DetaBtn">Submit</button>
                    </form>
                </fieldset>
            </Modal>
        </div>
    );
};

export default Transaction;
