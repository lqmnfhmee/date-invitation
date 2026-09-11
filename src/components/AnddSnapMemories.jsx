"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { supabase } from "../lib/supabase";

const boothPhotos = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
];

const sideMemories = [
  {
    id: 5,
    rotation: "-5deg",
    caption: "just us ♡",
    position: "left-0 top-[190px]",
  },
  {
    id: 6,
    rotation: "4deg",
    caption: "one for the memories",
    position: "right-0 top-[590px]",
  },
];

export default function AnddSnapMemories() {
  const [photos, setPhotos] = useState({});
  const [deleting, setDeleting] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  // Load saved photos from Supabase
  useEffect(() => {
    const loadPhotos = async () => {
      const { data, error } = await supabase
        .from("memory_photos")
        .select("slot, photo_url, storage_path")
        .eq("memory_key", "anddsnap");

      if (error) {
        console.error("Failed to load ANDDSNAP memories:", error);
        return;
      }

      const savedPhotos = {};

      data.forEach((photo) => {
        savedPhotos[photo.slot] = {
          url: photo.photo_url,
          storagePath: photo.storage_path,
        };
      });

      setPhotos(savedPhotos);
    };

    loadPhotos();
  }, []);

  // Upload photo to Supabase Storage
  const handleUpload = async (event, id) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      const fileExtension = file.name.split(".").pop();

      const filePath = `anddsnap/photo-${id}-${Date.now()}.${fileExtension}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("date-memories")
        .upload(filePath, file, {
          cacheControl: "3600",
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        alert("Failed to upload photo.");
        return;
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from("date-memories")
        .getPublicUrl(filePath);

      const photoUrl = publicUrlData.publicUrl;

      // Save photo information to database
      const { error: databaseError } = await supabase
        .from("memory_photos")
        .upsert(
          {
            memory_key: "anddsnap",
            slot: id,
            photo_url: photoUrl,
            storage_path: filePath,
          },
          {
            onConflict: "memory_key,slot",
          }
        );

      if (databaseError) {
        console.error("Database error:", databaseError);
        alert("Photo uploaded but could not save the photo record.");
        return;
      }

      // Display photo immediately
      setPhotos((previous) => ({
        ...previous,
        [id]: {
          url: photoUrl,
          storagePath: filePath,
        },
      }));
    } catch (error) {
      console.error("Unexpected upload error:", error);
      alert("Something went wrong while uploading.");
    }

    // Reset input so the same file can be selected again
    event.target.value = "";
  };

  // Delete photo from Storage + Database
  const handleDelete = async (id) => {
    const photo = photos[id];

    if (!photo) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this memory?"
    );

    if (!confirmed) return;

    setDeleting(id);

    try {
      // Delete actual file from Supabase Storage
      const { error: storageError } = await supabase.storage
        .from("date-memories")
        .remove([photo.storagePath]);

      if (storageError) {
        console.error("Storage delete error:", storageError);
        alert("Failed to delete the photo from storage.");
        return;
      }

      // Delete database record
      const { error: databaseError } = await supabase
        .from("memory_photos")
        .delete()
        .eq("memory_key", "anddsnap")
        .eq("slot", id);

      if (databaseError) {
        console.error("Database delete error:", databaseError);
        alert(
          "Photo file was deleted, but the database record could not be deleted."
        );
        return;
      }

      // Remove photo from UI
      setPhotos((previous) => {
        const updated = { ...previous };
        delete updated[id];
        return updated;
      });
    } catch (error) {
      console.error("Unexpected delete error:", error);
      alert("Something went wrong while deleting the photo.");
    } finally {
      setDeleting(null);
      setOpenMenu(null);
    }
  };

  // Small options menu
  const MemoryMenu = ({ id }) => {
    if (!photos[id]) return null;

    return (
      <div className="absolute right-1 top-1 z-30">
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();

            setOpenMenu(
              openMenu === id ? null : id
            );
          }}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-300 shadow-sm transition hover:text-gray-500"
          aria-label="Memory options"
        >
          <span className="mb-1 text-lg leading-none">
            ⋯
          </span>
        </button>

        {openMenu === id && (
          <div className="absolute right-0 top-8 w-28 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
            <button
              type="button"
              onClick={() => {
                setOpenMenu(null);
                handleDelete(id);
              }}
              disabled={deleting === id}
              className="w-full px-4 py-3 text-left text-xs text-red-400 transition hover:bg-red-50 disabled:opacity-50"
            >
              {deleting === id ? "Deleting..." : "Delete"}
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#fff7f5] px-5 py-12">
      <div className="mx-auto max-w-lg">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center"
        >
          <p className="text-xs tracking-[0.35em] text-pink-400">
            MEMORY 04
          </p>

          <h1 className="mt-3 font-serif text-4xl text-gray-800">
            ANDDSNAP 📸
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            Our little photo booth moment together.
          </p>
        </motion.div>

        {/* Collage */}
        <div className="relative mx-auto h-[1000px] w-full max-w-md">

          {/* Decorative details */}
          <div className="pointer-events-none absolute left-8 top-12 rotate-[-15deg] text-2xl text-pink-200">
            ♡
          </div>

          <div className="pointer-events-none absolute right-8 top-[430px] rotate-[12deg] text-xl text-pink-200">
            ✦
          </div>

          <div className="pointer-events-none absolute left-5 bottom-32 rotate-[10deg] text-xl text-pink-200">
            ♡
          </div>

          {/* Photobooth strip */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
              rotate: -2,
              scale: 0.9,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              rotate: -2,
              scale: 1,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
            }}
            className="absolute left-1/2 top-8 z-10 w-52 -translate-x-1/2 bg-white p-3 pb-8 shadow-xl"
          >

            {/* Photobooth photos */}
            <div className="space-y-2">
              {boothPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="relative"
                >

                  {/* Options Menu */}
                  <MemoryMenu id={photo.id} />

                  <label className="block cursor-pointer">
                    {photos[photo.id] ? (
                      <img
                        src={photos[photo.id].url}
                        alt={`ANDDSNAP photo ${index + 1}`}
                        className={`aspect-[4/3] w-full object-cover ${
                          deleting === photo.id
                            ? "opacity-50"
                            : ""
                        }`}
                      />
                    ) : (
                      <div className="flex aspect-[4/3] w-full flex-col items-center justify-center bg-[#fff7f5]">
                        <span className="text-2xl font-light text-gray-700">
                          ＋
                        </span>

                        <span className="mt-1 text-[10px] tracking-wide text-gray-400">
                          Add photo
                        </span>
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) =>
                        handleUpload(event, photo.id)
                      }
                    />
                  </label>

                </div>
              ))}
            </div>

            {/* Strip caption */}
            <p className="mt-5 text-center font-serif text-sm text-gray-500">
              ANDDSNAP ♡
            </p>
          </motion.div>

          {/* Small Polaroids */}
          {sideMemories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{
                opacity: 0,
                scale: 0.8,
                rotate: 0,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
                rotate: memory.rotation,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.4 + index * 0.2,
                type: "spring",
                stiffness: 120,
              }}
              className={`absolute ${memory.position} z-20 w-40 rounded-sm bg-white p-2 pb-6 shadow-lg`}
            >

              {/* Options Menu */}
              <MemoryMenu id={memory.id} />

              <label className="block cursor-pointer">

                {photos[memory.id] ? (
                  <img
                    src={photos[memory.id].url}
                    alt="ANDDSNAP memory"
                    className={`aspect-square w-full object-cover ${
                      deleting === memory.id
                        ? "opacity-50"
                        : ""
                    }`}
                  />
                ) : (
                  <div className="flex aspect-square w-full flex-col items-center justify-center bg-[#fff7f5]">
                    <span className="text-2xl font-light text-gray-700">
                      ＋
                    </span>

                    <span className="mt-1 text-[10px] text-gray-400">
                      Add memory
                    </span>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) =>
                    handleUpload(event, memory.id)
                  }
                />

              </label>

              <p className="mt-3 text-center font-serif text-xs text-gray-500">
                {memory.caption}
              </p>

            </motion.div>
          ))}

        </div>

        {/* Ending */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="pt-8 pb-12 text-center"
        >
          <p className="text-sm text-pink-300">
            proof that we were here ♡
          </p>
        </motion.div>

      </div>
    </main>
  );
}