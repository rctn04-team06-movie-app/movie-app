import { Player } from '@lottiefiles/react-lottie-player';
import notfound from '../assets/lotties/lonely.json';
export default function NotFoundPage() {
  return (
    <>
      <div className='w-fit mx-auto h-[100vh]'>
        <Player src={notfound} autoplay loop />
        <p className='text-center text-3xl font-bold text-slate-500 dark:text-slate-200'>
          Page Not Found
        </p>
      </div>
    </>
  );
}
