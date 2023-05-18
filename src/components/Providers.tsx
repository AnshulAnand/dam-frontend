'use client'

import ProgressBar from 'next-nprogress-bar'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height='4px'
        color='#fffd00'
        options={{ showSpinner: false }}
        shallowRouting
        appDirectory
      />
    </>
  )
}

export default Providers
