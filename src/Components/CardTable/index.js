import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './style.scss'
import { useNavigate } from 'react-router-dom'
import { Button, Pagination, Typography } from '@mui/material'
import {MdDeleteForever,MdClose} from 'react-icons/md'
import {Link} from 'react-router-dom' 
import PaginationComponents from '../PaginationComponent'
import { TextField } from '@mui/material'
import ReactPaginate from 'react-paginate'
//replace groups by cusgroups

const TableCard = ({searched,sort}) => {
    const [datas, setData] = useState([]) 
    const [newData, setNewData] = useState([])
    const [loading, setLoading] = useState(false)
    const [pageCount, setPageCount] = useState(0)
    
    const [docModal, setDocModal] = useState(false)
    const [qrModal, setQrModal] = useState(false)
    const [groupModal,setGroupModal]=useState(false)

    const [allGroups, setAllGroups] = useState([])
    const [groupSelect,setGroupSelect]=useState(false)
    const [groupName, setGroupName] = useState('')
    const [groupId, setGroupId] = useState('')
    const [groupDes,setGroupDescription]=useState('')
    const [gstartDate, setGstartDate] = useState('')
    const [gendDate, setGendDate] = useState('')


    const [docTags,setdocTags]=useState([])
    const [name, setName] = useState('')
    const [description,setDescription]=useState('')
    const [filename,setFilename]=useState(' ')

    const [qrId, setQrId] = useState('')
    const [qrPin, setQrPin] = useState('')
    
    const [custId,setCustId]=useState('')

    const navigate=useNavigate()

    //initial data
    useEffect(() => {
        const getNewData=async(curPage) => {
            setLoading(true)
            try {
                await axios.get(`https://we-safe-partner-portal-backend1.onrender.com/customerData/new?page=${curPage}&limit=10`).then(res=>{
                    setPageCount(Math.ceil(res.data.results.total/10))
                    setNewData(res.data.results.customers)
                    setLoading(false)
                    
                }).catch(err=>{
                    console.log(err.message)
                })
            } catch (error) {   
                console.error(error.message)
            }
        }
        getNewData(1)
    },[])

    
    //for searchbar
    useEffect(() => {
        const getData=async() => {
            try {
                await axios.get("https://we-safe-partner-portal-backend1.onrender.com/customerData").then(res=> {
                    setData(res.data.customers)
                }).catch(err => {
                    console.log(err.message)
                }) 
            } catch (error) {
                console.log(error.message)
            }
        }
        const filteredData=datas.filter((data) => data.name.toLowerCase().includes(searched.toLowerCase()))
        setData(filteredData)

        if(searched==='')
            getData()
    },[searched])

    useEffect(() => {
        if(sort)
            setData(datas.sort((a,b) => a.name.localeCompare(b.name)))
        else{
            const getData=async() => {
                setLoading(true)
                try {
                    await axios.get("https://we-safe-partner-portal-backend1.onrender.com/customerData").then(res=> {
                        setData(res.data.customers)
                        setLoading(false)
                    }).catch(err => {
                        console.log(err.message)
                    }) 
                } catch (error) {
                    console.log(error.message)
                }
            }
            getData()
        }
        navigate("/")
    },[sort])

    //for getting all groups
    useEffect(() => {
        const getGroups=async() => {
            try {
                await axios.get("https://we-safe-partner-portal-backend1.onrender.com/groups").then(res=> {
                    setAllGroups(res.data.groups)
                }).catch(err => {
                    console.log(err.message)
                }) 
            } catch (error) {
                console.log(error.message)
            }
        }
        getGroups()
    },[])


    //to delete a doc
    const handleDocDeleteClick=async(id) => {
        axios.delete(`https://we-safe-partner-portal-backend1.onrender.com/doc/${id}`).then(res=> {
            console.log(res)
        }).catch(err => {
            console.log(err.message)
        })
        navigate("/")
    }


    //to upload a doc
    const handleDocSubmit=async(e) => {
        e.preventDefault()
        axios.post("https://we-safe-partner-portal-backend1.onrender.com/upload",{name,filename,description,customerId:custId},{
            headers:{
                "Content-Type":"multipart/form-data",
            }
        })
            .then(res => {
                console.log(res)
                toggleDocModal()
                setCustId('')
                console.log(docTags)
                window.location.reload()
            }).catch((err) => {
                console.log(err.message)
            })
            navigate("/")
        
    }

    //assign qr
    const handleQrSubmit=async(e) => {
        e.preventDefault()
        axios.post(`https://we-safe-partner-portal-backend1.onrender.com/customers/${custId}/qr`,{qrId,qrPin},{
            headers:{
                "Content-Type":"application/json",
            }
        })
            .then(res => {
                console.log(res)
                toggleQrModal()
                setCustId('')
                window.location.reload()
            }).catch((err) => {
                console.log(err.message)
            })
        navigate("/")
    }

    //to assign a group or make a new group and add the customer to it
    const handleGroupSubmit=async(e) => {
        e.preventDefault()
        
        const alreadyGroupExists=async(id) => {
            axios.post(`https://we-safe-partner-portal-backend1.onrender.com/customers/${id}/groups`,{groupName,groupId},{
                header:{
                    "Content-Type":"application/json"
                }
            }).then(res => {
                console.log(res)
                toggleDocModal()
                setCustId('')
                setGroupSelect(false)
                window.location.reload()
            }).catch(err => {
                console.log(err.message)
            })
        }

        const newGroupAdd=async(id) => {
            axios.post(`https://we-safe-partner-portal-backend1.onrender.com/createGroupAddCustomer/${id}`,{groupName,
            groupDescription:groupDes,startDate:new Date(gstartDate),endDate:new Date(gendDate)},{
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(res=>{
                console.log(res)
                
                setCustId('')
                window.location.reload()
            }).catch(err=>{
                console.log(err.message)
            })
        }
        if(groupSelect){
            alreadyGroupExists(custId)    
        }else{
            newGroupAdd(custId)
        }
        console.log(groupName)
        console.log(groupId)
        toggleDocModal()

        navigate("/")
    }

    //to delete qr
    const handleQrDeleteClick=async(id) => {
        axios.delete(`https://we-safe-partner-portal-backend1.onrender.com/qr/${id}`).then(res=> {
            console.log(res)
        }).catch(err => {
            console.log(err.message)
        })
        navigate("/")
    }

    //delete a customer
    const deleteCustomer=async(id) => {
        axios.delete(`https://we-safe-partner-portal-backend1.onrender.com/customer/${id}`).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err.message)
        })
        window.location.reload()
    }

    //to assign document tags
    const handleDocTags=(tags) => {
        const tagArr=tags.split(",")
        setdocTags(tagArr)
    }

    //Get Current Datas
    // const lastPostIndex=currentPage*postsPerPage
    // const firstPostIndex=lastPostIndex-postsPerPage
    // const currentPosts=datas.slice(firstPostIndex,lastPostIndex)
    //console.log(currentPosts)
    // }))

    //paginated fetching of data
    const getNewData=async(curPage) => {
        setLoading(true)
        try {
            await axios.get(`https://we-safe-partner-portal-backend1.onrender.com/customerData/new?page=${curPage}&limit=10`).then(res=>{
                setNewData(res.data.results.customers)
                setLoading(false)
                
            }).catch(err=>{
                console.log(err.message)
            })
        } catch (error) {   
            console.error(error.message)
        }
    }

    //toggling functions
    const toggleDocModal=() => {
        setDocModal(!docModal)
    }
    
    const toggleQrModal=() => {
        setQrModal(!qrModal)
    }

    const toggleGroupModal=() => {
        setGroupModal(!groupModal)
    }
    
    //fetching paginatedd api contd
    const handlePageChange=(data) => {
        let curPage=data.selected+1
        getNewData(curPage)
        window.scrollTo({top: 0})
    }
   
   return (
    <div>
        <div className='app__table' >
            <div className="head row">
                <div className="column">
                    <div className="card"><h3>Customer Info</h3></div>
                </div>
                <div className="column">
                    <div className="card"><h3>Group</h3></div>
                </div>
                <div className="column">
                    <div className="card"><h3>Documents</h3></div>
                </div>
                <div className="column">
                    <div className="card"><h3>We Safe Qr Details</h3></div>
                </div>
                <div className="column">
                    <div className="card"><h3>Actions</h3></div>
                </div>
            </div>
            <div className='row' >
                
                {
                
                newData.map((data,index) =>{
                        return(
                        <>
                            <div key={data._id} className="column">
                                <div className="card_content"  >
                                    <div className='content1'  >
                                    
                                    <div style={{display:'flex',alignItems:'left'}} >
                                    <input type='checkbox'/> 
                                    <p style={{marginLeft:'5px',displau:'flex'}} ><b>{data.name}- {(data.gender===1||data.gender==='male')?(<>M</>):(<>F</>)}</b> <span></span></p>
                        
                                    </div>
                                    <div style={{display:'flex',alignItems:'left',marginTop:'0%'}} >
                                        <p  style={{alignItems:'left',marginTop:'25px'}}>  <span>{data.address}</span></p>
                                    </div>
                                    {
                                        data.dob!=null?(
                                        <div style={{display:'flex',alignItems:'left',marginTop:'5px'}}  >
                                            <p> DOB: <span>{JSON.stringify(data.dob).substring(1,11)}</span></p>
                                        </div>
                                        ):(
                                            <div style={{display:'flex',alignItems:'left',marginTop:'5px'}}  ><p> DOB: <span> N/A</span></p></div>
                                        )
                                    }
                                    {
                                        data.bloodGroup?(
                                        <div style={{display:'flex',alignItems:'left',marginTop:'5px'}} >
                                            <p> Blood Grp: <span>{data.bloodGroup}</span></p>
                                        </div>
                                        ):(
                                            <div style={{display:'flex',alignItems:'left',marginTop:'5px'}} ><p> Blood Grp: <span>N/A</span></p></div>
                                        )
                                    }
                                    
                                    <div style={{display:'flex',alignItems:'left'}}  >
                                        <p style={{fontSize:'0.8rem',marginTop:'20px',color:'blue'}} >Cust ID: {data.userUid}</p>
                                    </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="column">
                                <div className="card_content"   >
                                    <b>Groups:</b>
                                    {
                                        <div style={{marginTop:'10%'}} >{data?.customerGroups[0]?.groupName}</div>
                                    }
                                    <div style={{display:'flex',justifyContent:'left',
                                    alignItems:'left',flexDirection:'column',marginTop:'5%'}}>
                                        <div><b>Past Groups:</b></div>
                                    {
                                        (data?.customerGroups?.length>0)?(
                                            data?.customerGroups?.slice(1)?.map((group) => (
                                                <div key={group._id} style={{marginTop:'2px'}}>
                                                    <div>{group.groupName}</div>
                                                </div>
                                            ))
                                        ):(
                                            <div style={{color:'red',marginTop:'8%'}} >No Group Assigned Yet</div> 
                                        )
                                    }
                                    </div>
                                </div>
                            </div>

                            <div className="column" style={{ display:'inline',justifyContent:'center',alignItems:'center'}}>
                                <div className="card_content"  >
                                    <b>Documents: </b>
                                    <div style={{justifyContent:'center',
                                    alignItems:'center',flexDirection:'column',marginTop:'15%'}}>
                                        {
                                        (data?.customerDocs?.length>0)?(
                                            data?.customerDocs?.map((doc) => {
                                                const openPdf=() => {
                                                    let base64String=doc.document?.data
                                                    window.open("data:application/pdf," + encodeURI(base64String))
                                                    
                                                }
                                                return(
                                                <div key={doc._id} style={{marginTop:'2px'}} >
                                                   <div style={{textDecoration:'underline'}} ><a   > {doc.name}</a><span> 
                                                    <MdDeleteForever onClick={e=>
                                                        {   e.preventDefault()
                                                            handleDocDeleteClick(doc._id)
                                                        }}
                                                    style={{verticalAlign:'middle',color:'red',marginLeft:'20px'}} /> 
                                                    </span>
                                                    </div> 
                                                </div>
                                            )})
                                        ):(
                                            <div style={{color:'red',marginTop:'25%'}} >No Document Uploaded</div> 
                                        )
                                    }
                                    </div>
                                </div>
                            </div>

                            <div className="column">
                                <div className="card_content">
                                <b>WeSafe</b>
                                <div style={{display:'flex',marginTop:'5px'}} ><b>Id-</b>  <span>Pin</span> </div>
                    
                                    <div style={{marginTop:'12%'}} >
                                                    
                                    {
                                        (data?.customerQrs?.length>0)?(
                                            data?.customerQrs?.map((qr) => (
                                                <div key={qr._id} >
                                                    <div style={{marginTop:'2px'}} >{qr.qrId} - <span> {qr.qrPin}</span> <span> 
                                                        <MdDeleteForever onClick={e=>
                                                        {   e.preventDefault()
                                                            handleQrDeleteClick(qr._id)
                                                        }} style={{verticalAlign:'bottom',color:'red'}} /> </span>
                                                    </div>
                                                </div>
                                            ))
                                        ):(
                                            <div style={{color:'red',marginTop:'15%'}} >No QR Code Assigned Yet</div> 
                                        )
                                    }
                                    </div>    
                                </div>
                            </div>
                            <div className="column">
                                <div className="card_content" style={{display:'flex',flexDirection:'column',alignItems:'center'}} >
                                    <div>
                                    <Button style={{color:'white',borderRadius:'5px',
                                    backgroundColor:'#313bac',width:'140px',height:'25px',margin:'8px',
                                    textDecoration:'none',marginTop:'25px'}} onClick={() => {
                                        setCustId(data._id)
                                        toggleDocModal()
                                        
                                    }} 
                                    >Add Document</Button>
                                    </div>
                                    <div>
                                        <Button style={{color:'white',borderRadius:'5px',backgroundColor:'#313bac',
                                        width:'140px',height:'25px',margin:'10px'}} 
                                        onClick={() => {
                                            setCustId(data._id)
                                            toggleGroupModal()
                                            
                                        }} 
                                        >
                                            Add/Edit Group
                                        </Button>
                                    </div>
                                    <div>
                                    <Button 
                                        onClick={() => {
                                            setCustId(data._id)
                                            toggleQrModal()
                                            
                                        }} 
                                        style={{color:'white',borderRadius:'5px',backgroundColor:'#313bac',width:'140px',
                                        height:'25px',margin:'10px'}} >
                                            Issue Qr Code
                                    </Button>
                                    </div>
                                    <div>
                                        <Button style={{color:'white',borderRadius:'5px',
                                        backgroundColor:'#8b1010',width:'140px',height:'25px',margin:'10px'}}
                                            onClick={()=>{
                                                deleteCustomer(data._id)    
                                            }}
                                        >
                                            Delete User
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            {
                                docModal && (
                                <div className='modal' >
                        
                                <div className='overlay' onClick={toggleDocModal} ></div>
                                <div className='modal-content' >
                                <Button onClick={toggleDocModal} style={{marginLeft:'425px',paddingLeft:'40px'}} ><MdClose style={{color:'#313bac',height:'1.2rem',width:'1.3rem'}}  /></Button>
                                <form onSubmit={handleDocSubmit} className='app__form' >
                                <h3 className='head-text' style={{fontSize:'1.5rem',marginRight:'10%'}} >Upload The <span>Required</span> Document</h3>
                                    <TextField style={{marginTop:'20px',width:'500px',marginLeft:'20px'}}  className='form__text' id="outlined-basic" 
                                    variant="outlined" type='file' onChange={(e) =>setFilename(e.target.files[0])} />
                                    <div>
                                    <TextField style={{marginTop:'20px',width:'240px',marginLeft:'20px'}}  className='form__text' id="outlined-basic" 
                                    variant="outlined" label='Name of Document' type='text' onChange={(e) =>setName(e.target.value)} />
                                    <TextField style={{marginTop:'20px',width:'240px',marginLeft:'20px'}}  className='form__text' id="outlined-basic" 
                                    variant="outlined" label='Tags' type='text' onChange={e=>handleDocTags(e.target.value)} />
                                    </div>
                                    
                                    <TextField style={{marginTop:'20px',width:'500px',marginLeft:'20px'}}  className='form__text' id="outlined-basic" 
                                    variant="outlined" type='text' label='Description' onChange={(e) =>setDescription(e.target.value)} />
                                    
                                    
                                    <Button className='btn p-text' variant="outlined" 
                                    style={{width:'100px',margin:'auto',marginTop:'20px',marginRight:'45%'}}  type='submit'
                                    
                                    >
                                        Submit   
                                    </Button>
                                 </form>
                                </div>
                                </div>
                                )
                            }
                            {
                                qrModal && (
                                <div className='modal' >
                        
                                <div className='overlay' onClick={toggleQrModal} ></div>
                                <div className='modal-content_qr' >
                                <Button onClick={toggleQrModal} style={{marginLeft:'425px',paddingLeft:'40px'}} ><MdClose style={{color:'#313bac',height:'1.2rem',width:'1.3rem'}}  /></Button>
                                <form onSubmit={handleQrSubmit} className='app__form_qr' >
                                <h3 className='head-text' style={{fontSize:'1.5rem'}} >Assign <span>We Safe QR Code</span> To Customer</h3>
                                    <div style={{display:'flex'}} >
                                    <TextField style={{marginTop:'20px',width:'200px',marginLeft:'10px'}}  className='form__text' id="outlined-basic" 
                                    variant="outlined" label='Enter Qr Id' type='text' onChange={(e) =>setQrId(e.target.value)} />
                                    <TextField style={{marginTop:'20px',width:'200px',marginLeft:'10px'}}  className='form__text' id="outlined-basic" 
                                    variant="outlined" type='text' label='Enter Qr Pin' onChange={(e) =>setQrPin(e.target.value)} />
                                    
                                    </div>
                                    
                                    
                                    <Button className='btn p-text' variant="outlined" 
                                    style={{width:'100px',margin:'auto',marginTop:'20px',marginRight:'40%'}}  type='submit'
                                    
                                    >
                                        Submit   
                                    </Button>
                                 </form>
                                </div>
                                </div>
                                )
                            }
                            {
                                groupModal && (
                                    <div className='modal' >

                                    <div className='overlay' onClick={toggleGroupModal} ></div>
                                    <div className='modal-content_qr' >
                                     <Button onClick={toggleGroupModal} style={{marginLeft:'425px',paddingLeft:'40px'}} ><MdClose style={{color:'#313bac',height:'1.2rem',width:'1.3rem'}}  /></Button>
                                    <form onSubmit={handleGroupSubmit} className='app__form_qr' >
                                    <h3 className='head-text' style={{fontSize:'1.5rem'}} >Add/Edit <span>Group</span> </h3>
                                    Group<select  className='select-long' onChange={e=>{
                                        setGroupName(e.target.value)
                                        setGroupId(e.target.children[e.target.selectedIndex].getAttribute('group-id'))
                                        setGroupSelect(true)
                                        }} label='groups' >
                                        <option value="" disabled selected >All</option>
                                        {
                                            allGroups.map((group) => {
                                                return(
                                                <option key={group._id} group-id={group._id} >{group.groupName}</option>
                                            )})
                                        }
                                    </select>

                                    <h3 style={{marginLeft:'45%',marginTop:'10px'}} >OR</h3>
                                    <h3 className='head-text' style={{fontSize:'1.4rem',marginTop:'10px'}} >Create A <span>New</span> Group </h3>
                                        <TextField style={{marginTop:'20px',width:'400px',marginLeft:'10px'}} onChange={e => setGroupName(e.target.value)}  className='form__text' id="outlined-basic" 
                                        variant="outlined" label='Enter Group Name' type='text'  />
                                        <TextField style={{marginTop:'20px',width:'400px',marginLeft:'10px'}} onChange={e=>setGroupDescription(e.target.value)} className='form__text' id="outlined-basic" 
                                        variant="outlined" type='text' label='Enter Group Description'  />
                                        <label style={{marginLeft:'10px',marginTop:'20px'}} ><h4>Start and End Date</h4></label>
                                        <div style={{marginBottom:'10px'}} >
                                            <input type='date' min="1997-01-01" max="2030-12-31" placeholder='from' style={{width:'40%'}} label='from' onChange={e=>setGstartDate(e.target.value)} className='date-time-ip' />
                                            <input type='date' min="1997-01-01" max="2030-12-31" placeholder='to' style={{width:'40%'}} label='to' onChange={e=>setGendDate(e.target.value)} className='date-time-ip' />
                                        </div>
                                        
                                        <Button className='btn p-text' variant="outlined" 
                                        style={{width:'100px',margin:'auto',marginTop:'20px',marginRight:'40%'}}  type='submit'
                                        
                                        >
                                            Submit   
                                        </Button>
                                    </form>
                                    </div> 
                                    </div>
                                    )
                            }
                        </>
                    )}
                    )
                
                    
                }
            </div>
        </div>
        <div>
            <nav  >
            <ReactPaginate 
                pageCount={pageCount} 
                previousLabel={'previous'} 
                nextLabel={'next'} 
                breakLabel={'...'} 
                onPageChange={handlePageChange} 
                containerClassName={'pagination'}
                marginPagesDisplayed={3}
                activeClassName={'active'}
                />
            </nav>
        </div>       
    </div>
  )
}

export default TableCard