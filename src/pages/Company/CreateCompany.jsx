import { useNavigate } from "react-router-dom";
import { Card } from "antd";
import CreateCompanyForm from "../../components/CompanyForm";
// import { getCompanyProfile } from "../../api/companyApi";

export default function CreateCompany() {
  const navigate = useNavigate();

  const handleSuccess =  () => {
    navigate("/employer/company/profile" );
    // window.location.reload(); 
  };

  return (
    <div style={{ padding: 24 }}>
      <Card title="Create Company Profile" bordered={false}>
        <CreateCompanyForm onSuccess={handleSuccess} />
      </Card>
    </div>
  );
}
