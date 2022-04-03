import { Button } from '@nodesoft/ui/Button';
import React from 'react';

const HelloWorld = () => (
  <>
    <h1>Hello There!</h1>
    <label htmlFor="name">
      <input id="name" name="name" type="text" />
    </label>
    <Button>Boop</Button>
  </>
);

export default HelloWorld;
