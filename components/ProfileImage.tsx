'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';

export default function ProfileImage() {
  const { theme } = useTheme();
  return (
    <Image
      src={theme === 'dark' ? '/images/profile-dark.png' : '/images/profile-light.png'}
      alt="현지인"
      width={144}
      height={144}
      className="object-cover"
    />
  );
}
