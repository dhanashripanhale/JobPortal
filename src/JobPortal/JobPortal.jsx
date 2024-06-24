
import Header from './Header';
import ImageCarousel from './ImageCarousel';
import JobBody from './JobBody';


const JobPortal = () => {

  return (
    <>
    <div>
      <Header />
      </div>
      <div>
      <ImageCarousel />
      </div>
      <div style={{ marginTop:"40px" }}>
      <JobBody />
      </div>
    </>

  )
}

export default JobPortal;
