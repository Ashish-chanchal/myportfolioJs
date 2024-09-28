import linep from '../../assets/common/linep.png'

import Button from '../shared/Button'

interface HeadingProps {
    text: string;
    btnText?: string;
    
}
const Heading = ({text,btnText}:HeadingProps) => {
  return (
    <div className='flex  flex-col gap-10 md:flex-row justify-between md:items-center'>
            <div className='flex items-center gap-4'>
                <h2 className="text-2xl text-white font-semibold"><span className="text-secondary">#</span>{text}</h2>
                <div className=""> <img src={linep} alt="" /></div>
            </div>
            <div className='w-fit'>
            {btnText&&<Button text={btnText} />}
            </div>
        </div>
  )
}

export default Heading
