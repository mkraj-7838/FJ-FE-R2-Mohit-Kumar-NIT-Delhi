import { SignIn, SignedOut } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
    <>
    <div>
        <SignedOut>
            <Image src="/authpage.png" width={900} height={800} alt="Authpage"
            className='object-contain h-full w-full'/>
            <div className=' absolute top-20 right-1/3'>
                <SignIn />
            </div>
        </SignedOut>
        
    </div>
        
    </>
    
  )
}