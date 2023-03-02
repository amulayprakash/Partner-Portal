import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './style.scss'
import { useNavigate } from 'react-router-dom'
import { Button, Pagination, Typography } from '@mui/material'
import {MdDeleteForever,MdClose} from 'react-icons/md'
import {Link} from 'react-router-dom' 
import PaginationComponents from '../PaginationComponent'
import { TextField } from '@mui/material'
//replace groups by cusgroups

const TableCard = ({searched,sort}) => {
    const [datas, setData] = useState([]) 
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(20)
    
    const [docModal, setDocModal] = useState(false)
    const [qrModal, setQrModal] = useState(false)
    const [docId,setDocId]=useState('')
    const [name, setName] = useState('')
    const [description,setDescription]=useState('')
    const [filename,setFilename]=useState(' ')

    const [qrId, setQrId] = useState('')
    const [qrPin, setQrPin] = useState('')
    
    const [custId,setCustId]=useState('')

    const navigate=useNavigate()

    useEffect(() => {
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
    },[])

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
        //sort===true?(setData(datas.sort((a,b) => a.name.localeCompare(b.name)))):(setData(datas))
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

    const handleDocDeleteClick=async(id) => {
        axios.delete(`https://we-safe-partner-portal-backend1.onrender.com/doc/${id}`).then(res=> {
            console.log(res)
        }).catch(err => {
            console.log(err.message)
        })
        navigate("/")
    }

    const handleDocSubmit=async(e) => {
        e.preventDefault()
        //console.log(name,filename,description,custId)
        axios.post("https://we-safe-partner-portal-backend1.onrender.com/upload",{name,filename,description,customerId:custId},{
            headers:{
                "Content-Type":"multipart/form-data",
            }
        })
            .then(res => {
                console.log(res)
                toggleDocModal()
                setCustId('')
                window.location.reload()
            }).catch((err) => {
                console.log(err.message)
            })
            navigate("/")
        
    }

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
        // console.log(customerId)
        navigate("/")
        //console.log(qrId,qrPin,custId)
    }

    const handleQrDeleteClick=async(id) => {
        axios.delete(`https://we-safe-partner-portal-backend1.onrender.com/qr/${id}`).then(res=> {
            console.log(res)
        }).catch(err => {
            console.log(err.message)
        })
        navigate("/")
    }

    //Get Current Datas
    const lastPostIndex=currentPage*postsPerPage
    const firstPostIndex=lastPostIndex-postsPerPage
    const currentPosts=datas.slice(firstPostIndex,lastPostIndex)
    //console.log(currentPosts)
    // }))

    const toggleDocModal=() => {
        setDocModal(!docModal)
    }
    
    const toggleQrModal=() => {
        setQrModal(!qrModal)
    }
    

    const paginate=(pageNumber) => {
        setCurrentPage(pageNumber)
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
                
                currentPosts.map((data,index) =>{
                        return(
                        <>
                            <div className="column">
                                <div className="card_content"  >
                                    <div className='content1'  >
                                    
                                    <div style={{display:'flex',alignItems:'left'}} >
                                    <input type='checkbox'/> 
                                    <p style={{marginLeft:'5px',displau:'flex'}} ><b>{data.name}- {(data.gender===1||data.gender==='male')?(<>M</>):(<>F</>)}</b> <span></span></p>
                        
                                    </div>
                                    <div style={{display:'flex',alignItems:'left',marginTop:'0%'}} >
                                        <p  style={{alignItems:'left',marginTop:'25px'}}>  <span>{data.address}</span></p>
                                    </div>
                                    {/* <div style={{display:'flex',alignItems:'left'}} >
                                        <p> <b>Gender:</b> <span>{data.gender}</span></p>
                                    </div> */}
                            
                                    {
                                        data.dob!=null?(
                                        <div style={{display:'flex',alignItems:'left',marginTop:'5px'}}  >
                                            <p> DOB: <span>{JSON.stringify(data.dob).substring(1,11)}</span></p>
                                        </div>
                                        ):(
                                            <div style={{display:'flex',alignItems:'left',marginTop:'5px'}}  ><p> DOB: <span> N/A</span></p></div>
                                        )
                                    }
                                    {/* <div>
                                        <p> <b>DOB:</b> <span>{JSON.stringify(data.dob).substring(1,11)}</span></p>
                                    </div> */}
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
                                                <div style={{marginTop:'2px'}}>
                                                    <div>{group.groupName}</div>
                                                </div>
                                            ))
                                        ):(
                                            <div style={{color:'red',marginTop:'8%'}} >No Group Assigned Yet</div> 
                                        )
                                    }
                                    </div>
                                    {/* {
                                       (group1[index]?.length>0)?(
                                        group1[index]?.map((group) => (
                                            <div style={{marginTop:'15px'}}>{group.groupName}</div>
                                        ))):(
                                            <div style={{marginTop:'60px',color:'red'}} >No Group Assigned Yet</div>   
                                        )
                                        
                                    } */}
                                    
                                    
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
                                                <div style={{marginTop:'2px'}} key={doc._id} >
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
                                                <div>
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
                                        <Button style={{color:'white',borderRadius:'5px',backgroundColor:'#313bac',width:'140px',height:'25px',margin:'10px'}} >Add/Edit Group</Button>
                                    </div><div>
                                    <Button 
                                        onClick={() => {
                                            setCustId(data._id)
                                            toggleQrModal()
                                            
                                        }} 
                                        style={{color:'white',borderRadius:'5px',backgroundColor:'#313bac',width:'140px',
                                        height:'25px',margin:'10px'}} >
                                            Issue Qr Code
                                    </Button>
                                    </div><div>
                                        <Button style={{color:'white',borderRadius:'5px',backgroundColor:'#8b1010',width:'140px',height:'25px',margin:'10px'}}>Delete User</Button>
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
                                    variant="outlined" label='Name of Document' type='text' onChange={(e) =>setName(e.target.value)} />
                                    <TextField style={{marginTop:'20px',width:'500px',marginLeft:'20px'}}  className='form__text' id="outlined-basic" 
                                    variant="outlined" type='text' label='Description' onChange={(e) =>setDescription(e.target.value)} />
                                    
                                    <TextField style={{marginTop:'20px',width:'500px',marginLeft:'20px'}}  className='form__text' id="outlined-basic" 
                                    variant="outlined" type='file' onChange={(e) =>setFilename(e.target.files[0])} />
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
                                    
                                    <TextField style={{marginTop:'20px',width:'500px',marginLeft:'10px'}}  className='form__text' id="outlined-basic" 
                                    variant="outlined" label='Enter Qr Id' type='text' onChange={(e) =>setQrId(e.target.value)} />
                                    <TextField style={{marginTop:'20px',width:'500px',marginLeft:'10px'}}  className='form__text' id="outlined-basic" 
                                    variant="outlined" type='text' label='Enter Qr Pin' onChange={(e) =>setQrPin(e.target.value)} />
                                    
                                    
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
        <PaginationComponents style={{marginTop:'25px'}} postsPerPage={postsPerPage} paginate={paginate} totalPosts={datas.length} />
    </div>
  )
}

export default TableCard