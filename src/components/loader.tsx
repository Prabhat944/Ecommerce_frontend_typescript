
const Loader = () => {
  return (
    <section className='loader'>
        <div></div>
        <span>Loading...</span>
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
    <div key={idx} className='skeleton-shape'></div>
   ))
    return (
        <div className='skeleton-loader' style={{width}}>
            {skeletons}
        </div>
    )
};
