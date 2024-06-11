import { Link } from 'react-router-dom'
import { Skeleton } from '../components/admin/loader'

const Home = () => {
  return (
    <div className='home'>
      <section></section>
      <h1>
        Latest Products
        <Link to='/search' className='findmore'>
            More
        </Link>
      </h1>
      <main>
      <Skeleton width="80vw" />
        Product lists
      </main>
    </div>
  )
}

export default Home
