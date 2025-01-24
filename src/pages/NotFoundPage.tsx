const NotFoundPage: React.FC = () => {
  return (
    <section className='h-full flex justify-center'>
      <div className='flex flex-col gap-4 items-center mt-7'>
        <span className='font-black text-9xl text-slate-950'>404</span>
        <span className='text-slate-700 text-5xl font-bold'>
          Page Not Found
        </span>
      </div>
    </section>
  );
};

export default NotFoundPage;
