import { useGetStore } from "@/api/StoreApi";
import MenuItem from "@/components/MenuItem";
import StoreInfo from "@/components/StoreInfo";
import { Card, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { storeId } = useParams();
  const { store, isLoading } = useGetStore(storeId);
  if (isLoading || !store) {
    return "...Loading";
  }
  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={store.imageUrl}
          className=" rounded-md object-contain h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <StoreInfo store={store} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>

          {store.items.map((menuItem) => (
            <MenuItem menuItem={menuItem}/>
            ))}
        </div>

        <div>
          <Card>
            summary
            <CardFooter>footer</CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
