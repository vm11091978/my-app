import Navpanel from './Navpanel.js';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Navpanel />

      <h1 className={`mb-3 text-2xl font-semibold`}>
        Hello, Home page!
      </h1>

      <a
        className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
        href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        By{" "}
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          className="dark:invert"
          width={100}
          height={23}
          priority
        />
      </a>
    </>
  );
}
