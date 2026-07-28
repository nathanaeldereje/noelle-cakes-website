import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', display_order: 1 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch categories along with the count of menu items in each
  const fetchCategories = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from('categories')
      .select('*, menu_items(count)')
      .order('display_order', { ascending: true });

    if (error) {
      setError('Failed to load categories.');
    } else {
      setCategories(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Open modal for new category or editing
  const handleOpenModal = (category = null) => {
    setError(null);
    setSuccess(null);
    if (category) {
      setEditingCategory(category);
      setFormData({ name: category.name, display_order: category.display_order });
    } else {
      setEditingCategory(null);
      setFormData({ name: '', display_order: categories.length + 1 });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  // Submit Form (Create or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (editingCategory) {
      // Update Category
      const { error } = await supabase
        .from('categories')
        .update({
          name: formData.name,
          display_order: parseInt(formData.display_order)
        })
        .eq('id', editingCategory.id);

      if (error) {
        setError(error.message);
      } else {
        setSuccess(`Category "${formData.name}" updated successfully!`);
        handleCloseModal();
        fetchCategories();
      }
    } else {
      // Create Category
      const { error } = await supabase
        .from('categories')
        .insert([{
          name: formData.name,
          display_order: parseInt(formData.display_order)
        }]);

      if (error) {
        setError(error.message);
      } else {
        setSuccess(`Category "${formData.name}" created successfully!`);
        handleCloseModal();
        fetchCategories();
      }
    }
    setIsSubmitting(false);
  };

  // Delete Category (With Foreign Key Validation)
  const handleDelete = async (category) => {
    const itemCount = category.menu_items?.[0]?.count || 0;

    // Block deletion if category has items
    if (itemCount > 0) {
      alert(`Cannot delete category "${category.name}" because it currently contains ${itemCount} menu item(s). Please move or delete the items first!`);
      return;
    }

    if (!confirm(`Are you sure you want to delete category "${category.name}"?`)) return;

    setError(null);
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', category.id);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(`Category "${category.name}" deleted successfully!`);
      fetchCategories();
    }
  };

  return (
    <div className="space-y-6 font-body text-gray-800">
      
      {/* Top Title & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl text-brand-maroon">Category Management</h1>
          <p className="text-gray-500 text-sm mt-1">Organize your menu categories and display order.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-brand-maroon text-brand-pink font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-body transition-colors shadow-sm text-sm self-start sm:self-auto"
        >
          + Add New Category
        </button>
      </div>

      {/* Notifications */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg text-sm">
          {success}
        </div>
      )}

      {/* Categories Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading categories...</div>
        ) : categories.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No categories found. Click "+ Add New Category" to create your first one!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-500">
                  <th className="py-3.5 px-6">Order</th>
                  <th className="py-3.5 px-6">Category Name</th>
                  <th className="py-3.5 px-6">Items Count</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {categories.map((cat) => {
                  const itemCount = cat.menu_items?.[0]?.count || 0;
                  return (
                    <tr key={cat.id} className="hover:bg-gray-50/50">
                      <td className="py-4 px-6 font-mono font-semibold text-brand-maroon">
                        #{cat.display_order}
                      </td>
                      <td className="py-4 px-6 font-bold text-gray-900">
                        {cat.name}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          itemCount > 0 ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {itemCount} item(s)
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => handleOpenModal(cat)}
                          className="text-xs font-semibold text-brand-maroon hover:underline bg-brand-pink/30 px-3 py-1.5 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(cat)}
                          className="text-xs font-semibold text-red-600 hover:underline bg-red-50 px-3 py-1.5 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Create/Edit Category */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 max-w-md w-full p-6 space-y-6 animate-in fade-in zoom-in duration-150">
            
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-heading text-2xl text-brand-maroon">
                {editingCategory ? 'Edit Category' : 'Create New Category'}
              </h3>
              <button 
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-maroon mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Pastries & Tortas"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-maroon text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-maroon mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-maroon text-sm"
                />
                <span className="text-[11px] text-gray-400 mt-1 block">
                  Lower numbers appear first on the menu.
                </span>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-brand-maroon text-brand-pink font-semibold px-5 py-2 rounded-lg hover:bg-brand-body transition-colors text-xs disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : editingCategory ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}