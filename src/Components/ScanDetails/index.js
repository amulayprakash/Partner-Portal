import { Button } from '@mui/material'
import axios from 'axios'
import React,{useState} from 'react'
import { useEffect } from 'react'
import { MdFilterListAlt, MdLocationOn, MdClose, MdManageAccounts } from 'react-icons/md'
import safe from '../assets/safe.png' 
import './style.scss'


const ScanDetails = () => {
  const [search, setSearch] = useState('')
  const [newData, setNewData] = useState([])
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)
  const [registerDateStart, setRegisterDateStart] = useState('')
  const [registerDateEnd, setRegisterDateEnd] = useState('')
  const [filterDataDisplayed, setFilterDataDisplayed] = useState(false)
  const [searchValueDisplayed, setSearchValueDisplayed] = useState(false)
  useEffect(() => {
    const getData=async() =>{
      setLoading(true)
      axios.get("https://we-safe-partner-portal-backend1.onrender.com/admin/scan")
      .then(res => {
        setNewData(res.data.scanData)
        setLoading(false)
      })
    }
    getData()
  },[])

  const toggleModal=() => {
    setModal(!modal)
  }

  const handleFilterSubmit=async(e) => {
    e.preventDefault()
    console.log(registerDateStart,registerDateEnd)
    axios.post("https://we-safe-partner-portal-backend1.onrender.com/admin/scan/filter",{registerDateStart,registerDateEnd},{
      "headers":{
        "Content-Type":"application/json"
      }
    })
    .then(res => {
      setNewData(res.data.scanData)
      setFilterDataDisplayed(true)
      setLoading(false)
    })
    .catch(err => {
      console.log(err.message)
      setLoading(false)
    })
    
  }

  const openMap=async(myLat,myLng) => {
    window.open(`https://maps.google.com/maps?q=${myLat},${myLng}&hl=es;&output=embed`)
    //<iframe src={`https://maps.google.com/maps?q=${myLat},${myLng}&hl=es;&output=embed`} height='500px' width='100%' ></iframe>
  }

  const getData=async(lowerCaseValue) => {
    try {
        await axios.get(`https://we-safe-partner-portal-backend1.onrender.com/admin/scan/search?searchKey=${lowerCaseValue}`)
        .then(res=> {
            // setSearchValue(res.data?.filteredData)
            setNewData(res.data?.filteredData)
            setSearchValueDisplayed(true)
            setLoading(false)
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
    getData(lowerCaseValue)
  }

  console.log(newData)

  return (
    <div>
        <div className='app__table' >

        </div>
        <div>
            <h2 className='head-text' > Welcome <span> Administrator   </span> </h2>
        </div>
        <div className='app__header-btns' >
            <div style={{paddingBottom:'25px',display:'flex',marginTop:'10px'}}  >
                <Button style={{marginLeft:'230px',marginTop:'20px',width:'160px',border:'1px solid blue'}} onClick={toggleModal} >Filter <span><MdFilterListAlt style={{marginLeft:'5px'}} /> </span> </Button>
                <form  
                  onSubmit={(e) => {
                    setLoading(true)
                    handleSearchSubmit(e)
                  }} 
                  style={{marginLeft:'75px',verticalAlign:'middle'}} >
                    <input placeholder='search' onChange={(e) => {
                        setSearch(e.target.value)
                    }}  
                    style={{marginTop:'20px',verticalAlign:'bottom',width:'250px',height:'40px',verticalAlign:'middle'}} />
                    <Button type='submit' style={{marginLeft:'50px',marginTop:'20px',width:'160px',border:'1px solid blue',verticalAlign:'middle'}} >Search</Button>
                </form>
                <Button href='/admin' style={{marginLeft:'80px',marginTop:'20px',width:'160px',backgroundColor:'#0502b193',color:'white'}}>Customers <span><MdManageAccounts style={{marginLeft:'5px',verticalAlign:'middle',fontSize:'1.2rem'}} /> </span> </Button>
            </div>
        </div>
          {
              filterDataDisplayed?(
                  <a href="/scans" style={{marginLeft:'130px',marginTop:'20px'}} onClick={() => setFilterDataDisplayed(false)} > clear filter</a>
              ):(
                  <></>
              )
              }
              {
                  searchValueDisplayed?(
                      <a href="/scans" style={{marginLeft:'130px',marginTop:'20px'}} onClick={() => setSearchValueDisplayed(false)} > clear search results</a>
                  ):(
                      <></>
                  )
          }
        <div className='app__table_scan' style={{marginTop:'20px'}} >
        <div className="head row">
            <div className="column_scan" style={{width:'170px'}}>
                <div className="card_scan"  ><h3>Customer Name</h3></div>
            </div>
            <div className="column_scan" style={{width:'210px'}}>
                <div className="card_scan"  ><h3>Address</h3></div>
            </div>
            <div className="column_scan" style={{width:'180px'}}>
                <div className="card_scan"  ><h3 style={{marginLeft:'1px'}} >IP Address</h3></div>
            </div>
            <div className="column_scan" style={{width:'180px'}}>
                <div className="card_scan" ><h3>Lat-Lng</h3></div>
            </div>
            <div className="column_scan" style={{width:'200px'}}>
                <div className="card_scan"  ><h3>Date and Time</h3></div>
            </div>
            <div className="column_scan" style={{width:'150px'}}>
                <div className="card_scan"  ><h3>QR Code</h3></div>
            </div>
            <div className="column_scan" style={{width:'100px'}} >
                <div className="card_scan"><h3>Actions</h3></div>
            </div>
        </div>
        <div className='row' >
          {
            !loading?(
              newData?.map((data) => {
                return(
                  <>
                      <div key={data._id} className="column_scan" style={{width:'170px'}} >
                        <div className="card_content_scan"  >
                        <div className='content1'  >
                        
                        <div style={{display:'flex',alignItems:'left'}} >
                        <p style={{marginLeft:'5px',displau:'flex'}} ><b>{data?.customer[0]?.name}</b></p>
                        </div>
                        </div>
                        </div>
                      </div>

                      <div key={data._id} className="column_scan" style={{width:'210px'}} >
                        <div className="card_content_scan"  >
                        <div className='content1'  >
                        {
                          data?.address!==null?(
                            <div style={{display:'flex',alignItems:'left'}} >
                              <p style={{marginLeft:'5px',displau:'flex'}} >{data?.address}</p>
                            </div>
                          ):(
                            <div style={{display:'flex',justifyContent:'center'}} >
                              <p  >N/A</p>
                            </div>
                          )
                        }
                        </div>  
                        </div>
                      </div>

                      <div key={data._id} className="column_scan" style={{width:'180px'}} >
                        <div className="card_content_scan"  >
                        <div className='content1'  >
                        {
                          data?.ip_address!==null?(
                            <div style={{display:'flex',justifyContent:'center'}} >
                              <p style={{marginLeft:'5px',}} >{data?.ip_address}</p>
                            </div>
                          ):(
                            <div style={{display:'flex',justifyContent:'center'}} >
                              <p  >N/A</p>
                            </div>
                          )
                        }
                        </div>
                        </div>
                      </div>

                      <div key={data._id} className="column_scan" style={{width:'180px'}} >
                        <div className="card_content_scan"  >
                        <div className='content1'  >
                        {
                          (data?.latitude!==null && data?.longitude!==null)?(
                            <div style={{display:'flex',alignItems:'left'}} >
                              <p style={{marginLeft:'5px',displau:'flex'}} >{data?.latitude?.substring(0,7)}N<span> - </span>{data?.longitude?.substring(0,7)}E</p>
                            </div>
                          ):(
                            <div style={{display:'flex',justifyContent:'center'}} >
                              <p  >N/A</p>
                            </div>
                          )
                        }
                        </div>
                        </div>
                      </div>

                      <div key={data._id} className="column_scan" style={{width:'200px'}} >
                        <div className="card_content_scan"  >
                        <div className='content1'  >
                        {
                          (data?.datetime!==null)?(
                            <div style={{display:'flex',justifyContent:'left'}} >
                              {/* <p style={{marginLeft:'5px',displau:'flex'}} >{data?.datetime?.toString().substring(0,10)}<span> - </span>{data?.datetime?.toString().substring(11,16)} <span> GMT</span> </p> */}
                              <p style={{marginLeft:'5px',display:'flex'}} >{new Date(`${data?.datetime}`).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})} </p> 
                            </div>
                          ):(
                            <div style={{display:'flex',justifyContent:'center'}} >
                              <p  >N/A</p>
                            </div>
                          )
                        }
                        </div>
                        </div>
                      </div>

                      <div key={data._id} className="column_scan" style={{width:'150px'}} >
                        <div className="card_content_scan"  >
                        <div className='content1'  >
                        {
                          (data?.qrcode)?(
                            <div style={{display:'flex',justifyContent:'center'}} >
                              {/* <p style={{marginLeft:'5px',displau:'flex'}} >{data?.datetime?.toString().substring(0,10)}<span> - </span>{data?.datetime?.toString().substring(11,16)} <span> GMT</span> </p> */}
                              <p style={{marginLeft:'5px',display:'flex',justifyContent:'center'}} >{data.qrcode}</p>
                            </div>
                          ):(
                            <div style={{display:'flex',justifyContent:'center'}} >
                              <p  >N/A</p>
                            </div>
                          )
                        }
                        </div>
                        </div>
                      </div>

                      <div key={data._id} className="column_admin" style={{width:'100px'}} >
                        <div className="card_content_scan" >
                            <div className='content1' style={{display:'flex',justifyContent:'center'}}  >
                                
                              <MdLocationOn style={{color:'red',fontSize:'1.3rem'}} onClick={() => openMap(data?.latitude,data?.longitude)} />    
                            </div>
                        </div>
                      </div>
                  </>
                )
              })
            ):(
              <>
                <div style={{marginTop:'30px',marginLeft:'45%'}} class="loader"></div>
              </>
            )
          }
           {
                        modal && (
                            <div className='modal' >
                                
                                <div className='overlay' onClick={toggleModal} ></div>
                                <div className='modal-content' >
                                <form onSubmit={(e) =>{ 
                                    handleFilterSubmit(e)
                                    setLoading(true)
                                }} 
                                className='modal-content_filter ' 
                                >
                                <MdClose onClick={toggleModal}  style={{color:'#313bac',height:'1.2rem',width:'1.3rem',marginLeft:'300px'}}  />
                                    <h2 style={{marginLeft:'30%'}} > Apply Filter </h2>
                                    <label style={{marginLeft:'20px',marginTop:'20px'}} >Scan Date</label>
                                    <div style={{marginBottom:'10px'}} >
                                        <input type='date' placeholder='from' style={{width:'40%'}} label='from' 
                                        className='date-time-ip' onChange={e=>setRegisterDateStart(e.target.value)} />
                                        <input type='date' placeholder='to' style={{width:'40%'}} label='to' 
                                        className='date-time-ip' onChange={e=>setRegisterDateEnd(e.target.value)} />
                                    </div>
                                    <Button  
                                    className='close-modal' type='submit' style={{marginLeft:'30%',backgroundColor:'#313bac',color:'white',width:'150px',marginBottom:'10px',marginTop:'20px'}}  >Apply</Button>
                                    </form>
                                </div>
                            </div>
                        )
                    }
        </div>
    </div>
     {/* <div>
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
      </div> */}
    
  </div>
  )
}

export default ScanDetails