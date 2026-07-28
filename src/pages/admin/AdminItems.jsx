import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { compressImage } from '../../utils/imageCompressor';

export default function AdminItems() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    price: '',
    description: '',
    is_special: false,
    image_url: ''
  });

  // Fetch Categories & Items
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    // Fetch categories for dropdown & filter
    const { data: catData } = await supabase.from('categories').select('*').order('display_order');
    setCategories(catData || []);

    // Fetch items with category names
    const { data: itemData, error: itemError } = await supabase
      .from('menu_items')
      .select('*, categories(name)')
      .order('updated_at', { ascending: false });

    if (itemError) {
      setError('Failed to fetch menu items.');
    } else {
      setItems(itemData || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter items by selected category
  const filteredItems = selectedCategoryFilter === 'all'
    ? items
    : items.filter(item => item.category_id === selectedCategoryFilter);

  // Open Modal (Create or Edit)
  const handleOpenModal = (item = null) => {
    setError(null);
    setSuccess(null);
    setImageFile(null);

    if (item) {
      setEditingItem(item);
      setImagePreview(item.image_url);
      setFormData({
        name: item.name,
        category_id: item.category_id,
        price: item.price.toString(),
        description: item.description || '',
        is_special: item.is_special || false,
        image_url: item.image_url || ''
      });
    } else {
      setEditingItem(null);
      setImagePreview(null);
      setFormData({
        name: '',
        category_id: categories[0]?.id || '',
        price: '',
        description: '',
        is_special: false,
        image_url: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setImageFile(null);
    setImagePreview(null);
  };

  // Image Selection & Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Upload compressed image to Supabase Storage
  const uploadCompressedImage = async (file) => {
    // 1. Compress image in browser first!
    const compressedFile = await compressImage(file, 1000, 1000, 0.8);

    // 2. Upload compressed WebP to 'menu-images' bucket
    const fileExt = 'webp';
    const filePath = `items/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('menu-images')
      .upload(filePath, compressedFile);

    if (uploadError) throw uploadError;

    // 3. Get Public URL
    const { data } = supabase.storage.from('menu-images').getPublicUrl(filePath);
    return data.publicUrl;
  };

  // Submit Form (Create or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      let finalImageUrl = formData.image_url;

      // Upload new image if user picked one
      if (imageFile) {
        finalImageUrl = await uploadCompressedImage(imageFile);
      }

      const payload = {
        name: formData.name,
        category_id: formData.category_id,
        price: parseFloat(formData.price),
        description: formData.description,
        is_special: formData.is_special,
        image_url: finalImageUrl,
        updated_at: new Date().toISOString()
      };

      if (editingItem) {
        // Update Item
        const { error } = await supabase.from('menu_items').update(payload).eq('id', editingItem.id);
        if (error) throw error;
        setSuccess(`Item "${formData.name}" updated successfully!`);
      } else {
        // Insert Item
        const { error } = await supabase.from('menu_items').insert([payload]);
        if (error) throw error;
        setSuccess(`Item "${formData.name}" added successfully!`);
      }

      handleCloseModal();
      fetchData();
    } catch (err) {
      setError(err.message || 'Error saving item.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Item
  const handleDelete = async (item) => {
    if (!confirm(`Are you sure you want to delete "${item.name}"?`)) return;

    setError(null);
    const { error } = await supabase.from('menu_items').delete().eq('id', item.id);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(`Item "${item.name}" deleted successfully!`);
      fetchData();
    }
  };

  return (
    <div className="space-y-6 font-body text-gray-800">
      
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl text-brand-maroon">Menu Items Management</h1>
          <p className="text-gray-500 text-sm mt-1">Add, edit, or delete items and define "what's inside".</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          disabled={categories.length === 0}
          className="bg-brand-maroon text-brand-pink font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-body transition-colors shadow-sm text-sm self-start sm:self-auto disabled:opacity-50"
        >
          + Add New Item
        </button>
      </div>

      {categories.length === 0 && !loading && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-lg text-sm">
          ⚠️ You need to create at least one category before you can add menu items!
        </div>
      )}

      {/* Notifications */}
      {error && <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm">{error}</div>}
      {success && <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg text-sm">{success}</div>}

      {/* Filter Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2">
        <button
          onClick={() => setSelectedCategoryFilter('all')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            selectedCategoryFilter === 'all'
              ? 'bg-brand-maroon text-brand-pink'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          All Items ({items.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategoryFilter(cat.id)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategoryFilter === cat.id
                ? 'bg-brand-maroon text-brand-pink'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Items Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading items...</div>
        ) : filteredItems.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No items found in this view.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-500">
                  <th className="py-3.5 px-6">Item</th>
                  <th className="py-3.5 px-6">Category</th>
                  <th className="py-3.5 px-6">Price</th>
                  <th className="py-3.5 px-6">Special?</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {item.image_url ? (
                          <img src={item.image_url} alt={item.name} className="w-12 h-12 rounded-lg object-cover border" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-xs">No img</div>
                        )}
                        <div>
                          <p className="font-bold text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-500 line-clamp-1 max-w-xs">{item.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600 font-medium">
                      {item.categories?.name || 'Uncategorized'}
                    </td>
                    <td className="py-4 px-6 font-bold text-brand-maroon">
                      {item.price.toFixed(2)} Birr
                    </td>
                    <td className="py-4 px-6">
                      {item.is_special ? (
                        <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          ⭐ Today's Special
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">—</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="text-xs font-semibold text-brand-maroon hover:underline bg-brand-pink/30 px-3 py-1.5 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="text-xs font-semibold text-red-600 hover:underline bg-red-50 px-3 py-1.5 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Create/Edit Item */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 max-w-lg w-full p-6 space-y-6 my-8">
            
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-heading text-2xl text-brand-maroon">
                {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-maroon mb-1">Item Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Signature Torta Slice"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-maroon text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-maroon mb-1">Category</label>
                  <select
                    required
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-maroon text-sm bg-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-maroon mb-1">Price (Birr)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="8.50"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-maroon text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-maroon mb-1">
                  What's Inside / Description
                </label>
                <textarea
                  rows="3"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g. Layers of almond sponge, dulce de leche, and whipped meringue..."
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-maroon text-sm"
                ></textarea>
              </div>

              {/* Image Upload Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-maroon mb-1">
                  Item Image (Auto-Compressed to WebP)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-pink file:text-brand-maroon hover:file:bg-brand-maroon hover:file:text-white transition-all"
                />
                {imagePreview && (
                  <div className="mt-3 relative w-24 h-24 rounded-lg overflow-hidden border">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Special Checkbox Toggle */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="is_special"
                  checked={formData.is_special}
                  onChange={(e) => setFormData({ ...formData, is_special: e.target.checked })}
                  className="w-4 h-4 text-brand-maroon focus:ring-brand-maroon rounded border-gray-300"
                />
                <label htmlFor="is_special" className="text-xs font-bold uppercase tracking-wider text-brand-maroon cursor-pointer">
                  Mark as Today's Special ⭐
                </label>
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
                  {isSubmitting ? 'Compressing & Saving...' : editingItem ? 'Save Item' : 'Create Item'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}