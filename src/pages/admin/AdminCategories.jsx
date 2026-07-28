import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { compressImage } from '../../utils/imageCompressor';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({ 
    name: '', 
    display_order: 1, 
    description: '',
    image_url: '' 
  });

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

  const handleOpenModal = (category = null) => {
    setError(null);
    setSuccess(null);
    setImageFile(null);

    if (category) {
      setEditingCategory(category);
      setImagePreview(category.image_url);
      setFormData({ 
        name: category.name, 
        display_order: category.display_order,
        description: category.description || '',
        image_url: category.image_url || ''
      });
    } else {
      setEditingCategory(null);
      setImagePreview(null);
      setFormData({ 
        name: '', 
        display_order: categories.length + 1,
        description: '',
        image_url: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setImageFile(null);
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadCompressedImage = async (file) => {
    const compressedFile = await compressImage(file, 1000, 1000, 0.8);
    const filePath = `categories/${Date.now()}-${Math.random().toString(36).substring(7)}.webp`;

    const { error: uploadError } = await supabase.storage
      .from('menu-images')
      .upload(filePath, compressedFile);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('menu-images').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      let finalImageUrl = formData.image_url;

      if (imageFile) {
        finalImageUrl = await uploadCompressedImage(imageFile);
      }

      const payload = {
        name: formData.name,
        display_order: parseInt(formData.display_order),
        description: formData.description,
        image_url: finalImageUrl
      };

      if (editingCategory) {
        const { error } = await supabase
          .from('categories')
          .update(payload)
          .eq('id', editingCategory.id);

        if (error) throw error;
        setSuccess(`Category "${formData.name}" updated successfully!`);
      } else {
        const { error } = await supabase
          .from('categories')
          .insert([payload]);

        if (error) throw error;
        setSuccess(`Category "${formData.name}" created successfully!`);
      }

      handleCloseModal();
      fetchCategories();
    } catch (err) {
      setError(err.message || 'Failed to save category.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (category) => {
    const itemCount = category.menu_items?.[0]?.count || 0;

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
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl text-brand-maroon">Category Management</h1>
          <p className="text-gray-500 text-sm mt-1">Organize menu categories, descriptions, and cover photos.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-brand-maroon text-brand-pink font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-body transition-colors shadow-sm text-sm"
        >
          + Add New Category
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm">{error}</div>}
      {success && <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg text-sm">{success}</div>}

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
                  <th className="py-3.5 px-6">Category</th>
                  <th className="py-3.5 px-6">Description</th>
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
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          {cat.image_url ? (
                            <img src={cat.image_url} alt={cat.name} className="w-12 h-12 rounded-lg object-cover border" />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-xs">No img</div>
                          )}
                          <span className="font-bold text-gray-900">{cat.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-500 text-xs max-w-xs truncate">
                        {cat.description || '—'}
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 max-w-md w-full p-6 space-y-6">
            
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-heading text-2xl text-brand-maroon">
                {editingCategory ? 'Edit Category' : 'Create New Category'}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
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
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-maroon mb-1">
                  Category Description
                </label>
                <textarea
                  rows="2"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g. Freshly baked daily tortas, croissants, and delicate pastries."
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-maroon text-sm"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-maroon mb-1">
                  Category Cover Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-pink file:text-brand-maroon hover:file:bg-brand-maroon hover:file:text-white transition-all"
                />
                {imagePreview && (
                  <div className="mt-3 relative w-20 h-20 rounded-lg overflow-hidden border">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg">
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