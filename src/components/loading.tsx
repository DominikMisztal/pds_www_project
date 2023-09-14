import { Loader } from "lucide-react";
import { type HTMLAttributes } from "react";

const Loading: React.FC<HTMLAttributes<HTMLDivElement>> = () => {
  return (
    <div className="flex gap-2 text-xl">
      <Loader className="animate-spin"></Loader> Loading...
    </div>
  );
};

export default Loading;
