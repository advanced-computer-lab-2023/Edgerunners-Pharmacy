import { useState } from "react";
import ImageUpload from "../../Components/ImageUpload";

function UseImageUpload() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div className="max-w-7xl mx-auto flex justify-center items-start min-h-screen mt-6">
      <div>

        <ImageUpload setImageUrl={setImageUrl} imageUrl={imageUrl} />

        {imageUrl && (
          <div className="mt-16 w-[30rem]">
            <label className=" text-lg text-center text-gray-500 dark:text-gray-400">
              Image link
            </label>
            <textarea
              type="search"
              id="default-search"
              className="mb-2 block w-full h-20 outline-none p-4  text-sm text-black border border-gray-300 rounded-lg bg-[#fafafa] "
              placeholder=""
              value={imageUrl}
              required
            />

            <figure className=" mx-auto">
              <img
                className="h-auto w-full rounded-lg"
                src={imageUrl}
                alt="image description"
              />
              <figcaption className="mt-2 text-xl text-center text-gray-500 dark:text-gray-400">
                Preview
              </figcaption>
            </figure>
          </div>
        )}
      </div>
    </div>
  );
}

export default UseImageUpload;