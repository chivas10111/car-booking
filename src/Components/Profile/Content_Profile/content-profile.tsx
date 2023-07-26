import React from "react";
import type { TabsProps } from "antd";
import { Tabs, Upload, Avatar, Modal, message, Button } from "antd";
import { useState, useEffect } from "react";
import {
  UserAddOutlined,
  LeftCircleOutlined,
  UserOutlined,
  CameraOutlined,
  SaveOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "./profile.css";
import { useNavigate, useParams } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import type { RcFile } from "antd/es/upload/interface";
import Overview from "../Overview_Tab/overview";
import Additional from "../Additional_Tab/additional";
import Family from "../Family_Tab/family";
import Signature from "../Signature_Tab/signature";
import request from "../../../Utils/request";

interface API { 
  EmployeeNumber: string;
  Username: string;
  Email: string;
  AvatarPath: RcFile | null;
  FirstName: string;
  LastName: string;
  Sex: boolean;
  Birthday: Dayjs | null;
  JobTitle: string;
  Company: string;
  Unit: string;
  Function: string;
  SectionsOrTeam: string;
  Groups: string;
  OfficeLocation: string;
  LineManager: string;
  BelongToDepartments: string;
  Rank: string;
  EmployeeType: string;
  Rights: string;
}

const ContentProfile: React.FC = () => {
  const jwt_admin =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDdXJJZCI6IjAwMDZhZTNlLWUxMWItNDQ3OS1iNWVkLWRmZjJmNzQxM2JhNyIsIlVzZXJuYW1lIjoiYWRtaW4wMDAxIiwiUGFzc3dvcmQiOiIxMjM0NTYiLCJuYmYiOjE2OTAyODA0MjAsImV4cCI6MTY5MDM2NjgyMCwiaWF0IjoxNjkwMjgwNDIwLCJpc3MiOiJjYXJib29raW5naXNzdWVyIiwiYXVkIjoiY2FyYm9va2luZ2F1ZGllbmNlIn0.sGih02nlo_M64fffiXHgSn2LrrYdUcqP2v1U14utVwA";
  const uploadConfig = {
    action: "http://localhost:63642/api/file/upload-temp",
    headers: {
      Authorization: `Bearer ${jwt_admin}`,
    },
  };
  const config = {
    headers: {
      Authorization: `Bearer ${jwt_admin}`,
    },
  };
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  // set array info fields
  const [info, setInfo] = useState({
    employee_number: "",
    sex: "",
    birth_day: null as Dayjs | null,
    positon: "",
    company: "",
    unit: "",
    function: "",
    deparment: "",
    sections_teams: "",
    groups: "",
    office_location: "",
    cost_center: "",
    rank: "",
    employee_type: "",
    nation: "",
    phone: "",
    id_card_number: "",
    dateofidcard: null as Dayjs | null,
    placeofidcard: "",
    health_insurance: "",
    starting_date: null as Dayjs | null,
    Starting_date_official: null as Dayjs | null,
    Leaving_date: null as Dayjs | null,
    start_date_maternity_leave: null as Dayjs | null,
    note: "",
    academic_level: "",
    specialized_qualification: "",
    business_phone: "",
    home_phone: "",
    personal_email: "",
    bank_name: "",
    branch_number: "",
    bank_branch_name: "",
    bank_account_number: "",
    notebank_account_name: "",
    street: "",
    building_flatnumber: "",
    city: "",
    province_state: "",
    postal_code: "",
    country: "",
    martial_status: "",
    contact_name: "",
    relationship: "",
    phone_family: "",
    street_family: "",
    building_family: "",
    city_family: "",
    province_state_family: "",
    postal_code_family: "",
    country_family: "",
  });
  //avatar
  const [image, setImage] = useState<RcFile>();

  const [infoAPI, setInfoAPI] = useState<API>({
    EmployeeNumber: "",
    Username: "",
    Email: "",
    AvatarPath: image!,
    FirstName: "",
    LastName: "",
    Sex: true,
    Birthday: null,
    JobTitle: "",
    Company: "",
    Unit: "",
    Function: "",
    SectionsOrTeam: "",
    Groups: "",
    OfficeLocation: "",
    LineManager: "",
    BelongToDepartments: "",
    Rank: "",
    EmployeeType: "",
    Rights: "",
  });

  const { userID } = useParams();

  useEffect(() => {
    const endpoint = "/user/profile/" + userID;
    const getProfile = async () => {
      await request
        .get(endpoint)
        .then((response) => {
          setInfoAPI(response.data.Data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getProfile();
  }, []);

  const onSave = () => {
    setIsEditing(false);
    handleUpdateInfo();
  };

  const handleUpdateInfo = async () => {
    const endpoint = "/user/edit-post-file/" + userID;
    const res = await request.putForm(endpoint,infoAPI,config);
    console.log("infoAPI:",infoAPI)
    console.log("response",res)
      if (res.data.Success) {
        message.success('Edit success !')
       
      } else {
        message.error(res.data.Message)
      }
  };


  //declare contract
  // const [contractType, setContractType] = useState("");
  // const [contractFrom, setContracFrom] = useState(dayjs());
  // const [contarctTo, setContractTo] = useState(dayjs());
  // const [signningdate, setSigningdate] = useState(dayjs());
  // const [subject, setSubject] = useState("");
  // const [deparment, setDepartment] = useState("");
  // const [contractnote, setContractNote] = useState("");
  // //declare relationship
  // const [contactname, setContactName] = useState("");
  // const [birthday, setBirthday] = useState(dayjs());
  // const [relationship, setRelationship] = useState("");
  // const [relationshipnote, setRelationshipNote] = useState("");

  const [onOk, setOnOk] = useState<Boolean>(false);

  const handleOk = async () => {
    setOnOk(true);
    setVisible(false);

    const formData = new FormData();
    formData.append("fileName", image ? image.name : "");
    formData.append("userId", userID ? userID : "");
    await request.postForm("/file/upload-finish", formData, config);
  };

  const handleFileChange = (file: RcFile) => {
    setImage(file);
  };

  // visible avatar
  const [visible, setVisible] = useState(false);
  const handleDeleteContract = () => {};
  const onEditInfo = () => {
    setIsEditing(true);
  };
  
  // handle Modal
  const handleOpenModal = () => {
    setVisible(true);
    setOnOk(false);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleReturnSetting = () => {
    navigate("/setting");
  };

  let label: TabsProps["items"] = [
    {
      key: "1",
      label: <strong>Overview</strong>,
      children: (
        <Overview
          infoAPI={infoAPI}
          isEditing={isEditing}
          setInfoAPI={setInfoAPI}
        />
      ),
    },
    {
      key: "2",
      label: <strong>Additional</strong>,
      children: (
        <Additional info={info} isEditing={isEditing} setInfo={setInfo} />
      ),
    },
    {
      key: "3",
      label: <strong>Family</strong>,
      children: <Family info={info} isEditing={isEditing} setInfo={setInfo} />,
    },
    {
      key: "4",
      label: <strong>Signature</strong>,
      children: <Signature isEditing={isEditing} infoAPI={infoAPI} />,
    },
  ];

  return (
    <div className="content-profile">
      <div className="nav-bar-profile">
        {isEditing ? (
          <>
            <Button
              className="btn"
              style={{ margin: "20px 0px 20px 25px" }}
              onClick={() => {
                onSave();
              }}
              icon={<SaveOutlined style={{ fontSize: "30px " }} />}
            >
              Save
            </Button>
          </>
        ) : null}
        <Button
          className="btn"
          style={{ margin: "20px 10px 20px 5px" }}
          onClick={handleReturnSetting}
          icon={
            <LeftCircleOutlined
              style={{
                fontSize: "30px",
              }}
            />
          }
        >
          Return
        </Button>
      </div>
      <div className="info-user">
        <span style={{ margin: "120px -50px 0px 0px", zIndex: 1 }}>
          <Button
            className="btn-camera"
            size="middle"
            shape="round"
            icon={
              <CameraOutlined
                style={{
                  fontSize: "25px",
                  color: "rgba(0, 0, 0, 0.25)",
                }}
              />
            }
            onClick={handleOpenModal}
          />
        </span>
        <Modal
          title="Upload and Edit Avatar"
          open={visible}
          onCancel={handleCloseModal}
          onOk={handleOk}
          centered={true}
          bodyStyle={{ alignItems: "centered" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {image ? (
              <Avatar
                size={{ xs: 140, sm: 160, md: 180, lg: 200, xl: 250, xxl: 300 }}
                src={URL.createObjectURL(image)}
                // src = {URL.createObjectURL((infoAPI.AvatarPath!))}
              />
            ) : (
              <Avatar
                size={{ xs: 140, sm: 160, md: 180, lg: 200, xl: 250, xxl: 300 }}
                icon={<UserOutlined />}
              />
            )}

            <div className="Upload-Avatar">
              <Upload
                {...uploadConfig}
                showUploadList={false}
                onChange={({ file }) =>
                  handleFileChange(file.originFileObj as RcFile)
                }
              >
                <Button shape="circle" icon={<EditOutlined />} />
              </Upload>
            </div>
          </div>
        </Modal>
        <span>
          {onOk ? (
            <Avatar
              className="avatar"
              size={{ xs: 80, sm: 100, md: 130, lg: 150, xl: 200, xxl: 250 }}
              icon={<UserOutlined />}
              src={URL.createObjectURL(image!)}
            />
          ) : (
            <Avatar
              className="avatar"
              size={{ xs: 80, sm: 100, md: 130, lg: 150, xl: 200, xxl: 250 }}
              icon={<UserOutlined />}
            />
          )}
        </span>
        <div></div>
        <h1 style={{ marginLeft: "50px" }}>
          {infoAPI.FirstName} {infoAPI.LastName}
        </h1>
        {isEditing ? null : (
          <Button
            className="btn"
            style={{ marginLeft: "50px" }}
            onClick={() => {
              onEditInfo();
            }}
            icon={<UserAddOutlined style={{ fontSize: "50px" }} />}
          />
        )}
      </div>
      <div className="profile-table">
        <div className="tab-content ">
          <Tabs style={{ padding: "10px 10px" }} type="card" items={label} />
        </div>
      </div>
    </div>
  );
};

export default ContentProfile;
