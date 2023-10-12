import { PageHeader } from "../../components";
import MemberTable from "./MemberTable";

const Member = () => {
  return (
    <div>
      <PageHeader title="All Members" btnText="Add Member" />
      <MemberTable />
    </div>
  );
};

export default Member;
