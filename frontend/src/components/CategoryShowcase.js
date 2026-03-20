import React from 'react';

export default function CategoryShowcase() {
  const categoryGroups = [
    { 
      title: 'Home and outdoor',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=220&h=220&q=80',
      items: [
        { name: 'Soft chairs', price: 'From USD 19', image: 'https://images.unsplash.com/photo-1582582621959-48d27397dc69?auto=format&fit=crop&w=240&h=180&q=80' },
        { name: 'Sofa & chair', price: 'From USD 19', image: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&w=240&h=180&q=80' },
        { name: 'Kitchen dishes', price: 'From USD 19', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=240&h=180&q=80' },
        { name: 'Smart watches', price: 'From USD 19', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=240&h=180&q=80' },
      ]
    },
    { 
      title: 'Consumer electronics and gadgets',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=220&h=220&q=80',
      items: [
        { name: 'Smart watches', price: 'From USD 19', image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=240&h=180&q=80' },
        { name: 'Cameras', price: 'From USD 89', image: 'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=240&h=180&q=80' },
        { name: 'Headphones', price: 'From USD 90', image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=240&h=180&q=80' },
        { name: 'Smart watches', price: 'From USD 19', image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=240&h=180&q=80' },
      ]
    }
  ];

  return (
    <section className="py-8 px-4 bg-white">
      <div className="max-w-7xl mx-auto space-y-8">
        {categoryGroups.map((group, idx) => (
          <div key={idx} className="border rounded-lg p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-gray-100 rounded-lg p-4 flex flex-col justify-between">
                <h3 className="font-bold text-gray-800 mb-3 text-sm">{group.title}</h3>
                <img src={group.image} alt={group.title} className="w-24 h-24 object-cover rounded" />
              </div>
              {group.items.map((item, itemIdx) => (
                <div key={itemIdx} className="bg-gray-50 rounded-lg p-4 text-center">
                  <img src={item.image} alt={item.name} className="w-full h-20 object-cover rounded mb-2" />
                  <p className="text-xs font-semibold text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
