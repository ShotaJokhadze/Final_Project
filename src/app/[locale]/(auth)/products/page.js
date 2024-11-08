"use client";

import "./products.scss";
import Card from "../../../components/productCard/Card";
import SearchBar from "../../../components/Search/search";
import { useEffect, useState } from "react";
import ProductsModal from "../../../components/ProductsModal/ProductsModal";
import Sort from "../../../components/Sort/sort";

let url = "https://dummyjson.com/products";

export default function Products({ searchParams = {} }) {
  const [productList, setProductList] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });
  const [editProduct, setEditProduct] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const searchTerm = searchParams.search || "";
  const sortOption = searchParams.sortBy || "";
  const sortOrder = searchParams.order || "";

  const buildQueryUrl = () => {
    let queryUrl = `${url}`;

    if (searchTerm) {
      queryUrl += `/search?q=${searchTerm}`;
    }

    if (sortOption) {
      queryUrl += `${
        searchTerm ? "&" : "?"
      }sortBy=${sortOption}&order=${sortOrder}`;
    }

    return queryUrl;
  };

  const fetchProductsData = async () => {
    const queryUrl = buildQueryUrl();
    const res = await fetch(queryUrl);
    const data = await res.json();
    setProductList(data.products);
    console.log(data);
  };

  useEffect(() => {
    fetchProductsData();
  }, [searchTerm, sortOption, sortOrder]);

  const createProduct = () => {
    const highestId =
      productList.length > 0
        ? Math.max(...productList.map((product) => product.id))
        : 0;
    const newProductPost = {
      id: highestId + 1,
      title: newProduct.title,
      description: newProduct.description,
      image: newProduct.image,
      price: parseFloat(newProduct.price),
    };
    const updatedProducts = [newProductPost, ...productList];
    setProductList(updatedProducts);
    setNewProduct({ title: "", description: "", price: "", image: "" });
    setIsCreateModalOpen(false);
  };

  const updateProduct = () => {
    if (!editProduct) return;

    const updatedProducts = productList.map((product) =>
      product.id === editProduct.id
        ? {
            ...product,
            title: editProduct.title,
            description: editProduct.description,
            price: parseFloat(editProduct.price),
            image: editProduct.image,
          }
        : product
    );

    setProductList(updatedProducts);
    setEditProduct(null);
    setIsEditModalOpen(false);
  };

  const deleteProduct = (id) => {
    const updatedProducts = productList.filter((product) => product.id !== id);
    setProductList(updatedProducts);
  };

  const toggleCreateModal = () => {
    setIsCreateModalOpen(!isCreateModalOpen);
  };

  const toggleEditModal = (product) => {
    setEditProduct(product);
    setIsEditModalOpen(true);
  };

  return (
    <div className="products-page">
      <div className="filter-container">
        <SearchBar searchType="products" />
        <Sort />
        <button onClick={toggleCreateModal}>Create Product</button>
      </div>
      <ProductsModal
        isOpen={isCreateModalOpen}
        onClose={toggleCreateModal}
        title={newProduct.title}
        body={newProduct.description}
        price={newProduct.price}
        image={newProduct.image}
        setTitle={(title) => setNewProduct({ ...newProduct, title })}
        setBody={(body) => setNewProduct({ ...newProduct, description: body })}
        setPrice={(price) => setNewProduct({ ...newProduct, price })}
        setImage={(image) => setNewProduct({ ...newProduct, image })}
        onSubmit={createProduct}
        action="create"
      />
      {isEditModalOpen && editProduct && (
        <ProductsModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title={editProduct.title}
          body={editProduct.description}
          price={editProduct.price}
          image={editProduct.image}
          setTitle={(title) => setEditProduct({ ...editProduct, title })}
          setBody={(body) =>
            setEditProduct({ ...editProduct, description: body })
          }
          setPrice={(price) => setEditProduct({ ...editProduct, price })}
          setImage={(image) => setEditProduct({ ...editProduct, image })}
          onSubmit={updateProduct}
          action="edit"
        />
      )}
      <div className="card-container">
        {productList.length > 0 ? (
          productList.map((product) => (
            <div className="card" key={product.id}>
              <Card
                key={product.id}
                id={product.id}
                src={product.thumbnail || product.image}
                header={product.title}
                content={product.description}
                price={product.price}
              />
              <div className="product-actions">
                <div onClick={() => toggleEditModal(product)}>Edit</div>
                <div onClick={() => deleteProduct(product.id)}>Delete</div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No products found.</p>
        )}
      </div>
    </div>
  );
}
