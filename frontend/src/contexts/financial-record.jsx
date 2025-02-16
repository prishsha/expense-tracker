import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

export const FinancialRecordsContext = createContext(undefined);

export const FinancialRecordsProvider = ({ children }) => {
    const [records, setRecords] = useState([]);
    const { user } = useUser();

    const fetchRecords = async () => {
        if (!user) return;
        const response = await fetch(`/financial-records/getAllByUserId/${user.id}`);

        if (response.ok) {
            const records = await response.json();
            setRecords(records);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, [user]);

    const addRecord = async (record) => {
        const response = await fetch("/financial-records", {
            method: "POST",
            body: JSON.stringify(record),
            headers: { "Content-Type": "application/json" },
        });

        try {
            if (response.ok) {
                const newRecord = await response.json();
                setRecords((prev) => [...prev, newRecord]);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const updateRecord = async (id, newRecord) => {
        const response = await fetch(`/financial-records/${id}`, {
            method: "PUT",
            body: JSON.stringify(newRecord),
            headers: { "Content-Type": "application/json" },
        });

        try {
            if (response.ok) {
                const updatedRecord = await response.json();
                setRecords((prev) =>
                    prev.map((record) => (record._id === id ? updatedRecord : record))
                );
            }
        } catch (err) {
            console.error(err);
        }
    };

    const deleteRecord = async (id) => {
        try {
            const response = await fetch(`/financial-records/${id}`, { method: "DELETE" });

            if (response.ok) {
                setRecords((prev) => prev.filter((record) => record._id !== id));
            } else {
                console.error("Failed to delete record:", response.status);
            }
        } catch (err) {
            console.error("Error deleting record:", err);
        }
    };

    return (
        <FinancialRecordsContext.Provider value={{ records, addRecord, updateRecord, deleteRecord }}>
            {children}
        </FinancialRecordsContext.Provider>
    );
};

export const useFinancialRecords = () => {
    const context = useContext(FinancialRecordsContext);
    if (!context) {
        throw new Error("useFinancialRecords must be used within a FinancialRecordsProvider");
    }
    return context;
};
