import Button from "../shared/Button";
import heroimg from '../../assets/hero/heroimg.png'
import heromain from '../../assets/hero/heromain.jpg'
import dots from '../../assets/common/dots.png'
import commas from '../../assets/common/commas.png'
import rectangle from '../../assets/common/rectangle.png'

const Hero = () => {
  return (
    <div className="text-4xl md:py-24 py-16  ">
      {/* hero content */}
      <div className="flex items-center md:flex-row flex-col-reverse gap-5 max-w-7xl mx-auto  p-4">
        {/* content  */}
        <div className="md:w-1/2 flex flex-col gap-4 justify-center">
          <div>
            <h2 className="font-semibold text-white">
              Ashish Chanchal is a{" "}
              <span className="text-secondary">Software Developer</span> and{" "}
              <span className="text-secondary">Community Manager</span>
            </h2>
          </div>
          <div>
            <p className="text-sm text-white">
            I am a passionate Software Engineer with a strong focus on Frontend Development, Full-stack Development, Machine Learning, and Open Source. I love engaging with the community and have had the privilege to work on diverse projects and internships in the tech industry.
            </p>
          </div>
          <div>
            <Button text="Contact me !!" />
          </div>
        </div>
        <div className="md:w-1/2 relative">
          {/* hero image */}
          <div >
            <img src={heroimg} alt="heroimg" className="md:w-[150px] bg-transparent  absolute left-0"/>
            <div className=" w-3/4">
            <img src={heromain} alt="heroimg" className="z-10 relative bg-transparent  "/>
            <div className="md:text-sm text-xs flex items-center ml-2 gap-5 p-2 border border-white ">
                <div className="w-3 h-3 bg-secondary "></div>
                <h2 className="text-white">Currently  working on Portfolio</h2>
            </div>
            <img src={dots} alt="" className="absolute  right-0 md:right-20 z-20 top-20 bg-transparent"/>
            </div>
           
          </div>
          <div>

          </div>
          <div>

          </div>
        </div>
      </div>


      <div className="relative ">
      
     <div className="w-fit mx-auto p-4">
     <fieldset className="border border-white w-fit mt-20 mx-auto">
      <legend className="ml-2"><img src={commas} alt="" className="w-3 h-3 "/></legend>
        <h2 className="md:text-xl text-lg text-white text-center  p-3 w-fit ">
        With great power comes great electricity bill
       
        </h2>
        
      </fieldset>
      <fieldset className="border border-white w-fit ml-auto">
      <legend className="ml-2"><img src={commas} alt="" className="w-3 h-3 "/></legend>
        <h2 className="md:text-xl text-lg text-white text-center  p-3 w-fit ">
        -Dr. who
       
        </h2>
        
      </fieldset>
     </div>
     <img src={rectangle} alt="rectangle"  className=" absolute right-0 md:block hidden top-10 "/>
      </div>
    </div>
  )
}

export default Hero
