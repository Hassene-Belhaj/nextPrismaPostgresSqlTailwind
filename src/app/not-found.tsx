const NotFoundPage = () => {
    return (
      <section className='w-full h-screen flex justify-center items-center flex-col'>
          <h1 className='text-7xl text-gray-800 font-bold'>404</h1>
          <p className='text-gray-500 text-3xl mt-2 mb-5'>
              Page Not Found
          </p>
          <a className='text-md underline text-indigo-500 underline-offset-4' href="/">
              Go to home page
          </a>
      </section>
    )
  }
  
  export default NotFoundPage;