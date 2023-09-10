import { useCallback, useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { useDropzone } from "react-dropzone";

const Photos: React.FC = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [photosReadyToUpload, setPhotosReadyToUpload] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const encoded = acceptedFiles.map((img) => URL.createObjectURL(img));
    setPhotosReadyToUpload((photos) => [...photos, ...encoded]);

    //TODO: send to backend and move to photos
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="grid h-full w-full auto-cols-max auto-rows-max grid-cols-1 gap-y-2 overflow-y-scroll p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
      {photos.map((item) => {
        return (
          <div
            key={item}
            className="relative  h-24 w-48 rounded-xl border-4 border-blue-400 p-3"
          >
            <Image src={item} fill alt="photo" className="rounded-xl"></Image>
          </div>
        );
      })}

      {photosReadyToUpload.map((item) => {
        return (
          <div
            key={item}
            className="relative  h-24 w-48 rounded-xl border-4 border-blue-400 p-3"
          >
            <Image src={item} fill alt="photo" className="rounded-xl"></Image>
          </div>
        );
      })}

      <div
        {...getRootProps()}
        className="flex h-24 w-48 border-spacing-4 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-4 border-dashed border-blue-400 p-3 hover:bg-gray-100"
      >
        <input
          type="file"
          className="h-full w-full"
          id="upload"
          name="upload"
          accept="image/png, image/jpg"
          {...getInputProps()}
        ></input>
        <div className="flex h-10 w-10  items-center justify-center rounded-full bg-blue-400 text-center text-white">
          <Plus className="h-full w-full p-1"></Plus>
        </div>
        <div className="font-thin text-blue-400">
          click or drag & drop to upload
        </div>
      </div>
    </div>
  );
};

export default Photos;
