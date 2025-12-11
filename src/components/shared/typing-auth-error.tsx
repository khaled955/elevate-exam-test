import React from 'react'

export default function TypingAuthError({errorMsg}:{errorMsg:string | undefined}) {
  return (
    <div>
      <p className='text-red-500 text-[.75rem] font-semibold capitalize'>{errorMsg}</p>
    </div>
  )
}
