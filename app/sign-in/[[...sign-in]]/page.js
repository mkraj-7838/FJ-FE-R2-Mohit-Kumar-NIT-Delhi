import { SignIn, SignedOut } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
    <>
    <div>
        <SignedOut>
        <Image 
          src="/authpage.png" 
          width={900} 
          height={800} 
          alt="Authpage"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        {/* Sign-in Section */}
        <div className="relative flex flex-col items-center justify-center z-10  p-10 rounded-lg text-center">
          {/* Welcome Text */}
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Welcome to Rideshare
          </h1>
          {/* Sign-in Form */}
          <SignIn />
        </div>
        </SignedOut>
        
    </div>
        
    </>
    
  )
}