import { SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Loader, Plus } from "lucide-react";
import { useDropzone } from "react-dropzone";

type PhotosData = {
  ID: number;
  filename: string;
  visitID: number;
};
const Photos: React.FC<{ visitId: number }> = ({ visitId }) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [photosReadyToUpload, setPhotosReadyToUpload] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  //react runs useEffect twice in dev so this ref prevents fetching photos twice
  const fetchedRef = useRef<boolean>(false);


  const [enlargedPhoto, setEnlargedPhoto] = useState<string>(''); 

  const openEnlargedPhoto = (photoUrl: string) => {
    setEnlargedPhoto(photoUrl);
  };

  const closeEnlargedPhoto = () => {
    setEnlargedPhoto(''); // Change null to ''
  };

  useEffect(() => {
    if (fetchedRef.current) {
      return;
    }

    fetchedRef.current = true;
    fetch(`http://localhost:3001/database/photos${visitId}`, {
      mode: "cors",
      credentials: "include",
    })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res) => res.json())
      .then(({ data }: { data: PhotosData[]; meta: number }) => {
        console.log(data);
        data.forEach((photo) => {
          setPhotos((old) => [
            ...old,
            `http://localhost:3001/${photo.filename}`,
          ]);

          setIsLoading(false);
        });
      })
      .catch((e) => console.error(e));
  }, [visitId]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        setPhotosReadyToUpload((old) => [...old, base64]);
        console.log(base64);
        const response = await fetch(
          `http://localhost:3001/database/upload_photo${visitId}`,
          {
            method: "post",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: base64 }),
          }
        );

        console.log(response);
      };
      acceptedFiles.map((img) => reader.readAsDataURL(img));
    },
    [visitId]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  
  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center gap-2 text-xl bg-green-300">
        <Loader className="animate-spin"></Loader>
        Loading photos...
      </div>
    );
  }
  return (
    <div className="grid h-full w-full auto-cols-max auto-rows-max grid-cols-1 gap-y-2 gap-x-5 overflow-y-scroll p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3  ">
      {photos.map((item) => {
        return (
          <div
            key={item}
            className="relative h-25 w-33 rounded-xl border-5 border-blue-400 p-3 "
            onClick={() => openEnlargedPhoto(item)}
          >
            <Image src={item} fill alt="photo" className="rounded-xl"></Image>
          </div>
        );
      })}

      {photosReadyToUpload.map((item) => {
        return (
          <div
            key={item}
            className="relative  h-25 w-33 rounded-xl border-4 border-blue-400 p-3 "
            onClick={() => openEnlargedPhoto(item)}
          >
            <Image src={item} fill alt="photo" ></Image>
          </div>
        );
      })}


      {enlargedPhoto && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={closeEnlargedPhoto}>
         <div className="bg-white p-4 rounded-xl max-h-[75%] max-w-[75%]  ">
            <img src={enlargedPhoto} alt="enlarged-photo"  className="rounded-xl" style={ { height : "100%",  width: "100%" , aspectRatio: "1/1" } }  />
          </div>
        </div>
      )}
    
      <div
        {...getRootProps()}
        className="flex h-24 w-33 border-spacing-4 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-4 border-dashed border-blue-400 p-3 hover:bg-gray-100"
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
