import { useState, useEffect } from "react";
import axios from "axios";

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/images").then((res) => setImages(res.data));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete/${id}`);
      setImages(images.filter((img) => img._id !== id));
    } catch (error) {
      alert("Failed to delete image!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Your Gallery</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img._id} className="relative overflow-hidden rounded-lg shadow-lg">
            <img 
              src={img.url} 
              alt="Uploaded" 
              className="w-full h-48 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
            />
            <button
              className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 text-sm rounded shadow hover:bg-red-700 transition"
              onClick={() => handleDelete(img._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
