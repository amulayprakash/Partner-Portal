import React,{useState,useEffect} from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from 'axios';
import { Box } from '@mui/material';
// import { makeStyles } from "@material-ui/core/styles";
import './style.scss'
import { fontWeight } from '@mui/system';
import Typography from '@mui/material';
import TableCard from '../CardTable';

const HomePage = () => {

    const [datas, setData] = useState([]) 
    const columns = [
        
        { field: 'Name', headerName: 'Name',
         width: 130,align:'center',cellClassName: 'super-app-theme--cell' },
        
        {
          field: 'DOB',
          headerName: 'DOB',
          width: 100,
          align:'center',
          cellClassName: 'super-app-theme--cell'
        },
        {field:'Gender',headername:'Gender',width:90,align:'center',cellClassName: 'super-app-theme--cell' },
        {field:'BloodGroup',headername:'BloodGroup',width:100,align:'center',cellClassName: 'super-app-theme--cell' },
        {field:'UserUid',headername:'UserUid',width:130,align:'center',cellClassName: 'super-app-theme--cell' },
        {field:'ChildListUid',headername:'ChildListUid',width:130,align:'center',cellClassName: 'super-app-theme--cell'},

      ];
      
      const rows = []

    datas.forEach((data) => {
        var newDOB=data.dob?(JSON.stringify(data.dob).substring(1,11)):('Not Found')
        var bg=data.bloodGroup?(data.bloodGroup):('Not Found')
        var userUid=data.userUid?(data.userUid):('Not Found')
        var bg=data.bloodGroup?(data.bloodGroup):('Not Found')
        var childListUid=data.childListUid?(data.childListUid):('Not Found')
        rows.push({
            id:data._id,
            Name:data.name,
            DOB:newDOB,
            Gender:data.gender,
            BloodGroup:bg,
            UserUid:userUid,
            ChildListUid:childListUid
        })
        
    })
    
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
    },[])
  return (
    <div>
        <div className='app__table' >

        </div>
        <h2 className='head-text' > We Safe <span> Partner Portal</span> </h2>
        {/* <div className='app__head' >
             <h2 className='head-text' > We Safe <span> Partner Portal</span> </h2>
        </div>
        <div className='app__table'  >
        <div style={{  width: '100%',alignItems:'center'}}>
            <Box
                sx={{height:400,width:'100%',
                    '& .super-app-theme--cell': {
                        height:80
                    }}}
            >
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                sx={{
                    boxShadow: 2,
                    border: 2,
                    borderColor: 'primary.light',
                    '& .MuiDataGrid-cell:hover': {
                      color: '#313bac',
                    },
                    '& .MuiDataGrid-cell': {
                        color: 'black',
                        
                    },
                    '& .MuiDataGrid-row':{
                        height:'150px',
                        marginY:'10px',
                    },
                    '& .MuiDataGrid-columnHeader':{
                        justifyContent:'center',
                        alignItems:'center',
                        marginX:'auto'
                    }
                  }}
            />
            </Box>
            </div>
            
        </div> */}
        <TableCard />
    </div>
  )
}

export default HomePage