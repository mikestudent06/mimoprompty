'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'

const Nav = () => {
  const {data:session} = useSession();
  const [providers, setproviders] = useState(null)
  const [toggleDropDown, settoggleDropDown] = useState(false)

  useEffect(() =>  {
    const setProvidersAsync = async () => {
      const response = await getProviders();
      setproviders(response);
    }
    setProvidersAsync()

  }, [])
  
  console.log('providers', providers)
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
        <Link href={"/"} className='flex gap-2 flex-center'>
            <Image src="/assets/images/logo3.jpg" width={100} height={100} className='object-contain' alt='ai-logo'/> 
            <p className='logo_text'>mimoprompty</p>
        </Link>
        {/* desktop navigation */}
        <div className='sm:flex hidden'>
          {session?.user ? <div className='flex gap-3 md:gap-5'>
            <Link href="/create-prompt" className='black_btn'>
              Create Post
            </Link>
            <button type="button" onClick={signOut} className='outline_btn'> Sign Out</button>
            <Link href="/profile" className=''> 
              <Image src={session?.user.image} width={40} height={40} alt='profile' className='rounded-full'/>
            </Link>
          </div> : <>{providers && Object.values(providers).map((provider) => <button type='button' key={provider.name} onClick={()=> signIn(provider.id)} className='black_btn'>Sign In</button>)}</>}
        </div>

        {/* mobile navigation */  }
        <div className='sm:hidden flex relative'>{session?.user ? 
          <div className='flex'>
            <Image src={session?.user.image} width={40} height={40} alt='profile' className='rounded-full' onClick={() => {settoggleDropDown((prev) => !prev)}}/>
            {toggleDropDown && 
            <div className='dropdown'>
              <Link href={"/profile"} className='dropdown_link' onClick={()=>settoggleDropDown(false)}>My Profile</Link>
              <Link href={"/create-prompt"} className='dropdown_link' onClick={()=>settoggleDropDown(false)}>Create Prompt</Link>
              <button type="button" onClick={()=> {
                settoggleDropDown(false)
                signOut()
              }} className='mt-5 w-full black_btn'>Sign Out</button>
            </div>}
          </div> : <>{providers && Object.values(providers).map((provider) => <button type='button' key={provider.name} onClick={()=> signIn(provider.id)} className='black_btn'>Sign In</button>)}</>}
        </div>
    </nav> 
 )
}

export default Nav