import { useToast } from "@/components/ui/use-toast";
import { ENV_VAR } from "@/config/envVar";
import {
  productsFailure,
  productsSuccess,
  productStart,
} from "@/store/actions/product.slice";
import {
  sellerFailure,
  sellerStart,
  sellerSuccess,
} from "@/store/actions/seller.slice";
import axios from "axios";
import { useDispatch } from "react-redux";

export const useStore = () => {
  const dispatch = useDispatch();
  const { API_URI } = ENV_VAR;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const { toast } = useToast();

  const fetchStoreProducts = async (storeId) => {
    dispatch(productStart());
    try {
      const res = await axios.get(`${API_URI}/api/product/${storeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(productsSuccess(res.data.products));
    } catch (error) {
      console.log(error);
      dispatch(productsFailure(error));
    }
  };

  const deleteStoreProduct = async (productId) => {
    dispatch(productStart());
    try {
      const res = await axios.delete(`${API_URI}/api/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(productsSuccess(res.data.products));
    } catch (error) {
      console.log(error);
      dispatch(productsFailure(error));
    }
  };

  const addOrUpdateProduct = async ({
    productName,
    description,
    categories,
    size,
    price,
    offerPrice,
    stockLevel,
    images,
    colors,
    fabric,
    brand,
    saleType,
    userId,
    storeId,
    editProduct,
    productId,
    setShowAddProduct = () => {},
  }) => {
    const errors = [];

    if (!productName) errors.push("Product Name is required");
    if (!description) errors.push("Product Description is required");
    if (!categories) errors.push("Product Category is required");
    if (size.length === 0) errors.push("Sizes are required");
    if (!price) errors.push("Price is required");
    if (!offerPrice) errors.push("Offer Price is required");
    if (!stockLevel) errors.push("Stock Levels are required");
    if (images.length === 0) errors.push("At least one image is required");
    if (colors.length === 0) errors.push("Colors are required");
    if (!fabric) errors.push("Fabric is required");
    if (!brand) errors.push("Brand is required");
    if (!saleType) errors.push("Sale Type is required");
    if (!userId) errors.push("User ID is required");
    if (!storeId) errors.push("Store ID is required");

    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: errors.join(", "),
        duration: 3000,
      });
      return;
    }
    dispatch(productStart());
    try {
      let res;
      if (editProduct) {
        res = await axios.patch(
          `${API_URI}/api/product/${productId}`,
          {
            productName,
            description,
            categories,
            size,
            price,
            offerPrice,
            stockLevel,
            images,
            colors,
            fabric,
            brand,
            saleType,
            userId,
            storeId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        res = await axios.post(
          `${API_URI}/api/product`,
          {
            productName,
            description,
            categories,
            size,
            price,
            offerPrice,
            stockLevel,
            images,
            colors,
            fabric,
            brand,
            saleType,
            userId,
            storeId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      setShowAddProduct(false);
      toast({ title: res.data.message, duration: 1000 });
      dispatch(productsSuccess(res.data.products));
    } catch (error) {
      console.log(error);
      dispatch(productsFailure(error));
    }
  };

  return {
    fetchStoreProducts,
    deleteStoreProduct,
    addOrUpdateProduct,
  };
};
