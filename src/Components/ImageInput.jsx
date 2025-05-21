import { useState } from "react";

export default function ImageInput({ onChange }) {
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploading(true);

        // Cloudinary upload
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ticket-preset");

        try {
            const response = await fetch(
                "https://api.cloudinary.com/v1_1/dsfkjumb0/image/upload",
                { method: "POST", body: formData }
            );

            const data = await response.json();
            if (data.secure_url) {
                setPreview(data.secure_url);
                onChange(data.secure_url);
            }
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Image upload failed. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center text-white">
            <label
                className="relative w-full h-[5.5rem] flex items-center justify-center border border-gray-500 rounded-lg bg-img cursor-pointer text-gray-400 text-sm"
            >
                <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleImageUpload}
                    disabled={uploading}
                />

                {/* Display Image or Placeholder Text */}
                {uploading ? (
                    <span>Uploading...</span>
                ) : preview ? (
                    <img
                        src={preview}
                        alt="Uploaded"
                        className="w-full h-full object-contain rounded-lg"
                    />
                ) : (
                    <span>No image uploaded</span>
                )}
            </label>


        </div>
    );
}
