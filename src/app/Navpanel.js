'use client'; // нужен только для получения переменной pathname

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function Navpanel() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center">
      <Image
        className="relative pb-12 dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src="/next.svg"
        alt="Next.js Logo"
        width={180}
        height={37}
        priority
      />

      <div className="mb-16 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
        <Link className={`link mx-6 mb-6 ${pathname === '/' ? 'active' : ''}`} href="/">
          Home
        </Link>
        <Link className={`link mx-6 mb-6 ${pathname === '/dashboard' ? 'active' : ''}`} href="/dashboard">
          Dashboard
        </Link>
        <Link className={`link mx-6 mb-6 ${pathname === '/square' ? 'active' : ''}`} href="/square">
          Tic-tac-toe
        </Link>
      </div>
    </div>
  );
}
