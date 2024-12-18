import { useForm } from "react-hook-form";
import { productFormSchema } from "../../../validation/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { setProducts } from "../../../features/products/productsSlice";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import {
    getFirebaseDataForEdit,
    updateDataFromFirebase,
} from "../../../database/firebaseUtils";
import { useEffect } from "react";

export default function CreateProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(productFormSchema),
        defaultValues: {
            productName: "",
            productPrice: "",
            productImageUrl: "",
        },
    });

    const onSubmit = (data) => {
        if (params.id) {
            // Update product;
            updateDataFromFirebase(`products/${params.id}`, data);
            toast.success("Update is successful");
        } else {
            // Create product;
            dispatch(setProducts(data));
        }

        reset();
        navigate("/");
    };

    useEffect(() => {
        async function getData() {
            let res = await getFirebaseDataForEdit("products/" + params.id);
            reset(res);
        }

        if (params.id) {
            getData();
        } else {
            reset({
                productName: "",
                productPrice: "",
                productImageUrl: "",
            });
        }
    }, [params]);

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">
                {params.id ? "Edit Product" : "Add Product"}
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {/* Product Name */}
                <div>
                    <label
                        htmlFor="productName"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Product Name
                    </label>
                    <input
                        type="text"
                        id="productName"
                        name="productName"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter product name"
                        {...register("productName")}
                    />

                    {errors.productName && (
                        <span className="text-red-400">
                            {errors.productName?.message}
                        </span>
                    )}
                </div>

                {/* Product Price */}
                <div>
                    <label
                        htmlFor="productPrice"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Product Price
                    </label>
                    <input
                        type="number"
                        id="productPrice"
                        name="productPrice"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter product price"
                        {...register("productPrice")}
                    />

                    {errors.productPrice && (
                        <span className="text-red-400">
                            {errors.productPrice?.message}
                        </span>
                    )}
                </div>

                {/* Product Image URL */}
                <div>
                    <label
                        htmlFor="productImageUrl"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Product Image URL
                    </label>
                    <input
                        type="url"
                        id="productImageUrl"
                        name="productImageUrl"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter product image URL"
                        {...register("productImageUrl")}
                    />

                    {errors.productImageUrl && (
                        <span className="text-red-400">
                            {errors.productImageUrl?.message}
                        </span>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                >
                    {params.id ? "Update" : "Save"}
                </button>
            </form>
        </div>
    );
}
