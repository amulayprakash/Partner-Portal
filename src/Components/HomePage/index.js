import React,{useState,useEffect} from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from 'axios';
import { Box, Button, Input } from '@mui/material';
// import { makeStyles } from "@material-ui/core/styles";
import './style.scss'
import { fontWeight } from '@mui/system';
import Typography from '@mui/material';
import {MdFilterListAlt,MdSort,MdAdd,MdOutlineAssignmentInd,MdUploadFile,MdClose} from 'react-icons/md'
import TableCard from '../CardTable';
import { Link } from 'react-router-dom';
// import Pagination from '../PaginationComponent'

const HomePage = () => {

    const [datas, setData] = useState([]) 
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState(false)
    const [loading, setLoading] = useState(false)
    const [modal,setModal]=useState(false)
    const [allGroups,setAllgroups]=useState([])
    

    const [filteredData, setFilteredData] = useState(datas)
    const [groupSelect,setGroupSelect]=useState('All')
    const [groupAssigned,setgroupAssigned]=useState('Both')
    const [qrAssigned,setqrAssigned]=useState('Both')
    const [docsAssigned,setdocsAssigned]=useState('Both')
    const [qrScanData,setqrScanData]=useState('Both')

    
    const toggleModal=() => {
        setModal(!modal)
    }

    
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

    useEffect(() => {
        setFilteredData(
            datas?.filter((data) => {
                let required=false
                data?.customerGroups?.filter((group) => {
                    if(!group || (group.groupName===groupSelect))
                        required=true
                })
                if(required)
                    return data
                else 
                    return
            })
        )
    },[groupSelect,groupAssigned])
   

    const sortChange=() =>{
        setSort(!sort)
    }
   

  return (
    <div>
        <div className='app__table' >

        </div>
        <div>
            <h2 className='head-text' > WeSafe <span> Partner Portal</span> </h2>
        </div>
        <div className='app__header-btns' >
            <div style={{paddingBottom:'25px'}}  >
                <Button style={{marginLeft:'100px',width:'160px',border:'1px solid blue' ,marginTop:'20px'}} onClick={sortChange} >Sort <span><MdSort style={{marginLeft:'5px'}} /> </span></Button>
                <Button style={{marginLeft:'25px',marginTop:'20px',width:'160px',border:'1px solid blue'}} onClick={toggleModal} >Filter <span><MdFilterListAlt style={{marginLeft:'5px'}} /> </span> </Button>
                <Button style={{marginLeft:'25px',marginTop:'20px',width:'160px',border:'1px solid blue'}} >Assign Group <span><MdOutlineAssignmentInd style={{verticalAlign:'middle',marginLeft:'5px'}}/></span> </Button>
                <Button style={{marginLeft:'25px',marginTop:'20px',width:'160px',border:'1px solid blue'}} >Add Documents <span><MdUploadFile style={{marginLeft:'5px'}} /> </span> </Button>
                <Link style={{textDecoration:'none'}} to="/addcustomer" ><Button style={{marginLeft:'25px',marginTop:'20px',width:'160px',border:'1px solid blue'}} > Add Customer <span><MdAdd style={{marginLeft:'5px'}} /> </span></Button></Link>
                <input placeholder='search' onChange={(e) => setSearch(e.target.value)} style={{marginTop:'30px',verticalAlign:'bottom',width:'250px',height:'40px',marginLeft:'25px'}} />

            </div>
        </div>
        <div >
            <label style={{marginTop:'2%',verticalAlign:'middle',
            paddingLeft:'75px'}}><input type='checkbox' style={{position:'relative',verticalAlign:'bottom'}} placeholder='Select All' />Select All</label>
            <TableCard searched={search} sort={sort}  />
            {/* <Pagination style={{marginTop:'25px'}} postsPerPage={postsPerPage} paginate={paginate} totalPosts={datas.length} /> */}
            {
                modal && (
                        <div className='modal' >
                        
                        <div className='overlay' onClick={toggleModal} ></div>
                        <div className='modal-content' >
                        <Button onClick={toggleModal} style={{marginLeft:'250px',paddingLeft:'40px'}} ><MdClose style={{color:'#313bac',height:'1.2rem',width:'1.3rem'}}  /></Button>
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
                                <option value="" disabled selected >Both</option>
                                <option key='yes' >Yes</option>
                                <option key='no' >No</option>
                            </select>
                            <label style={{marginLeft:'10px'}} >Qr Code Assigned</label><select className='select-long' label='qr assigned'>
                                <option>Both</option>
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                            <label style={{marginLeft:'10px'}} >Docs Assigned</label> <select className='select-long' label='docs assigned'>
                                <option>Both</option>
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                            <label style={{marginLeft:'10px'}} >Qr Scan Data</label><select className='select-long' label='qr scan data'>
                                <option>Both</option>
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                            <label style={{marginLeft:'10px'}} >Registration Date</label>
                            <div style={{marginBottom:'10px'}} >
                                <input type='date' placeholder='from' style={{width:'40%'}} label='from' className='date-time-ip' />
                                <input type='date' placeholder='to' style={{width:'40%'}} label='to' className='date-time-ip' />
                            </div>
                            
                            <Button className='close-modal' style={{marginLeft:'30%',backgroundColor:'#313bac',color:'white',width:'150px'}}  >Apply</Button>
                        </div>
                </div>
                )
            }
           
        </div>
        
       
    </div>
  )
}

export default HomePage