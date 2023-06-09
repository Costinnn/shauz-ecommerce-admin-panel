import Product from "../../subcomponents/Product";

// import PRODUCTS_DATA from "../../data";
import { useSelector } from "react-redux";

import "./Sale.scss";

const Sale = () => {

  const { dbProductsList } = useSelector((state) => state.dbProducts);

  const products = dbProductsList.filter((product) => product.sale);
  return (
    <main className="section-narrow sale">
      <h1>REDUCERI</h1>
      <p>
        Reinnoieste-ti tinuta cu articole Shauz la preturi speciale.
        Grabeste-te, aceste articole nu vor fi disponibile pentru foarte mult
        timp la acest pret.
      </p>
      <div className="products">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <p>
        Nu ai gasit nimic? Viziteaza-ne pentru cateva zile, sunt sanse mari sa
        se schimbe produsele aflate la reducere si sa gasesti produsul tau favorit la un pret special.
      </p>
    </main>
  );
};

export default Sale;
