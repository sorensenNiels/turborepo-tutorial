import { Button } from '@nodesoft/ui';
import Link from 'next/link';

const HeatMap = () => {
  return (
    <>
      <h1>Google Heat Map</h1>
      <h2>
        <Link href="/">
          <a>
            <Button>Back to home</Button>
          </a>
        </Link>
      </h2>
    </>
  );
};

export default HeatMap;
