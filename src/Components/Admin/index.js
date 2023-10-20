import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  MdDeleteForever,
  MdFilterListAlt,
  MdOutlineAssignmentInd,
  MdUploadFile,
  MdClose,
  MdQrCodeScanner,
} from "react-icons/md";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie/cjs/Cookies";
import safe from "../assets/safe.png";
import "./style.scss";

const AdminPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [newData, setNewData] = useState([]);
  const [pageCount, setPagecount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [qrAssigned, setqrAssigned] = useState("Both");
  const [qrScanData, setqrScanData] = useState("Both");
  const [registerDateStart, setRegisterDateStart] = useState("from");
  const [registerDateEnd, setRegisterDateEnd] = useState("to");
  const [allPartners, setAllPartners] = useState([]);
  const [searchValue, setSearchValue] = useState([]);
  const [partnerSelect, setPartnerSelect] = useState("All");
  const [partnerId, setPartnerId] = useState("");
  const [deleteUser, setDeleteUser] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState("");
  const [deleteQr, setdeleteQr] = useState(false);
  const [qrdeleteId, setqrdeleteId] = useState("");
  const [filterDataDisplayed, setFilterDataDisplayed] = useState(false);
  const [searchValueDisplayed, setSearchValueDisplayed] = useState(false);
  const [qrModal, setQrModal] = useState(false);
  const [qrId, setQrId] = useState("");
  const [qrPin, setQrPin] = useState("");
  const [custId, setCustId] = useState("");

  //   const [first, setfirst] = useState(second)
  const cookies = new Cookies();
  const adminUid = "bsR73uiraU0bmWlI8kDw";
  if (cookies.get("loggedInPartnerUser") !== adminUid) {
    navigate("/login");
  }

  useEffect(() => {
    const getNewData = async (curPage) => {
      setLoading(true);
      try {
        await axios
          .get(
            process.env.REACT_APP_BASE_URL + `/admin?page=${curPage}&limit=10`
          )
          .then((res) => {
            setPagecount(Math.ceil(res.data.results.total / 10));
            setNewData(res.data.results.customers);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err.message);
          });
      } catch (error) {
        console.error(error.message);
      }
    };
    getNewData(1);
  }, []);

  useEffect(() => {
    const getAllPartners = async (curPage) => {
      setLoading(true);
      try {
        await axios
          .get(process.env.REACT_APP_BASE_URL + "/partners")
          .then((res) => {
            setAllPartners(res.data.partners);
          })
          .catch((err) => {
            console.log(err.message);
          });
      } catch (error) {
        console.error(error.message);
      }
    };
    getAllPartners();
  }, []);

  const getNewData = async (curPage) => {
    setLoading(true);
    try {
      await axios
        .get(process.env.REACT_APP_BASE_URL + `/admin?page=${curPage}&limit=10`)
        .then((res) => {
          setNewData(res.data.results.customers);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (error) {
      console.error(error.message);
    }
  };
  const getData = async (lowerCaseValue) => {
    try {
      await axios
        .get(
          process.env.REACT_APP_BASE_URL +
            `/admin/search?adminSearchKey=${lowerCaseValue}`
        )
        //await axios.get(`http://localhost:1902/admin/search?adminSearchKey=${lowerCaseValue}`)
        .then((res) => {
          setSearchValue(res.data.customers);
          console.log(res);
          setNewData(res.data.customers);
          setSearchValueDisplayed(true);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePageChange = (data) => {
    let curPage = data.selected + 1;
    getNewData(curPage);
    window.scrollTo({ top: 0 });
  };

  const toggleModal = () => {
    setModal(!modal);
  };
  const toggleQrModal = () => {
    setQrModal(!qrModal);
  };

  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(
        process.env.REACT_APP_BASE_URL + "/admin/filter",
        {
          partnerSelect,
          qrAssigned,
          qrScanData,
          registerDateStart,
          registerDateEnd,
          partnerId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setNewData(res.data.filteredData);
        setFilterDataDisplayed(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
    console.log(
      partnerSelect,
      qrAssigned,
      qrScanData,
      registerDateStart,
      registerDateEnd,
      partnerId
    );
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const lowerCaseValue = search.toLowerCase().trim();
    getData(lowerCaseValue);
  };

  const toggleDeleteCustomer = () => {
    setDeleteUser(!deleteUser);
  };
  const toggleDeleteQr = () => {
    setdeleteQr(!deleteQr);
  };

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
  const handleQrDeleteClick = async (id) => {
    axios
      .delete(process.env.REACT_APP_BASE_URL + `/qr/${id}`)
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
  console.log(newData);
  console.log(allPartners);
  return (
    <div>
      <div>
        <div className="app__table"></div>
        <div>
          <h2 className="head-text">
            {" "}
            Welcome <span> Administrator </span>{" "}
          </h2>
        </div>
        <div className="app__header-btns">
          <div
            style={{
              paddingBottom: "25px",
              display: "flex",
              marginTop: "10px",
            }}
          >
            <Button
              style={{
                marginLeft: "250px",
                marginTop: "20px",
                width: "160px",
                border: "1px solid blue",
              }}
              onClick={toggleModal}
            >
              Filter{" "}
              <span>
                <MdFilterListAlt style={{ marginLeft: "5px" }} />{" "}
              </span>{" "}
            </Button>
            <form
              onSubmit={(e) => {
                setLoading(true);
                handleSearchSubmit(e);
              }}
              style={{ marginLeft: "50px", verticalAlign: "middle" }}
            >
              <input
                placeholder="search"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                style={{
                  marginTop: "20px",
                  verticalAlign: "bottom",
                  width: "250px",
                  height: "40px",
                  verticalAlign: "middle",
                }}
              />
              <Button
                type="submit"
                style={{
                  marginLeft: "50px",
                  marginTop: "20px",
                  width: "160px",
                  border: "1px solid blue",
                  verticalAlign: "middle",
                }}
              >
                Search
              </Button>
            </form>
            <Button
              href="/scans"
              style={{
                marginLeft: "50px",
                marginTop: "20px",
                width: "160px",
                backgroundColor: "#0502b193",
                color: "white",
              }}
            >
              Scans{" "}
              <span>
                <MdQrCodeScanner
                  style={{
                    marginLeft: "5px",
                    verticalAlign: "middle",
                    fontSize: "1.2rem",
                  }}
                />{" "}
              </span>{" "}
            </Button>
          </div>
          <div>
            {filterDataDisplayed ? (
              <a
                href="/admin"
                style={{ marginLeft: "270px", marginTop: "20px" }}
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
                href="/admin"
                style={{ marginLeft: "270px", marginTop: "20px" }}
                onClick={() => setSearchValueDisplayed(false)}
              >
                {" "}
                clear search results
              </a>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="app__table_admin" style={{ marginTop: "20px" }}>
          <div className="head row">
            <div className="column_admin" style={{ width: "160px" }}>
              <div className="card_admin">
                <h3>Customer Info</h3>
              </div>
            </div>
            <div className="column_admin" style={{ width: "180px" }}>
              <div className="card_admin">
                <h3>Registration Date</h3>
              </div>
            </div>
            <div className="column_admin" style={{ width: "135px" }}>
              <div className="card_admin">
                <h3>Blood Group</h3>
              </div>
            </div>
            <div className="column_admin" style={{ width: "110px" }}>
              <div className="card_admin">
                <h3>DOB</h3>
              </div>
            </div>
            <div className="column_admin" style={{ width: "210px" }}>
              <div className="card_admin" style={{ display: "flex" }}>
                <img src={safe} style={{ height: "1.3rem" }} alt="weSafe" />
                <h3 style={{ marginLeft: "1px" }}>WeSafe Qr Details</h3>
              </div>
            </div>
            <div className="column_admin" style={{ width: "100px" }}>
              <div className="card_admin">
                <h3>Actions</h3>
              </div>
            </div>
          </div>
          <div className="row">
            {!loading ? (
              newData?.map((data) => {
                return (
                  <>
                    <div
                      key={data._id}
                      className="column_admin"
                      style={{ width: "160px" }}
                    >
                      <div className="card_content_admin">
                        <div className="content1">
                          <div style={{ display: "flex", alignItems: "left" }}>
                            <p style={{ marginLeft: "5px", displau: "flex" }}>
                              <b>{data.name}</b>
                            </p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "left",
                              marginLeft: "5px",
                            }}
                          >
                            <p style={{ alignItems: "left" }}>
                              {" "}
                              <span>{data.address}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      key={data._id}
                      className="column_admin"
                      style={{ width: "180px" }}
                    >
                      <div className="card_content_admin">
                        <div className="content1">
                          {data.dateRegistered ? (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "left",
                                justifyContent: "center",
                              }}
                            >
                              <p>
                                <span> {data.dateRegistered}</span>
                              </p>
                            </div>
                          ) : (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "left",
                                justifyContent: "center",
                              }}
                            >
                              <p>
                                <span>N/A</span>
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div
                      key={data._id}
                      className="column_admin"
                      style={{ width: "135px" }}
                    >
                      <div className="card_content_admin">
                        <div className="content1">
                          {data.bloodGroup ? (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "left",
                                justifyContent: "center",
                              }}
                            >
                              <p>
                                <span>{data.bloodGroup}</span>
                              </p>
                            </div>
                          ) : (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "left",
                                justifyContent: "center",
                              }}
                            >
                              <p>
                                <span>N/A</span>
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div
                      key={data._id}
                      className="column_admin"
                      style={{ width: "110px" }}
                    >
                      <div className="card_content_admin">
                        <div className="content1">
                          {data.dob != null ? (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "left",
                                justifyContent: "center",
                              }}
                            >
                              <p>
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
                                justifyContent: "center",
                              }}
                            >
                              <p>
                                <span> N/A</span>
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="column_admin" style={{ width: "210px" }}>
                      <div className="card_content_admin">
                        <div>
                          {data?.customerQrs?.length > 0 ? (
                            data?.customerQrs?.map((qr) => (
                              <div key={qr._id}>
                                <div>
                                  {qr.qrId} - <span> {qr.qrPin}</span>{" "}
                                  <span>
                                    <MdDeleteForever
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setqrdeleteId(qr._id);
                                        toggleDeleteQr();
                                      }}
                                      style={{
                                        verticalAlign: "bottom",
                                        color: "red",
                                        fontSize: "1rem",
                                      }}
                                    />{" "}
                                  </span>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div style={{ color: "red", marginLeft: "23px" }}>
                              <p>No QR Code Assigned Yet</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div
                      key={data._id}
                      className="column_admin"
                      style={{ width: "100px" }}
                    >
                      <div className="card_content_admin">
                        <div
                          className="content1"
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <MdDeleteForever
                            onClick={(e) => {
                              e.preventDefault();
                              setDeleteUserId(data._id);
                              toggleDeleteCustomer();
                              // deleteCustomer(data._id)
                            }}
                            style={{
                              verticalAlign: "bottom",
                              color: "red",
                              fontSize: "1.3rem",
                            }}
                          />
                          <MdQrCodeScanner
                            onClick={() => {
                              setCustId(data._id);
                              toggleQrModal();
                            }}
                            style={{
                              verticalAlign: "bottom",
                              fontSize: "1.3rem",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <>
                <div
                  style={{ marginTop: "20px", marginRight: "430px" }}
                  className="loader"
                ></div>
              </>
            )}
            {modal && (
              <div className="modal">
                <div className="overlay" onClick={toggleModal}></div>
                <div className="modal-content">
                  <form
                    onSubmit={(e) => {
                      handleFilterSubmit(e);
                      setLoading(true);
                    }}
                    className="modal-content_filter "
                  >
                    <MdClose
                      onClick={toggleModal}
                      style={{
                        color: "#313bac",
                        height: "1.2rem",
                        width: "1.3rem",
                        marginLeft: "300px",
                      }}
                    />
                    <h2 style={{ marginLeft: "30%" }}> Apply Filter </h2>

                    <label style={{ marginLeft: "10px" }}>Select Partner</label>
                    <select
                      onChange={(e) => {
                        setPartnerSelect(e.target.value);
                        setPartnerId(
                          e.target.children[
                            e.target.selectedIndex
                          ].getAttribute("partner_id")
                        );
                      }}
                      className="select-long"
                      label="groups"
                    >
                      <option value="" disabled selected>
                        All
                      </option>
                      {allPartners?.map((partner) => (
                        <option
                          key={partner._id}
                          partner_id={partner.partnerUid}
                        >
                          {partner.businessName}
                        </option>
                      ))}
                    </select>
                    <label style={{ marginLeft: "10px" }}>
                      Qr Code Assigned
                    </label>
                    <select
                      onChange={(e) => setqrAssigned(e.target.value)}
                      className="select-long"
                      label="qr assigned"
                    >
                      <option value="">Both</option>
                      <option key="yes">Yes</option>
                      <option key="no">No</option>
                    </select>
                    <label style={{ marginLeft: "10px" }}>Qr Scan Data</label>
                    <select
                      onChange={(e) => setqrScanData(e.target.value)}
                      className="select-long"
                      label="qr scan data"
                    >
                      <option value="">Both</option>
                      <option key="yes">Yes</option>
                      <option key="no">No</option>
                    </select>
                    <label style={{ marginLeft: "10px" }}>
                      Registration Date
                    </label>
                    <div style={{ marginBottom: "10px" }}>
                      <input
                        type="date"
                        placeholder="from"
                        style={{ width: "40%" }}
                        label="from"
                        className="date-time-ip"
                        onChange={(e) => setRegisterDateStart(e.target.value)}
                      />
                      <input
                        type="date"
                        placeholder="to"
                        style={{ width: "40%" }}
                        label="to"
                        className="date-time-ip"
                        onChange={(e) => setRegisterDateEnd(e.target.value)}
                      />
                    </div>
                    <Button
                      className="close-modal"
                      type="submit"
                      style={{
                        marginLeft: "30%",
                        backgroundColor: "#313bac",
                        color: "white",
                        width: "150px",
                        marginBottom: "10px",
                      }}
                    >
                      Apply
                    </Button>
                  </form>
                </div>
              </div>
            )}
            {deleteUser && (
              <div className="modal">
                <div className="overlay" onClick={toggleDeleteCustomer}></div>
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
                  <form onSubmit={handleQrSubmit} className="app__form_qr">
                    <h3 className="head-text" style={{ fontSize: "1.5rem" }}>
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
          </div>
        </div>
      </div>
      <div>
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
      </div>
    </div>
  );
};

export default AdminPage;

// onClick={toggleModal}
// onClick={toggleAddToGroup}
// onSubmit={handleSearchSubmit}
// onClick={toggleMultiDocModal}
