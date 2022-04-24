import { Button } from '@nodesoft/ui/Button';
import Link from 'next/link';
import React from 'react';

const MenuItems = () => (
  <>
    <Link passHref href="/tracking-map">
      <a>
        <Button>Google Tracking Map</Button>
      </a>
    </Link>
    <Link passHref href="/heat-map">
      <a>
        <Button>Google Heat Map</Button>
      </a>
    </Link>
  </>
);

export default MenuItems;
