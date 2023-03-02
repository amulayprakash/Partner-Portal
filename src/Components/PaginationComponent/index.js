import React from 'react'
import './style.css'

const PaginationComponents = ({postsPerPage,totalPosts,paginate}) => {

 const pageNumbers=[]
 for(let i=1;i<=Math.ceil(totalPosts/postsPerPage);i++){
    pageNumbers.push(i)
 }

  return (
    <div>
        <nav style={{marginTop:'20px'}} >
            <ul className='pagination' >
                {
                    pageNumbers.map((number) => (
                        <li  key={number} className='page-item' > 
                            <a onClick={() => paginate(number)} href='/#'>{number}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    </div>
  )
}

export default PaginationComponents