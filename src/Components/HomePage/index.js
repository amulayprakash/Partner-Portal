import React,{useState,useEffect} from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from 'axios';
import { Box, Button, Input } from '@mui/material';
// import { makeStyles } from "@material-ui/core/styles";
import './style.scss'
import { fontWeight } from '@mui/system';
import {TextField} from '@mui/material';
import {MdFilterListAlt,MdSort,MdAdd,MdOutlineAssignmentInd,MdUploadFile,MdClose} from 'react-icons/md'
import TableCard from '../CardTable';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie/cjs/Cookies';
import safe from '../assets/safe.png' 


// import Pagination from '../PaginationComponent'

const HomePage = () => {

    const [datas, setData] = useState([]) 
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState(false)
    const [loading, setLoading] = useState(false)
    const [modal,setModal]=useState(false)
    const [allGroups,setAllgroups]=useState([])
    const [addToGroup,setAddToGroup]=useState(false)
    const [addMultiDoc,setAddMultiDoc]=useState(false)
    const [customerModal, setCustomerModal] = useState(false)
    const [filteredData, setFilteredData] = useState([])
    const [groupSelect,setGroupSelect]=useState('All')
    const [groupAssigned,setgroupAssigned]=useState('Both')
    const [qrAssigned,setqrAssigned]=useState('Both')
    const [docsAssigned,setdocsAssigned]=useState('Both')
    const [qrScanData,setqrScanData]=useState('Both')
    const [registerDateStart, setRegisterDateStart] = useState('from')
    const [registerDateEnd  , setRegisterDateEnd  ] = useState('to')
    const [name, setName] = useState('')
    const [address,setAddress]=useState('')
    const [dob,setdob]=useState('')
    const [bloodGroup,setbloodGroup]=useState('')
    const [gender,setgender]=useState('')
    const [partnerUid,setpartnerUid]=useState('')
    const [userUid,setuserUid]=useState('')
    const [childListUid,setchildList]=useState('')
    const [addMutliCustomers, setAddMutliCustomers] = useState(false)
    const [filename, setFilename] = useState('')
    const [loggedInUser, setLoggedInUser] = useState(false)
    const [filterDataDisplayed, setFilterDataDisplayed] = useState(false)
    const [searchValue, setSearchValue] = useState([])
    const navigate=useNavigate()
    const cookies=new Cookies()
    
    const toggleModal=() => {
        setModal(!modal)
    }

    const toggleAddToGroup=() => {
        setAddToGroup(!addToGroup)
    }

    const toggleMultiDocModal=() => {
        setAddMultiDoc(!addMultiDoc)
    }

    const toggleCustomerModal=() =>{
        
        setCustomerModal(!customerModal)
    }
    
    useEffect(() => {
        const getData=async() => {
            try {
                await axios.get("https://we-safe-partner-portal-backend1.onrender.com/customerData")
                // await axios.get("http://localhost:1902/customerData")
                .then(res=> {
                    setData(res.data.customers)
                }).catch(err => {
                    console.log(err.message)
                }) 
            } catch (error) {
                console.log(error.message)
            }
        }
        getData()
    },[])

    useEffect(() => {
        const getGroups=async() => {
            try {
                await axios.get("https://we-safe-partner-portal-backend1.onrender.com/groups").then(res=> {
                    setAllgroups(res.data.groups)
                }).catch(err => {
                    console.log(err.message)
                }) 
            } catch (error) {
                console.log(error.message)
            }
        }
        getGroups()
    },[])

    //forSearchBar
    // useEffect(() => {
    //     const lowerCaseValue=.toLowerCase().trim()
        
    //     const getData=async() => {
    //         try {
    //             await axios.get(`http://localhost:1902/search?searchKey=${lowerCaseValue}`)
    //             .then(res=> {
    //                 setNewData(res.data.customers)
    //             }).catch(err => {
    //                 console.log(err.message)
    //             }) 
    //         } catch (error) {
    //             console.log(error.message)
    //         }         
    //     }
    //     if(!lowerCaseValue)
    //         getData()
        
    // },[])
    const getData=async(lowerCaseValue) => {
        try {
            await axios.get(`https://we-safe-partner-portal-backend1.onrender.com/search?searchKey=${lowerCaseValue}`)
            // await axios.get(`http://localhost:1902/search?searchKey=${lowerCaseValue}`)
            .then(res=> {
                setSearchValue(res.data.customers)
            }).catch(err => {
                console.log(err.message)
            }) 
        } catch (error) {
            console.log(error.message)
        }         
    }
    
    const handleSearchSubmit=(e) =>{
        e.preventDefault()
        const lowerCaseValue=search.toLowerCase().trim()
        console.log(lowerCaseValue)
        getData(lowerCaseValue)
        
    }
    console.log(searchValue)
    // useEffect(() => {
    //     setFilteredData(
    //         datas?.filter((data) => {
    //             let required=false
    //             data?.customerGroups?.filter((group) => {
    //                 if(!group || (group.groupName===groupSelect))
    //                     required=true
    //             })
    //             if(required)
    //                 return data
    //             else 
    //                 return
    //         })
    //     )
    // },[groupSelect,groupAssigned])

    const handleFilterSubmit=(e) => {
        e.preventDefault()
        // axios.post(`http://localhost:1902/customerData/filter?groupSelect=${groupSelect}&groupAssigned=${groupAssigned}&qrAssigned=${qrAssigned}&docsAssigned=${docsAssigned}&qrScanData=${qrScanData}`)
        // axios.post("https://we-safe-partner-portal-backend1.onrender.com/customerData/filter",{groupSelect,groupAssigned,qrAssigned,docsAssigned,qrScanData,registerDateStart,registerDateEnd},
        //     {
        //         "headers":{
        //             "Content-Type":"application/json"
        //         }
        //     }
        // )
        axios.post("https://we-safe-partner-portal-backend1.onrender.com/customerData/filter",{groupSelect,groupAssigned,qrAssigned,docsAssigned,qrScanData,registerDateStart,registerDateEnd},
        {
            "headers":{
                "Content-Type":"application/json"
            }
        }
        )
        // axios.post("http://localhost:1902/customerData/filter",{groupSelect,groupAssigned,qrAssigned,docsAssigned,qrScanData,registerDateStart,registerDateEnd},
        // {
        //     "headers":{
        //         "Content-Type":"application/json"
        //     }
        // }
        // )
        .then(res => {
            setFilteredData(res.data.filteredData)
            console.log(res.data.filteredData)
            setFilterDataDisplayed(true)
        }).catch(err => {
            console.log(err.message)
        })
        console.log(groupSelect,groupAssigned,qrAssigned,docsAssigned,qrScanData,registerDateStart,registerDateEnd)
    }

    const sortChange=() =>{
        setSort(!sort)
    }

    const handleCustomerSubmit=(e) => {
        e.preventDefault()
        const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJblBhcnRuZXJVc2VyIjp7ImlkIjoiZ3RxNzRIMGtkN3d1azBpVW02aTUifSwiaWF0IjoxNjc3MDUyMjc0fQ.BD1uEUK1gg0_mD8qN6_o-pYgTpJF9m-2YXLar0VIcGI'
        if(addMutliCustomers){
            axios.post("https://we-safe-partner-portal-backend1.onrender.com/uploadMultipleCustomers",{filename},{
                "headers":{
                    "Content-Type":"multipart/form-data"
                }
            }).then(res => {
                console.log(res)
                setAddMutliCustomers(false)
                 window.location.reload()
            }).catch(err=> {
                console.log(err.message)
                setAddMutliCustomers(false)
            })

            
        }else{
            axios.post("https://we-safe-partner-portal-backend.onrender.com/customers",{
                name,address,dob,partnerUid,childListUid,userUid,gender,bloodGroup
            },{
                headers:{
                "Content-Type":"application/json",
                "x-auth-token":token
            }})
            .then(res=>{
                console.log(res.data)
                window.location.reload()
            }).catch(err=> {
                console.log(err.message)
            })
        }
        
    }
    
    const csvurl='https://partner-portal.netlify.app/customerDataTemplateCSV.csv'
    const templateDownload = (url) =>{
        const aTag=document.createElement('a')
        aTag.href=url
        aTag.setAttribute('download','customerTemplate')
        document.body.appendChild(aTag)
        aTag.click()
        aTag.remove()
    }

    useEffect(() => {
        if(cookies.get("type")==="admin")
            navigate("/admin")
        else    
            navigate("/home")
    },[])
    
    useEffect(() => {
        if(!cookies.get("token"))
            setLoggedInUser(false)
        else    
            setLoggedInUser(true)
    },[])
    // console.log(cookies.get("token"))
    
    
    return (
    
    !loggedInUser?(
        <>
        <div>
            <img src={safe}  alt='weSafe' style={{borderRadius:'50%',width:'130px',height:'130px',backgroundColor:'#0502b193',marginLeft:'46%',marginTop:'15%'}} />
            <h2 style={{marginTop:'15px',marginLeft:'42%'}} >WeSafe Partner Portal</h2>

        </div>
            <h3 style={{paddingTop:'25px',marginLeft:'43%'}} >
                Please Log In To Continue
            </h3>
        </>
    ):
    (
            <div>
                <div className='app__table' >

                </div>
                <div>
                    <h2 className='head-text' >  <span> Partner Portal</span> </h2>
                </div>
                <div className='app__header-btns' >
                    <div style={{paddingBottom:'25px',display:'flex',marginTop:'10px'}}  >
                        {/* <Button style={{marginLeft:'100px',width:'160px',border:'1px solid blue' ,marginTop:'20px'}} onClick={sortChange} >Sort <span><MdSort style={{marginLeft:'5px'}} /> </span></Button> */}
                        <Button style={{marginLeft:'100px',marginTop:'20px',width:'160px',border:'1px solid blue'}} onClick={toggleModal} >Filter <span><MdFilterListAlt style={{marginLeft:'5px'}} /> </span> </Button>
                        <Button style={{marginLeft:'75px',marginTop:'20px',width:'160px',border:'1px solid blue'}} onClick={toggleAddToGroup} >Assign Group <span><MdOutlineAssignmentInd style={{verticalAlign:'middle',marginLeft:'5px'}}/></span> </Button>
                        <Button style={{marginLeft:'75px',marginTop:'20px',width:'160px',border:'1px solid blue'}} onClick={toggleMultiDocModal} >Add Documents <span><MdUploadFile style={{marginLeft:'5px'}} /> </span> </Button>
                        {/* <Button  style={{marginLeft:'75px',marginTop:'20px',width:'160px',border:'1px solid blue'}} onClick={toggleCustomerModal} > Add Customer <span><MdAdd style={{marginLeft:'5px'}} /> </span></Button> */}
                        <form onSubmit={handleSearchSubmit} style={{marginLeft:'75px',verticalAlign:'middle'}} >
                            <input placeholder='search' onChange={(e) => {
                                setSearch(e.target.value)
                            }}  
                            style={{marginTop:'20px',verticalAlign:'bottom',width:'250px',height:'40px',verticalAlign:'middle'}} />
                            <Button type='submit'style={{marginLeft:'50px',marginTop:'20px',width:'160px',border:'1px solid blue',verticalAlign:'middle'}} >Search</Button>
                        </form>
                    </div>
                </div>
                <div >
                {/* //searched={search} */}
                    <TableCard searched={searchValue} sort={sort} groupSelected={groupSelect} groupAssigned={groupAssigned} qrAssigned={qrAssigned} 
                        qrScanData={qrScanData} docsAssigned={docsAssigned} addToGroup={addToGroup} toggleAddToGroup={toggleAddToGroup}
                        addMultiDoc={addMultiDoc} toggleMultiDocModal={toggleMultiDocModal} filteredData={filteredData} 
                        filterDataDisplayed={filterDataDisplayed} setFilterDataDisplayed={setFilterDataDisplayed}
                    />
                    
                    
                    {/* <Pagination style={{marginTop:'25px'}} postsPerPage={postsPerPage} paginate={paginate} totalPosts={datas.length} /> */}
                    {
                        modal && (
                                <div className='modal' >
                                
                                <div className='overlay' onClick={toggleModal} ></div>
                                <div className='modal-content' >
                                <form onSubmit={handleFilterSubmit} className='modal-content_filter ' >
                            <MdClose onClick={toggleModal}  style={{color:'#313bac',height:'1.2rem',width:'1.3rem',marginLeft:'300px'}}  />
                                    <h2 style={{marginLeft:'30%'}} > Apply Filter </h2>
                                    
                                    <label style={{marginLeft:'10px'}} >Groups</label><select onChange={e => setGroupSelect(e.target.value)} className='select-long' label='groups' >
                                        <option value="" disabled selected >All</option>
                                        {
                                            allGroups.map((group) => (
                                                <option key={group.groupId} >{group.groupName}</option>
                                            ))
                                        }
                                    </select>
                                    <label style={{marginLeft:'10px'}} >Groups Assigned</label><select onChange={e=>setgroupAssigned(e.target.value)} className='select-long' label='group assigned'>
                                    <option value='' disabled selected >Both</option>
                                        <option key='yes' >Yes</option>
                                        <option key='no' >No</option>
                                    </select>
                                    <label style={{marginLeft:'10px'}} >Qr Code Assigned</label><select onChange={e=>setqrAssigned(e.target.value)} className='select-long' label='qr assigned'>
                                        <option value='' >Both</option>
                                        <option key='yes' >Yes</option>
                                        <option key='no' >No</option>
                                    </select>
                                    <label style={{marginLeft:'10px'}} >Docs Assigned</label> <select onChange={e=>setdocsAssigned(e.target.value)} className='select-long' label='docs assigned'>
                                        <option value='' >Both</option>
                                        <option key='yes' >Yes</option>
                                        <option key='no' > No</option>
                                    </select>
                                    <label style={{marginLeft:'10px'}} >Qr Scan Data</label><select onChange={e=>setqrScanData(e.target.value)} className='select-long' label='qr scan data'>
                                        <option value='' >Both</option>
                                        <option key='yes' >Yes</option>
                                        <option key='no' >No</option>
                                    </select>
                                    <label style={{marginLeft:'10px'}} >Registration Date</label>
                                    <div style={{marginBottom:'10px'}} >
                                        <input type='date' placeholder='from' style={{width:'40%'}} label='from' 
                                        className='date-time-ip'  onChange={e=>setRegisterDateStart(e.target.value)}/>
                                        <input type='date' placeholder='to' style={{width:'40%'}} label='to' 
                                        className='date-time-ip' onChange={e=>setRegisterDateEnd(e.target.value)} />
                                    </div>
                                    
                                    <Button  
                                    className='close-modal' type='submit' style={{marginLeft:'30%',backgroundColor:'#313bac',color:'white',width:'150px',marginBottom:'10px'}}  >Apply</Button>
                                    </form>
                                </div>
                        </div>
                        )
                    }
                    {
                        // customerModal && (
                        //         <div className='modal' >
                                
                        //         <div className='overlay' onClick={toggleCustomerModal} ></div>
                        //         <div className='modal-content_customer' >
                        //         <form onSubmit={handleCustomerSubmit} className='modal-content' >
                        //         <MdClose onClick={toggleCustomerModal} style={{color:'#313bac',height:'1.2rem',width:'1.3rem',marginLeft:'300px',marginTop:'10px',marginBottom:'5px'}}  />
                        //             <h3 className='head-text' style={{fontSize:'1.3rem',margin:'auto'}} >Create A <span>New</span> Customer </h3>
                            
                        //     <input  style={{margin:'auto',width:'300px',marginTop:'10px'}}  className='form__text' id="outlined-basic" 
                        //     variant="outlined" type='text' placeholder='Enter Name' 
                        //     onChange={(e) =>setName(e.target.value)} 
                        //     />
                        //     <input  style={{margin:'auto',width:'300px',marginTop:'10px'}}  className='form__text' id="outlined-basic" 
                        //     variant="outlined" placeholder='Enter Gender' 
                        //     type='text' onChange={(e) =>setgender(e.target.value)} 
                        //     />
                        //     <input  style={{margin:'auto',width:'300px',marginTop:'10px'}}  className='form__text' id="outlined-basic" 
                        //     variant="outlined" type='text' placeholder='Enter Address' 
                        //     onChange={(e) =>setAddress(e.target.value)} 
                        //     />
                        //     <input  style={{margin:'auto',width:'300px',marginTop:'10px'}}  className='form__text' 
                        //      type="date" placeholder='Enter DOB' 
                        //     onChange={(e) =>setdob(e.target.value)} 
                        //     />
                        //     <input  style={{margin:'auto',width:'300px',marginTop:'10px'}}  className='form__text' id="outlined-basic" 
                        //     variant="outlined" type='text' placeholder='Enter Blood Group' 
                        //     onChange={(e) =>setbloodGroup(e.target.value)} 
                        //     />
                        //     <h3 style={{marginLeft:'45%',marginTop:'10px'}} >OR</h3>
                        //     <h4 style={{margin:'auto'}} >Upload <span>Multiple</span> Customers </h4>
                        //     <input type='file' onChange={(e) => {
                        //         setAddMutliCustomers(true)
                        //         setFilename(e.target.files[0])}
                        //         }  className='form__text' style={{width:'300px',marginLeft:'18%'}} />
                        //     <a style={{margin:'auto',fontSize:'0.8rem',textDecoration:'underline',marginTop:'7px'}} onClick={() =>templateDownload(csvurl)} >Download Customer Template</a>

                        //     <Button className='btn p-text close-modal' variant="outlined" 
                        //     style={{width:'150px',marginTop:'20px',marginLeft:'30%',backgroundColor:'#313bac',color:'white',marginBottom:'20px'}}  type='submit'>
                        //         Submit   
                        //     </Button>
                        //     </form>
                        //     </div>
                        // </div>
                        // )
                    }
                
                </div>
                
            
            </div>)
    )
  
}

export default HomePage