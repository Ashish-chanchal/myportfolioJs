import Button from "../../components/shared/Button";
import heroimg from '../../assets/hero/heroimg.png'
import heromain from '../../assets/hero/heromain.png'
function HomePage() {
  return (
    <div className="text-4xl md:py-24 py-16 max-w-7xl mx-auto p-4">
      {/* hero content */}
      <div className="flex items-center md:flex-row flex-col-reverse gap-5">
        {/* content  */}
        <div className="md:w-1/2 flex flex-col gap-4 justify-center">
          <div>
            <h2 className="font-semibold text-white">
              Ashish Chanchal is a{" "}
              <span className="text-secondary">web designer</span> and{" "}
              <span className="text-secondary">front-end developer</span>
            </h2>
          </div>
          <div>
            <p className="text-xs text-white">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas
              veniam amet voluptate dolorum earum tempore quis, esse consequatur
              facilis ex sint eos, reiciendis numquam perspiciatis vitae quod?
              At, sit? Mollitia.
            </p>
          </div>
          <div>
            <Button text="Contact me !!" />
          </div>
        </div>
        <div className="md:w-1/2 relative">
          {/* hero image */}
          <div >
            <img src={heroimg} alt="heroimg" className="md:w-[150px]  absolute left-0"/>
            <img src={heromain} alt="heroimg" className="  "/>
          </div>
          <div>

          </div>
          <div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
