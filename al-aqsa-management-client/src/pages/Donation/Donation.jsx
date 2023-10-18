import { useEffect, useState } from "react";
import { PageHeader } from "../../components";
import dev from "../../config";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import DonationTable from "./DonationTable";

const Donation = () => {
  const [getData, setGetData] = useState({});
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { isLoading, refetch } = useQuery({
    queryKey: ["donation"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${dev.serverUrl}/api/donation?search=${search}&limit=${limit}&page=${page}&from=${fromDate}&to=${toDate}`,
          {
            headers: {
              authorization: `Bearer ${document.cookie.split("=")[1]}`,
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
        title="All Donation"
        btnText="Add Donation"
        path="/add-donation"
        icon="add"
      />
      <DonationTable
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

export default Donation;
