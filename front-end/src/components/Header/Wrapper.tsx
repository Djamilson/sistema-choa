const Wrapper = ({ children, className }: any) => {
  return (
    <div
      className={`mx-auto w-full max-w-[1440px] px-2 md:px-10 ${
        className || ''
      }`}
    >
      {children}
    </div>
  )
}

export default Wrapper
