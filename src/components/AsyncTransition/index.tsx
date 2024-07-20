import { map, times } from "lodash-es";
import { useState, useTransition } from "react";

const updateName = async (name: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!name.length) {
        reject(new Error("Name cannot be empty"));
        return;
      }
      resolve(name);
    }, 2000);
  });
};

export const AsyncTransition = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [list, setList] = useState<
    Array<{
      label: string;
      value: string;
    }>
  >([]);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      try {
        const resName = await updateName(name);
        const testArr = times(10000, (val) => ({
          label: `${resName} ${val}`,
          value: `${resName} ${val}`,
        }));
        setList(testArr);
        console.log("Name updated successfully");
      } catch (e) {
        setError(e.message);
      }
    });
  };

  return (
    <div>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      {error && <p>{error}</p>}
      <button onClick={handleSubmit} disabled={isPending}>
        Update
      </button>
      {map(list, ({ label, value }) => (
        <div key={value}>{label}</div>
      ))}
    </div>
  );
};
