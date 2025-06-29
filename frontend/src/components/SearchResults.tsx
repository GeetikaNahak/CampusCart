import { Store } from "@/types";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Dot } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  store: Store;
};
const SearchResults = ({ store }: Props) => {
  return (
    <Link
      to={`/detail/${store._id}`}
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group"
    >
      <AspectRatio ratio={16 / 6}>
        <img
          src={store.imageUrl}
          className="rounded-lg w-full h-full object-cover"
        />
      </AspectRatio>
      <div>
        <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
        {store.storeName}
      </h3>
      <div id="card-content" className="grid md:grid-cols-2 gap-2 rounded-md">
        <div className="flex flex-row  flex-wrap">
          {store.cuisines.map((item, index) => (
            <span key={index} className="flex items-center">
              {item}
              {index < store.cuisines.length - 1 && <Dot />}
            </span>
          ))}
        </div>
      </div>
      </div>
      
    </Link>
  );
};

export default SearchResults;
