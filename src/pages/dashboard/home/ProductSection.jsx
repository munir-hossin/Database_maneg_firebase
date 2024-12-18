import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, NavLink } from "react-router";
import Modal from "../../../component/Modal";
import { removeDataFromFirebase } from "../../../database/firebaseUtils";
import {
    deleteProducts,
    getProducts,
} from "../../../features/products/productsSlice";

export default function ProductSection() {
    const products = useSelector((state) => state.products);

    const [deleteProductId, setDeleteProductId] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const handleDelete = () => {
        if (deleteProductId) {
            async function deleteProduct() {
                const res = await removeDataFromFirebase(
                    "products/" + deleteProductId
                );
            }

            deleteProduct();
            dispatch(deleteProducts(deleteProductId));
            setDeleteProductId(false);
        }
    };

    const handleModalClose = () => {
        setDeleteProductId(false);
    };

    let productsContent;
    if (products.isLoading) {
        productsContent = <div>Products is loading ...</div>;
    }

    if (!products.isLoading && products.isError) {
        productsContent = <div>Something is error || {products.error}</div>;
    }

    if (
        !products.isLoading &&
        !products.isError &&
        products.products.length == 0
    ) {
        productsContent = <div>No data found 🧑</div>;
    }

    if (
        !products.isLoading &&
        !products.isError &&
        products.products.length > 0
    ) {
        productsContent = products.products.map((product) => (
            <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
            >
                <img
                    src={product.productImageUrl}
                    alt={product.productName}
                    className="w-full h-40 object-cover"
                />
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                        {product.productName}
                    </h3>
                    <p className="text-red-500 font-bold">
                        ${product.productPrice.toFixed(2)}
                    </p>
                    <div className="flex items-center mt-2">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <svg
                                key={index}
                                className={`w-5 h-5 ${
                                    index < product.rating
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.208a1 1 0 00.95.69h4.42c.969 0 1.371 1.24.588 1.81l-3.584 2.597a1 1 0 00-.364 1.118l1.357 4.208c.3.921-.755 1.688-1.539 1.118l-3.584-2.597a1 1 0 00-1.176 0L5.98 17.688c-.784.57-1.838-.197-1.539-1.118l1.357-4.208a1 1 0 00-.364-1.118L1.85 9.635c-.783-.57-.381-1.81.588-1.81h4.42a1 1 0 00.95-.69l1.357-4.208z" />
                            </svg>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4">
                        <NavLink
                            to={`edit-product/${product.id}`}
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                        >
                            <svg
                                className="w-6 h-6 text-white dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                                />
                            </svg>
                        </NavLink>
                        <button
                            onClick={() => setDeleteProductId(product.id)}
                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                        >
                            <svg
                                className="w-6 h-6 text-white dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        ));
    }

    return (
        <div>
            {deleteProductId && (
                <Modal onDelete={handleDelete} onClose={handleModalClose} />
            )}

            <section className="py-8 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center mb-6">
                        Products
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {productsContent}
                    </div>
                </div>
            </section>
        </div>
    );
}
