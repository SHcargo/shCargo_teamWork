import BuySelectedProduct from "../page";

interface Props {
  params: { id: string };
}

const ProductPage = ({ params }: Props) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <BuySelectedProduct selectedId={params.id} />
    </div>
  );
};

export default ProductPage;
