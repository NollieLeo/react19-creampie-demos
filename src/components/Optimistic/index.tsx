import { useState, useOptimistic, useTransition } from "react";

const updateName = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve();
      } else {
        reject(new Error("Failed to update like"));
      }
    }, 1000);
  });
};

export default function Optimistic() {
  const [name, setName] = useState("motherfucker");

  const [optimisticName, setOptimisticName] = useOptimistic(name);

  const submitAction = async (formData) => {
    const newName = formData.get("name");
    setOptimisticName(newName);
    try {
      await updateName(newName);
      setName(newName);
    } catch (e) {
      // console.error(e);
    }
  };

  return (
    <form action={submitAction}>
      <p>Your name is: {optimisticName}</p>
      <p>
        <label>Change Name:</label>
        <input type="text" name="name" disabled={name !== optimisticName} />
      </p>
    </form>
  );
}
