"use client"

import {motion , AnimatePresence} from 'framer-motion'

interface Ichildren {
    children : React.ReactNode ,
    initial : any ,
    animate : any ,
    transition : any ,
    exit : any
}

const AnimationWrapper = ({children , initial , animate , transition, exit}:Ichildren) => {
  return (
    <AnimatePresence>
        <motion.div initial={initial} animate={animate} transition={transition} exit={exit}>
            {children}
        </motion.div>
    </AnimatePresence>
  )
}

export default AnimationWrapper