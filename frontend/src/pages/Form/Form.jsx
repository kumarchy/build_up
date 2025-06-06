import { useState } from "react";
import axios from "axios";

const Form = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    type: "",
    githubLink: "",
    deployedLink: "",
  });

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile && droppedFile.type.startsWith("image/")) {
      const imageURL = URL.createObjectURL(droppedFile);
      setImage(imageURL);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const imageURL = URL.createObjectURL(selectedFile);
      setImage(imageURL);
    } else {
      alert("Please upload a valid image file.");
    }

    var reader = new FileReader();
    reader.onloadend = function () {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  // Handle form inputs and capitalize first letter automatically
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Automatically capitalize first letter for inputs (except description)
    const formattedValue =
      name === "description" ? value : value.charAt(0).toUpperCase() + value.slice(1);

    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.id) {
      alert("User is not logged in.");
      return;
    }

    const postData = {
      user_id: user.id,
      title: formData.title,
      description: formData.description,
      techStack: formData.techStack,
      type: formData.type,
      githubLink: formData.githubLink,
      deployedLink: formData.deployedLink,
      image_url: preview,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/post",
        postData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        alert("Post created successfully!");
        setFormData({
          title: "",
          description: "",
          techStack: "",
          type: "",
          githubLink: "",
          deployedLink: "",
        });
        setImage(null);
      }
    } catch (error) {
      alert("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="flex justify-center dark:bg-zinc-900 h-[100vh]">
      <div className="mt-5 md:w-[70%] sm:w-[70%] w-[80%]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
        >
          {/* File Drop/Upload */}
          <div
            className="border-dotted border-[2px] h-[130px] flex dark:bg-zinc-800 justify-center items-center cursor-pointer"
            onClick={() => document.getElementById("fileInput").click()}
          >
            {image ? (
              <img src={image} alt="Preview" className="w-full max-h-full" />
            ) : (
              <span className="text-zinc-500">Drag and Drop Project HomePage</span>
            )}
          </div>

          <input type="file" id="fileInput" hidden accept="image/*" onChange={handleFileInputChange} />

          {/* Input Fields */}
          <input
            type="text"
            name="title"
            value={formData.title}
            placeholder="Project Title"
            onChange={handleChange}
            className="border-[1px] p-2 outline-none dark:bg-zinc-800 text-white"
          />

          <textarea
            rows={5}
            name="description"
            value={formData.description}
            placeholder="Project Description"
            onChange={handleChange}
            className="border-[1px] p-2 outline-none dark:bg-zinc-800 text-white"
          />

          <input
            type="text"
            name="techStack"
            value={formData.techStack}
            placeholder="Tech Stack"
            onChange={handleChange}
            className="border-[1px] p-2 outline-none dark:bg-zinc-800 text-white"
          />

          <input
            type="text"
            name="type"
            value={formData.type}
            placeholder="Type/Category Followed By #"
            onChange={handleChange}
            className="border-[1px] p-2 outline-none dark:bg-zinc-800 text-white"
          />

          <input
            type="text"
            name="githubLink"
            value={formData.githubLink}
            placeholder="Github Link"
            onChange={handleChange}
            className="border-[1px] p-2 outline-none dark:bg-zinc-800 text-white"
          />

          <input
            type="text"
            name="deployedLink"
            value={formData.deployedLink}
            placeholder="Deployed Link"
            onChange={handleChange}
            className="border-[1px] p-2 outline-none dark:bg-zinc-800 text-white"
          />
          
          <div>
            <button type="submit" className="border-[1px] pt-2 pb-2 pl-4 pr-4 bg-blue-500 rounded-md">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
