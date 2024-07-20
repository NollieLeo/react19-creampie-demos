import { useState, useActionState, startTransition } from "react";

const updateName = async (name: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (name === "") {
        reject(new Error("Name cannot be empty"));
        return;
      }
      resolve(null);
    }, 2000);
  });
};

export default function ActionState() {
  const [name, setName] = useState("");

  const [error, handleSubmit, isPending] = useActionState(
    async (previousState, name) => {
      try {
        await updateName(name);
        console.log("Name updated successfully");
        return null;
      } catch (e) {
        console.log("error");
        return e.message;
      }
    }
  );

  return (
    <div>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <button
        onClick={() => {
          startTransition(() => {
            handleSubmit(name);
          });
        }}
        disabled={isPending}
      >
        Update
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}
