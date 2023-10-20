import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from "@mui/material";
import { MdDeleteForever, MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import PaginationComponents from "../PaginationComponent";
import { TextField } from "@mui/material";
import ReactPaginate from "react-paginate";
import { group } from "console";
import { Map, GoogleApiWrapper } from "google-maps-react";
import safe from "../assets/safe.png";
import Cookies from "universal-cookie";
//replace groups by cusgroups

const TableCard = ({
  searched,
  sort,
  groupSelected,
  groupAssigned,
  qrAssigned,
  qrScanData,
  docsAssigned,
  addToGroup,
  toggleAddToGroup,
  toggleMultiDocModal,
  addMultiDoc,
  filteredData,
  filterDataDisplayed,
  setFilterDataDisplayed,
}) => {
  const [datas, setData] = useState([]);
  var [newData, setNewData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [docModal, setDocModal] = useState(false);
  const [qrModal, setQrModal] = useState(false);
  const [groupModal, setGroupModal] = useState(false);
  const [lastScannedQrModal, setLastScannedQrModal] = useState(false);
  const [multiSelect, setMultiSelect] = useState(false);
  const [edit, setEdit] = useState(false);

  const [allGroups, setAllGroups] = useState([]);
  const [groupSelect, setGroupSelect] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupId, setGroupId] = useState("");
  const [groupDes, setGroupDescription] = useState("");
  const [gstartDate, setGstartDate] = useState("");
  const [gendDate, setGendDate] = useState("");

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [docTags, setdocTags] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFilename] = useState(" ");
  const [ucid, setUcid] = useState("");

  const [qrId, setQrId] = useState("");
  const [qrPin, setQrPin] = useState("");

  const [custId, setCustId] = useState("");

  const [deleteDoc, setDeleteDoc] = useState(false);
  const [deleteQr, setdeleteQr] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);

  const [docId, setDocId] = useState("");
  const [deleteKey, setDeleteKey] = useState("");
  const [qrdeleteId, setqrdeleteId] = useState("");
  const [deleteUserId, setDeleteUserId] = useState("");
  const [ctype, setCtype] = useState("select");

  const [scanHistory, setScanHistory] = useState(null);
  const [searchValueDisplayed, setSearchValueDisplayed] = useState(false);

  const [editName, setEditName] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editGender, setEditGender] = useState("");
  const [editbg, setEditBg] = useState("");
  const [editMobile, setEditMobile] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editDob, setEditDob] = useState("");
  const [editEc1, setEditEc1] = useState("");
  const [editEc2, setEditEc2] = useState("");
  const [editEcName1, setEditEcName1] = useState("");
  const [editEcName2, setEditEcName2] = useState("");

  const [editCustomer, setEditCustomer] = useState({});
  const [editError, setEditError] = useState(false);
  const navigate = useNavigate();

  const cookies = new Cookies();
  // const [loggedInUserId, setloggedInUserId] = useState('')
  const pUid = cookies.get("loggedInPartnerUser");
  //initial data
  useEffect(() => {
    const getNewData = async (curPage) => {
      setLoading(true);
      try {
        await axios
          .get(
            process.env.REACT_APP_BASE_URL +
              `/customerData/${pUid}/new?page=${curPage}&limit=10`
          )
          .then((res) => {
            setPageCount(Math.ceil(res.data.results.total / 10));
            // setloggedInUserId(cookies.get('loggedInPartnerUser'))
            setNewData(res.data.results.customers);
            setLoading(false);
          })
          // await axios.get(`http://localhost:1902/customerData/${pUid}/new?page=${curPage}&limit=10`).then(res=>{
          //     setPageCount(Math.ceil(res.data.results.total/10))
          //     setNewData(res.data.results.customers)
          //     setLoading(false)

          // })
          .catch((err) => {
            console.log(err.message);
          });
      } catch (error) {
        console.error(error.message);
      }
    };
    getNewData(1);
  }, []);

  //for searchbar
  useEffect(() => {
    if (searched.length !== 0) {
      setNewData(searched);
      setSearchValueDisplayed(true);
    }
  }, [searched]);

  // useEffect(() => {
  //     if(sort)
  //         setData(datas.sort((a,b) => a.name.localeCompare(b.name)))
  //     else{
  //         const getData=async() => {
  //             setLoading(true)
  //             try {
  //                 await axios.get("https://we-safe-partner-portal-backend1.onrender.com/customerData").then(res=> {
  //                     setData(res.data.customers)
  //                     setLoading(false)
  //                 }).catch(err => {
  //                     console.log(err.message)
  //                 })
  //             } catch (error) {
  //                 console.log(error.message)
  //             }
  //         }
  //         getData()
  //     }
  //     navigate("/")
  // },[sort])

  //for getting all groups
  useEffect(() => {
    const getGroups = async () => {
      try {
        await axios
          .get(process.env.REACT_APP_BASE_URL + "/groups")
          .then((res) => {
            setAllGroups(res.data.groups);
          })
          .catch((err) => {
            console.log(err.message);
          });
      } catch (error) {
        console.log(error.message);
      }
    };
    getGroups();
  }, []);

  //to delete a doc
  const handleDocDeleteClick = async (id) => {
    // axios.delete(`https://we-safe-partner-portal-backend1.onrender.com/doc/${id}`)
    axios
      .post(process.env.REACT_APP_BASE_URL + "/api/wesafe/docs/delete", {
        objId: id,
        docType: "other",
        key: deleteKey,
      })
      .then((res) => {
        console.log(res);
        setDocId("");
        toggleDeleteDoc();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
        setDocId("");
        toggleDeleteDoc();
      });

    // console.log(id)
    setDocId("");
    navigate("/");
  };

  //to upload a doc
  const handleDocSubmit = async (e) => {
    e.preventDefault();
    // axios.post("https://we-safe-partner-portal-backend1.onrender.com/upload",{name,filename,description,customerId:custId},{
    //     headers:{
    //         "Content-Type":"multipart/form-data",
    //     }
    // })
    // axios.post("http://localhost:1902/upload",{name,filename,description,customerId:custId},{
    //     headers:{
    //         "Content-Type":"multipart/form-data",
    //     }
    // })
    axios
      .post(
        process.env.REACT_APP_BASE_URL + "/api/wesafe/docs/upload",
        {
          name,
          file,
          docType: description,
          customerId: custId,
          userId: ucid,
          contentType: ctype,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res);
        toggleDocModal();
        setCustId("");
        setUcid("");
        setCtype("");
        console.log(docTags);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
      });
    navigate("/");
  };

  //upload a doc to multiple customers
  const handleMultiDocSubmit = async (e) => {
    e.preventDefault();

    const dataArr = JSON.stringify(newData);

    axios
      .post(
        process.env.REACT_APP_BASE_URL + "/uploadToMultiCustomers",
        { name, file, description, dataArr },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      // axios.post("http://localhost:1902/uploadToMultiCustomers",{name,filename,description,dataArr},{
      //     headers:{
      //         "Content-Type":"multipart/form-data",
      //     }
      // })
      .then((res) => {
        console.log(res);
        setMultiSelect(false);
        toggleMultiDocModal();
        if (res.data.message) window.location.reload();
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err.message);
        toggleMultiDocModal();
      });
    setMultiSelect(false);
    //window.location.reload()
    navigate("/");
  };

  //assign qr
  const handleQrSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(
        process.env.REACT_APP_BASE_URL + `/customers/${custId}/qr`,
        { qrId, qrPin },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        toggleQrModal();
        setCustId("");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
      });
    navigate("/");
  };

  //to assign a group or make a new group and add the customer to it
  const handleGroupSubmit = async (e) => {
    e.preventDefault();

    const alreadyGroupExists = async (id) => {
      axios
        .post(
          process.env.REACT_APP_BASE_URL + `/customers/${id}/groups`,
          { groupName, groupId },
          {
            header: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
          toggleDocModal();
          setCustId("");
          setGroupSelect(false);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    const newGroupAdd = async (id) => {
      axios
        .post(
          process.env.REACT_APP_BASE_URL + `/createGroupAddCustomer/${id}`,
          {
            groupName,
            groupDescription: groupDes,
            startDate: new Date(gstartDate),
            endDate: new Date(gendDate),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);

          setCustId("");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    if (groupSelect) {
      alreadyGroupExists(custId);
    } else {
      newGroupAdd(custId);
    }
    toggleDocModal();

    navigate("/");
  };

  const handleMultiGroupSubmit = async (e) => {
    e.preventDefault();
    console.log(groupId, groupName);

    console.log(newData);
    //window.location.reload()

    const alreadyGroupExists = async (id) => {
      axios
        .post(
          process.env.REACT_APP_BASE_URL + "/groupsAddMany",
          { groupName, groupId, dataArr: newData },
          {
            header: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
          toggleAddToGroup();
          setMultiSelect(false);
          setCustId("");
          setGroupSelect(false);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    const newGroupAdd = async () => {
      axios
        .post(
          process.env.REACT_APP_BASE_URL + "/createGroupAddMultiCustomer",
          {
            groupName,
            groupDescription: groupDes,
            startDate: new Date(gstartDate),
            endDate: new Date(gendDate),
            dataArr: newData,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
          setMultiSelect(false);
          setCustId("");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    if (groupSelect) {
      alreadyGroupExists();
    } else {
      newGroupAdd();
    }
    toggleAddToGroup();

    navigate("/");
  };

  //to delete qr
  const handleQrDeleteClick = async (id) => {
    axios
      .delete(process.env.REACT_APP_BASE_URL + `/qr/${id}`)
      //axios.delete(`http://localhost:1902/qr/${id}`)
      .then((res) => {
        console.log(res);
        setqrdeleteId("");
        toggleDeleteQr();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
        setqrdeleteId("");
        toggleDeleteQr();
      });
    navigate("/");
    setqrdeleteId("");
  };

  //delete a customer
  const deleteCustomer = async (id) => {
    axios
      .delete(process.env.REACT_APP_BASE_URL + `/customer/${id}`)
      .then((res) => {
        console.log(res);
        setDeleteUserId("");
        toggleDeleteCustomer();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
        setDeleteUserId("");
        toggleDeleteCustomer();
      });
    navigate("/");
  };

  //to assign document tags
  const handleDocTags = (tags) => {
    const tagArr = tags.split(",");
    setdocTags(tagArr);
  };

  //filterData
  useEffect(() => {
    setNewData(filteredData);
  }, [filteredData]);

  // const checkArrEmpty=(arr) => {
  //     if(arr.length===0)
  //         return true
  //     else   return false
  // }

  // useEffect(() => {
  //     const getData=async() => {
  //         setLoading(true)
  //         try {
  //             await axios.get("https://we-safe-partner-portal-backend1.onrender.com/customerData").then(res=> {
  //                 setData(res.data.customers)
  //                 setLoading(false)
  //             }).catch(err => {
  //                 console.log(err.message)
  //             })
  //         } catch (error) {
  //             console.log(error.message)
  //         }
  //     }
  //     getData()
  //     const filteredData=datas.filter(data => {
  //         let found=false
  //         data?.customerGroups?.forEach(group => {
  //             if(group.groupName===groupSelected)
  //                 found=true
  //         })
  //         if(found)
  //             return data
  //     })
  //     setNewData(filteredData)
  // },[groupSelected])

  // useEffect(() => {
  //     const getData=async() => {
  //         setLoading(true)
  //         try {
  //             await axios.get("https://we-safe-partner-portal-backend1.onrender.com/customerData").then(res=> {
  //                 setData(res.data.customers)
  //                 setLoading(false)
  //             }).catch(err => {
  //                 console.log(err.message)
  //             })
  //         } catch (error) {
  //             console.log(error.message)
  //         }
  //     }
  //     getData()
  //     if(groupAssigned==='no'){
  //         let filteredData=datas.filter(data => {

  //         })
  //     }

  // },[groupAssigned,qrAssigned,qrScanData,docsAssigned])

  //paginated fetching of data
  const getNewData = async (curPage) => {
    setLoading(true);
    try {
      await axios
        .get(
          process.env.REACT_APP_BASE_URL +
            `/customerData/${pUid}/new?page=${curPage}&limit=10`
        )
        .then((res) => {
          setNewData(res.data.results.customers);
          setLoading(false);
        })
        // await axios.get(`http://localhost:1902/customerData/${pUid}/new?page=${curPage}&limit=10`).then(res=>{
        //     setNewData(res.data.results.customers)
        //     setLoading(false)

        // })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (error) {
      console.error(error.message);
    }
  };

  //adding multiple customers to one group
  // const addMultiCustomer=async() => {
  //     console.log(groupId,groupName)
  //     setMultiSelect(false)
  // }

  //toggling functions
  const toggleDocModal = () => {
    setDocModal(!docModal);
  };

  const toggleQrModal = () => {
    setQrModal(!qrModal);
  };

  const toggleGroupModal = () => {
    setGroupModal(!groupModal);
  };

  const toggleDeleteDoc = () => {
    setDeleteDoc(!deleteDoc);
  };

  const toggleDeleteQr = () => {
    setdeleteQr(!deleteQr);
  };

  const toggleDeleteCustomer = () => {
    setDeleteUser(!deleteUser);
  };

  const toggleLastScannedQrModal = () => {
    setLastScannedQrModal(!lastScannedQrModal);
  };

  const toggleEditModal = () => {
    setEdit(!edit);
  };

  const toggleEditError = () => {
    setEditError(!editError);
  };

  //fetching paginatedd api contd
  const handlePageChange = (data) => {
    let curPage = data.selected + 1;
    getNewData(curPage);
    window.scrollTo({ top: 0 });
  };

  //select all/ multi select functionality
  const selectHandleChange = (e) => {
    const { name, id, checked } = e.target;
    if (name === "allSelect" && id === "0") {
      let tempUser = newData.map((data) => {
        return { ...data, isChecked: checked };
      });
      setNewData(tempUser);
      setMultiSelect(true);
    } else {
      let tempUser = newData.map((data) =>
        data.name === name && data._id === id
          ? { ...data, isChecked: checked }
          : data
      );
      setNewData(tempUser);
      setMultiSelect(true);
    }
  };

  //edit profile
  const handleEditInfo = async (id) => {
    setLoading(true);
    axios
      .patch(
        process.env.REACT_APP_BASE_URL + `/customer/${id}`,
        {
          name: editName,
          address: editAddress,
          email: editEmail,
          mobile: editMobile,
          gender: editGender,
          dob: editDob,
          bloodGroup: editbg,
          emergencyContactMobile1: editEc1,
          emergencyContactName1: editEcName1,
          emergencyContactName2: editEcName2,
          emergencyContactMobile2: editEc2,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      // axios.patch(`http://localhost:1902/customer/${id}`,{name:editName,address:editAddress,email:editEmail,
      //     mobile:editMobile,gender:editGender,dob:editDob,bloodGroup:editbg,emergencyContactMobile1:editEc1,
      //     emergencyContactName1:editEcName1,emergencyContactName2:editEcName2,emergencyContactMobile2:editEc2
      // },
      //     {
      //         "headers":{
      //             "Content-Type":"application/json"
      //         }
      //     }
      // )
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "successfully updated") {
          setCustId("");
          setLoading(false);
          toggleEditModal();
          window.location.reload();
        } else {
          toggleEditError();
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  //google maps api

  const openMap = async (myLat, myLng) => {
    window.open(
      `https://maps.google.com/maps?q=${myLat},${myLng}&hl=es;&output=embed`
    );
    //<iframe src={`https://maps.google.com/maps?q=${myLat},${myLng}&hl=es;&output=embed`} height='500px' width='100%' ></iframe>
  };

  // console.log(newData)

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label
          style={{
            marginTop: "2%",
            verticalAlign: "middle",
            paddingLeft: "75px",
          }}
        >
          <input
            type="checkbox"
            name="allSelect"
            id="0"
            style={{ position: "relative", verticalAlign: "bottom" }}
            placeholder="Select All"
            checked={
              newData.filter((item) => item?.isChecked !== true).length < 1
            }
            onChange={selectHandleChange}
          />
          Select All
        </label>
        {filterDataDisplayed ? (
          <a
            href="/"
            style={{ marginLeft: "100px", marginTop: "20px" }}
            onClick={() => setFilterDataDisplayed(false)}
          >
            {" "}
            clear filter
          </a>
        ) : (
          <></>
        )}
        {searchValueDisplayed ? (
          <a
            href="/"
            style={{ marginLeft: "100px", marginTop: "20px" }}
            onClick={() => setSearchValueDisplayed(false)}
          >
            {" "}
            clear search results
          </a>
        ) : (
          <></>
        )}
      </div>
      <div className="app__table">
        <div className="head row">
          <div className="column">
            <div className="card">
              <h3>Customer Info</h3>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <h3>Group</h3>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <h3>Documents</h3>
            </div>
          </div>
          <div className="column">
            <div className="card" style={{ display: "flex" }}>
              <img src={safe} style={{ height: "1.3rem" }} alt="weSafe" />
              <h3 style={{ marginLeft: "5px" }}>WeSafe Qr Details</h3>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <h3>Actions</h3>
            </div>
          </div>
        </div>
        <div className="row">
          {!loading ? (
            newData.map((data, index) => {
              return (
                <>
                  <div key={data._id} className="column">
                    <div className="card_content">
                      <div className="content1">
                        <div style={{ display: "flex", alignItems: "left" }}>
                          <input
                            type="checkbox"
                            key={data._id}
                            name={data.name}
                            id={data._id}
                            checked={data?.isChecked || false}
                            onChange={selectHandleChange}
                          />
                          <p style={{ marginLeft: "5px", displau: "flex" }}>
                            <b>
                              {data.name}-{" "}
                              {data.gender === 1 || data.gender === "male" ? (
                                <>M</>
                              ) : (
                                <>F</>
                              )}
                            </b>{" "}
                            <span></span>
                          </p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "left",
                            marginTop: "0%",
                          }}
                        >
                          <p style={{ alignItems: "left", marginTop: "25px" }}>
                            {" "}
                            <span>{data.address}</span>
                          </p>
                        </div>
                        {data.dob != null ? (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "left",
                              marginTop: "5px",
                            }}
                          >
                            <p>
                              {" "}
                              DOB:{" "}
                              <span>
                                {JSON.stringify(data.dob).substring(1, 11)}
                              </span>
                            </p>
                          </div>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "left",
                              marginTop: "5px",
                            }}
                          >
                            <p>
                              {" "}
                              DOB: <span> N/A</span>
                            </p>
                          </div>
                        )}
                        {data.bloodGroup ? (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "left",
                              marginTop: "5px",
                            }}
                          >
                            <p>
                              {" "}
                              Blood Grp: <span>{data.bloodGroup}</span>
                            </p>
                          </div>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "left",
                              marginTop: "5px",
                            }}
                          >
                            <p>
                              {" "}
                              Blood Grp: <span>N/A</span>
                            </p>
                          </div>
                        )}
                        {data.dateRegistered ? (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "left",
                              marginTop: "25px",
                            }}
                          >
                            <p>
                              {" "}
                              Registered On- <span> {data.dateRegistered}</span>
                            </p>
                          </div>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "left",
                              marginTop: "25px",
                            }}
                          >
                            <p>
                              {" "}
                              Registered On- <span>N/A</span>
                            </p>
                          </div>
                        )}
                        {data.portalId ? (
                          <div style={{ display: "flex", alignItems: "left" }}>
                            <p
                              style={{
                                fontSize: "0.8rem",
                                marginTop: "10px",
                                color: "blue",
                              }}
                            >
                              Cust ID: {data.portalId}
                            </p>
                          </div>
                        ) : (
                          <p
                            style={{
                              fontSize: "0.8rem",
                              marginTop: "10px",
                              color: "blue",
                            }}
                          >
                            Cust ID: {data.userUid}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <div className="card_content">
                      <b>Groups:</b>

                      {
                        <div style={{ marginTop: "10%", color: "green" }}>
                          {data?.customerGroups[0]?.groupName}
                        </div>
                      }
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "left",
                          alignItems: "left",
                          flexDirection: "column",
                          marginTop: "5%",
                        }}
                      >
                        <div>
                          <b>Past Groups:</b>
                        </div>
                        {data?.customerGroups?.length > 0 ? (
                          data?.customerGroups?.slice(1)?.map((group) => (
                            <div key={group._id} style={{ marginTop: "2px" }}>
                              <div>{group.groupName}</div>
                            </div>
                          ))
                        ) : (
                          <div style={{ color: "red", marginTop: "8%" }}>
                            No Group Assigned Yet
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div
                    className="column"
                    style={{
                      display: "inline",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div className="card_content">
                      <b>Documents: </b>
                      <div
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                          marginTop: "15%",
                        }}
                      >
                        {data?.customerDocs?.length > 0 ? (
                          data?.customerDocs?.map((doc) => {
                            const openPdf = async () => {
                              window.open(doc.documentS3Link);
                            };
                            return (
                              <div key={doc._id} style={{ marginTop: "2px" }}>
                                <div style={{ textDecoration: "underline" }}>
                                  <a onClick={openPdf}> {doc.name}</a>
                                  <span>
                                    <MdDeleteForever
                                      onClick={(e) => {
                                        e.preventDefault();
                                        // handleDocDeleteClick(doc._id)
                                        setDocId(doc._id);
                                        setDeleteKey(doc.key);
                                        toggleDeleteDoc();
                                      }}
                                      style={{
                                        verticalAlign: "middle",
                                        color: "red",
                                        marginLeft: "20px",
                                      }}
                                    />
                                  </span>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div style={{ color: "red", marginTop: "25%" }}>
                            No Document Uploaded
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="column">
                    <div className="card_content">
                      <b>WeSafe</b>
                      <div style={{ display: "flex", marginTop: "5px" }}>
                        <b>Id-</b> <span>Pin</span>{" "}
                      </div>

                      <div style={{ marginTop: "12%" }}>
                        {data?.customerQrs?.length > 0 ? (
                          data?.customerQrs?.map((qr) => (
                            <div key={qr._id}>
                              <div style={{ marginTop: "2px" }}>
                                {qr.qrId} - <span> {qr.qrPin}</span>{" "}
                                <span>
                                  <MdDeleteForever
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setqrdeleteId(qr._id);
                                      toggleDeleteQr();
                                      //handleQrDeleteClick(qr._id)
                                    }}
                                    style={{
                                      verticalAlign: "bottom",
                                      color: "red",
                                    }}
                                  />{" "}
                                </span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div style={{ color: "red", marginTop: "15%" }}>
                            No QR Code Assigned Yet
                          </div>
                        )}
                        {data?.lastScanned?.length > 0 ? (
                          <>
                            <div style={{ display: "flex", paddingTop: "5px" }}>
                              <h3>Scans </h3>{" "}
                              <span>
                                <a
                                  style={{
                                    fontSize: "1rem",
                                    verticalAlign: "bottom",
                                    marginLeft: "3px",
                                  }}
                                  href=""
                                  onClick={(e) => {
                                    e.preventDefault();
                                    toggleLastScannedQrModal();
                                    setScanHistory(data?.lastScanned);
                                  }}
                                >
                                  [Detail List]
                                </a>{" "}
                              </span>
                            </div>
                            <div>
                              <h4>Latest Scan</h4>
                              {data.lastScanned[0].datetime.substring(
                                0,
                                10
                              )}, <span> {data.lastScanned[0].timestamp} </span>{" "}
                              <span>
                                {" "}
                                <a
                                  href=""
                                  onClick={() =>
                                    openMap(
                                      data?.lastScanned[0]?.latitude,
                                      data.lastScanned[0].longitude
                                    )
                                  }
                                >
                                  [Go to Map]{" "}
                                </a>{" "}
                              </span>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <div
                      className="card_content"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <Button
                          style={{
                            color: "white",
                            borderRadius: "5px",
                            backgroundColor: "#313bac",
                            width: "140px",
                            height: "25px",
                            margin: "8px",
                            textDecoration: "none",
                            marginTop: "10px",
                          }}
                          onClick={() => {
                            setCustId(data._id);
                            setUcid(`${data.userUid}_${data.childListUid}`);
                            toggleDocModal();
                          }}
                        >
                          Add Document
                        </Button>
                      </div>
                      <div>
                        <Button
                          style={{
                            color: "white",
                            borderRadius: "5px",
                            backgroundColor: "#313bac",
                            width: "140px",
                            height: "25px",
                            margin: "10px",
                          }}
                          onClick={() => {
                            setCustId(data._id);
                            toggleGroupModal();
                          }}
                        >
                          Add/Edit Group
                        </Button>
                      </div>
                      <div>
                        <Button
                          style={{
                            color: "white",
                            borderRadius: "5px",
                            backgroundColor: "#313bac",
                            width: "140px",
                            height: "25px",
                            margin: "10px",
                          }}
                          onClick={() => {
                            setCustId(data._id);
                            toggleEditModal();
                            setEditCustomer(data);
                          }}
                        >
                          Edit Profile
                        </Button>
                      </div>
                      <div>
                        <Button
                          onClick={() => {
                            setCustId(data._id);
                            toggleQrModal();
                          }}
                          style={{
                            color: "white",
                            borderRadius: "5px",
                            backgroundColor: "#313bac",
                            width: "140px",
                            height: "25px",
                            margin: "10px",
                          }}
                        >
                          Issue Qr Code
                        </Button>
                      </div>
                      <div>
                        <Button
                          style={{
                            color: "white",
                            borderRadius: "5px",
                            backgroundColor: "#8b1010",
                            width: "140px",
                            height: "25px",
                            margin: "10px",
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            setDeleteUserId(data._id);
                            toggleDeleteCustomer();
                            // deleteCustomer(data._id)
                          }}
                        >
                          Delete User
                        </Button>
                      </div>
                    </div>
                  </div>
                  {docModal && (
                    <div className="modal">
                      <div className="overlay" onClick={toggleDocModal}></div>
                      <div className="modal-content_doc">
                        <MdClose
                          onClick={toggleDocModal}
                          style={{
                            color: "#313bac",
                            height: "1.2rem",
                            width: "1.3rem",
                            marginLeft: "500px",
                            marginBottom: "10px",
                          }}
                        />
                        <form
                          onSubmit={handleDocSubmit}
                          className="app__form_doc"
                        >
                          <h3
                            className="head-text"
                            style={{ fontSize: "1.5rem" }}
                          >
                            Upload The <span>Required</span> Document
                          </h3>
                          <TextField
                            style={{ marginTop: "25px", width: "500px" }}
                            className="form__text"
                            id="outlined-basic"
                            variant="outlined"
                            type="file"
                            onChange={(e) => setFilename(e.target.files[0])}
                          />

                          <TextField
                            style={{ marginTop: "20px", width: "500px" }}
                            className="form__text"
                            id="outlined-basic"
                            variant="outlined"
                            label="Name of Document"
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                          />

                          <TextField
                            style={{ marginTop: "20px", width: "500px" }}
                            className="form__text"
                            id="outlined-basic"
                            variant="outlined"
                            type="text"
                            label="docType"
                            onChange={(e) => setDescription(e.target.value)}
                          />

                          {/* <TextField style={{marginTop:'20px',width:'500px',}}  className='form__text' id="outlined-basic" 
                                    variant="outlined" type='text' label='contentType(application/pdf, image/png, application/msword etc)' onChange={(e) =>setCtype(e.target.value)} /> */}

                          <Select
                            style={{ marginTop: "20px", width: "500px" }}
                            className="form__text"
                            id="outlined-basic"
                            variant="outlined"
                            type="text"
                            label="File Type"
                            value={ctype}
                            onChange={(e) => {
                              e.preventDefault();
                              setCtype(e.target.value);
                            }}
                          >
                            <MenuItem value="select">Select Type</MenuItem>
                            <MenuItem value="application/msword">
                              Word File
                            </MenuItem>
                            <MenuItem value="image/png">Image File</MenuItem>
                            <MenuItem value="application/pdf">
                              Pdf File
                            </MenuItem>
                            <MenuItem value="application/vnd.ms-excel">
                              Excel File
                            </MenuItem>
                          </Select>

                          <Button
                            className="btn p-text"
                            variant="outlined"
                            style={{
                              width: "100px",
                              margin: "auto",
                              marginTop: "20px",
                            }}
                            type="submit"
                          >
                            Submit
                          </Button>
                        </form>
                      </div>
                    </div>
                  )}
                  {qrModal && (
                    <div className="modal">
                      <div className="overlay" onClick={toggleQrModal}></div>
                      <div className="modal-content_qr">
                        <MdClose
                          onClick={toggleQrModal}
                          style={{
                            color: "#313bac",
                            height: "1.2rem",
                            width: "1.3rem",
                            marginLeft: "455px",
                            marginTop: "10px",
                          }}
                        />
                        <form
                          onSubmit={handleQrSubmit}
                          className="app__form_qr"
                        >
                          <h3
                            className="head-text"
                            style={{ fontSize: "1.5rem" }}
                          >
                            Assign <span>We Safe QR Code</span> To Customer
                          </h3>
                          <div style={{ display: "flex" }}>
                            <TextField
                              style={{
                                marginTop: "20px",
                                width: "200px",
                                marginLeft: "10px",
                              }}
                              className="form__text"
                              id="outlined-basic"
                              variant="outlined"
                              label="Enter Qr Id"
                              type="text"
                              onChange={(e) => setQrId(e.target.value)}
                            />
                            <TextField
                              style={{
                                marginTop: "20px",
                                width: "200px",
                                marginLeft: "10px",
                              }}
                              className="form__text"
                              id="outlined-basic"
                              variant="outlined"
                              type="text"
                              label="Enter Qr Pin"
                              onChange={(e) => setQrPin(e.target.value)}
                            />
                          </div>

                          <Button
                            className="btn p-text"
                            variant="outlined"
                            style={{
                              width: "100px",
                              margin: "auto",
                              marginTop: "20px",
                              marginRight: "40%",
                            }}
                            type="submit"
                          >
                            Submit
                          </Button>
                        </form>
                      </div>
                    </div>
                  )}
                  {groupModal && (
                    <div className="modal">
                      <div className="overlay" onClick={toggleGroupModal}></div>
                      <div className="modal-content_group">
                        <MdClose
                          onClick={toggleGroupModal}
                          style={{
                            color: "#313bac",
                            height: "1.2rem",
                            width: "1.3rem",
                            marginLeft: "450px",
                          }}
                        />
                        <form
                          onSubmit={handleGroupSubmit}
                          className="app__form_qr"
                        >
                          <h3
                            className="head-text"
                            style={{ fontSize: "1.5rem" }}
                          >
                            Add/Edit <span>Group</span>{" "}
                          </h3>
                          Group
                          <select
                            className="select-long"
                            onChange={(e) => {
                              setGroupName(e.target.value);
                              setGroupId(
                                e.target.children[
                                  e.target.selectedIndex
                                ].getAttribute("group-id")
                              );
                              setGroupSelect(true);
                            }}
                            label="groups"
                          >
                            <option value="" disabled selected>
                              All
                            </option>
                            {allGroups.map((group) => {
                              return (
                                <option key={group._id} group-id={group._id}>
                                  {group.groupName}
                                </option>
                              );
                            })}
                          </select>
                          <h3 style={{ marginLeft: "45%", marginTop: "10px" }}>
                            OR
                          </h3>
                          <h3
                            className="head-text"
                            style={{ fontSize: "1.4rem", marginTop: "10px" }}
                          >
                            Create A <span>New</span> Group{" "}
                          </h3>
                          <TextField
                            style={{
                              marginTop: "20px",
                              width: "400px",
                              marginLeft: "10px",
                            }}
                            onChange={(e) => setGroupName(e.target.value)}
                            className="form__text"
                            id="outlined-basic"
                            variant="outlined"
                            label="Enter Group Name"
                            type="text"
                          />
                          <TextField
                            style={{
                              marginTop: "20px",
                              width: "400px",
                              marginLeft: "10px",
                            }}
                            onChange={(e) =>
                              setGroupDescription(e.target.value)
                            }
                            className="form__text"
                            id="outlined-basic"
                            variant="outlined"
                            type="text"
                            label="Enter Group Description"
                          />
                          <label
                            style={{ marginLeft: "10px", marginTop: "20px" }}
                          >
                            <h4>Start and End Date</h4>
                          </label>
                          <div style={{ marginBottom: "10px" }}>
                            <input
                              type="date"
                              min="1997-01-01"
                              max="2030-12-31"
                              placeholder="from"
                              style={{ width: "40%" }}
                              label="from"
                              onChange={(e) => setGstartDate(e.target.value)}
                              className="date-time-ip"
                            />
                            <input
                              type="date"
                              min="1997-01-01"
                              max="2030-12-31"
                              placeholder="to"
                              style={{ width: "40%" }}
                              label="to"
                              onChange={(e) => setGendDate(e.target.value)}
                              className="date-time-ip"
                            />
                          </div>
                          <Button
                            className="btn p-text"
                            variant="outlined"
                            style={{
                              width: "100px",
                              margin: "auto",
                              marginTop: "20px",
                              marginRight: "40%",
                            }}
                            type="submit"
                          >
                            Submit
                          </Button>
                        </form>
                      </div>
                    </div>
                  )}
                  {addToGroup && multiSelect && (
                    <div className="modal">
                      <div className="overlay" onClick={toggleAddToGroup}></div>
                      <div className="modal-content_qr">
                        <MdClose
                          onClick={toggleAddToGroup}
                          style={{
                            color: "#313bac",
                            height: "1.2rem",
                            width: "1.3rem",
                            marginLeft: "450px",
                          }}
                        />
                        <form
                          onSubmit={handleMultiGroupSubmit}
                          className="app__form_qr"
                        >
                          <h3
                            className="head-text"
                            style={{ fontSize: "1.5rem" }}
                          >
                            Add/Edit <span>Group</span>{" "}
                          </h3>
                          Group
                          <select
                            className="select-long"
                            onChange={(e) => {
                              setGroupName(e.target.value);
                              setGroupId(
                                e.target.children[
                                  e.target.selectedIndex
                                ].getAttribute("group-id")
                              );
                              setGroupSelect(true);
                            }}
                            label="groups"
                          >
                            <option value="" disabled selected>
                              All
                            </option>
                            {allGroups.map((group) => {
                              return (
                                <option key={group._id} group-id={group._id}>
                                  {group.groupName}
                                </option>
                              );
                            })}
                          </select>
                          <h3 style={{ marginLeft: "45%", marginTop: "10px" }}>
                            OR
                          </h3>
                          <h3
                            className="head-text"
                            style={{ fontSize: "1.4rem", marginTop: "10px" }}
                          >
                            Create A <span>New</span> Group{" "}
                          </h3>
                          <TextField
                            style={{
                              marginTop: "20px",
                              width: "400px",
                              marginLeft: "10px",
                            }}
                            onChange={(e) => setGroupName(e.target.value)}
                            className="form__text"
                            id="outlined-basic"
                            variant="outlined"
                            label="Enter Group Name"
                            type="text"
                          />
                          <TextField
                            style={{
                              marginTop: "20px",
                              width: "400px",
                              marginLeft: "10px",
                            }}
                            onChange={(e) =>
                              setGroupDescription(e.target.value)
                            }
                            className="form__text"
                            id="outlined-basic"
                            variant="outlined"
                            type="text"
                            label="Enter Group Description"
                          />
                          <label
                            style={{ marginLeft: "10px", marginTop: "20px" }}
                          >
                            <h4>Start and End Date</h4>
                          </label>
                          <div style={{ marginBottom: "10px" }}>
                            <input
                              type="date"
                              min="1997-01-01"
                              max="2030-12-31"
                              placeholder="from"
                              style={{ width: "40%" }}
                              label="from"
                              onChange={(e) => setGstartDate(e.target.value)}
                              className="date-time-ip"
                            />
                            <input
                              type="date"
                              min="1997-01-01"
                              max="2030-12-31"
                              placeholder="to"
                              style={{ width: "40%" }}
                              label="to"
                              onChange={(e) => setGendDate(e.target.value)}
                              className="date-time-ip"
                            />
                          </div>
                          <Button
                            className="btn p-text"
                            variant="outlined"
                            style={{
                              width: "100px",
                              margin: "auto",
                              marginTop: "20px",
                              marginRight: "40%",
                            }}
                            type="submit"
                          >
                            Submit
                          </Button>
                        </form>
                      </div>
                    </div>
                  )}
                  {addMultiDoc && multiSelect && (
                    <div className="modal">
                      <div
                        className="overlay"
                        onClick={toggleMultiDocModal}
                      ></div>
                      <div className="modal-content_doc">
                        <MdClose
                          onClick={toggleMultiDocModal}
                          style={{
                            color: "#313bac",
                            height: "1.2rem",
                            width: "1.3rem",
                            marginLeft: "500px",
                          }}
                        />
                        <form
                          onSubmit={handleMultiDocSubmit}
                          className="app__form_doc"
                        >
                          <h3
                            className="head-text"
                            style={{ fontSize: "1.5rem" }}
                          >
                            Upload The <span>Required</span> Document
                          </h3>
                          <TextField
                            style={{ marginTop: "25px", width: "500px" }}
                            className="form__text"
                            id="outlined-basic"
                            variant="outlined"
                            type="file"
                            onChange={(e) => setFilename(e.target.files[0])}
                          />
                          <div>
                            <TextField
                              style={{ marginTop: "20px", width: "240px" }}
                              className="form__text"
                              id="outlined-basic"
                              variant="outlined"
                              label="Name of Document"
                              type="text"
                              onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                              style={{
                                marginTop: "20px",
                                width: "240px",
                                marginLeft: "20px",
                              }}
                              className="form__text"
                              id="outlined-basic"
                              variant="outlined"
                              label="Tags"
                              type="text"
                              onChange={(e) => handleDocTags(e.target.value)}
                            />
                          </div>

                          <TextField
                            style={{ marginTop: "20px", width: "500px" }}
                            className="form__text"
                            id="outlined-basic"
                            variant="outlined"
                            type="text"
                            label="Description"
                            onChange={(e) => setDescription(e.target.value)}
                          />

                          <Button
                            className="btn p-text"
                            variant="outlined"
                            style={{
                              width: "100px",
                              margin: "auto",
                              marginTop: "20px",
                            }}
                            type="submit"
                          >
                            Submit
                          </Button>
                        </form>
                      </div>
                    </div>
                  )}
                  {deleteDoc && (
                    <div className="modal">
                      <div className="overlay" onClick={toggleDeleteDoc}></div>
                      <div>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleDocDeleteClick(docId);
                          }}
                          className="modal-content"
                        >
                          <MdClose
                            onClick={toggleDeleteDoc}
                            style={{
                              color: "#313bac",
                              height: "1.2rem",
                              width: "1.3rem",
                              marginLeft: "430px",
                              marginTop: "5px",
                              marginBottom: "5px",
                            }}
                          />
                          <h3 style={{ margin: "auto", marginTop: "10px" }}>
                            Are you sure you want to delete this document?
                          </h3>
                          <Button
                            className="btn p-text close-modal"
                            variant="outlined"
                            style={{
                              width: "150px",
                              margin: "auto",
                              marginTop: "30px",
                              backgroundColor: "#8b1010",
                              color: "white",
                              marginBottom: "20px",
                            }}
                            type="submit"
                          >
                            Yes
                          </Button>
                        </form>
                      </div>
                    </div>
                  )}
                  {deleteQr && (
                    <div className="modal">
                      <div className="overlay" onClick={toggleDeleteQr}></div>
                      <div>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleQrDeleteClick(qrdeleteId);
                          }}
                          className="modal-content"
                        >
                          <MdClose
                            onClick={toggleDeleteQr}
                            style={{
                              color: "#313bac",
                              height: "1.2rem",
                              width: "1.3rem",
                              marginLeft: "430px",
                              marginTop: "5px",
                              marginBottom: "5px",
                            }}
                          />
                          <h3 style={{ margin: "auto", marginTop: "10px" }}>
                            Are you sure you want to delete this QR?
                          </h3>
                          <Button
                            className="btn p-text close-modal"
                            variant="outlined"
                            style={{
                              width: "150px",
                              margin: "auto",
                              marginTop: "30px",
                              backgroundColor: "#8b1010",
                              color: "white",
                              marginBottom: "20px",
                            }}
                            type="submit"
                          >
                            Yes
                          </Button>
                        </form>
                      </div>
                    </div>
                  )}
                  {deleteUser && (
                    <div className="modal">
                      <div
                        className="overlay"
                        onClick={toggleDeleteCustomer}
                      ></div>
                      <div>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            deleteCustomer(deleteUserId);
                          }}
                          className="modal-content"
                        >
                          <MdClose
                            onClick={toggleDeleteCustomer}
                            style={{
                              color: "#313bac",
                              height: "1.2rem",
                              width: "1.3rem",
                              marginLeft: "430px",
                              marginTop: "5px",
                              marginBottom: "5px",
                            }}
                          />
                          <h3 style={{ margin: "auto", marginTop: "10px" }}>
                            Are you sure you want to delete the Selected User?
                          </h3>
                          <Button
                            className="btn p-text close-modal"
                            variant="outlined"
                            style={{
                              width: "150px",
                              margin: "auto",
                              marginTop: "30px",
                              backgroundColor: "#8b1010",
                              color: "white",
                              marginBottom: "20px",
                            }}
                            type="submit"
                          >
                            Yes
                          </Button>
                        </form>
                      </div>
                    </div>
                  )}
                  {edit && (
                    <div className="modal modal_edit">
                      <div
                        className="overlay overlay_edit"
                        onClick={toggleEditModal}
                      ></div>
                      <div>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleEditInfo(custId);
                            console.log(editCustomer);
                          }}
                          className="modal-content_edit"
                        >
                          <MdClose
                            onClick={toggleEditModal}
                            style={{
                              color: "#313bac",
                              height: "1.2rem",
                              width: "1.3rem",
                              marginLeft: "480px",
                              marginTop: "5px",
                              marginBottom: "5px",
                            }}
                          />
                          <h3
                            className="head-text"
                            style={{
                              margin: "auto",
                              marginTop: "10px",
                              fontSize: "1.5rem",
                            }}
                          >
                            Edit <span>Profile</span>
                          </h3>
                          <TextField
                            style={{ marginTop: "15px", width: "500px" }}
                            className="form__text"
                            id="outlined-basic"
                            variant="outlined"
                            label={`Name: ${editCustomer.name}`}
                            value={editName}
                            type="text"
                            onChange={(e) => setEditName(e.target.value)}
                          />
                          <TextField
                            style={{ marginTop: "15px", width: "500px" }}
                            className="form__text"
                            id="outlined-basic"
                            variant="outlined"
                            label={`Email: ${
                              editCustomer.email ? editCustomer.email : "N/A"
                            }`}
                            value={editEmail}
                            type="text"
                            onChange={(e) => setEditEmail(e.target.value)}
                          />
                          <TextField
                            style={{ marginTop: "15px", width: "500px" }}
                            className="form__text"
                            id="outlined-basic"
                            variant="outlined"
                            label={`Mobile: ${
                              editCustomer.mobile ? editCustomer.mobile : "N/A"
                            }`}
                            value={editMobile}
                            type="text"
                            onChange={(e) => setEditMobile(e.target.value)}
                          />
                          <TextField
                            style={{ marginTop: "15px", width: "500px" }}
                            className="form__text"
                            id="outlined-basic"
                            variant="outlined"
                            label={`Address: ${
                              editCustomer.address
                                ? editCustomer.address
                                : "N/A"
                            }`}
                            value={editAddress}
                            type="text"
                            onChange={(e) => setEditAddress(e.target.value)}
                          />
                          <div style={{ display: "flex" }}>
                            <TextField
                              style={{ marginTop: "15px", width: "150px" }}
                              className="form__text"
                              id="outlined-basic"
                              variant="outlined"
                              label={`DOB: ${
                                editCustomer.dob
                                  ? editCustomer.dob.substring(0, 10)
                                  : "N/A"
                              }`}
                              value={editDob}
                              type="text"
                              onChange={(e) => setEditDob(e.target.value)}
                            />
                            {/* <TextField style={{marginTop:'15px',width:'125px',}}  className='form__text' id="outlined-basic" 
                                                variant="outlined" label='Name of Document' type='text'  /> */}
                            <TextField
                              style={{
                                marginTop: "15px",
                                width: "150px",
                                marginLeft: "25px",
                              }}
                              className="form__text"
                              id="outlined-basic"
                              variant="outlined"
                              label={`Blood Group: ${
                                editCustomer.bloodGroup
                                  ? editCustomer.bloodGroup
                                  : "N/A"
                              }`}
                              value={editbg}
                              type="text"
                              onChange={(e) => setEditBg(e.target.value)}
                            />
                            <TextField
                              style={{
                                marginTop: "15px",
                                width: "150px",
                                marginLeft: "25px",
                              }}
                              className="form__text"
                              id="outlined-basic"
                              variant="outlined"
                              label={`Gender: ${
                                editCustomer.gender
                                  ? editCustomer.gender
                                  : "N/A"
                              }`}
                              value={editGender}
                              type="text"
                              onChange={(e) => setEditGender(e.target.value)}
                            />
                          </div>
                          <div style={{ display: "flex" }}>
                            <TextField
                              style={{ marginTop: "15px", width: "240px" }}
                              className="form__text"
                              id="outlined-basic"
                              variant="outlined"
                              label={`Contact 1 Name: ${
                                editCustomer.emergencyContactName1
                                  ? editCustomer.emergencyContactName1
                                  : "N/A"
                              }`}
                              value={editEcName1}
                              type="text"
                              onChange={(e) => setEditEcName1(e.target.value)}
                            />
                            <TextField
                              style={{
                                marginTop: "15px",
                                width: "240px",
                                marginLeft: "20px",
                              }}
                              className="form__text"
                              id="outlined-basic"
                              variant="outlined"
                              label={`Contact 1 Number: ${
                                editCustomer.emergencyContactMobile1
                                  ? editCustomer.emergencyContactMobile1
                                  : "N/A"
                              }`}
                              value={editEc1}
                              type="text"
                              onChange={(e) => setEditEc1(e.target.value)}
                            />
                          </div>
                          <div>
                            <TextField
                              style={{ marginTop: "15px", width: "240px" }}
                              className="form__text"
                              id="outlined-basic"
                              variant="outlined"
                              label={`Contact 2 Name: ${
                                editCustomer.emergencyContactName2
                                  ? editCustomer.emergencyContactName2
                                  : "N/A"
                              }`}
                              value={editEcName2}
                              type="text"
                              onChange={(e) => setEditEcName2(e.target.value)}
                            />
                            <TextField
                              style={{
                                marginTop: "15px",
                                width: "240px",
                                marginLeft: "20px",
                              }}
                              className="form__text"
                              id="outlined-basic"
                              variant="outlined"
                              label={`Contact 2 Number: ${
                                editCustomer.emergencyContactMobile2
                                  ? editCustomer.emergencyContactMobile2
                                  : "N/A"
                              }`}
                              value={editEc2}
                              type="text"
                              onChange={(e) => setEditEc2(e.target.value)}
                            />
                          </div>

                          <Button
                            className="btn p-text close-modal"
                            variant="outlined"
                            style={{
                              width: "150px",
                              margin: "auto",
                              marginTop: "10px",
                              backgroundColor: "#8b1010",
                              color: "white",
                              marginBottom: "20px",
                            }}
                            type="submit"
                          >
                            Submit
                          </Button>
                        </form>
                      </div>
                    </div>
                  )}
                  {editError && (
                    <div className="modal">
                      <div className="overlay" onClick={toggleEditError}></div>
                      <div>
                        <form
                          onSubmit={toggleEditError}
                          className="modal-content"
                        >
                          <MdClose
                            onClick={toggleEditError}
                            style={{
                              color: "#313bac",
                              height: "1.2rem",
                              width: "1.3rem",
                              marginLeft: "300px",
                              marginTop: "10px",
                              marginBottom: "5px",
                            }}
                          />
                          <h3 style={{ margin: "auto" }}>
                            Internal Error. Try Again Later!
                          </h3>
                          <Button
                            className="btn p-text close-modal"
                            variant="outlined"
                            style={{
                              width: "150px",
                              marginTop: "20px",
                              marginLeft: "30%",
                              backgroundColor: "#313bac",
                              color: "white",
                              marginBottom: "20px",
                            }}
                            type="submit"
                          >
                            Try Again
                          </Button>
                        </form>
                      </div>
                    </div>
                  )}
                  {lastScannedQrModal && (
                    <div className="modal">
                      <div
                        className="overlay"
                        onClick={toggleLastScannedQrModal}
                      ></div>
                      <div className="modal-content_qrscan">
                        <MdClose
                          onClick={toggleLastScannedQrModal}
                          style={{
                            color: "#313bac",
                            height: "1.2rem",
                            width: "1.3rem",
                            marginLeft: "900px",
                            marginTop: "5px",
                            marginBottom: "5px",
                          }}
                        />
                        {/* <form onSubmit={(e) =>{
                                                e.preventDefault()
                                                deleteCustomer(deleteUserId)
                                            }} className='modal-content' >
                                            <MdClose onClick={toggleDeleteCustomer} style={{color:'#313bac',height:'1.2rem',width:'1.3rem',marginLeft:'430px',marginTop:'5px',marginBottom:'5px'}}  />
                                            <h3 style={{margin:'auto',marginTop:'10px'}} >Are you sure you want to delete the Selected User?</h3>
                                            <Button className='btn p-text close-modal' variant="outlined" 
                                            style={{width:'150px',margin:'auto',marginTop:'30px',backgroundColor:'#8b1010',color:'white',marginBottom:'20px'}}  type='submit'>
                                                Yes   
                                            </Button>
                                            
                                            </form> */}
                        <div style={{ margin: "auto", marginBottom: "10px" }}>
                          <h3>Customer Scan Details</h3>
                        </div>
                        {scanHistory?.map((history, index) => (
                          <>
                            <div style={{ display: "flex", marginTop: "3px" }}>
                              <h4 style={{ paddingTop: "3px" }}>{index + 1}</h4>
                              <h3 style={{ marginLeft: "20px" }}>
                                Date:{" "}
                              </h3>{" "}
                              <h4
                                style={{
                                  marginLeft: "10px",
                                  paddingTop: "3px",
                                }}
                              >
                                {" "}
                                {history.datetime.substring(0, 10)}
                              </h4>
                              <h3 style={{ marginLeft: "20px" }}>Time: </h3>{" "}
                              <h4
                                style={{
                                  marginLeft: "10px",
                                  paddingTop: "3px",
                                }}
                              >
                                {" "}
                                {history.timestamp}
                              </h4>
                              <h3 style={{ marginLeft: "20px" }}>Lat: </h3>
                              <h4
                                style={{
                                  marginLeft: "10px",
                                  paddingTop: "3px",
                                }}
                              >
                                {" "}
                                {history.latitude}
                              </h4>
                              <h3 style={{ marginLeft: "20px" }}>Lng:</h3>
                              <h4
                                style={{
                                  marginLeft: "10px",
                                  paddingTop: "3px",
                                }}
                              >
                                {" "}
                                {history.longitude}
                              </h4>
                              <h3 style={{ marginLeft: "20px" }}>QR Code:</h3>
                              <h4
                                style={{
                                  marginLeft: "10px",
                                  paddingTop: "3px",
                                }}
                              >
                                {" "}
                                {history.qrcode}
                              </h4>
                              <a
                                style={{
                                  marginLeft: "20px",
                                  paddingTop: "2px",
                                }}
                                href=""
                                onClick={() =>
                                  openMap(history.latitude, history.longitude)
                                }
                              >
                                Click To View
                              </a>
                            </div>
                          </>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              );
            })
          ) : (
            <>
              <div style={{ marginTop: "20px" }} className="loader"></div>
            </>
          )}
        </div>
      </div>

      {!filterDataDisplayed ? (
        <div>
          <nav>
            <ReactPaginate
              pageCount={pageCount}
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              marginPagesDisplayed={3}
              activeClassName={"active"}
            />
          </nav>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TableCard;
