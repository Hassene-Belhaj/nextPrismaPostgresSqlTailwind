


interface Ichildren  {
    children : React.ReactNode
}

const layout = ({children} : Ichildren) => {
  return (
    <div>
        <main>
            {children}
        </main>
    </div>
  )
}

export default layout