
const ContainerModal = ({children}) => {
  return (
    <section className="fixed top-0 left-0 w-full h-full bg-modal grid place-items-center z-10">
      <div className="bg-slate-200 rounded-lg h-auto w-11/12 mx-auto md:w-2/3 xl:w-2/5 p-7">
        {children}
      </div>
    </section>
  )
}

export default ContainerModal
