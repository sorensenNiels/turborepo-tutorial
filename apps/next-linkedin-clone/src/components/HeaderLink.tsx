/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Avatar, SvgIcon } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';

type SvgIconType = typeof SvgIcon;
type AvatarType = typeof Avatar;

type HeaderLinkProps = {
  Icon: SvgIconType | AvatarType;
  text: string;
  feed?: boolean;
  active?: boolean;
  avatar?: boolean;
  hidden?: boolean;
};

const HeaderLink = ({
  Icon,
  text,
  feed = false,
  active = false,
  avatar = false,
  hidden = false
}: HeaderLinkProps) => {
  const { data: session } = useSession();

  return (
    <div
      className={`${hidden && 'hidden md:inline-flex'} ${
        feed
          ? 'text-black/60 hover:text-black dark:text-white/75 dark:hover:text-white lg:-mb-1.5 space-y-1'
          : 'text-gray-500 hover:text-gray-700'
      } cursor-pointer flex flex-col justify-center items-center ${
        active && '!text-black dark:!text-white'
      }`}
      onClick={() => avatar && signOut()}
    >
      {avatar ? (
        // @ts-ignore
        <Icon className="!h-7 !w-7 lg:!-mb-1" src={session?.user?.image} />
      ) : (
        // @ts-ignore
        <Icon />
      )}

      <h4
        className={`${
          feed && 'hidden lg:flex justify-center w-full mx-auto'
        } text-sm`}
      >
        {text}
      </h4>
      {active && (
        <span className="hidden lg:inline-flex h-0.5 w-[calc(100%+20px)] bg-black dark:bg-white rounded-t-full" />
      )}
    </div>
  );
};

export default HeaderLink;
