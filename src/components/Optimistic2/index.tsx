import { useState, useOptimistic, useTransition } from "react";

const updateLike = async (like) => {
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

export default function Optimistic2() {
  const [like, setLike] = useState(false);
  const [pending, startTransition] = useTransition();
  const [optimisticLike, setOptimisticLike] = useOptimistic(like);

  const handleLike = () => {
    const targetLike = !like;
    startTransition(async () => {
      try {
        setOptimisticLike(targetLike);
        await updateLike(like);
        setLike(targetLike);
      } catch (e) {
        console.error(e);
      }
    });
  };

  return (
    <div>
      <div onClick={handleLike}>{optimisticLike ? "❤️" : "🖤"}</div>
    </div>
  );
}
