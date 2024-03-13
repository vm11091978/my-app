import Navpanel from './../Navpanel.js';
import Tick from './Tick.js';

export default function Dashboard() {
  return (
    <>
      <Navpanel />
      <Tick />

      <h1 className={`mb-3 text-2xl font-semibold`}>
        Hello, Dashboard Page!
      </h1>
    </>
  );
}
