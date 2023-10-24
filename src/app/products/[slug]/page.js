import { CheckIcon } from "@heroicons/react/24/solid";
import ShareBtn from "../../../components/ShareBtn";
import AddToCart from "../../../components/AddToCart";
import { getProductbyId, getProducts } from "../../../services/productService";
import { formatAmount } from "../../../utils/stripe";
import Image from "next/image";
import { notFound } from "next/navigation";

//ISR

// export const revalidate = 30
// export const dynamic = "force-dynamic" // default is 'auto'
// export const dynamicParams = false (default is true it will fetch page on run time then make it static page)

// export const revalidate = 60; //in seconds //recheck server every 60 sec and cache it

//https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
//ISR, when true updates the new added data in BE and updates even in builds without rebuilding
export const dynamicParams = true; //(by default is true it will fetch page on run time then make it static page)

// export const dynamic = "force-dynamic"; //can be put in any file as it doesnt depend on param
//ISR

//https://nextjs.org/docs/app/api-reference/functions/generate-static-params
//The generateStaticParams function can be used in combination with dynamic route segments to statically generate routes at build time instead of on-demand at request time also known as SSG
// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const products = await getProducts();
  const slugs = products.data.map((item) => ({ slug: item.id }));
  return slugs;
}

//https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
//by this way we are showing product name/info to the browser tab
export async function generateMetadata({ params: { slug } }) {
  const product = await getProductbyId(slug);
  if (!product) {
    notFound();
  }
  return {
    title: `Dev Product | ${product.name}`,
  };
}

//https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes
const Product1 = async ({ params: { slug } }) => {
  console.log("individual product page returned", slug);
  const product = await getProductbyId(slug);

  const clientProduct = {
    name: product.name,
    description: product.description,
    id: product.id,
    price: product.default_price.unit_amount,
    price_id: product.default_price.id,
    currency: "INR",
    image: product.images[0],
  };

  return (
    <div className="m-2 px-20">
      <div className="flex justify-around items-center flex-wrap">
        <div className="w-80 h-80">
          <Image
            priority={true} //avoid lazy load(slow load) feature thats default in next image
            height={320}
            width={300}
            src={product?.images[0]}
            className="w-full h-auto"
          />
        </div>
        <div className="flex-1 max-w-md border rounded-md shadow-lg p-6 bg-white">
          <h2 className="text-3xl font-semibold">{product?.name}</h2>
          <div className="flex pt-2 gap-2">
            <CheckIcon className="text-lime-500 w-5 h-5" />
            <span className="font-semibold">In stock</span> |
            <ShareBtn />
          </div>
          <div className="mt-4 border-t pt-4">
            <p className="text-gray-500">Price:</p>
            <p className="text-xl font-semibold">
              {formatAmount(product?.default_price?.unit_amount)}
            </p>
          </div>
          <AddToCart product={clientProduct} />
        </div>
      </div>
      <p className="mt-8 text-2xl">{product?.description}</p>
    </div>
  );
};

export default Product1;
