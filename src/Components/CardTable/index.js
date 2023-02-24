import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './style.css'
import { Button } from '@mui/material'

const TableCard = () => {

  const [datas, setData] = useState([])
  const [cusGroup, setCusGroup] = useState([])

  useEffect(() => {
    const getData=async() => {
        try {
            await axios.get("https://we-safe-partner-portal-backend.onrender.com/customers").then(res=> {
                setData(res.data.customers)
            }).catch(err => {
                console.log(err.message)
            }) 
        } catch (error) {
            console.log(error.message)
        }
    }
    getData()
    // const getGroupData=async() => {
    //     datas.forEach((data) => {
    //         const customerGroups=async() => {
    //             try {
    //                 await axios.get(`http://localhost:1902/customers/${data._id}/groups`).then(res=> {
    //                     const obj={id:data._id,groups:res.data.customerGroups}
    //                     console.log(obj)
    //                     //groupInfo.push(obj)
    //                 }).catch(err => {
    //                     console.log(err.message)
    //                 }) 
    //             } catch (error) {
    //                 console.log(error.message)
    //             }
    //         }
    //        customerGroups()
    //     })
    // }
    //console.log(groupInfo)
    // getGroupData()
    
   },[])
    console.log(datas)
    // console.log(cusGroup)
    useEffect(() => {
        datas.forEach((data) => {
            const customerGroups=async() => {
                try {
                    await axios.get(`http://localhost:1902/customers/${data._id}/groups`).then(res=> {
                        //data.groups=res.data.customerGroups.groups
                        data.groups=(res.data.customerGroups)
                    }).catch(err => {
                        console.log(err.message)
                    }) 
                } catch (error) {
                    console.log(error.message)
                }
            }
           customerGroups()
        })
    }, [datas])
// console.log(cusGroup)
console.log(datas[7]?.groups)
    
   return (
    <div>
        <div className='app__table' >
            <div className="row">
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
                    datas.map((data,i) =>{
                        //     const customerGroups=async(id) => {
                        //         try {
                        //             await axios.get(`http://localhost:1902/customers/${id}/groups`).then(res => {
                        //                 console.log(res.data)
                        //                 cusGroup(res.data.customerGroups)
                        //             }).catch(err => {
                        //                 console.log(err.message)
                        //             })
                        //         } catch (error) {
                        //             console.log(error.message)
                        //         }
                        //     }
                        //     customerGroups(data._id)
                        // console.log(cusGroup)
                        return(
                        <>
                            <div className="column">
                                <div className="card_content">
                                    <div>
                                        <h3>{data.name}<span> - {data.gender} </span></h3>
                                    </div>
                                    <div>
                                        <p>{data.address}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                {
                                    (data.groups?.length>0)?(
                                        data.groups.map((group) => (
                                            <div className="card_content">
                                                <div>{group.groupName}</div>
                                                <div>{group.groupDescription} </div>
                                            </div>
                                        ))
                                    ):(
                                        <div className="card_content">
                                            <div><h4> No Groups Assigned </h4> </div>
                                        </div>
                                    )
                                }
                                
                            </div>
                            <div className="column">
                                <div className="card_content">
                                    <div>doc1</div>
                                    <div>doc2</div>
                                    <div>doc3</div>
                                    <div>doc4</div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="card_content">
                                    <div>qr1</div>
                                    <div>qr2</div>
                                    <div>qr3</div>
                                    <div>qr4</div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="card_content">
                                    <div>
                                        <Button style={{color:'white',backgroundColor:'#313bac',width:'140px',height:'25px',margin:'10px'}} >Add Document</Button>
                                    </div>
                                    <div>
                                        <Button style={{color:'white',backgroundColor:'#313bac',width:'140px',height:'25px',margin:'10px'}} >Add/Edit Group</Button>
                                    </div><div>
                                        <Button style={{color:'white',backgroundColor:'#313bac',width:'140px',height:'25px',margin:'10px'}} >Issue Qr Code</Button>
                                    </div><div>
                                        <Button style={{color:'white',backgroundColor:'#8b1010',width:'140px',height:'25px',margin:'10px'}}>Delete User</Button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    )
                }
            </div>
        </div>
        
    </div>
  )
}

export default TableCard