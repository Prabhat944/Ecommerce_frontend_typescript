import React from 'react'

const Loader = () => {
  return (
    <section 
    >
        <div>Loading...</div>
    </section>
  )
}

export default Loader

interface SkeltonProps {
    width?:string;
    length?:number;
};

export const Skeleton = ({width="unset",length = 3}:SkeltonProps) => {
   const skeletons = Array.from({length},(_,idx)=>(
    <div key={idx} className='skelton-shape'></div>
   ))
    return (
        <div className='skeleton-loader' style={{width}}>
            {skeletons}
        </div>
    )
};
