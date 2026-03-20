import React, { useCallback, useEffect, useState } from 'react';
import { productsApi } from '../api/productsApi';
import { authApi } from '../api/authApi';
import { getAuthToken } from '../utils/auth';

const initialForm = {
  name: '',
  price: '',
  image: '',
  description: '',
  category: '',
  stock: ''
};

const initialUserForm = {
  name: '',
  email: '',
  password: '',
  role: 'user'
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userForm, setUserForm] = useState(initialUserForm);
  const [users, setUsers] = useState([]);
  const [userError, setUserError] = useState('');
  const [userMessage, setUserMessage] = useState('');

  const token = getAuthToken();

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await productsApi.getProducts();
      setProducts(data);
      setError('');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const loadUsers = useCallback(async () => {
    try {
      const data = await authApi.getUsersByAdmin(token);
      setUsers(data);
      setUserError('');
    } catch (requestError) {
      setUserError(requestError.message);
    }
  }, [token]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const saveProduct = async (event) => {
    event.preventDefault();

    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock)
    };

    try {
      if (editingId) {
        await productsApi.updateProduct(editingId, payload, token);
      } else {
        await productsApi.createProduct(payload, token);
      }

      setForm(initialForm);
      setEditingId('');
      setError('');
      await loadProducts();
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const editProduct = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: String(product.price),
      image: product.image,
      description: product.description,
      category: product.category,
      stock: String(product.stock)
    });
  };

  const deleteProduct = async (id) => {
    try {
      await productsApi.deleteProduct(id, token);
      await loadProducts();
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const createUser = async (event) => {
    event.preventDefault();
    setUserError('');
    setUserMessage('');

    try {
      const response = await authApi.createUserByAdmin(userForm, token);
      setUserMessage(`User created: ${response.user.email}`);
      setUserForm(initialUserForm);
      await loadUsers();
    } catch (requestError) {
      setUserError(requestError.message);
    }
  };

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Admin panel</h1>
          <p className="text-sm text-slate-500">Manage products with protected CRUD endpoints</p>
        </div>

        <form onSubmit={saveProduct} className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold text-slate-900">{editingId ? 'Edit product' : 'Add product'}</h2>

          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            <input className="rounded-lg border border-slate-300 px-3 py-2" placeholder="Name" value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} required />
            <input className="rounded-lg border border-slate-300 px-3 py-2" placeholder="Category" value={form.category} onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))} required />
            <input className="rounded-lg border border-slate-300 px-3 py-2" placeholder="Price" type="number" min="0" step="0.01" value={form.price} onChange={(event) => setForm((prev) => ({ ...prev, price: event.target.value }))} required />
            <input className="rounded-lg border border-slate-300 px-3 py-2" placeholder="Stock" type="number" min="0" value={form.stock} onChange={(event) => setForm((prev) => ({ ...prev, stock: event.target.value }))} required />
          </div>

          <input className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="Image URL" value={form.image} onChange={(event) => setForm((prev) => ({ ...prev, image: event.target.value }))} />

          <textarea className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="Description" rows={3} value={form.description} onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} required />

          {error && <p className="mt-3 text-sm font-semibold text-rose-700">{error}</p>}

          <div className="mt-4 flex gap-2">
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white">{editingId ? 'Update' : 'Create'}</button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(''); setForm(initialForm); }} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700">
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold text-slate-900">Products ({products.length})</h2>

          {loading ? (
            <div className="mt-4 h-16 w-16 animate-spin rounded-full border-b-2 border-blue-600" />
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-slate-500">
                    <th className="py-2 pr-3">Name</th>
                    <th className="py-2 pr-3">Category</th>
                    <th className="py-2 pr-3">Price</th>
                    <th className="py-2 pr-3">Stock</th>
                    <th className="py-2 pr-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-slate-100">
                      <td className="py-2 pr-3 font-semibold text-slate-800">{product.name}</td>
                      <td className="py-2 pr-3">{product.category}</td>
                      <td className="py-2 pr-3">${product.price.toFixed(2)}</td>
                      <td className="py-2 pr-3">{product.stock}</td>
                      <td className="py-2 pr-3">
                        <div className="flex gap-2">
                          <button onClick={() => editProduct(product)} className="rounded bg-amber-100 px-2 py-1 text-xs font-bold text-amber-700">Edit</button>
                          <button onClick={() => deleteProduct(product.id)} className="rounded bg-rose-100 px-2 py-1 text-xs font-bold text-rose-700">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold text-slate-900">Create user</h2>
          <p className="text-sm text-slate-500">Admin can create customer or admin accounts</p>

          <form onSubmit={createUser} className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            <input
              className="rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Full name"
              value={userForm.name}
              onChange={(event) => setUserForm((prev) => ({ ...prev, name: event.target.value }))}
              required
            />
            <input
              className="rounded-lg border border-slate-300 px-3 py-2"
              type="email"
              placeholder="Email"
              value={userForm.email}
              onChange={(event) => setUserForm((prev) => ({ ...prev, email: event.target.value }))}
              required
            />
            <input
              className="rounded-lg border border-slate-300 px-3 py-2"
              type="password"
              placeholder="Temporary password"
              value={userForm.password}
              onChange={(event) => setUserForm((prev) => ({ ...prev, password: event.target.value }))}
              required
            />
            <select
              className="rounded-lg border border-slate-300 px-3 py-2"
              value={userForm.role}
              onChange={(event) => setUserForm((prev) => ({ ...prev, role: event.target.value }))}
            >
              <option value="user">Customer</option>
              <option value="admin">Admin</option>
            </select>

            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white md:col-span-2">Create user</button>
          </form>

          {userError && <p className="mt-3 text-sm font-semibold text-rose-700">{userError}</p>}
          {userMessage && <p className="mt-3 text-sm font-semibold text-emerald-700">{userMessage}</p>}

          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-500">
                  <th className="py-2 pr-3">Name</th>
                  <th className="py-2 pr-3">Email</th>
                  <th className="py-2 pr-3">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-slate-100">
                    <td className="py-2 pr-3 font-semibold text-slate-800">{user.name}</td>
                    <td className="py-2 pr-3">{user.email}</td>
                    <td className="py-2 pr-3 capitalize">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
