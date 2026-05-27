import {

  useEffect,

  useState

} from "react";

import API from "../services/axios";

function Admin() {

  // =========================================
  // STATES
  // =========================================

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [editingId, setEditingId] =
    useState(null);

  const [form, setForm] =
    useState({

      name: "",

      description: "",

      price: "",

      category: "",

      stock: "",

      image: ""

    });

  // =========================================
  // ANALYTICS
  // =========================================

  const totalProducts =
    products.length;

  const totalStock =
    products.reduce(

      (sum, p) =>
        sum + Number(p.stock || 0),

      0

    );

  const totalValue =
    products.reduce(

      (sum, p) =>

        sum +

        (
          Number(p.price || 0)

          *

          Number(p.stock || 0)

        ),

      0

    );

  // =========================================
  // FETCH PRODUCTS
  // =========================================

  const fetchProducts =
    async () => {

      try {

        setLoading(true);

        const res =
          await API.get(
            "/products"
          );

        setProducts(
          res.data || []
        );

      } catch (err) {

        console.log(err);

        alert(
          "Failed to load products"
        );

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    fetchProducts();

  }, []);

  // =========================================
  // RESET FORM
  // =========================================

  const resetForm = () => {

    setForm({

      name: "",

      description: "",

      price: "",

      category: "",

      stock: "",

      image: ""

    });

    setEditingId(null);

  };

  // =========================================
  // HANDLE CHANGE
  // =========================================

  const handleChange =
    (e) => {

      setForm({

        ...form,

        [e.target.name]:
          e.target.value

      });

    };

  // =========================================
  // ADD PRODUCT
  // =========================================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (

        !form.name ||

        !form.price ||

        !form.category ||

        !form.stock

      ) {

        alert(
          "Fill all required fields"
        );

        return;

      }

      try {

        await API.post(

          "/products",

          form

        );

        alert(
          "Product Added"
        );

        resetForm();

        fetchProducts();

      } catch (err) {

        console.log(err);

        alert(
          "Product Add Failed"
        );

      }

    };

  // =========================================
  // DELETE PRODUCT
  // =========================================

  const deleteProduct =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this product?"
        );

      if (!confirmDelete)
        return;

      try {

        await API.delete(

          `/products/${id}`

        );

        alert(
          "Product Deleted"
        );

        fetchProducts();

      } catch (err) {

        console.log(err);

        alert(
          "Delete Failed"
        );

      }

    };

  // =========================================
  // EDIT PRODUCT
  // =========================================

  const editProduct =
    (product) => {

      setEditingId(
        product.id
      );

      setForm({

        name:
          product.name || "",

        description:
          product.description || "",

        price:
          product.price || "",

        category:
          product.category || "",

        stock:
          product.stock || "",

        image:
          product.image || ""

      });

      window.scrollTo({

        top: 0,

        behavior:
          "smooth"

      });

    };

  // =========================================
  // UPDATE PRODUCT
  // =========================================

  const updateProduct =
    async () => {

      try {

        await API.put(

          `/products/${editingId}`,

          form

        );

        alert(
          "Product Updated"
        );

        resetForm();

        fetchProducts();

      } catch (err) {

        console.log(err);

        alert(
          "Update Failed"
        );

      }

    };

  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (

      <div
        style={{
          padding: "40px",
          fontSize: "24px"
        }}
      >

        Loading Admin Dashboard...

      </div>

    );

  }

  // =========================================
  // UI
  // =========================================

  return (

    <div
      style={{
        padding: "20px",
        background: "#f5f5f5",
        minHeight: "100vh"
      }}
    >

      <h1>
        🛒 Admin Dashboard
      </h1>

      {/* =========================================
          ANALYTICS CARDS
      ========================================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "30px"
        }}
      >

        <div style={cardStyle}>

          <h3>Total Products</h3>

          <h1>{totalProducts}</h1>

        </div>

        <div style={cardStyle}>

          <h3>Total Stock</h3>

          <h1>{totalStock}</h1>

        </div>

        <div style={cardStyle}>

          <h3>Total Inventory Value</h3>

          <h1>
            ₹{totalValue}
          </h1>

        </div>

      </div>

      {/* =========================================
          FORM
      ========================================= */}

      <div
        style={formContainer}
      >

        <h2>

          {

            editingId

              ? "✏️ Update Product"

              : "➕ Add Product"

          }

        </h2>

        <form
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            style={inputStyle}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            style={{
              ...inputStyle,
              height: "100px"
            }}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            style={inputStyle}
          />

          {

            editingId ? (

              <button
                type="button"
                onClick={updateProduct}
                style={updateButton}
              >

                Update Product

              </button>

            ) : (

              <button
                type="submit"
                style={addButton}
              >

                Add Product

              </button>

            )

          }

        </form>

      </div>

      {/* =========================================
          PRODUCTS TABLE
      ========================================= */}

      <div
        style={tableContainer}
      >

        <h2>
          📦 All Products
        </h2>

        <table
          style={tableStyle}
        >

          <thead>

            <tr>

              <th>ID</th>

              <th>Image</th>

              <th>Name</th>

              <th>Price</th>

              <th>Category</th>

              <th>Stock</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {

              products.map(

                (product) => (

                  <tr
                    key={product.id}
                  >

                    <td>
                      {product.id}
                    </td>

                    <td>

                      {

                        product.image && (

                          <img

                            src={product.image}

                            alt=""

                            width="70"

                            style={{
                              borderRadius:
                                "8px"
                            }}

                          />

                        )

                      }

                    </td>

                    <td>
                      {product.name}
                    </td>

                    <td>
                      ₹{product.price}
                    </td>

                    <td>
                      {product.category}
                    </td>

                    <td>
                      {product.stock}
                    </td>

                    <td>

                      <button

                        onClick={() =>
                          editProduct(
                            product
                          )
                        }

                        style={editButton}

                      >

                        Edit

                      </button>

                      <button

                        onClick={() =>
                          deleteProduct(
                            product.id
                          )
                        }

                        style={deleteButton}

                      >

                        Delete

                      </button>

                    </td>

                  </tr>

                )

              )

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}

// =========================================
// STYLES
// =========================================

const cardStyle = {

  background: "white",

  padding: "20px",

  borderRadius: "10px",

  boxShadow:
    "0 2px 8px rgba(0,0,0,0.1)"

};

const formContainer = {

  background: "white",

  padding: "20px",

  borderRadius: "10px",

  marginBottom: "30px"

};

const inputStyle = {

  width: "100%",

  padding: "12px",

  marginBottom: "15px",

  borderRadius: "5px",

  border: "1px solid #ccc"

};

const addButton = {

  background: "green",

  color: "white",

  border: "none",

  padding: "12px 20px",

  borderRadius: "5px",

  cursor: "pointer"

};

const updateButton = {

  background: "orange",

  color: "white",

  border: "none",

  padding: "12px 20px",

  borderRadius: "5px",

  cursor: "pointer"

};

const editButton = {

  background: "#2563eb",

  color: "white",

  border: "none",

  padding: "8px 12px",

  marginRight: "8px",

  borderRadius: "5px",

  cursor: "pointer"

};

const deleteButton = {

  background: "red",

  color: "white",

  border: "none",

  padding: "8px 12px",

  borderRadius: "5px",

  cursor: "pointer"

};

const tableContainer = {

  background: "white",

  padding: "20px",

  borderRadius: "10px",

  overflowX: "auto"

};

const tableStyle = {

  width: "100%",

  borderCollapse:
    "collapse"

};

export default Admin;
