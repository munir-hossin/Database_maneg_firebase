import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router";
import Modal from "../../../component/Modal";
import { removeDataFromFirebase } from "../../../database/firebaseUtils";
import {
    deleteCategory,
    getCategories,
} from "../../../features/categories/categorySlice";

export default function CategorySection() {
    const categoriesData = useSelector((state) => state.categories);

    const [deleteCategoryId, setDeleteCategoryId] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const handleClick = (id) => {
        setDeleteCategoryId(id);
    };

    const handleModalClose = () => {
        setDeleteCategoryId(false);
    };

    const handleDelete = () => {
        if (deleteCategoryId) {
            async function deleteCat() {
                const del = await removeDataFromFirebase(
                    "categories/" + deleteCategoryId
                );
                dispatch(deleteCategory(deleteCategoryId));
            }
            // dispatch(deleteCategories(deleteCategoryId));

            deleteCat();
            setDeleteCategoryId(false);
        }
    };

    let categoriesSectionContent;

    if (categoriesData.isLoading) {
        categoriesSectionContent = (
            <div className="text-xl">Data is loading ...</div>
        );
    }

    if (!categoriesData.isLoading && categoriesData.isError) {
        categoriesSectionContent = (
            <div className="text-xl">Error || {categoriesData.error}</div>
        );
    }

    if (
        !categoriesData.isLoading &&
        !categoriesData.isError &&
        categoriesData.categories.length === 0
    ) {
        categoriesSectionContent = (
            <div className="text-xl">No category found</div>
        );
    }

    if (
        !categoriesData.isLoading &&
        !categoriesData.isError &&
        categoriesData.categories.length > 0
    ) {
        categoriesSectionContent = categoriesData.categories.map((category) => (
            <div
                key={category.id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center w-full"
            >
                <img
                    src={category.categoryImageUrl}
                    alt={category.categoryName}
                    className="w-24 h-24 object-cover mb-3"
                />
                <p className="text-lg font-semibold">{category.categoryName}</p>
                <div className="flex justify-between mt-4 w-full">
                    <Link
                        to={`/edit-category/${category.id}`}
                        className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
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
                    </Link>
                    <button
                        onClick={() => handleClick(category.id)}
                        className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 flex"
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
        ));
    }

    return (
        <div>
            {deleteCategoryId && (
                <Modal onDelete={handleDelete} onClose={handleModalClose} />
            )}

            <section className="py-8 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center mb-6">
                        Categories
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {categoriesSectionContent}
                    </div>
                </div>
            </section>
        </div>
    );
}
