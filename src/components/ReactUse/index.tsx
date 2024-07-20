import { map, times } from "lodash-es";
import { Suspense, use } from "react";

const getData = async (): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(times(10000, (val) => `Hello Motherfucker ${val}`));
    }, 2000);
  });
};

export default function ReactUse() {
  return (
    <Suspense fallback={<div>Fetching...</div>}>
      <ChildCompont />
    </Suspense>
  );
}

function ChildCompont() {
  const data = use(getData());
  return (
    <div>
      {map(data, (val) => (
        <div key={val}>{val}</div>
      ))}
    </div>
  );
}
