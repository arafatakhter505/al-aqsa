import { useEffect, useState } from "react";
import { PageHeader } from "../../components";
import dev from "../../config";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import ExpenseTable from "./ExpenseTable";

const Expense = () => {
  const [getData, setGetData] = useState({});
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { isLoading, refetch } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${dev.serverUrl}/api/expenses?search=${search}&limit=${limit}&page=${page}&from=${fromDate}&to=${toDate}`,
          {
            headers: {
              authorization: `Bearer ${dev.jwt}`,
            },
          }
        );
        const data = await res.json();
        setGetData(data);
        return data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [search, page, limit, fromDate, toDate]);

  useEffect(() => {
    setPage(1);
  }, [search, limit, fromDate, toDate]);

  return (
    <div>
      <PageHeader
        title="All Expense"
        btnText="Add expense"
        path="/add-expense"
        icon="add"
      />
      <ExpenseTable
        data={getData}
        refetch={refetch}
        isLoading={isLoading}
        filter={{
          search,
          setSearch,
          setPage,
          fromDate,
          setFromDate,
          toDate,
          setToDate,
          limit,
          setLimit,
        }}
      />
    </div>
  );
};

export default Expense;
